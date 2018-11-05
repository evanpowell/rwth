<template>
  <div>
    <nav class="side-nav">
      <div class="side-nav__logo">
        <nuxt-link to="/">
          <div class="side-nav__logo--image">
            <img
              src="../assets/images/nav-logo.png"
              alt="Logo">
          </div>
        </nuxt-link>
      </div>
      <div class="side-nav__menu">
        <div class="side-nav__menu--main">
          <nuxt-link
            v-for="(page, i) in pages"
            :key="i"
            :to="link[i]"
            class="side-nav__menu--link">
            {{ page }}
          </nuxt-link>
        </div>
        <div class="side-nav__menu--social">
          <div
            v-for="(social, i) in socials"
            :key="i"
            class="side-nav__menu--social-box">
            <a
              :href="social.link"
              target="_blank"
              class="side-nav__menu--social-icon">
              <font-awesome-icon :icon="social.icon"/>
            </a>
            <span class="side-nav__menu--social-tooltip">{{ social.site }}</span>
          </div>
        </div>
      </div>
    </nav>
    <nav class="top-nav">
      <div class="top-nav__content">
        <div class="top-nav__title top-nav--item">
          Run with the Hare
        </div>
        <div class="top-nav__logo top-nav--item">
          <img
            src="../assets/images/top-nav-logo.png"
            alt="Logo"
            class="top-nav__image">
        </div>
        <div class="top-nav--item">
          <div
            class="top-nav__button"
            @click="toggleActive">
            <div :class="[{active: isActive}, 'top-nav__icon']"/>
          </div>
        </div>
      </div>
    </nav>
    <nav class="over-nav">
      <div :class="[{active: isActive}, 'over-nav__box']">
        <div class="over-nav__menu">
          <ul class="over-nav__menu--main">
            <li
              v-for="(page, i) in pages"
              :key="i"
              @click="toggleActive">
              <nuxt-link
                :to="link[i]"
                class="over-nav__menu--link">
                {{ page }}
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pages: [
          'home',
          'about',
          'tour',
          'music',
          'videos',
          'photos',
          'contact'
        ],
        socials: [
          { icon: ['fab', 'youtube'], link: 'https://www.youtube.com/channel/UCZ9ZJxRri6B6mqAdIEliJAA', site: 'YouTube'},
          { icon: ['fab', 'instagram'], link: 'https://www.instagram.com', site: 'Instagram'},
          { icon: ['fab', 'facebook'], link: 'https://www.facebook.com/Run-with-the-Hare-533410613772626/', site: 'Facebook'}
        ],
        isActive: false,
        active: 'over-nav__icon--active'
      }
    },
    computed: {
      link() {
        return this.pages.map((page) => {
          if (page === 'home') {
            return '/';
          }
          return `/${page}`;
        });
      }
    },
    mounted() {
      this.$nextTick(() => {
        window.addEventListener('resize', this.forceInactive)
      })
    },
    methods: {
      toggleActive() {
        this.isActive = !this.isActive;
      },
      forceInactive() {
        if (window.innerWidth >= 900) {
          this.isActive = false;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/scss/variables.scss';
  @import '../assets/scss/mixins.scss';

  .side-nav {
    height: 100vh;
    width: $nav-width;
    position: fixed;
    background-color: $color-primary-light;
    box-shadow: 3px 0 4px 2px rgba($color-black, 0.25);
    color: $color-white;
    display: inline-flex;
    flex-direction: column;
    font-size: 3rem;
    z-index: 999;

    @include respond(tab-port) {
      display: none;
    }

    &__logo {
      border-bottom: 3px solid #748c81;
      position: relative;
      
      &--image {

        & img {
          display: block;
          width: 100%;
        }

        &::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          transition: .25s ease;
        }

        &:hover::before {
          background-color: rgba($color-white, 0.1);
        }
      }
    }

    &__menu {
      overflow-y: auto;
      flex: 1;
      display: inline-flex;
      flex-direction: column;

      &--main {
        flex: 1;
      }

      &--link {
        padding: 1rem 0 1rem 5rem;
        display: block;
        text-decoration: none;
        text-transform: uppercase;
        color: $color-offwhite;
        transition: .15s ease-in-out;

        &.nuxt-link-exact-active {
          font-weight: 700;
          background-color: #294437;
        }

        &:hover:not(.nuxt-link-exact-active) {
          background-color: #50695d;
        }
      }

      &--social {
        display: inline-flex;
        width: 100%;
        padding: 2rem 5rem;
        border-top: 1px solid #748c81;
        justify-content: space-between;
      }

      &--social-box {
        position: relative;
      }

      &--social-icon {
        color: $color-offwhite;
        transition: .25s ease;

        &:hover {
          color: $color-secondary-light;
        }
      }

      &--social-tooltip {
        visibility: hidden;
        opacity: 0;
        width: 10rem;
        background-color: $color-charcoal;
        color: $color-white;
        padding: 1rem 0;
        border-radius: 4px;
        font-size: 1.5rem;
        text-align: center;
    
        /* Position the tooltip text - see examples below! */
        position: absolute;
        top: -4.4rem;
        left: -3.5rem;
        z-index: 1;
        transition: .3s ease;
        transition-delay: .45s;
        backface-visibility: hidden;

        &:after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          margin-left: -5px;
          border: 5px solid transparent;
          border-top-color: $color-charcoal;
        }
      }

      &--social-box:hover &--social-tooltip {
        visibility: visible;
        animation: fadeIn .25s ease .4s forwards;
      }
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }


// ---- TOP NAV ----- //

  .top-nav {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 0 2rem;
    z-index: 200;
    height: 5rem;
    background: linear-gradient(to right, $color-primary, $color-primary-light, $color-primary);
    box-shadow: 2px 0 3px 2px rgba($color-black, 0.25);
    color: $color-white;
    font-size: 2rem;
    
    @include respond(tab-port) {
      display: flex;
      width: 100%;
      align-items: center;
    }

    &--item {
      min-width: 33.3333%;
      width: 33.3333%;
      max-width: 33.3333%;

      @include respond(phone) {
        min-width: 50%;
        width: 50%;
        max-width: 50%;
      }
    }

    &__content {
      display: flex;
      width: 100%;
      align-items: center;
    }

    &__title {
      font-size: 2.5rem;

      @include respond(phone) {
        display: none;
      }
    }

    &__image {
      display: block;
      margin: 0 auto;
      height: 3.3rem;

      @include respond(phone) {
        margin: 0;
      }
    }

    &__button {
      position: relative;
      top: 0;
      height: 5rem;
      margin-left: auto;
      cursor: pointer;
    }

    &__icon {
      position:absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);

      &,
      &::before,
      &::after {
        border-radius: 3px;
        width: 3rem;
        height: 2px;
        background-color: $color-white;
        display: inline-block;
      }

      &::before,
      &::after {
        content: "";
        position: absolute;
        left: 0;
        transition: all .2s;
      }

      &::before {
        top: -.8rem;
      }

      &::after {
        top: .8rem;
      }

      &.active {
        background-color: transparent;
      }

      &.active::before {
        top: 0;
        transform: rotate(135deg);
      }

      &.active::after {
        top: 0;
        transform: rotate(-135deg);
      }
    }

    &__button:hover &__icon::before {
      top: -1rem;
    }

    &__button:hover &__icon::after {
      top: 1rem;
    }

    &__button:hover &__icon.active::before {
      top: 0;
    }

    &__button:hover &__icon.active::after {
      top: 0;
    }
  }

// ---- OVER NAV ----- //

  .over-nav {
    display: none;

    @include respond(tab-port) {
      display: block;
    }

    &__box {
      position: fixed;
      bottom: calc(100vh - 5rem);
      height: calc(100vh - 5rem);
      width: 100%;
      background-color: $color-primary-light;
      z-index: 100;
      transition: all .3s ease;
      overflow: scroll;
    }
    
    &__box.active {
      transform: translateY(100%);
    }

    &__menu {
      @include absoluteCenter;

      &--main {
        @media (max-height: 31.2499em) {
          display: inline-flex;
          width: 100%;
          padding: 2rem 3rem;
          justify-content: space-between;
          flex-wrap: wrap;
        }
      }

      width: 100%;

      & li {
        list-style: none;
        text-align: center;
        width: 100%;

        @media (max-height: 31.2499em) {
          width: auto;
          margin: 0 2rem;
        }

        &:not(:last-child) {
          margin-bottom: 2rem;
        }
      }

      &--link {
        font-size: 3rem;
        color: $color-white;
        text-decoration: none;
        width: 100%;
        display: block;
        text-transform: uppercase;
        padding: 1rem 0;
        transition: all .15s;

        &:hover {
          color: $color-grey-light;
        }

        &.nuxt-link-exact-active {
          font-weight: 700;
          color: $color-secondary;
          text-shadow: 0 3px 5px rgba($color-black, 0.4);
        }
      }
    }
  }
</style>