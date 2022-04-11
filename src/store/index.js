import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api';
import { uniqWith } from 'lodash';

Vue.use(Vuex);

const isStrSame = (val, oth) => val.trim().toLowerCase() === oth.trim().toLowerCase();
const clearOrder = {
  city: null,
  point: null,
  car: null,
  color: '',
  rentDataStart: null,
  rentDataEnd: null,
  isFullTank: false,
  isNeedChildChair: false,
  isRightWheel: false,
  rateType: null,
  rate: null,
  price: null,
  status: null,
};

export default new Vuex.Store({
  state: {
    steps: {
      0: {
        code: 'location',
        translate: 'Местоположение',
        filled: false,
      },
      1: {
        code: 'model',
        translate: 'Модель',
        filled: false,
      },
      2: {
        code: 'options',
        translate: 'Дополнительно',
        filled: false,
      },
      3: {
        code: 'result',
        translate: 'Итого',
        filled: false,
      },
      4: {
        code: 'info',
      },
    },
    order: clearOrder,

    cities: [],
    points: [],
    cars: [],
    categories: [],
    selectedCategory: null,
    rates: [],
  },
  mutations: {
    SET_ORDER(state, payload) {
      this.state.order = payload;
    },
    SET_STEP_FILLED_STATUS(state, payload) {
      this.state.steps = payload;
    },
    SET_CITIES(state, payload) {
      this.state.cities = payload;
    },
    SET_POINTS(state, payload) {
      this.state.points = payload;
    },
    SET_CARS(state, payload) {
      this.state.cars = payload;
    },
    SET_CATEGORIES(state, payload) {
      this.state.categories = payload;
    },
    SET_SELECTED_CATEGORY(state, payload) {
      this.state.selectedCategory = payload;
    },
    SET_RATE_TYPE(state, payload) {
      this.state.rateType = payload;
    },
    SET_RATE(state, payload) {
      this.state.rates = payload;
    },
    SET_STATUS(state, payload) {
      this.state.order.status = payload;
    },
  },
  actions: {
    async getOrderData({ commit }) {
      try {
        const { data: cities } = await api.city.getCities();
        const { data: points } = await api.city.getPoints();

        const citiesFiltered = [];
        const pointsFiltered = [];

        points.data.forEach((pointItem) => {
          const cityId = pointItem.cityId?.id;

          const findingCity = cities.data.find((cityItem) => cityItem.id === cityId);

          if (findingCity) {
            citiesFiltered.push(findingCity);
            pointsFiltered.push(pointItem);
          }
        });

        const pointsAddresses = pointsFiltered.map((item) => `${item.cityId.name} ${item.address}`);
        const getAddressPromises = pointsAddresses.map((item) => api.maps.getCoordsByAddress(item));
        const pointsCoords = await Promise.all(getAddressPromises);

        pointsCoords.forEach((item, index) => {
          pointsFiltered[index].coords = item;
        });

        commit('SET_CITIES', citiesFiltered);
        commit('SET_POINTS', pointsFiltered);
      } catch (e) {
        console.error(e);
      }
    },

    async getAllCars({ commit }) {
      const { data: cars } = await api.car.getCars();
      const allCars = cars.data;
      commit('SET_CARS', allCars);
    },

    async getCategories({ commit }) {
      const { data: categories } = await api.category.getCategory();
      const allCategories = categories.data;
      commit('SET_CATEGORIES', allCategories);
    },

    setSelectedCategory({ commit }, id) {
      commit('SET_SELECTED_CATEGORY', id);
    },

    async getRateType({ commit }) {
      const { data: rateType } = await api.rateType.getRateType();
      commit('SET_RATE_TYPE', rateType.data);
    },

    async getOrderStatus({ commit }) {
      const status = await api.orderStatus.getOrderStatus();
      const allStatuses = status.data.data;
      commit('SET_STATUS', allStatuses);
    },

    async getRate({ commit }) {
      const { data: rates } = await api.rate.getRate();
      const rateList = rates.data;
      commit('SET_RATE', rateList);
    },

    setOrder({ commit, state }, { key, value }) {
      const { order } = state;

      order[key] = value;

      commit('SET_ORDER', order);
    },

    setOrderFromApi({ commit }, orderDataFromApi) {
      console.log(orderDataFromApi);
      const orderData = {
        car: orderDataFromApi.carId,
        city: orderDataFromApi.cityId.name,
        color: orderDataFromApi.color,
        isFullTank: orderDataFromApi.isFullTank,
        isNeedChildChair: orderDataFromApi.isNeedChildChair,
        isRightWheel: orderDataFromApi.isNeedChildChair,
        point: orderDataFromApi.pointId.name,
        price: orderDataFromApi.price,
        rate: orderDataFromApi.rateId,
        rateType: null,
        rentDataEnd: orderDataFromApi.dateTo,
        rentDataStart: orderDataFromApi.dateFrom,
        status: orderDataFromApi.status,
        id: orderDataFromApi.id,
      };
      commit('SET_ORDER', orderData);
    },

    clearOrder({ commit }) {
      commit('SET_ORDER', clearOrder);
    },

    setStepFilledStatus({ commit, state }, { stepName, value }) {
      const { steps } = state;
      const foundStep = Object.values(steps).find((step) => step.code === stepName);

      foundStep.filled = value;

      commit('SET_STEP_FILLED_STATUS', steps);
    },

    async createOrder({ state, getters }) {
      const orderData = {
        orderStatusId: {
          name: 'Новые',
          id: '5e26a191099b810b946c5d89',
        },
        cityId: {
          name: getters.selectedCityObject.name,
          id: getters.selectedCityObject.id,
        },
        pointId: {
          address: getters.selectPoint.address,
          id: getters.selectPoint.id,
          name: state.order.point,
        },
        carId: state.order.car,
        color: state.order.color,
        dateFrom: state.order.rentDataStart,
        dateTo: state.order.rentDataEnd,
        rateId: state.order.rate,
        price: state.order.price,
        isFullTank: state.order.isFullTank,
        isNeedChildChair: state.order.isNeedChildChair,
        isRightWheel: state.order.isRightWheel,
      };

      try {
        const { data } = await api.order.setOrder(orderData);

        const orderId = data.data.id;

        return Promise.resolve(orderId);
      } catch (e) {
        console.error(e);
        return Promise.reject();
      }
    },
  },
  getters: {
    selectedCarObject: (state) => state.order.car,
    selectedCityObject: (state) => state.cities.find((item) => item.name === state.order.city),
    selectedCityPoints: (state, getters) => state.points
      .filter((item) => item.cityId.id === getters.selectedCityObject?.id),
    selectPoint: (state, getters) => getters.selectedCityPoints
      .find((item) => item.name === state.order.point),
    filteredCars: (state) => (state.selectedCategory
      ? state.cars.filter((item) => item.categoryId.id === state.selectedCategory)
      : state.cars),
    uniqRateTypes: (state) => uniqWith(
      state.rateType,
      (val, oth) => (isStrSame(val.name, oth.name)),
    ).map((item) => {
      let unit = '';
      switch (item.name) {
      case 'Годовой':
      case 'Годоовой':
        unit = 365 * 7 * 24 * 60;
        break;
      case '3 Месяца':
        unit = 3 * 30 * 7 * 24 * 60;
        break;
      case 'Месячный':
        unit = 30 * 24 * 60;
        break;
      case 'Недельный':
      case 'Недельный (Акция!)':
        unit = 7 * 24 * 60;
        break;
      case 'сутки':
        unit = 24 * 60;
        break;
      case 'Поминутно':
        unit = 1;
        break;
      default:
        unit = 24 * 60;
        break;
      }

      return {
        name: item.name,
        unit,
      };
    }),
  },
});
