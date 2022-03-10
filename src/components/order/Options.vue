<template>
  <div class="options">
    <div class="options__colors">
      <span class="options-item">Цвет</span>
      <div class="options__colors-checkbox">
        <div class="model__radio">
          <input
            id="radio-1"
            v-model="selectedColor"
            type="radio"
            name="radio"
            value="1"
          >
          <label for="radio-1">
            <img
              class="model__radio-check"
              src="@/assets/image/radio.png"
            >
            Любой
          </label>
        </div>

        <div class="model__radio">
          <input
            id="radio-2"
            v-model="selectedColor"
            type="radio"
            name="radio"
            value="2"
          >
          <label for="radio-2">
            <img
              class="model__radio-check"
              src="@/assets/image/radio.png"
            >
            Красный
          </label>
        </div>

        <div class="model__radio">
          <input
            id="radio-3"
            v-model="selectedColor"
            type="radio"
            name="radio"
            value="3"
          >
          <label for="radio-3">
            <img
              class="model__radio-check"
              src="@/assets/image/radio.png"
            >
            Голубой
          </label>
        </div>
      </div>
    </div>
    <div class="options__rent">
      <span class="options-item">Дата аренды</span>
      <div class="options__search">
        <div class="options__search-info">
          <span class="search__mb13">С</span>
          <span>По</span>
        </div>
        <div class="options__rent-input">
          <input
            v-model="selectedRentDataStart"
            type="text"
            class="search__mb13"
            placeholder="Введите дату и время"
          >
          <input
            v-model="selectedRentDataEnd"
            type="text"
            placeholder="Введите дату и время"
          >
        </div>
      </div>
    </div>
    <div class="options__rate">
      <span class="options-item">Тариф</span>
      <div class="options__rate-checkbox">
        <div class="model__radio  mb-8">
          <input
            id="rate-radio-1"
            v-model="selectedTariff"
            type="radio"
            name="rate"
            value="1"
          >
          <label for="rate-radio-1">
            <img
              class="model__radio-check"
              src="@/assets/image/radio.png"
            >
            Поминутно, 7₽/мин
          </label>
        </div>

        <div class="model__radio">
          <input
            id="rate-radio-2"
            v-model="selectedTariff"
            type="radio"
            name="rate"
            value="2"
          >
          <label for="rate-radio-2">
            <img
              class="model__radio-check"
              src="@/assets/image/radio.png"
            >
            На сутки, 1999 ₽/сутки
          </label>
        </div>
      </div>
    </div>
    <div class="options__services">
      <span class="options-item">Доп услуги</span>
      <div class="options__services-items">
        <div class="options__services-item">
          <input
            id="c1"
            v-model="selectedAdditionalServices"
            type="checkbox"
            value="fullTank"
            name="cc"
          >
          <label for="c1">
            <img
              class="options__services-item__checkbox"
              src="@/assets/image/checkbox.png"
            >
            <span />
            Полный бак, 500р
          </label>
        </div>
        <div class="options__services-item">
          <input
            id="c2"
            v-model="selectedAdditionalServices"
            type="checkbox"
            value="child"
            name="cc"
          >
          <label for="c2">
            <img
              class="options__services-item__checkbox"
              src="@/assets/image/checkbox.png"
            >
            <span />
            Детское кресло, 200р
          </label>
        </div>
        <div class="options__services-item">
          <input
            id="c3"
            v-model="selectedAdditionalServices"
            type="checkbox"
            value="right"
            name="cc"
          >
          <label for="c3">
            <img
              class="options__services-item__checkbox"
              src="@/assets/image/checkbox.png"
            >
            <span />
            Правый руль, 1600р
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Options',
  computed: {
    selectedColor: {
      get() {
        return this.$store.state.order.color;
      },
      set(value) {
        this.$store.dispatch('setOrder', { key: 'color', value });
      },
    },
    selectedTariff: {
      get() {
        return this.$store.state.order.tariff;
      },
      set(value) {
        this.$store.dispatch('setOrder', { key: 'tariff', value });
      },
    },
    selectedAdditionalServices: {
      get() {
        return this.$store.state.order.additionalServices;
      },
      set(value) {
        this.$store.dispatch('setOrder', { key: 'additionalServices', value });
      },
    },
    selectedRentDataStart: {
      get() {
        return this.$store.state.order.rentDataStart;
      },
      set(value) {
        this.$store.dispatch('setOrder', { key: 'rentDataStart', value });
      },
    },
    selectedRentDataEnd: {
      get() {
        return this.$store.state.order.rentDataEnd;
      },
      set(value) {
        this.$store.dispatch('setOrder', { key: 'rentDataEnd', value });
      },
    },
    isStepFilled() {
      return !!this.selectedColor && !!this.selectedTariff
        && !!this.selectedRentDataStart && !!this.selectedRentDataEnd;
    },
  },
  watch: {
    isStepFilled(value) {
      this.$store.dispatch('setStepFilledStatus', { stepName: 'options', value });
    },
  },
};
</script>

