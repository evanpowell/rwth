<template>
  <div>
    <h1 class="title">Videos</h1>
    <div
      v-if="!isLoaded"
      class="spinner-box">
      <spinner/>
    </div>
    <div
      v-else-if="videos.length"
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
  import Spinner from '../components/Spinner.vue';

  export default {
    components: {
      VideoPlayer,
      VideoListEntry,
      Spinner
    },
    data() {
      return {
        videos: [],
        activeVideo: {},
        autoplay: false,
        isLoaded: false,
        hasError: false,
        apiUrl: ''
      }
    },
    asyncData({ req }) {
      const host = req ? req.headers.host : window.location.host;
      return {
        apiUrl: `http://${host}/api/videos`
      };
    },
    created() {
      this.$axios.$get(this.apiUrl)
        .then((videos) => {
          this.videos = videos;
          this.activeVideo = videos[0];
          this.isLoaded = true;
        })
        .catch((err) => {
          this.hasError = true;
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

  .spinner-box {
    width: 6rem;
    margin: 0 auto;
    padding-top: 7rem;
  }

  .list {
    background-color: $color-grey-light;
    border-radius: 3px;
    max-height: 40rem;
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