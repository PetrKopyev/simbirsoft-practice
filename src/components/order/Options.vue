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
            value="Любой"
          >
          <label for="radio-1">
            <img
              class="model__radio-check"
              src="@/assets/image/radio.png"
            >
            Любой
          </label>
        </div>

        <template v-if="selectedCarObject">
          <div
            v-for="(color, index) in selectedCarObject.colors"
            :key="index"
            class="model__radio"
          >
            <input
              :id="index"
              v-model="selectedColor"
              type="radio"
              name="radio"
              :value="color"
            >
            <label :for="index">

              <img
                class="model__radio-check"
                src="@/assets/image/radio.png"
              >
              {{ color }}
            </label>
          </div>
        </template>
      </div>
    </div>
    <div class="options__rent">
      <span class="options-item">Дата аренды</span>
      <div class="options__search">
        <div class="options__search-info">
          <span class="search__mb13">С</span>
          <span>По</span>
        </div>

        <div class="options__rent-input options__datepicker">
          <input
            v-model="rentDataStart"
            type="text"
            class="search__mb13"
            placeholder="Введите дату и время"
            @focus="focusDatepicker"
          >

          <input
            v-model="rentDataEnd"
            type="text"
            placeholder="Введите дату и время"
            @focus="focusDatepicker"
          >

          <el-date-picker
            ref="datepicker"
            v-model="selectedRange"
            type="datetimerange"
            class="search__mb13"
            value-format="timestamp"
            :picker-options="pickerOptions"
          />
        </div>
      </div>
    </div>
    <div class="options__rate">
      <span class="options-item">Тариф</span>
      <div class="options__rate-checkbox">
        <div
          v-for="rate in rates"
          :key="rate.id"
          class="model__radio  mb-8"
        >
          <input
            :id="rate.id"
            v-model="selectedRate"
            type="radio"
            name="rate"
            :value="rate"
          >
          <label :for="rate.id">
            <img
              class="model__radio-check"
              src="@/assets/image/radio.png"
            >
            {{ rate.rateTypeId.name }}, {{ rate.price }}₽/{{ rate.rateTypeId.unit }}
          </label>
        </div>
      </div>
    </div>
    <div class="options__services">
      <span class="options-item">Доп услуги</span>
      <div class="options__services-items">
        <div
          class="options__services-item"
        >
          <input
            id="c1"
            v-model="selectedFullTank"
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
            v-model="selectedNeedChildChair"
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
            v-model="selectedRightWheel"
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
import { mapActions, mapGetters, mapState } from 'vuex';
import dayjs from 'dayjs';

export default {
  name: 'Options',

  data() {
    return {
      selectedRange: [],
      pickerOptions: {
        firstDayOfWeek: 1,
      },
    };
  },

  computed: {
    ...mapState(['rates']),
    ...mapGetters(['selectedCarObject']),
    selectedColor: {
      get() {
        return this.$store.state.order.color;
      },
      set(value) {
        this.$store.dispatch('setOrder', { key: 'color', value });
      },
    },
    rentDataStart: {
      get() {
        return this.$store.state.order.rentDataStart
          ? dayjs(this.$store.state.order.rentDataStart).format('DD.MM.YYYY HH:mm')
          : '';
      },
      set(value) {
        this.$store.dispatch('setOrder', { key: 'rentDataStart', value });
      },
    },
    rentDataEnd: {
      get() {
        return this.$store.state.order.rentDataEnd
          ? dayjs(this.$store.state.order.rentDataEnd).format('DD.MM.YYYY HH:mm')
          : '';
      },
      set(value) {
        this.$store.dispatch('setOrder', { key: 'rentDataEnd', value });
      },
    },
    selectedRate: {
      get() {
        return this.$store.state.order.rate;
      },
      set(value) {
        this.$store.dispatch('setOrder', { key: 'rate', value });
      },
    },
    selectedFullTank: {
      get() {
        return this.$store.state.order.isFullTank;
      },
      set(value) {
        this.$store.dispatch('setOrder', { key: 'isFullTank', value });
      },
    },
    selectedNeedChildChair: {
      get() {
        return this.$store.state.order.isNeedChildChair;
      },
      set(value) {
        this.$store.dispatch('setOrder', { key: 'isNeedChildChair', value });
      },
    },
    selectedRightWheel: {
      get() {
        return this.$store.state.order.isRightWheel;
      },
      set(value) {
        this.$store.dispatch('setOrder', { key: 'isRightWheel', value });
      },
    },
    isStepFilled() {
      return !!this.selectedColor && !!this.$store.state.order.rate;
    },
  },
  watch: {
    isStepFilled(value) {
      this.$store.dispatch('setStepFilledStatus', { stepName: 'options', value });
    },

    selectedRange(value) {
      const [startDate, endDate] = value;

      this.rentDataStart = startDate;
      this.rentDataEnd = endDate;
    },
  },
  created() {
    this.getAllCars();
    this.getRate();
  },
  methods: {
    ...mapActions(['getAllCars', 'getRate']),

    focusDatepicker() {
      setTimeout(() => {
        this.$refs.datepicker.focus();
      }, 100);
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

  &__datepicker {
    .el-date-editor {
      height: 0;
      overflow: hidden;
      padding: 0;
      margin: 0;
      border: none;
    }
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

.el-input--prefix .el-input__inner {
  height: auto;
  line-height: inherit;
  padding-left: 0;
}

.el-input--suffix .el-input__inner {
  //border: 0;
  border-radius: 0;
  background-color: rgba(0,0,0,0);
  outline: 0;
  width: 224px;
  padding: 3px 8px;
}

.mb-8 {
  margin-bottom: 8px;
}
</style>
