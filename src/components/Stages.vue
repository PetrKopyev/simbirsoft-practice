<template>
  <div class="stages">
    <div
      v-for="(step, stepIndex) in filteredSteps"
      :key="stepIndex"
      class="stage"
      :class="[
        {
          'stage--active': selectedStep && step.code === selectedStep.code,
          'stage--filled': step.filled
        },
      ]"
      @click="goToStep(step)"
    >
      {{ step.translate }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Stages',
  props: {
    steps: {
      type: Object,
      default: () => {},
    },
    selectedStep: {
      type: Object,
      required: true,
    },
  },
  computed: {
    filteredSteps() {
      return Object.values(this.steps).filter((step) => step.translate);
    },
  },
  methods: {
    goToStep(step) {
      if (step.code !== this.selectedStep.code) {
        const pickedStepIndex = Object
          .values(this.steps)
          .findIndex((item) => item.code === step.code);

        if (pickedStepIndex !== 0) {
          const prevStep = this.steps[pickedStepIndex - 1];

          if (prevStep.filled) {
            this.$router.push({ name: 'Order', params: { stepName: step.code } });
          }
        } else {
          this.$router.push({ name: 'Order', params: { stepName: step.code } });
        }
      }
    },
  },
};
</script>

<style lang="scss">

.stages {
  display: flex;
  width: 100%;
  margin: 8px 0;
  align-items: center;
  @include mobile {
    padding: 10px 16px 0 16px;
    margin-top: 95px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-top: 2px solid $light-grey;
  }
}

.stage {
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  text-decoration: none;
  position: relative;
  cursor: pointer;
  color: $dark-grey;
  user-select: none;

  @include mobile {
    width: 100%;
    text-align: center;
  }

  &:not(:last-child) {
    padding-right: 40px;
    @include mobile {
      padding: 0;
    }

    &:after {
      content: "";
      display: block;
      border-top: 6px solid transparent;
      border-left: 8px solid $dark-grey;
      border-bottom: 6px solid transparent;
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
      @include mobile {
        display: none;
      }
    }
  }

  &--filled {
    color: $main-black;
  }

  &--active {
    color: $main-green;
  }

  &__done {
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
  }
}
</style>
