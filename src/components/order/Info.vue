<template>
  <div class="result">
    <div class="result__info">
      <h3 class="info__done">
        Ваш заказ подтверждён
      </h3>
      <span class="result__car-name">Hyndai, i30 N</span>
      <div class="result__number">
        <span class="result__number-government">K 761 HA 73</span>
      </div>
      <span class="result__details"><strong>Топливо</strong> 100%</span>
      <span class="result__details"><strong>Доступна с</strong> 12.06.2019 12:00</span>
    </div>
    <div class="result__img">
      <img
        src="@/assets/image/cars/i30.jpg"
        alt=""
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'Info',
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
