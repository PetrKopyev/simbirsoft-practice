<template>
  <div class="carousel">
    <div class="carousel__items">
      <carousel-item
        v-for="(item, slideIndex) in carouselData"
        :key="item.id"
        :item-data="item"
        :active="slideIndex === currentSlideIndex"
      />
    </div>
    <div
      class="carousel__prev"
      @click="prevSlide"
    >
      <span class="carousel__prev-arrow" />
    </div>
    <div
      class="carousel__next"
      @click="nextSlide"
    >
      <span class="carousel__next-arrow" />
    </div>
    <div class="carousel__dots">
      <span
        v-for="(dot, dotIndex) in dotsCount"
        :key="dotIndex"
        :class="[
          'carousel__dot',
          {'carousel__dot--active': dotIndex === currentSlideIndex}
        ]"
        @click="goTo(dotIndex)"
      />
    </div>
  </div>
</template>

<script>
import CarouselItem from './Carousel-Item.vue';

export default {
  name: 'Carousel',
  components: {
    CarouselItem,
  },
  props: {
    carouselData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentSlideIndex: 0,
    };
  },
  computed: {
    dotsCount() {
      return this.carouselData.length;
    },
  },
  methods: {
    prevSlide() {
      if (this.currentSlideIndex > 0) {
        this.currentSlideIndex -= 1;
      }
    },
    nextSlide() {
      if (this.currentSlideIndex >= this.carouselData.length - 1) {
        this.currentSlideIndex = 0;
      } else {
        this.currentSlideIndex += 1;
      }
    },
    goTo(index) {
      this.currentSlideIndex = index;
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/_variables.scss";
@import "@/styles/_mixins.scss";
$dot-size: 8px;

  .carousel {
    position: relative;
    height: 100%;
    width: 50%;
    overflow: hidden;
    @include desktop-min {
      width: 43%;
    }
    @include tablet {
      display: none;
    }

    &__items {
      display: flex;
      position: relative;
      height: 100%;
      width: 100%;
    }

    &__prev {
      cursor: pointer;
      position: absolute;
      top: 0;
      left: 0;
      width: 64px;
      height: 100%;
      z-index: 99;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      @include desktop-min {
        width: 32px;
      }

      &:hover {
        background-color: rgba(14, 194, 97, 0.2);
      }

      &-arrow {
        border: solid $light-grey;
        border-width: 0 2px 2px 0;
        padding: 7px;
        transform: rotate(135deg) translateX(-25%);
      }
    }

    &__next {
      cursor: pointer;
      position: absolute;
      top: 0;
      right: 0;
      width: 64px;
      height: 100%;
      z-index: 99;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      @include desktop-min {
        width: 32px;
      }

      &:hover {
        background-color: rgba(14, 194, 97, 0.2);
      }

      &-arrow {
        border: solid $light-grey;
        border-width: 0 2px 2px 0;
        padding: 7px;
        transform: rotate(-45deg) translateX(-25%);
      }
    }

    &__dots {
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__dot {
      display: block;
      width: $dot-size;
      height: $dot-size;
      background: $white;
      border-radius: 50%;
      transition: background 0.3s ease-in-out;
      cursor: pointer;

      &:not(:last-child) {
        margin-right: 20px;
      }

      &:hover,
      &--active {
        background: $main-green;
      }
    }
  }
</style>
