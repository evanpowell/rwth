<template>
  <div>
    <div class="home">
      <h1>Run with the Hare</h1>
      <h3>
        Welcome to our website! We are Run with the Hare,
        a traditional Irish music trio based out of Austin, Texas.
      </h3>
      <h3 class="alert">
        Our site is currently under construction. Check
        back with us soon! :)
      </h3>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .home {
    text-align: center;

    & h1 {
      padding-bottom: 2rem;
    }

    & h3 {
      padding: 0 4rem;
      padding-bottom: 1.5rem;
    }

    & .alert {
      color: orangered;
    }
  }
</style>
