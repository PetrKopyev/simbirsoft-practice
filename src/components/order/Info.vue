<template>
  <div class="result-wrapper">
    <div
      class="result"
    >
      <div class="result__info">
        <h3 class="info__done">
          Ваш заказ подтверждён
        </h3>
        <span class="result__car-name">
          {{ order.car.name }}
        </span>
        <div class="result__number">
          <span
            v-if="order.car.number"
            class="result__number-government"
          >
            {{ order.car.number }}
          </span>
          <span v-else>Без государственного регистрационного номера</span>
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
          :src="order.car.thumbnail.path"
          :alt="order.car.name"
        >
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api';
import { mapActions, mapState } from 'vuex';
import dayjs from 'dayjs';

export default {
  name: 'Info',

  computed: {
    ...mapState(['order']),
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
    const { orderId } = this.$route.query;
    this.getOrderData();
    if (orderId) {
      this.getOrderDataFromApi(orderId);
    } else {
      this.$router.push({
        name: 'Order',
        params: {
          stepName: 'result',
        },
      });
    }
  },

  methods: {
    ...mapActions(['setOrderFromApi', 'getOrderData']),
    async getOrderDataFromApi(orderId) {
      try {
        const { data } = await api.order.getOrder(orderId);
        this.setOrderFromApi(data.data);
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

<style lang="scss">

.info {
  &__done {
    font-weight: normal;
    font-size: 24px;
    line-height: 28px;
    margin-bottom: 16px;
  }
}
</style>
