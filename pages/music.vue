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
        <p class="music-list__entry--title">{{ tune.title }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  import MusicPlayer from '../components/MusicPlayer.vue';
  import bretonTuneUrl from '../assets/sounds/bretonTuneSample.mp3';
  import nightVisitingUrl  from '../assets/sounds/nightVisitingSongSample.mp3';

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
      }
    }
  }
</script>

<style scoped>

</style>