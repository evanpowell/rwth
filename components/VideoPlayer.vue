<template>
  <div class="video">
    <div class="video__player">
      <iframe
        :src="source"
        class="video__embed"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen/>
    </div>
    <h2 class="video__title">{{ video.snippet.title }}</h2>
  </div>
</template>

<script>
  export default {
    props: {
      video: {
        type: Object,
        default: () => {
          return {};
        }
      },
      autoplay: {
        type: Boolean,
        default: () => {
          return false;
        }
      }
    },
    computed: {
      source() {
        return `https://www.youtube-nocookie.com/embed/${this.video.snippet.resourceId.videoId}?rel=0&amp;showinfo=0&autoplay=${this.autoplay ? 1 : 0}`;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/scss/variables.scss';

  .video {
    width: 100%;
    padding-bottom: 3rem;

    &__player {
      width:100%;
      height: 0;
      padding-bottom: 56.25%;
      position: relative;
      margin-bottom: 2rem;
    }

    &__embed {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
</style>
