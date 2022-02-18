<template>
  <footer class="footer">
    <div class="footer__license">
      <span>© 2016-2019 «Need for drive»</span>
    </div>
    <div class="footer__phone">
      <a href="tel:8 (495) 234-22-44">8 (495) 234-22-44</a>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'VFooter',
};
</script>

<style lang="scss">

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 0;
  @include mobile {
    background-color: $very-dark;
    flex-direction: column;
    padding: 16px;
    width: 100%;
    z-index: 2;
  }

  &__license {
    font-weight: normal;
    font-size: 13px;
    line-height: 15px;
    color: $dark-grey;
    @include mobile {
      margin-left: auto;
      order: 2;
      }
    }

  &__phone {
    @include mobile {
      margin-left: auto;
      order: 1;
      margin-bottom: 8px;
    }

    & a {
      font-weight: normal;
      font-size: 13px;
      line-height: 15px;
      color: $main-black;
      text-decoration: none;
      @include mobile {
        color: $main-green;

        &:hover, &:active {
          color: $white;
          }
        }
      &:hover,:active {
        color: $main-green;
        cursor: pointer;
        }
      }
    }
}
</style>
