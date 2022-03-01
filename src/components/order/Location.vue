<template>
  <div class="location">
    <div class="search">
      <div class="search__info">
        <span class="search__mb13">Город</span>
        <span>Пункт выдачи</span>
      </div>
      <div class="search__input">
        <input
          v-model="city"
          type="text"
          class="search__mb13"
          placeholder="Начните вводить город"
        >
        <input
          v-model="point"
          type="text"
          placeholder="Начните вводить пункт"
        >
      </div>
    </div>
    <span class="location__descr">Выбрать на карте:</span>
    <div class="location__order">
      <div class="location__map">
        <img
          src="@/assets/image/geo-map.jpg"
          alt="Карта"
          class="location__map-img"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FirstStep',
  computed: {
    city: {
      get() {
        return this.$store.state.order.city;
      },
      set(value) {
        this.$store.dispatch('setOrder', { key: 'city', value });
      },
    },
    point: {
      get() {
        return this.$store.state.order.point;
      },
      set(value) {
        this.$store.dispatch('setOrder', { key: 'point', value });
      },
    },
    isStepFilled() {
      return !!this.city && !!this.point;
    },
  },
  watch: {
    isStepFilled(value) {
      this.$store.dispatch('setStepFilledStatus', { stepName: 'location', value });
    },
  },
};
</script>

<style lang="scss">

  .location {
    display: flex;
    flex-direction: column;
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
    color: $main-black;
    width: 100%;
    @include mobile {
      font-size: 14px;
      line-height: 16px;
    }

    &__descr {
      margin-bottom: 16px;
      @include mobile {
        padding-left: 16px;
      }
    }

    &__map {
      max-width: 736px;
      height: 100%;
      @include tablet {
        max-width: 536px;
        max-height: 352px;
      }
    }
  }

  .search {
    display: flex;
    margin-top: 32px;
    margin-bottom: 45px;
    @include tablet {
      margin-top: 20px;
      margin-bottom: 30px;
    }
    @include mobile {
      width: 100%;
      padding: 0 16px;
    }

    &__info {
      margin-right: 5px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      & span {
        padding: 3px;
        text-align: right;
        @include mobile {
          padding: 3px 0;
        }
      }
    }

    &__input {
      display: flex;
      flex-direction: column;
    }

    &__input input {
      border: 0;
      border-bottom: 1px solid $dark-grey;
      outline: 0;
      width: 224px;
      padding: 3px 8px;
      @include mobile {
        width: 195px;
      }

      &::placeholder {
        color: $dark-grey;
      }
    }

    &__mb13 {
      margin-bottom: 10px;
    }
  }
</style>