<style lang="scss">

.options {
  width: 100%;
  display: flex;
  flex-direction: column;
  @include tablet{
    padding-top: 20px;
    flex-wrap: wrap;
    flex-direction: row;
  }
  @include mobile {
    flex-direction: column;
    padding: 16px;
  }

  &-item {
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
    color: $main-black;
    margin-bottom: 15px;
  }

  &__colors {
    margin: 32px 0;
    display: flex;
    flex-direction: column;
    @include tablet {
      margin: 0;
      width: 50%;
    }
    @include mobile {
      width: 100%;
      align-items: center;
    }

    &-checkbox {
      display: flex;
    }
  }

  &__search {
    display: flex;
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
    color: $main-black;

    &-info {
      margin-right: 5px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      & span {
        padding: 3px;
      }
    }
  }

  &__rent {
    display: flex;
    flex-direction: column;
    margin-bottom: 32px;
    @include tablet {
      width: 50%;
    }
    @include mobile {
      width: 100%;
      margin-top: 25px;
      align-items: center;
    }

    &-input {
      display: flex;
      flex-direction: column;
    }

    &-input input {
      border: 0;
      border-bottom: 1px solid $main-black;
      background-color: rgba(0,0,0,0);
      outline: 0;
      width: 224px;
      padding: 3px 8px;

      &::placeholder {
        color: $dark-grey;
      }
    }
  }

  &__rate {
    display: flex;
    flex-direction: column;
    margin-bottom: 32px;
    @include tablet {
      width: 50%;
    }
    @include mobile {
      width: 100%;
      align-items: center;

    }

    &-checkbox {
      display: flex;
      flex-direction: column;
    }
  }

  &__services {
    display: flex;
    flex-direction: column;
    @include tablet {
      width: 50%;
    }
    @include mobile {
      width: 100%;
      align-items: center;

    }

    &-items {
      display: flex;
      flex-direction: column;
    }

    &-item {
      display: flex;
      font-weight: 300;
      font-size: 14px;
      line-height: 16px;
      color: $dark-grey;
      align-items: center;
      margin-bottom: 8px;

      &__checkbox {
        display: none;
      }

      & input[type=checkbox]:checked ~ label > img {
        display: block;
        width: 13px;
        height: 10px;
        margin-right: 8px;
        position: absolute;
        margin-top: 3px;
        margin-left: 2px;
      }

      & input[type="checkbox"] {
        display:none;
      }

      & input[type="checkbox"]:checked ~ label {
        color: $main-black;
        position: relative;
      }

      & input[type="checkbox"] + label span {
        display:inline-block;
        margin:-1px 4px 0 0;
        width: 12px;
        height: 12px;
        border: 1px solid $dark-grey;
        cursor:pointer;
        vertical-align:middle;
      }

      & input[type="checkbox"]:checked + label span {
        border: 1px solid $main-green;
      }
    }
  }
}

.mb-8 {
  margin-bottom: 8px;
}
</style>
