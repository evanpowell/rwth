<template>
  <li class="list-entry">
    <div class="list-entry--main">
      <div class="date-time">
        <div class="date-time__date">
          <p>{{ show.date }}</p>
        </div>
        <div class="time">
          <p>{{ show.time }}</p>
        </div>
      </div>     
      <div class="venue">
        <a
          v-if="show.link"
          :href="show.link"
          target="_blank"
          class="venue--link">
          {{ show.venue }}
        </a>
        <p
          v-else
          class="venue-text">
          {{ show.venue }}
        </p>
      </div>
      <div class="info">
        <button 
          :class="[{ active : show.moreInfo }, 'info--btn']"
          @click="show.moreInfo = !show.moreInfo">
          {{ show.moreInfo ? 'Less' : 'More' }}
        </button>
      </div>
    </div>
    <div
      v-if="show.moreInfo"
      class="list-entry--info">
      <div class="list-entry--location">
        {{ show.location }}
      </div>
      <a 
        :href="mapsLink"
        class="gmaps">
        Show in Google Maps
      </a>
    </div>
  </li>
</template>

<script>
  export default {
    props: {
      show: {
        type: Object,
        default: () => {
          return {};
        }
      }
    },
    computed: {
      mapsLink() {
        const address = this.show.location.split(' ').join('+');
        return `https://www.google.com/maps/place/${address}`;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/scss/variables.scss';

  .list-entry {
    display: block;
    
    &:not(:last-child):after {
      content: ""; 
      display: block;
      margin: 0 auto;
      width: 90%;
      border-bottom: 1px solid $color-grey-light;
    }

    &--main {
      display: flex;
      justify-content: space-between;
      padding: 1rem 2rem;
    }

    &--info {
      padding: 0 2rem 1rem 2rem;
    }
  }

  .info {

    &--btn {
      text-transform: uppercase;
      padding: .5rem 1rem;
      font-weight: bold;
      width: 6rem;
      border: none;
      border-radius: 3px;
      background-color: $color-primary-light;
      color: $color-white;
      box-shadow: 0 2px 4px 2px rgba($color-black, 0.2);
      transition: .15s ease;
      backface-visibility: hidden;

      &:hover {
        cursor: pointer;
        background-color: $color-primary-lighter;
      }

      &:active {
        background-color: $color-primary;
        box-shadow: 0 3px 6px 2px rgba($color-black, 0.2);
      }

      &:focus {
        outline: none;
      }
    }
  }

  .date-time {
    display: inline-flex;
    flex-basis: 35%;
    justify-content: space-between;
  }

  .venue {
    color: $color-secondary-dark;
    font-weight: 700;

    &--link {
      text-decoration: none;
      color: inherit;

      &:hover {
        color: $color-secondary;
      }
    }
  }

  .gmaps {
    color: $color-primary;

    &:hover {
      color: $color-primary-light;
    }
  }
</style>