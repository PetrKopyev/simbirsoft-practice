<template>
  <div class="confirm-result">
    <div class="confirm-result__content">
      <div class="confirm-result__title">
        <h2>Подтвердить заказ</h2>
      </div>
      <div class="confirm-result__buttons">
        <button
          class="confirm-result__confirm"
          @click="onConfirm"
        >
          Подтвердить
        </button>
        <button
          class="confirm-result__return"
          @click="hidePopUp"
        >
          Вернуться
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ConfirmResult',

  methods: {
    ...mapActions(['createOrder']),

    async onConfirm() {
      this.hidePopUp();

      try {
        const orderId = await this.createOrder();
        console.log(orderId);

        await this.$router.push({
          name: 'Order',
          params: {
            stepName: 'info',
          },
          query: {
            orderId,
          },
        });
      } catch (e) {
        console.error(e);
      }
    },
    hidePopUp() {
      this.$emit('show', false);
    },
  },
};
</script>

<style lang="scss">

.confirm-result {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba($white, 0.9);
  position: fixed;
  display: flex;
  z-index: 2;

  &__content {
    margin: auto;
  }

  &__title {
    margin-bottom: 32px;
    text-align: center;

    & h2 {
      font-weight: normal;
      font-size: 24px;
      line-height: 28px;
    }
  }

  &__confirm {
    background: linear-gradient(90deg, $main-green 2.61%, #039F67 112.6%);
    border-radius: 8px;
    color: $white;
    width: 177px;
    height: 48px;
    border: none;
    margin-right: 16px;
    cursor: pointer;
    @include mobile {
      width: 127px;
    }
  }

  &__return {
    background: linear-gradient(90deg, #493013 0%, #7B0C3B 100%);
    border-radius: 8px;
    color: $white;
    width: 177px;
    height: 48px;
    border: none;
    cursor: pointer;
    @include mobile {
      width: 127px;
    }
  }
}

</style>
