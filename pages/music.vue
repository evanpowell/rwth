<template>
  <div>
    <h1 class="title">Music</h1>
    <music-player
      :tune="activeTune"/>
    <ul class="music-list">
      <li
        v-for="tune in tunes"
        :key="tune.id"
        class="music-list__entry"
        @click="selectTune(tune)">
        <div class="spacer">
          <font-awesome-icon
            v-if="tune === activeTune"
            icon="caret-right"
            class="spacer__icon"/>
        </div>
        <p class="music-list__entry--title">{{ tune.title }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  import MusicPlayer from '../components/MusicPlayer.vue';
  import bretonTuneUrl from '../assets/sounds/bretonTuneSample.mp3';
  import nightVisitingUrl  from '../assets/sounds/nightVisitingSongSample.mp3';
  import yellowWattleUrl from '../assets/sounds/yellowWattleSetSample.mp3';

  export default {
    components: {
      MusicPlayer
    },
    data() {
      return {
        tunes: [
          {
            title: 'Breton Tune',
            id: 'breton-tune',
            source: bretonTuneUrl,
            duration: 43.584
          },
          {
            title: 'Night Visiting Song',
            id: 'night-visiting',
            source: nightVisitingUrl,
            duration: 49.29305
          },
          {
            title: 'Yellow Wattle Set',
            id: 'yellow-wattle',
            source: yellowWattleUrl,
            duration: 44.74775
          }
        ],
        activeTune: {}
      }
    },
    created() {
      this.activeTune = this.tunes[0];
    },
    methods: {
      selectTune(tune) {
        this.activeTune = tune;
      },

    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/scss/variables.scss';

  .music-list {
    background-color: $color-grey-light;
    border-radius: 3px;
    padding: 2rem 2rem;

    &__entry {
      list-style: none;
      display: flex;
      align-items: center;

      &:not(:last-child) {
        padding-bottom: 1rem;
      }

      &--title {
        font-size: 2rem;
        transition: all .15s;
      }

      &:hover {
        cursor: pointer;
      }

      &:hover &--title {
        color: $color-primary-light;
      }
    }
  }

  .spacer {
    width: 2rem;
    display: flex;
    align-items: center;

    &__icon {
      width: 2rem;
      height: 2rem;
      color: $color-grey;
    }
  }
</style>