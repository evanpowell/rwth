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
          <a
            v-for="(social, i) in socials"
            :key="i"
            :href="social.link"
            target="_blank"
            class="side-nav__menu--social-icon">
            <font-awesome-icon :icon="social.icon"/>
          </a>
        </div>
      </div>
    </nav>
    <nav class="top-nav">
      <div class="top-nav__logo">Logo</div>
      <div class="top-nav__title">
        Run with the Hare
      </div>
      <div class="top-nav__menu-icon">
        Icon
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
          { icon: ['fab', 'youtube'], link: 'https://www.youtube.com'},
          { icon: ['fab', 'instagram'], link: 'https://www.instagram.com'},
          { icon: ['fab', 'facebook'], link: 'https://www.facebook.com/Run-with-the-Hare-533410613772626/'}
        ],
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
        color: $color-white;
        transition: .25s ease;

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

      &--social-icon {
        color: white;
        transition: .25s ease;

        &:hover {
          color: #748c81;
        }
      }
    }
  }

  .top-nav {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 0 2rem;
    z-index: 999;
    height: 4rem;
    background-color: $color-primary;
    box-shadow: 2px 0 3px 2px rgba($color-black, 0.25);
    color: $color-white;
    font-size: 2rem;
    
    @include respond(tab-port) {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>