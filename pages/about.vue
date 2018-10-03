<template>
  <div>
    <h1 class="title">About</h1>
    <div class="main-image"/>
    <div class="about">
      <p>
        <span class="accent large">Run with the Hare</span>
        is a traditional Irish music trio based in Austin, Texas. The band includes
        <span class="accent">Nicolle Fig</span> (song, bodhrán, button accordion),
        <span class="accent">Jonathan Milton</span>  (flute, pipes, guitar), and
        <span class="accent">Evan Powell</span> (piano, flute). Their love for the music and decades of combined experience forge a sound that is full of joy, power, and grace. 
      </p>
    </div>
    <div class="members">
      <img
        class="members__photo"
        src="https://dummyimage.com/500x700/926d3c/1c4d38"
        alt="Nicolle Fig">
      <div class="members__info">
        <h2 class="members__name">Nicolle Fig</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Leo duis
          ut diam quam nulla. Risus at ultrices mi tempus imperdiet nulla
          malesuada. Nullam non nisi est sit amet facilisis magna etiam tempor.
          Leo integer malesuada nunc vel risus commodo viverra maecenas. Et
          egestas quis ipsum suspendisse ultrices gravida dictum fusce. Faucibus
          interdum posuere lorem ipsum dolor sit amet consectetur.
          Mauris commodo quis imperdiet massa. Tortor at auctor urna nunc id
          cursus metus aliquam. Et netus et malesuada fames ac turpis egestas.
          Velit dignissim sodales ut eu.
        </p>
      </div>   
    </div>
    <div class="members">
      <img
        class="members__photo"
        src="https://dummyimage.com/500x700/926d3c/1c4d38"
        alt="Jonathan Milton">
      <div class="members__info">
        <h2 class="members__name">Jonathan Milton</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Leo duis
          ut diam quam nulla. Risus at ultrices mi tempus imperdiet nulla
          malesuada. Nullam non nisi est sit amet facilisis magna etiam tempor.
          Leo integer malesuada nunc vel risus commodo viverra maecenas. Et
          egestas quis ipsum suspendisse ultrices gravida dictum fusce. Faucibus
          interdum posuere lorem ipsum dolor sit amet consectetur.
          Mauris commodo quis imperdiet massa. Tortor at auctor urna nunc id
          cursus metus aliquam. Et netus et malesuada fames ac turpis egestas.
          Velit dignissim sodales ut eu.
        </p>
      </div>   
    </div>
    <div class="members">
      <img
        class="members__photo"
        src="https://dummyimage.com/500x700/926d3c/1c4d38"
        alt="Evan Powell">
      <div class="members__info">
        <h2 class="members__name">Evan Powell</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Leo duis
          ut diam quam nulla. Risus at ultrices mi tempus imperdiet nulla
          malesuada. Nullam non nisi est sit amet facilisis magna etiam tempor.
          Leo integer malesuada nunc vel risus commodo viverra maecenas. Et
          egestas quis ipsum suspendisse ultrices gravida dictum fusce. Faucibus
          interdum posuere lorem ipsum dolor sit amet consectetur.
          Mauris commodo quis imperdiet massa. Tortor at auctor urna nunc id
          cursus metus aliquam. Et netus et malesuada fames ac turpis egestas.
          Velit dignissim sodales ut eu.
        </p>
      </div>   
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
  @import '../assets/scss/variables';
  @import '../assets/scss/mixins';

  .main-image {
    width: 100%;
    height: 0;
    padding-top: 56.25%;
    background: url('https://dummyimage.com/1600x900/926d3c/1c4d38');
    background-size: cover;
    border-radius: 3px;
    box-shadow: 0 2px 6px 3px rgba($color-black, 0.3);
  }

  .about {
    font-size: 2rem;
    padding-top: 3rem;
    padding-bottom: 5rem;
  }

  .members {
    font-size: 2rem;
    @include clearfix;

    &:not(:last-child) {
      padding-bottom: 5rem;
    }

    &__photo {
      max-width: 25rem;
      float: left;
      margin-right: 3rem;
      border-radius: 3px;
      box-shadow: 0 2px 6px 2px rgba($color-black, 0.3);
    }

    &__name {
      padding-bottom: 3rem;
    }
  }

  .accent {
    font-weight: 700;
  }

  .large {
    font-size: 120%;
    color: $color-primary;
  }
</style>