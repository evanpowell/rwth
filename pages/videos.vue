<template>
  <div>
    <h1 class="title">Videos</h1>
    <p style="color: orangered;">*NOTE: The current playlist is not of Run with the Hare.</p>
    <p style="padding-bottom: 2rem;">It is merely a placeholder while our website is under construction.</p>
    <div
      v-if="videos.length"
      class="videos">
      <video-player
        :video="activeVideo"
        :autoplay="autoplay"/>
      <ul class="list">
        <video-list-entry
          v-for="video in videos"
          :key="video.snippet.resourceId.videoId"
          :video="video"
          :active-id="activeVideo.snippet.resourceId.videoId"
          :select-video="selectVideo"
          href="#"
          class="list__entry"/>
      </ul>
    </div>
  </div>
</template>

<script>
  import VideoPlayer from '../components/VideoPlayer.vue';
  import VideoListEntry from '../components/VideoListEntry.vue';

  import { youtubeApiKey } from '../assets/js/apiConfig.js';

  export default {
    components: {
      VideoPlayer,
      VideoListEntry
    },
    data() {
      return {
        videos: [],
        activeVideo: {},
        autoplay: false
      }
    },
    asyncData({ env, app }) {
      const config = {
        params: {
          key: youtubeApiKey,
          part: 'snippet',
          playlistId: 'PLA-O7ltnqYy3DEeFbenWQohxNqdx2HoU4',
          maxResults: 10
        }
      };
      return app.$axios.$get('https://www.googleapis.com/youtube/v3/playlistItems', config)
        .then((data) => {
          return {
            videos: data.items,
            activeVideo: data.items[0]
          };
        })
        .catch((err) => {
          console.log(err);
        })
    },
    methods: {
      selectVideo(video) {
        this.activeVideo = video;
        this.autoplay = true;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/scss/variables.scss';

  .list {
    background-color: $color-grey-light;
    border-radius: 3px;
    height: 40rem;
    overflow: hidden;
    overflow-y: auto;
    
    &__entry {
      list-style: none;
      padding-right: 1rem;
      padding-top: 1rem;
      padding-bottom: 1rem;
    }
  }
</style>