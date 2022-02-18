<template>
  <header class="header">
    <span class="header__logo">
      Need for drive
    </span>
    <div class="header__map">
      <img
        src="../assets/image/icons/map.svg"
        alt="Map"
        class="header__image"
      >
      <span class="header__city">Ульяновск</span>
    </div>
  </header>
</template>

<script>
export default {
  name: 'VHeader',
};
</script>

<style lang="scss">

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 0;
  @include mobile {
    flex-direction: column;
    padding: 16px;
  }

  &__logo {
    font-weight: bold;
    font-size: 30px;
    line-height: 35px;
    color: $main-green;
    @include mobile {
      margin-left: auto;
      margin-bottom: 8px;
    }
  }

  &__map {
    display: flex;
    align-items: center;
    @include mobile {
      margin-left: auto;
    }
  }

  &__city {
    margin-left: 8px;
    font-size: 14px;
    line-height: 16px;
    color: $dark-grey;
    @include mobile {
      margin-left: auto;
      padding-left: 7px;
    }
  }
}
</style>
