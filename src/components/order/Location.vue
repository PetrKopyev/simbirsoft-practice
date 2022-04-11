<template>
  <div class="location">
    <div class="search">
      <div class="search__info">
        <span class="search__mb13">Город</span>
        <span>Пункт выдачи</span>
      </div>
      <div class="search__input">
        <el-select
          v-model="city"
          filterable
          class="search__mb13"
          clearable
          placeholder="Начните вводить город"
        >
          <el-option
            v-for="cityItem in cities"
            :key="`city-item-${cityItem.id}`"
            :label="cityItem.name"
            :value="cityItem.name"
          />
        </el-select>

        <el-select
          v-model="point"
          filterable
          clearable
          placeholder="Начните вводить пункт"
          :disabled="!city"
        >
          <el-option
            v-for="pointItem in selectedCityPoints"
            :key="`point-item-${pointItem.id}`"
            :label="pointItem.name"
            :value="pointItem.name"
          />
        </el-select>
      </div>
    </div>
    <span class="location__descr">Выбрать на карте:</span>
    <div class="location__order">
      <div class="location__map">
        <yandex-map
          ymap-class="location__map-box"
          :coords="mapCenterCoords"
          :zoom="mapZoom"
          :controls="controls"
          :scroll-zoom="scrollZoom"
        >
          <ymap-marker
            v-for="pointItem in selectedCityPoints"
            :key="pointItem.id"
            :icon="markerIcon"
            marker-type="placemark"
            :coords="pointItem.coords"
            :marker-id="1"
            :hint-content="pointItem.name"
            :balloon="{
              header: pointItem.name,
              body: pointItem.address,
              footer: pointItem.cityId.name}"
            @click="point = pointItem.name"
          />
        </yandex-map>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import { yandexMap, ymapMarker } from 'vue-yandex-maps';
import api from '@/api';

export default {
  name: 'FirstStep',
  components: {
    yandexMap,
    ymapMarker,
  },
  data() {
    return {
      coords: [],
      controls: ['zoomControl'],
      scrollZoom: false,
      markerIcon: {
        layout: 'default#imageWithContent',
        imageHref: '/placemark.png',
        imageSize: [18, 18],
        imageOffset: [0, 0],
      },

      mapCenterCoords: [54.333505, 48.384294],
    };
  },
  computed: {
    ...mapState(['cities', 'points']),
    ...mapGetters(['selectedCityPoints', 'selectedCityObject', 'selectPoint']),

    address() {
      let address = '';

      if (this.selectedCityObject) {
        address += this.selectedCityObject.name;

        if (this.selectPoint) {
          address += ` ${this.selectPoint.address}`;
        }
      }

      return address;
    },

    city: {
      get() {
        return this.$store.state.order.city;
      },
      set(value) {
        this.setOrder({ key: 'city', value });
      },
    },
    point: {
      get() {
        return this.$store.state.order.point;
      },
      set(value) {
        this.setOrder({ key: 'point', value });
      },
    },
    isStepFilled() {
      return !!this.city && !!this.point;
    },
    mapZoom() {
      let zoom = 16;

      if (this.city) {
        zoom = 12;

        if (this.point) {
          zoom = 16;
        }
      }

      return zoom;
    },
  },

  watch: {
    isStepFilled(value) {
      this.setStepFilledStatus({ stepName: 'location', value });
    },
    city() {
      this.getCoordsFromAddress();
      this.point = null;
    },
    point() {
      this.getCoordsFromAddress();
    },
  },

  created() {
    this.getOrderData();
  },

  methods: {
    ...mapActions(['setOrder', 'setStepFilledStatus', 'getOrderData']),

    async getCoordsFromAddress() {
      this.mapCenterCoords = await api.maps.getCoordsByAddress(this.address);
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

      @include tablet {
        max-width: 536px;
        max-height: 352px;
      }

      &-box {
        width: 100%;
        height: 352px;
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

  .el-select {
    border-bottom: 1px solid $dark-grey;

    input {
      border-bottom: none;
    }

    .el-input__inner {
      height: auto;
      line-height: inherit;
    }
  }

  .el-select-dropdown__item {
    span {
      font-family: inherit;
    }
  }
</style>
