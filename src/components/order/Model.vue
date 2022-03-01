<template>
  <div class="model">
    <div class="model__checkbox">
      <div class="model__radio">
        <input
          id="radio-1"
          type="radio"
          name="radio"
          value="1"
          checked
        >
        <label for="radio-1"><img
          class="model__radio-check"
          src="@/assets/image/radio.png"
          alt="Все модели"
        >Все модели</label>
      </div>

      <div class="model__radio">
        <input
          id="radio-2"
          type="radio"
          name="radio"
          value="2"
        >
        <label for="radio-2"><img
          class="model__radio-check"
          src="@/assets/image/radio.png"
          alt="Эконом"
        >Эконом</label>
      </div>

      <div class="model__radio">
        <input
          id="radio-3"
          type="radio"
          name="radio"
          value="3"
        >
        <label for="radio-3"><img
          class="model__radio-check"
          src="@/assets/image/radio.png"
          alt="Премиум"
        >Премиум</label>
      </div>
    </div>
    <model-cars
      :cars="cars"
      :selected-car="selectedCar"
      @select-car="selectedCar = $event"
    />
  </div>
</template>

<script>
import ModelCars from '@/components/order/ModelCars.vue';
import cars from '@/constants/cars';

export default {
  name: 'Model',
  components: { ModelCars },
  data() {
    return {
      cars,
    };
  },
  computed: {
    selectedCar: {
      get() {
        return this.$store.state.order.car;
      },
      set(value) {
        this.$store.dispatch('setOrder', { key: 'car', value });
      },
    },
    isStepFilled() {
      return !!this.selectedCar;
    },
  },
  watch: {
    isStepFilled(value) {
      this.$store.dispatch('setStepFilledStatus', { stepName: 'model', value });
    },
  },
};
</script>

<style lang="scss">

.model {
  width: 100%;
  height: 670px;
  overflow: auto;

  &__checkbox {
    margin: 38px 0;
    display: flex;
    @include tablet {
      margin: 22px 0;
    }
    @include mobile {
      padding: 0 16px;
      margin: 15px 0;
    }
  }

  &__radio {
    margin-right: 16px;

    &-check {
      display: none;
    }

    & input[type=radio] {
      display: none;
    }

    & label {
      display: inline-block;
      cursor: pointer;
      position: relative;
      padding-left: 18px;
      margin-right: 0;
      font-weight: 300;
      font-size: 14px;
      line-height: 16px;
      color: $dark-grey;
    }

    & label:before {
      content: "";
      display: inline-block;
      width: 12px;
      height: 12px;
      position: absolute;
      left: 0;
      bottom: 1px;
      border: 1px solid $dark-grey;
      border-radius: 100%;

    }

    & input[type=radio]:checked ~ label {
      display: flex;
      align-items: center;
      padding: 0;
    }

    & input[type=radio]:checked ~ label > img {
      display: block;
      width: 12px;
      height: 12px;
      margin-right: 8px;
    }

    & input[type=radio]:checked + label:before {
      display: none;
    }

    & input[type=radio]:checked ~ label {
      color: $main-black;
    }

    & label:hover:before {
      filter: brightness(120%);
    }

  }
}
</style>
