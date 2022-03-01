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
          <span>Ульяновск, Нариманова 42</span>
        </div>
      </li>
      <li
        v-if="isShowCarBlock"
        class="side-order-menu__item"
      >
        <span class="side-order-menu__item-left">Модель</span>
        <div class="side-order-menu__item-dots" />
        <div class="side-order-menu__item-right">
          <span>Hyundai, i30 N</span>
        </div>
      </li>
    </ul>

    <div class="side-order-menu__cost">
      <span>Цена: {{ priceLabel }}</span>
    </div>

    <div
      class="side-order-menu__button"
      :class="[{'side-order-menu__button--active': selectedStep.filled}]"
      @click="onConfirm"
    >
      {{ orderButton }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideOrderMenu',
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
  computed: {
    isShowCarBlock() {
      return this.selectedStep.code !== 'location';
    },
    priceLabel() {
      let price = 'Нет цены';

      switch (this.selectedStep.code) {
      case 'location':
        price = 'от 8 000 до 12 000 ₽';
        break;
      case 'model':
        price = 'от 10 000 до 32 000 ₽';
        break;
      case 'options':
      case 'result':
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
      }

      return buttonName;
    },
  },
  methods: {
    onConfirm() {
      let nextStepIndex;
      let currentStepIndex;

      if (this.selectedStep.code === 'location' || this.selectedStep.code === 'model') {
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
        } else {
          console.error(`Шаг ${this.selectedStep.code} не существует`);
        }
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
      max-width: 100px;
      text-align: right;
      min-width: 57px;
    }

    &-dots {
      flex: 1 0;
      border-bottom: 1px dotted $main-black;
      height: 1em;
      margin: 0 0.4em 2px 0.4em;
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
