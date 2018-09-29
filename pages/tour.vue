<template>
  <div>
    <h1 class="title">Tour</h1>
    <div class="shows">
      <ul class="shows__list">
        <li
          v-for="show in shows"
          :key="show.id"
          class="shows__list-entry">
          <div class="shows__list-entry--main">
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
                :href="show.link"
                target="_blank"
                class="venue--link">
                {{ show.venue }}
              </a>
            </div>
            <div class="info">
              <a 
                :href="show.link"
                target="_blank"
                class="info--link">
                More Info
              </a>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        shows: []
      }
    },
    created() {
      axios.get('/api/shows')
        .then(({ data }) => {
          this.shows = data;
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }
</script>

<style lang="scss" scoped>
  @import './assets/scss/variables.scss';

  .shows {
    width: 80rem;
    max-width: 100%;
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
    }
  }

  .date-time {
    display: inline-flex;
    flex-basis: 35%;
    justify-content: space-between;
  }
</style>