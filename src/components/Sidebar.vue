<template>
  <div class="sidebar">
    <div class="burger__menu">
      <input
        id="menu__toggle"
        type="checkbox"
      >
      <label
        class="menu__btn"
        for="menu__toggle"
      >
        <span />
      </label>
      <div class="menu__block">
        <ul class="menu__box">
          <li
            v-for="item in menuItems"
            :key="item.id"
          >
            <a
              class="menu__item"
              href="#"
            >{{ item.name }}</a>
          </li>
          <div class="menu__links">
            <a
              href="#"
              class="menu__links-icon"
            >
              <app-svg icon-name="write">
                <icon-telegram />
              </app-svg>
            </a>
            <a
              href="#"
              class="menu__links-icon"
            >
              <app-svg icon-name="write">
                <icon-facebook />
              </app-svg>
            </a>
            <a
              href="#"
              class="menu__links-icon"
            >
              <app-svg icon-name="write">
                <icon-instagram />
              </app-svg>
            </a>
          </div>
        </ul>
        <div class="menu__right" />
      </div>
      <div class="sidebar__language">
        <a
          class="sidebar__language-link"
          href="#"
        >Eng</a>
      </div>
    </div>
  </div>
</template>

<script>
import AppSvg from '@/components/AppSvg.vue';
import IconTelegram from '@/components/icons/IconTelegram.vue';
import IconFacebook from '@/components/icons/IconFacebook.vue';
import IconInstagram from '@/components/icons/IconInstagram.vue';

const menuItems = [
  {
    id: 1,
    name: 'парковка',
  },
  {
    id: 2,
    name: 'страховка',
  },
  {
    id: 3,
    name: 'бензин',
  },
  {
    id: 4,
    name: 'обслуживание',
  },
];
export default {
  name: 'Sidebar',
  components: {
    IconInstagram,
    IconFacebook,
    IconTelegram,
    AppSvg,
  },
  data() {
    return {
      menuItems,
    };
  },
};
</script>

<style lang="scss">

.sidebar {
  position: fixed;
  background-color: $very-dark;
  width: 64px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 32px 0;
  z-index: 2;
  @include tablet {
    width: 85px;
  }
  @include mobile {
    background: none;
    width: 0;
  }

  &__language {
    bottom: 32px;
    left: 20px;
    position: absolute;

    &:hover {
      left: 7px;
    }

    @include mobile {
      display: none;
      bottom: 28px;
      left: 28px;
    }

    &-link {
      color: $main-green;
      text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
      text-decoration: none;
      font-size: 13px;
      line-height: 15px;

      &:hover {
        color: $light-grey;
        border: 1px $light-grey solid;
        border-radius: 50%;
        padding: 16px 12px;
      }
      &:active {
        color: $main-green;
      }
    }
  }
}

.burger__menu {
  width: 0;
  height: 0;
}

/* Burger Start*/
#menu__toggle {
  opacity: 0;
}
.menu__btn {
  display: flex;
  align-items: center;
  position: fixed;
  top: 32px;
  left: 15px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  z-index: 1;

  @include tablet {
    left: 25px;
  }

  @include mobile {;
    width: 19px;
    top: 16px;
    left: 20px;
  }
}
.menu__btn > span,
.menu__btn > span::before,
.menu__btn > span::after {
  display: block;
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: $white;
  @include mobile {;
    background-color: $main-black;
    height: 3px;
  }
}
.menu__btn > span::before {
  content: '';
  top: -8px;
}
.menu__btn > span::after {
  content: '';
  top: 8px;
}
.menu__box {
  padding: 305px 0 0 128px;
  width: calc(50% + 64px);
  list-style: none;
  background: $main-black;
  @include desktop-min {
    width: calc(57% + 64px);
    padding-left: 97px;
  }
  @include tablet {
    width: 100%;
  }
  @include mobile {
    padding: 80px 0 0 28px;
  }
}
.menu__right {
  width: 50%;
  background-color: $very-dark;
  opacity: 0.81;
  @include desktop-min {
    width: 43%;
  }
  @include tablet {
    display: none;
  }
}
.menu__block {
  display: flex;
  position: fixed;
  visibility: hidden;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

}
.menu__item {
  display: block;
  padding-bottom: 12px;
  color: $white;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 32px;
  line-height: 37px;
  text-decoration: none;
  text-transform: uppercase;
  @include mobile {
    font-size: 22px;
    line-height: 26px;
  }

}
.menu__item:hover{
  color: $main-green;
}

.menu__links {
  width: 144px;
  margin-top: 26px;
  display: flex;
  justify-content: space-between;

  svg {
    color: $white;
  }

  &-icon:hover {
    svg {
      color: $main-green;
    }
  }
}

#menu__toggle {
  width: 0;
  height: 0;
}

#menu__toggle:checked ~ .menu__btn > span {
  transform: rotate(45deg);

}
#menu__toggle:checked ~ .menu__btn > span::before {
  top: 0;
  transform: rotate(0);
  @include mobile {
    background-color: $white;
  }
}
#menu__toggle:checked ~ .menu__btn > span::after {
  top: 0;
  transform: rotate(90deg);
  @include mobile {
    background-color: $white;
  }
}
#menu__toggle:checked ~ .menu__block {
  visibility: visible;
  left: 0;
  opacity: 1;
}

#menu__toggle:checked ~ .sidebar__language {
  display: none;
  @include mobile {
    display: block;
  }

}

.menu__btn > span,
.menu__btn > span::before,
.menu__btn > span::after {
  transition-duration: .25s;
}
.menu__box {
  transition-duration: .25s;
}
.menu__item {
  transition-duration: .25s;
}

/* Burger End*/
</style>
