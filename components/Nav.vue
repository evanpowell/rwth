<template>
  <nav class="nav">
    <div class="nav__logo">
      <nuxt-link to="/">
        <div class="nav__logo--image">
          <img
            src="../assets/images/nav-logo.png"
            alt="Logo">
        </div>
      </nuxt-link>
    </div>
    <div class="nav__menu">
      <div class="nav__menu--main">
        <nuxt-link
          v-for="(page, i) in pages"
          :key="i"
          :to="link[i]"
          class="nav__menu--link">
          {{ page }}
        </nuxt-link>
      </div>
      <div class="nav__menu--social">
        <a
          v-for="(social, i) in socials"
          :key="i"
          :href="social.link"
          target="_blank"
          class="nav__menu--social-icon">
          <font-awesome-icon :icon="social.icon"/>
        </a>
      </div>
    </div>
  </nav>
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
        ]
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
  .nav {
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
</style>