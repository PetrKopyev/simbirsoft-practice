<template>
  <div class="model__cars">
    <div
      v-for="car in filteredCars"
      :key="car.id"
      class="model__car"
      :class="[{ 'model__car--selected': selectedCar && car.id === selectedCar.id }]"
      @click="selectCar(car)"
    >
      <h2 class="model__name">
        {{ car.name }}
      </h2>
      <span class="model__price">{{ car.priceMin }} - {{ car.priceMax }} ₽</span>
      <picture class="model__img">
        <img
          :src="car.thumbnail.path"
          :alt="car.name"
        >
      </picture>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ModelCars',
  props: {
    selectedCar: {
      type: null,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['filteredCars']),
  },
  created() {
    this.getAllCars();
  },
  methods: {
    ...mapActions(['getAllCars']),
    selectCar(car) {
      this.$emit('select-car', car);
    },
  },
};
</script>

<style lang="scss">
.model {

  &__cars {
    display: flex;
    flex-wrap: wrap;
  }

  &__car {
    width: 369px;
    height: 224px;
    padding: 16px;
    border: 1px solid $light-grey;
    position: relative;
    cursor: pointer;
    @include desktop-min {
      width: 100%;
      height: 290px;
    }
    @include mobile {
      width: 100%;
      height: 200px;
    }

    &:hover {
      border: 1px solid $dark-grey;
    }

    &--selected {
      border: 1px solid $main-green;
    }
  }

  &__name {
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    color: $main-black;
  }

  &__price {
    font-weight: normal;
    font-size: 14px;
    line-height: 16px;
    color: $dark-grey;
  }

  &__img {
    width: 256px;
    height: 116px;
    position: absolute;
    bottom: 16px;
    right: 16px;
    @include desktop-min {
      width: 384px;
      height: 174px;
    }
    @include tablet {
      width: 384px;
      height: 174px;
    }
    @include mobile {
      width: 256px;
      height: 116px;
    }

    img {
      object-fit: contain;
    }
  }
}

</style>
