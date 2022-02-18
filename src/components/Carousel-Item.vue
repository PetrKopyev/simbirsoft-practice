<template>
  <div
    class="carousel-item"
    :class="[
      {'carousel-item--active': active}
    ]"
    :style="{ backgroundImage: `url(${require('@/assets/image/slider/' + itemData.img)})` }"
  >
    <div class="carousel-item__info">
      <h2 class="carousel-item__caption">
        {{ itemData.caption }}
      </h2>
      <p class="carousel-item__description">
        {{ itemData.description }}
      </p>
      <button
        class="carousel-item__btn"
        :style="buttonStyle"
      >
        Подробнее
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CarouselItem',
  props: {
    itemData: {
      type: Object,
      default: () => {},
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    buttonStyle() {
      return `background: linear-gradient(90deg, ${this.itemData.button.startColor} 0%, ${this.itemData.button.stopColor} 100%)`;
    },
  },
};

</script>

<style lang="scss">

.carousel-item {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  flex-shrink: 0;
  position: absolute;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  pointer-events: none;

  &__info {
    padding: 32px 96px;
    margin-top: 205px;

    @include desktop-min {
      padding: 0 64px;
      margin-top: 277px;
    }
  }
  &__caption {
    font-weight: 500;
    font-size: 40px;
    line-height: 47px;
    color: $white;
    margin-bottom: 8px;
    height: auto ;

    @include desktop-min {
      font-size: 32px;
      line-height: 37px;
    }
  }
  &__description {
    font-weight: 300;
    font-size: 24px;
    line-height: 90%;
    color: $white;
    margin-bottom: 32px;

    @include desktop-min {
      font-size: 22px;
      line-height: 100%;
    }
  }

  &__btn {
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    display: flex;
    align-items: center;
    text-align: center;
    color: $white;
    border-radius: 4px;
    border: 0;
    padding: 15px 40px;
    &:hover {
      background: $btn-bg-hover;
    }
    &:active {
      background: $btn-bg-active;
    }
    &:visited {
      background: $btn-bg-visit;
    }
  }

  &--active {
    opacity: 1;

    button {
      pointer-events: auto;
      cursor: pointer;
    }
  }
}
</style>
