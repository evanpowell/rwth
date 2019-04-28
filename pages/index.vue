<template>
  <div :class="homeClassObject">
    <div class="home__logo">
      <img
        src="../assets/images/home-title.png"
        alt="Run with the Hare">
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      isLandscape: true,
      landscapeClass: 'home__landscape',
      portraitClass: 'home__portrait'
    }
  },
  computed: {
    homeClassObject: function() {
      return {
        home: true,
        'home__landscape': this.isLandscape,
        'home__portrait': !this.isLandscape
      }
    }
  },
  mounted: function() {
    this.getIsLandscape();
    window.addEventListener('resize', this.getIsLandscape);
  },
  methods: {
    getIsLandscape: function() {
      const content = document.getElementsByClassName('content')[0];
      this.isLandscape = content.offsetHeight < content.offsetWidth;
    }
  },
}
</script>

<style lang="scss" scoped>
  .home {
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;

    &__landscape {
      background-image: url('../assets/images/rwth-home.png');
    }

    &__portrait {
      background-image: url('../assets/images/rwth-home-portrait.png');
    }

    &__logo {
      width: 55rem;
      max-width: 90%;
      height: 0;
      padding-bottom: 33.333333%;
      margin: 0 auto;
      margin-top: 5rem;
      position: relative;

      @media screen and (max-height: 500px) {
        width: 30rem;
      }

      & img {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
</style>
