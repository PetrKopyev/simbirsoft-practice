<template>
  <div
    v-if="step"
    class="order"
  >
    <v-header />
    <hr>
    <h1
      v-if="step.code === 'info'"
      class="order__name"
    >
      Заказ номер {{ order.id }}
    </h1>
    <stages
      v-else
      :steps="steps"
      :selected-step="step"
    />
    <hr>
    <div class="order__aflat">
      <component
        :is="step.code"
        v-if="step"
      />
      <hr class="order__aflat-line">
      <side-order-menu
        v-if="step"
        :selected-step="step"
        :steps="steps"
      />
    </div>
  </div>
</template>

<script>
import vHeader from '@/components/vHeader.vue';
import Stages from '@/components/Stages.vue';
import SideOrderMenu from '@/components/SideOrderMenu.vue';
import Model from '@/components/order/Model.vue';
import Options from '@/components/order/Options.vue';
import Result from '@/components/order/Result.vue';
import Info from '@/components/order/Info.vue';
import { mapState } from 'vuex';
import Location from './Location.vue';

export default {
  name: 'Order',
  components: {
    vHeader,
    Stages,
    SideOrderMenu,
    Location,
    Model,
    Options,
    Result,
    Info,
  },
  data() {
    return {
      step: null,
    };
  },
  computed: {
    ...mapState(['order']),
    steps() {
      return this.$store.state.steps;
    },
  },
  watch: {
    $route(route) {
      this.step = Object.values(this.steps).find((item) => item.code === route.params.stepName);
    },
  },
  mounted() {
    this.getDefaultStep();
  },
  methods: {
    getDefaultStep() {
      const step = this.$route.params.stepName !== 'info'
        ? this.steps[0]
        : Object.values(this.steps).find((item) => item.code === 'info');
      this.step = step;

      if (this.$route.params.stepName !== this.step.code) {
        this.$router.push({ name: 'Order', params: { stepName: this.step.code } });
      }
    },
  },
};
</script>

<style lang="scss">

hr {
  border: 1px solid $light-grey;
}

.order {
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-left: 128px;
  padding-right: 64px;
  overflow: hidden;

  &__name {
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
  }

  & .header {
    @include mobile {
      position: fixed;
      background-color: white;
      width: 100%;
      z-index: 1;
    }
  }

  @include tablet {
    padding-right: 43px;
  }
  @include mobile {
    padding: 0;
    overflow-y: scroll;
  }

  &__aflat {
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    @include tablet {
      flex-direction: column;
      align-items: flex-end;
    }

    &-line {
      height: 100%;
      margin: 0 32px;
      @include tablet {
        display: none;
      }
    }
  }
}
</style>
