<template>
  <div class="side-order-menu">
    <h3 class="side-order-menu__title">
      Ваш заказ:
    </h3>
    <ul class="side-order-menu__items">
      <li class="side-order-menu__item">
        <span class="side-order-menu__item-left">Пункт выдачи</span>
        <div class="side-order-menu__item-dots" />
        <div class="side-order-menu__item-right">
          <span v-if="!selectedCityObject">
            Пункт не выбран
          </span>
          <div
            v-else
            class="side-order-menu__item-right-empty"
          >
            <span>
              {{ order.city }}
            </span>
            <span>
              {{ order.point }}
            </span>
          </div>
        </div>
      </li>
      <li
        v-if="isShowCarBlock && selectedCarObject"
        class="side-order-menu__item"
      >
        <span class="side-order-menu__item-left">
          Модель
        </span>
        <div class="side-order-menu__item-dots" />
        <div class="side-order-menu__item-right">
          <span>
            {{ selectedCarObject.name }}
          </span>
        </div>
      </li>
      <template v-if="isOptionsOrResultOrInfo">
        <li class="side-order-menu__item">
          <span class="side-order-menu__item-left">Цвет</span>
          <div class="side-order-menu__item-dots" />
          <div class="side-order-menu__item-right">
            <span v-if="order.color"> {{ order.color }} </span>
            <span v-else>Не выбран</span>
          </div>
        </li>
        <li class="side-order-menu__item">
          <span class="side-order-menu__item-left">Длительность аренды</span>
          <div class="side-order-menu__item-dots" />
          <div class="side-order-menu__item-right">
            <span>{{ dateRangeInPickedRate.text }}</span>
          </div>
        </li>

        <li class="side-order-menu__item">
          <span class="side-order-menu__item-left">Тариф</span>
          <div class="side-order-menu__item-dots" />
          <div class="side-order-menu__item-right">
            <span v-if="order.rate">
              {{ order.rate.rateTypeId.name }}
            </span>
            <span v-else>Не выбран</span>
          </div>
        </li>
        <li
          v-if="order.isFullTank"
          class="side-order-menu__item"
        >
          <span class="side-order-menu__item-left">Полный бак</span>
          <div class="side-order-menu__item-dots" />
          <div class="side-order-menu__item-right">
            <span>Да</span>
          </div>
        </li>
        <li
          v-if="order.isNeedChildChair"
          class="side-order-menu__item"
        >
          <span class="side-order-menu__item-left">Детское кресло</span>
          <div class="side-order-menu__item-dots" />
          <div class="side-order-menu__item-right">
            <span>Да</span>
          </div>
        </li>
        <li
          v-if="order.isRightWheel"
          class="side-order-menu__item"
        >
          <span class="side-order-menu__item-left">Правый руль</span>
          <div class="side-order-menu__item-dots" />
          <div class="side-order-menu__item-right">
            <span>Да</span>
          </div>
        </li>
      </template>
    </ul>

    <div class="side-order-menu__cost">
      <span>Цена: {{ priceLabel }}</span>
    </div>

    <div
      class="side-order-menu__button"
      :class="[
        {
          'side-order-menu__button--active': sideOrderMenuButtonActive,
          'side-order-menu__button--red': selectedStep.code === 'info',
        }
      ]"
      @click="onConfirm"
    >
      {{ orderButton }}
    </div>

    <confirm-result
      v-if="popUpVisible"
      @show="popUpVisible = $event"
    />
  </div>
</template>

<script>
import ConfirmResult from '@/components/order/ConfirmResult.vue';
import { mapActions, mapGetters, mapState } from 'vuex';
import api from '@/api';

