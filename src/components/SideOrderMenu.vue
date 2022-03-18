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
              {{ this.$store.state.order.city }}
            </span>
            <span>
              {{ this.$store.state.order.point }}
            </span>
          </div>
        </div>
      </li>
      <li
        v-if="isShowCarBlock"
        class="side-order-menu__item"
      >
        <span class="side-order-menu__item-left">Модель</span>
        <div class="side-order-menu__item-dots" />
        <div class="side-order-menu__item-right">
          <span v-if="!selectedCarObject">
            Автомобиль не выбран
          </span>
          <div
            v-else
            class="side-order-menu__item-right-empty"
          >
            {{ selectedCarObject.name }}
          </div>
        </div>
      </li>
      <template v-if="isOptionsOrResultOrInfo">
        <li class="side-order-menu__item">
          <span class="side-order-menu__item-left">Цвет</span>
          <div class="side-order-menu__item-dots" />
          <div class="side-order-menu__item-right">
            <span>Не выбран</span>
          </div>
        </li>
        <li class="side-order-menu__item">
          <span class="side-order-menu__item-left">Длительность аренды</span>
          <div class="side-order-menu__item-dots" />
          <div class="side-order-menu__item-right">
            <span>Не выбрано</span>
          </div>
        </li>
        <li class="side-order-menu__item">
          <span class="side-order-menu__item-left">Тариф</span>
          <div class="side-order-menu__item-dots" />
          <div class="side-order-menu__item-right">
            <span>Не выбран</span>
          </div>
        </li>
        <li class="side-order-menu__item">
          <span class="side-order-menu__item-left">Полный бак</span>
          <div class="side-order-menu__item-dots" />
          <div class="side-order-menu__item-right">
            <span>Не выбран</span>
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
import { mapGetters } from 'vuex';

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
    ...mapGetters(['selectedCityPoints', 'selectedCityObject', 'selectedCarObject']),
    sideOrderMenuButtonActive() {
      return this.selectedStep.filled || this.selectedStep.code === 'result';
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
        price = `от ${this.selectedCarObject.priceMin} до ${this.selectedCarObject.priceMax} ₽`;
        break;
      case 'options':
      case 'result':
      case 'info':
        price = '16 000 ₽';
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
  methods: {
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
        this.$router.push({
          name: 'Order',
          params: {
            stepName: 'result',
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
