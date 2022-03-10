<template>
  <div class="result">
    <div class="result__info">
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
  name: 'Result',
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

  &__number {
    margin: 8px 0;
    border: 1px solid $main-black;
    border-radius: 4px;
    width: fit-content;

    &-government {
      font-size: 14px;
      line-height: 16px;
      padding: 4px 8px;
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
  }
}

</style>
