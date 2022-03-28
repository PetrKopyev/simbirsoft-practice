<template>
  <div class="result">
    <div class="result__info">
      <span class="result__car-name">{{ selectedCarObject.name }}</span>
      <span class="result__car-color">Цвет: {{ order.color }}</span>
      <span class="result__car-description">{{ selectedCarObject.description }}</span>
      <div class="result__number">
        <span
          v-if="selectedCarObject.number"
          class="result__number-government"
        >{{ selectedCarObject.number }}</span>
        <span
          v-else
        >Без государственного регистрационного номера</span>
      </div>
      <span
        v-if="order.isFullTank"
        class="result__details"
      >
        <strong>Топливо</strong> 100%
      </span>
      <span
        v-if="order.isNeedChildChair"
        class="result__details"
      >
        <strong>Детское кресло</strong> Да
      </span>
      <span
        v-if="order.isRightWheel"
        class="result__details"
      >
        <strong>Правый руль</strong> Да
      </span>

      <span class="result__details">
        <strong>Доступна</strong>
      </span>
      <span class="result__details">
        <strong>с</strong> {{ viewData.dataStart }}
      </span>
      <span class="result__details">
        <strong>по</strong> {{ viewData.dataEnd }}
      </span>
    </div>
    <div class="result__img">
      <img
        :src="selectedCarObject.thumbnail.path"
        :alt="selectedCarObject.name"
      >
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import dayjs from 'dayjs';

export default {
  name: 'Result',
  computed: {
    ...mapState(['order']),
    ...mapGetters(['selectedCarObject']),
    viewData() {
      let dataStart = '';
      let dataEnd = '';
      if (this.order.rentDataStart && this.order.rentDataEnd) {
        dataStart = dayjs(this.order.rentDataStart).format('DD.MM.YYYY HH:mm');
        dataEnd = dayjs(this.order.rentDataEnd).format('DD.MM.YYYY HH:mm');
      }
      return {
        dataStart,
        dataEnd,
      };
    },

  },
  created() {
    this.getOrderStatus();
  },
  methods: {
    ...mapActions(['getOrderStatus']),
  },
};
</script>

<style lang="scss">

.result {
  width: 100%;
  margin-top: 35px;
  display: flex;
  justify-content: space-between;
  @include tablet {
    flex-direction: column;
  }
  @include mobile {
    padding: 16px;
  }

  &__info {
    display: flex;
    flex-direction: column;
  }

  &__car-name {
    font-size: 18px;
    line-height: 21px;
  }

  &__car-color {
    font-size: 14px;
  }

  &__car-description {
    font-size: 12px;
    line-height: 21px;
    max-width: 300px;
  }

  &__number {
    margin: 8px 0;
    width: fit-content;

    &-government {
      font-size: 14px;
      line-height: 16px;
      padding: 4px 8px;
      border: 1px solid $main-black;
      border-radius: 4px;
    }
  }

  &__details {
    font-weight: 300;
    font-size: 14px;
    line-height: 16px;
    margin-bottom: 8px;

    & strong {
      font-weight: 700;
    }
  }
  &__img {
    width: 256px;
    height: 116px;
    margin-right: 160px;
    @include desktop-min {
      margin-right: 0;
    }
    @include tablet {
      margin-top: 10px;
    }

    img {
      object-fit: contain;
    }
  }
}

</style>
