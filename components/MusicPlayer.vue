<template>
  <div class="music-player">
    <audio
      :id="tune.id"
      class="audio">
      <source
        :src="tune.source"
        type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
    <p class="music-title">{{ tune.title }}</p>
    <div class="player">
      <div
        :id="timelineId"
        class="player__timeline">
        <div
          :id="playheadId"
          class="player__playhead"/>
      </div>
      <div class="player__controls">
        <button
          class="player__button"
          @click="playPause">
          <font-awesome-icon
            :icon="playerIcon"
            class="player__button--icon play"/>
        </button>
        <button
          class="player__button"
          @click="muteUnmute">
          <font-awesome-icon
            :icon="volumeIcon"
            class="player__button--icon volume"/>
        </button>
        <div class="volume-slider">
          <input
            id="volume-input"
            v-model="volume"
            type="range"
            class="volume-slider__input"
            min="0"
            max="100"
            step="1">
        </div>
        <div
          v-if="time"
          class="time">
          {{ `${time.current} / ${time.duration}` }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      tune: {
        type: Object,
        default: () => {
          return {};
        }
      }
    },
    data() {
      return {
        playerIcon: ['fas', 'play'],
        music: '',
        volume: 75,
        currentTime: 0,
      }
    },
    computed: {
      timelineId() {
        return `${this.tune.id}-timeline`;
      },
      playheadId() {
        return `${this.tune.id}-playhead`;
      },
      volumeIcon() {
        if (!this.music || this.volume > 50) {
          return ['fas', 'volume-up'];
        } else if (this.volume == 0) {
          return ['fas', 'volume-off'];
        } else {
          return ['fas', 'volume-down'];
        }
      },
      time() {
        if (this.music) {
          const time = {};
          const duration = this.music.duration || 0;
          if (duration < 60) {
            time.duration = `0:${parseInt(duration)}`;
          }
          if (duration < 10) {
            time.duration = `0:0${parseInt(duration)}`;
          }

          if (this.currentTime < 10) {
            time.current = `0:0${parseInt(this.currentTime)}`;
          } else {
            time.current = `0:${parseInt(this.currentTime)}`;
          }
          return time;
        }
      },
    },
    watch: {
      volume(newVolume) {
        this.music.volume = newVolume / 100;

        const percent = `${newVolume}%`
        const slider = document.getElementById('volume-input');
        slider.style.background = `linear-gradient(to right, #ddd, #ddd ${percent}, #282828 ${percent}, #282828 100%`;
      },
      tune() {
        this.music.pause();
        this.music.load();
        this.music.play();
        this.playerIcon = ['fas', 'pause'];
      }
    },
    mounted() {
      let duration = this.tune.duration;
      this.music = document.getElementById(this.tune.id);
      const { music } = this;
      music.play()
        .then(() => {
          return music.pause();
        })
        .then(() => {
          music.currentTime = 0;
          music.volume = .75;
        })
      const playhead = document.getElementById(this.playheadId);
      const timeline = document.getElementById(this.timelineId);
      const timelineWidth = timeline.offsetWidth - playhead.offsetWidth;

      music.addEventListener('canplaythrough', () => {
        duration = music.duration
      }, false);

      music.addEventListener('timeupdate', () => {
        const playPercent = 100 * (music.currentTime / this.tune.duration);
        playhead.style.paddingLeft = `${playPercent}%`;
        this.currentTime = music.currentTime;

        if (music.ended) {
          this.playerIcon = ['fas', 'play'];
        }
      }, false);

      const getPosition = (el) => {
        return el.getBoundingClientRect().left;
      }

      const clickPercent = (event) => {
        return (event.clientX - getPosition(timeline)) / timelineWidth;
      }

      const movePlayhead = (event) => {
        var newPaddingLeft = event.clientX - getPosition(timeline);

        if (newPaddingLeft === 0 && newPaddingLeft === timelineWidth) {
          playhead.style.paddingLeft = `${newPaddingLeft}px`;
        }
        if (newPaddingLeft === 0) {
          playhead.style.paddingLeft = '0px';
        }
        if (newPaddingLeft === timelineWidth) {
          playhead.style.paddingLeft = `${timelineWidth}px`;
        }
      }

      timeline.addEventListener("click", (event) => {
        movePlayhead(event);
        music.currentTime = this.tune.duration * clickPercent(event);
      }, false);
    },
    methods: {
      playPause() {
        if (this.music.paused) {
          this.music.play();
          this.playerIcon = ['fas', 'pause'];
        } else {
          this.music.pause();
          this.playerIcon = ['fas', 'play'];
        }
      },
      muteUnmute() {
        if (this.volume != 0) {
          this.oldVolume = this.volume;
          this.volume = 0;
        } else {
          this.volume = this.oldVolume;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

  .music-player {
    padding: 2rem 3rem;
    margin-bottom: 4rem;
    border-radius: 3px;
    background: linear-gradient($color-secondary, $color-secondary 30%, $color-secondary-dark 100%);
    box-shadow: 0 3px 6px rgba($color-black, .25);
  }

  .player {
    width: 100%;

    &__controls {
      display: flex;
    }

    &__button {
      border: none;
      background-color: transparent;
      margin-right: 2rem;
      
      &:hover {
        cursor: pointer;
      }

      &:focus {
        outline: none;
      }

      &--icon {
        width: 2rem;
        height: 2rem;
        color: $color-grey-light;
        transition: all .15s;
      }

      &:hover &--icon {
        color: $color-offwhite;
      }
    }

    &__timeline {
      height: 1rem;
      background: $color-grey-light;
      border-radius: 1.5rem;
      display: flex;
      overflow: hidden;
      margin-bottom: 1rem;

      &:hover {
        cursor: pointer;
      }
    }

    &__playhead {
      height: 1rem;
      background-color: $color-primary;
      // position: relative;
    }
  }

  .time {
    color: $color-grey-light;
  }

  .music-title {
    font-size: 4rem;
    letter-spacing: 1px;
    color: $color-grey-light;
    padding-bottom: 2rem;
  }

  .volume-slider {
    width: 7rem;
    height: 2rem;
    margin-right: 2rem;
    display: flex;
    align-items: center;

    &__input {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      height: .4rem;
      background: linear-gradient(to right, $color-grey-light, $color-grey-light 75%, $color-charcoal 75%, $color-charcoal 100%);
      border-radius: 200rem;

      &:hover {
        cursor: pointer;
      }

      &:focus {
        outline: none;
      }

      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 1.1rem;
        height: 1.1rem;
        background-color: $color-grey-light;
        border-radius: 50%;
      }

      &::-moz-range-thumb {
        appearance: none;
        width: 1.1rem;
        height: 1.1rem;
        background-color: $color-grey-light;
        border-radius: 50%;
      }
    }
  }
</style>