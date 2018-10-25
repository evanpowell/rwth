<template>
  <li @click="selectVideo(video)">
    <div class="entry">
      <div class="spacer">
        <font-awesome-icon
          v-if="video.snippet.resourceId.videoId === activeId"
          icon="caret-right"
          class="spacer__icon"/>
      </div>
      <div class="thumbnail">
        <div class="thumbnail--box">
          <img
            :src="video.snippet.thumbnails.medium.url"
            alt="Video thumbnail"
            class="thumbnail--image">
        </div>
      </div>
      <div class="video-title">
        <a href="#">
          {{ video.snippet.title }}
        </a>
      </div>
    </div>
  </li>
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
      activeId: {
        type: String,
        default: () => {
          return '';
        }
      },
      selectVideo: {
        type: Function,
        default: () => {
          return () => {};
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/scss/variables.scss';

  .video-title {
    transition: all .15s;
  }

  li:hover {
    cursor: pointer;

    & .video-title {
      color: $color-primary-light;
    }
  }

  .spacer {
    width: 3rem;
    min-width: 3rem;
    position: relative;

    &__icon {
      font-size: 3rem;
      color: $color-grey;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .entry {
    display: inline-flex;
    width: 100%;
    justify-items: left; 
  }

  .thumbnail {
    width: 15rem;
    min-width: 15rem;
    margin-right: 1rem;

    &--box {
      width: 100%;
      height: 0;
      padding-bottom: 56.25%;
      position: relative;
    }

    &--image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  .video-title {
    text-align: left;
    font-size: 1.8rem;


    & a {
      text-decoration: none;
      color: inherit;
    }
  }
</style>
