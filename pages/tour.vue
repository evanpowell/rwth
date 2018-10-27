<template>
  <div>
    <h1 class="title">Tour</h1>
    <div
      v-if="!isLoaded"
      class="spinner-box">
      <spinner/>
    </div>
    <div
      v-else
      class="shows">
      <ul
        v-if="shows.length"
        class="shows__list">
        <tour-list-entry
          v-for="show in shows"
          :key="show.id"
          :show="show"/>
      </ul>
      <div
        v-else
        class="shows__empty">
        <h3>No Upcoming Shows</h3>
        <p>There are currently no upcoming shows, but stay tuned!</p>
      </div>
    </div>
  </div>
</template>

<script>
  import TourListEntry from '../components/TourListEntry.vue';
  import Spinner from '../components/Spinner.vue';
  import axios from 'axios';

  export default {
    components: {
      TourListEntry,
      Spinner
    },
    asyncData({ req }) {
      const host = req ? req.headers.host : window.location.host;
      return {
        apiUrl: `http://${host}/api/shows`
      };
    },
    data() {
      return {
        shows: [],
        error: false,
        isLoaded: false,
        apiUrl: ''
      };
    },
    created() {
      axios.get(this.apiUrl)
        .then(({ data }) => {
          this.shows = data;
          this.isLoaded = true;
        })
        .catch((err) => {
          this.error = true;
        })
    }
  }
</script>

<style lang="scss" scoped>
  @import './assets/scss/variables.scss';

  .spinner-box {
    margin: 0 auto;
    width: 6rem;
    padding-top: 5.5rem;
  }

  .shows {
    width: 80rem;
    max-width: 100%;
    margin: 0 auto;
    padding: 3rem 5rem;

    &__list-entry {
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

    &__empty {
      text-align: center;

      & > h3 {
        padding-bottom: 2rem;
      }
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
</style>