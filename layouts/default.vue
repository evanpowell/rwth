<template>
  <div>
    <app-nav/>
    <div class="content">
      <div class="container">
        <nuxt/>
      </div>
    </div>
  </div>
</template>

<script>
import appNav from '../components/Nav.vue';

export default {
  components: {
    appNav,
  },
  head() {
    return {
      title: 'Run with the Hare',
    }
  },
};
</script>


<style lang="scss">
@import '../assets/scss/variables.scss';
@import '../assets/scss/mixins.scss';

html
{
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 62.5%;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;

  @include respond(tab-land) {
    font-size: 56.25%; //1 rem = 9px
  }
  @include respond(tab-port) {
    font-size: 50%; //1 rem = 8px
  }
  @include respond(big-desktop) {
    font-size: 75%; //1rem = 12px
  }
}

*,
*:before,
*:after
{
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

body {
  font-size: 1.6rem;
  color: $color-charcoal;
  box-sizing: border-box;
}

.content {
  position: absolute;
  left: $nav-width;
  right: 0;
  min-height: 100vh;
  padding: 3rem 5%;
  background-color: $color-offwhite;

  @include respond(tab-port) {
    position: relative;
    left: 0;
    top: 5rem;
    min-height: calc(100vh - 5rem);
  }
}

.container {
  max-width: 100rem;
  width: 100%;
  margin: 0 auto;
}

.title {
  text-align: center;
  text-transform: uppercase;
  padding-bottom: 3rem;
  color: $color-primary;
}
</style>
