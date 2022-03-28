import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api';

Vue.use(Vuex);

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
    order: {
      city: null,
      point: null,
      car: null,
      category: null,
      color: '1',
      rentDataStart: null,
      rentDataEnd: null,
      tariff: null,
      additionalServices: [],
    },

    cities: [],
    points: [],
    cars: [],
    categories: [],
    selectedCategory: null,
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

    setOrder({ commit, state }, { key, value }) {
      const { order } = state;

      order[key] = value;

      commit('SET_ORDER', order);
    },

    setStepFilledStatus({ commit, state }, { stepName, value }) {
      const { steps } = state;
      const foundStep = Object.values(steps).find((step) => step.code === stepName);

      foundStep.filled = value;

      commit('SET_STEP_FILLED_STATUS', steps);
    },
  },
  getters: {
    selectedCarObject: (state) => state.cars.find((item) => item === state.order.car),
    selectedCityObject: (state) => state.cities.find((item) => item.name === state.order.city),
    selectedCityPoints: (state, getters) => state.points
      .filter((item) => item.cityId.id === getters.selectedCityObject?.id),
    selectPoint: (state, getters) => getters.selectedCityPoints
      .find((item) => item.name === state.order.point),
    filteredCars: (state) => (state.selectedCategory
      ? state.cars.filter((item) => item.categoryId.id === state.selectedCategory)
      : state.cars),
  },
});