export default {
  name: 'SideOrderMenu',
  components: { ConfirmResult },
  props: {
    selectedStep: {
      type: Object,
      required: true,
    },
    steps: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      popUpVisible: false,
    };
  },
  computed: {
    ...mapState(['order']),
    ...mapGetters(['selectedCityPoints', 'selectedCityObject', 'selectedCarObject', 'uniqRateTypes']),

    dateRangeInMinutes() {
      if (!this.order.rate?.rateTypeId) return 0;

      const startDate = this.order.rentDataStart;
      const endDate = this.order.rentDataEnd;
      let diff = 0;

      if (startDate && endDate) {
        diff = endDate - startDate;
      }

      return diff / 1000 / 60;
    },

    minuteCost() {
      if (!this.order.rate) return 0;

      const { price } = this.order.rate;
      const { unit } = this.uniqRateTypes
        .find((item) => item.name === this.order.rate.rateTypeId.name);
      return price / unit;
    },

    dateRangeInPickedRate() {
      let text = 'Не выбрано';
      let isSelectRate = true;

      if (!this.order.rate?.rateTypeId && this.order.rentDataStart && this.order.rentDataEnd) {
        text = 'Тариф не выбран';
        return { text, isSelectRate };
      }

      if (!this.order.rate?.rateTypeId) {
        return { text, isSelectRate };
      }

      const pickedRateName = this.order.rate.rateTypeId.name;

      const totalMinutes = this.dateRangeInMinutes;

      if (pickedRateName === this.uniqRateTypes[0].name) {
        const minutes = Math.floor(totalMinutes / this.uniqRateTypes[0].unit);
        if (minutes > 1) {
          text = `${minutes}м`;
        } else {
          text = 'Выберите от минуты';
        }
      }
      if (pickedRateName === this.uniqRateTypes[1].name) {
        const days = Math.floor(totalMinutes / this.uniqRateTypes[1].unit);
        const hours = Math.floor((totalMinutes % this.uniqRateTypes[1].unit) / 60);
        const minutes = Math.floor((totalMinutes % this.uniqRateTypes[1].unit) % 60);

        if (minutes < 1) {
          text = 'Не выбрано';
        }

        if (totalMinutes < this.uniqRateTypes[1].unit) {
          text = 'Выберите от суток';
          isSelectRate = false;
        } else {
          text = `${days}д${hours}ч${minutes}м`;
        }
      }
      if (pickedRateName === this.uniqRateTypes[2].name
        || pickedRateName === this.uniqRateTypes[3].name) {
        const weeks = Math.floor(totalMinutes / this.uniqRateTypes[3].unit);
        const days = Math.floor((totalMinutes % this.uniqRateTypes[3].unit)
          / this.uniqRateTypes[1].unit);
        const hours = Math.floor((totalMinutes % this.uniqRateTypes[1].unit) / 60);
        const minutes = Math.floor((totalMinutes % this.uniqRateTypes[1].unit) % 60);

        if (totalMinutes < (this.uniqRateTypes[3].unit || this.uniqRateTypes[2].name)) {
          text = 'Выберите от недели';
          isSelectRate = false;
        } else {
          text = `${weeks}н${days}д${hours}ч${minutes}м`;
        }
      }
      if (pickedRateName === this.uniqRateTypes[4].name) {
        const months = Math.floor(totalMinutes / this.uniqRateTypes[4].unit);
        const days = Math.floor((totalMinutes % this.uniqRateTypes[4].unit)
          / this.uniqRateTypes[1].unit);
        const hours = Math.floor((totalMinutes % this.uniqRateTypes[1].unit) / 60);
        const minutes = Math.floor((totalMinutes % this.uniqRateTypes[1].unit) % 60);

        if (totalMinutes < this.uniqRateTypes[4].unit) {
          text = 'Выберите от месяца';
          isSelectRate = false;
        } else {
          text = `${months}м${days}д${hours}ч${minutes}м`;
        }
      }
      if (pickedRateName === this.uniqRateTypes[5].name) {
        const quarter = Math.floor(totalMinutes / this.uniqRateTypes[5].unit);
        const months = Math.floor((totalMinutes % this.uniqRateTypes[4].unit) / 30);
        const days = Math.floor((totalMinutes % this.uniqRateTypes[4].unit)
          / this.uniqRateTypes[1].unit);
        const hours = Math.floor((totalMinutes % this.uniqRateTypes[1].unit) / 60);
        const minutes = Math.floor((totalMinutes % this.uniqRateTypes[1].unit) % 60);

        if (totalMinutes < this.uniqRateTypes[5].unit) {
          text = 'Выберите от квартала';
          isSelectRate = false;
        } else {
          text = `${quarter}кв${months}м${days}д${hours}ч${minutes}м`;
        }
      }
      if (pickedRateName === this.uniqRateTypes[6].name
           || pickedRateName === this.uniqRateTypes[7].name) {
        const years = Math.floor(totalMinutes / this.uniqRateTypes[6].unit);
        const months = Math.floor((totalMinutes % this.uniqRateTypes[4].unit) / 30);
        const days = Math.floor((totalMinutes % this.uniqRateTypes[4].unit)
          / this.uniqRateTypes[1].unit);
        const hours = Math.floor((totalMinutes % this.uniqRateTypes[1].unit) / 60);
        const minutes = Math.floor((totalMinutes % this.uniqRateTypes[1].unit) % 60);

        if (totalMinutes < (this.uniqRateTypes[6].unit || this.uniqRateTypes[7].name)) {
          text = 'Выберите от года';
          isSelectRate = false;
        } else {
          text = `${years}г${months}м${days}д${hours}ч${minutes}м`;
        }
      }

      return {
        text,
        isSelectRate,
      };
    },

    calculatedPrice() {
      let price = 0;
      if (this.dateRangeInMinutes && this.minuteCost && this.dateRangeInPickedRate.isSelectRate) {
        const rentalPrice = Math.round(this.dateRangeInMinutes * this.minuteCost);
        price += rentalPrice;
      }
      if (this.order.isFullTank) {
        price += 500;
      }
      if (this.order.isNeedChildChair) {
        price += 200;
      }
      if (this.order.isRightWheel) {
        price += 1600;
      }
      return price;
    },

    maxPrice() {
      let bool = true;
      if (this.calculatedPrice > this.selectedCarObject.priceMax) {
        bool = false;
      }
      return bool;
    },

    sideOrderMenuButtonActive() {
      return ((this.selectedStep.filled || this.selectedStep.code === 'result')
        && this.dateRangeInPickedRate.isSelectRate);
    },
    isOptionsOrResultOrInfo() {
      return this.selectedStep.code === 'options' || this.selectedStep.code === 'result' || this.selectedStep.code === 'info';
    },
    isShowCarBlock() {
      return this.selectedStep.code !== 'location';
    },
    priceLabel() {
      let price = 'Нет цены';

      switch (this.selectedStep.code) {
      case 'location':
        price = '0 ₽';
        break;
      case 'model':
        price = this.selectedCarObject
          ? `от ${this.selectedCarObject.priceMin} до ${this.selectedCarObject.priceMax} ₽`
          : '0 ₽';
        break;
      case 'options':
      case 'result':
      case 'info':
        if (!this.selectedCarObject) break;
        if (this.selectedCarObject.priceMin > this.calculatedPrice) {
          price = this.selectedCarObject.priceMin;
        } else if (this.selectedCarObject.priceMax < this.calculatedPrice) {
          price = `Итоговая цена = ${this.calculatedPrice} ₽, максимальная цена - ${this.selectedCarObject.priceMax} ₽`;
        } else {
          price = `${this.calculatedPrice} ₽`;
        }
        break;
      default:
        price = 'Нет цены';
      }

      return price;
    },
    orderButton() {
      let buttonName = '';

      if (this.selectedStep.code === 'location') {
        buttonName = 'Выбрать модель';
      } else if (this.selectedStep.code === 'model') {
        buttonName = 'Дополнительно';
      } else if (this.selectedStep.code === 'options') {
        buttonName = 'Итого';
      } else if (this.selectedStep.code === 'result') {
        buttonName = 'Заказать';
      } else if (this.selectedStep.code === 'info') {
        buttonName = 'Отменить';
      } else {
        buttonName = '';
      }

      return buttonName;
    },
  },
  watch: {
    calculatedPrice(value) {
      this.$store.dispatch('setOrder', { key: 'price', value });
    },
  },
  created() {
    this.getRateType();
  },
  methods: {
    ...mapActions(['getRateType', 'clearOrder']),
    async deleteOrder(orderId) {
      try {
        await api.order.deleteOrder(orderId);
      } catch (e) {
        console.error(e);
      }
    },
    showPopUp() {
      this.popUpVisible = true;
    },
    onConfirm() {
      let nextStepIndex;
      let currentStepIndex;
      const selectedStepCode = this.selectedStep.code === 'location' || this.selectedStep.code === 'model' || this.selectedStep.code === 'options';

      if (selectedStepCode) {
        if (this.selectedStep.filled) {
          currentStepIndex = Object.values(this.steps)
            .findIndex((item) => item.code === this.selectedStep.code);

          nextStepIndex = currentStepIndex + 1;

          this.$router.push({
            name: 'Order',
            params: {
              stepName: this.steps[nextStepIndex].code,
            },
          });
        }
      } else if (this.selectedStep.code === 'result') {
        this.showPopUp();
      } else if (this.selectedStep.code === 'info') {
        this.clearOrder();
        this.deleteOrder(this.order.id);
        this.$router.push({
          name: 'Order',
          params: {
            stepName: 'location',
          },
        });
      } else {
        console.error(`Шаг ${this.selectedStep.code} не существует`);
      }
    },
  },
};
</script>

