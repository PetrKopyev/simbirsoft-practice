<template>
  <div class="start-page">
    <div class="start-page__side wrapper">
      <v-header />
      <div class="start-page__info">
        <h2 class="start-page__info-carshering">
          Каршеринг
        </h2>
        <h2 class="start-page__info-nfd">
          Need for drive
        </h2>
        <span class="start-page__info-descr">Поминутная аренда авто твоего города</span>
        <router-link
          class="start-page__reservation"
          to="/"
        >
          Забронировать
        </router-link>
      </div>
      <v-footer />
    </div>
    <carousel :carousel-data="sliderItems" />
  </div>
</template>

<script>
import Carousel from '@/components/Carousel.vue';
import vFooter from './v-footer.vue';
import vHeader from './v-header.vue';

const sliderItems = [
  {
    id: 1,
    img: 'slider1.jpg',
    caption: 'Бесплатная парковка',
    description: 'Оставляйте машину на платных городских парковках и разрешенных местах, не нарушая ПДД, а также в аэропортах.',
    button: {
      startColor: '#13493F',
      stopColor: '#0C7B1B',
    },
  },
  {
    id: 2,
    img: 'slider2.jpg',
    caption: 'Страховка',
    description: 'Полная страховка страховка автомобиля',
    button: {
      startColor: '#132949',
      stopColor: '#0C7B67',
    },
  },
  {
    id: 3,
    img: 'slider3.jpg',
    caption: 'Бензин',
    description: 'Полный бак на любой заправке города за наш счёт',
    button: {
      startColor: '#493013',
      stopColor: '#7B0C3B',
    },
  },
  {
    id: 4,
    img: 'slider4.jpg',
    caption: 'Обслуживание',
    description: 'Автомобиль проходит еженедельное ТО',
    button: {
      startColor: '#281349',
      stopColor: '#720C7B',
    },
  },
];

export default {
  name: 'StartPage',
  components: {
    Carousel,
    vFooter,
    vHeader,
  },
  created() {
    this.sliderItems = sliderItems;
  },
};
</script>

<style lang="scss">
@import "@/styles/_variables.scss";
@import "@/styles/_mixins.scss";

.start-page {
  display: flex;
  width: 100%;
  height: 100%;
  padding-left: 64px;
  position: relative;
  z-index: 1;
  @include tablet {
    padding-left: 85px;
    display: block;
  }
  @include mobile {
    padding-left: 0;
  }

  &__side {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 50%;
    height: 100%;
    @include desktop-min {
      width: 57%;
    }
    @include tablet {
      width: 100%;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    margin-top: 227px;
    @include mobile {
      margin-top: 112px;
      width: 100%;
    }

    &-carshering {
      font-weight: bold;
      font-size: 70px;
      line-height: 66px;
      color: $main-black;
      margin-bottom: 4px;
      @include tablet {
        font-size: 70px;
        line-height: 100%;
        margin-bottom: 0;
      }
      @include mobile {
        font-size: 32px;
        line-height: 100%;
        margin-bottom: 6px;
        padding-left: 16px;
      }
    }

    &-nfd {
      font-weight: bold;
      font-size: 70px;
      line-height: 66px;
      color: $main-green;
      margin-bottom: 34px;
      @include mobile {
        font-size: 32px;
        line-height: 100%;
        margin-bottom: 34px;
        padding-left: 16px;
      }
    }

    &-descr {
      font-weight: 300;
      font-size: 26px;
      line-height: 30px;
      color: $dark-grey;
      margin-bottom: 60px;
      @include mobile {
        font-size: 18px;
        line-height: 21px;
        padding-left: 16px;
      }
    }
  }

  &__reservation {
    width: 250px;
    padding-top: 15px;
    padding-bottom: 11px;
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    text-align: center;
    color: $white;
    text-decoration: none;
    background: $btn-bg-dflt;
    background-blend-mode: darken;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    @include mobile {
      width: 100%;
      padding-left: 0;
      border-radius: 0;
    }
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
}

.start-page .wrapper {
  margin-left: 0;
}
</style>