<style lang="scss">

.side-order-menu {
  padding: 32px 0;
  min-width: 290px;
  @include tablet {
    float: right;
    max-width: 290px;
    height: 100%;
  }
  @include mobile {
    margin: 16px 16px 0 16px;
    width: 100%;
    padding: 0 0 16px 0;
  }

  &__title {
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    text-align: right;
    color: $main-black;
    margin-bottom: 25px;
  }

  &__items {
    margin-bottom: 30px;
  }

  &__item {
    list-style: none;
    display: flex;
    justify-content: space-between;
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
    align-items: flex-end;
    margin-bottom: 15px;
    vertical-align: bottom;

    &:last-child {
      margin-bottom: 0;
    }

    &-left {
      color: $main-black;
    }

    &-right {
      color: $dark-grey;
      text-align: right;

      &-empty {
        display: flex;
        flex-direction: column;
      }
    }

    &-dots {
      flex: 1 0;
      border-bottom: 1px dotted $main-black;
      height: 1em;
      margin: 0 0.4em 2px 0.4em;
      min-width: 15px;
    }
  }

  &__cost {
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    color: $main-black;
    margin-bottom: 32px;
  }

  &__button {
    width: 100%;
    background: $light-grey;
    border: none;
    border-radius: 8px;
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    color: $white;
    padding: 15px 0;
    text-align: center;
    cursor: pointer;

    &--active {
      width: 100%;
      border: none;
      border-radius: 8px;
      font-weight: 500;
      font-size: 18px;
      line-height: 21px;
      color: $white;
      padding: 15px 0;
      text-align: center;
      cursor: pointer;
      background: $main-green;
    }
  }
}
</style>
