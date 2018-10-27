<template>
  <div class="circle-box">
    <div class="circle circle--1"/>
    <div class="circle circle--2"/>
    <div class="circle circle--3"/>
    <div class="circle circle--4"/>
    <div class="circle circle--5"/>
    <div class="circle circle--6"/>
    <div class="circle circle--7"/>
    <div class="circle circle--8"/>
    <div class="circle circle--9"/>
    <div class="circle circle--10"/>
    <div class="circle circle--11"/>
    <div class="circle circle--12"/>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
  @import '../assets/scss/variables.scss';
  @import '../assets/scss/mixins.scss';

  .circle-box {
    width: 6rem;
    height: 6rem;
    position: relative;
  }

  .circle {
    width: 100%;
    height: 100%;
    position: absolute;

    &::before {
      content: '';
      display: block;
      margin: 0 auto;
      width: 15%;
      height: 15%;
      background-color: $color-grey-light;
      border-radius: 100%;
      -webkit-animation: circleBounceDelay 1.2s infinite ease-in-out both;
      animation: circleBounceDelay 1.2s infinite ease-in-out both;
    }

    &--2 {
      transform: rotate(30deg);

      &::before {
        -webkit-animation-delay: 0.1s;
        animation-delay: 0.1s;
      }
    }

    &--3 {
      transform: rotate(60deg);

      &::before {
        -webkit-animation-delay: 0.2s;
        animation-delay: 0.2s;
      }
    }

    &--4 {
      transform: rotate(90deg);

      &::before {
        -webkit-animation-delay: 0.3s;
        animation-delay: 0.3s;
      }
    }

    &--5 {
      transform: rotate(120deg);

      &::before {
        -webkit-animation-delay: 0.4s;
        animation-delay: 0.4s;
      }
    }

    &--6 {
      transform: rotate(150deg);

      &::before {
        -webkit-animation-delay: 0.5s;
        animation-delay: 0.5s;
      }
    }

    &--7 {
      transform: rotate(180deg);

      &::before {
        -webkit-animation-delay: 0.6s;
        animation-delay: 0.6s;
      }
    }

    &--8 {
      transform: rotate(210deg);

      &::before {
        -webkit-animation-delay: 0.7s;
        animation-delay: 0.7s;
      }
    }

    &--9 {
      transform: rotate(240deg);

      &::before {
        -webkit-animation-delay: 0.8s;
        animation-delay: 0.8s;
      }
    }

    &--10 {
      transform: rotate(270deg);

      &::before {
        -webkit-animation-delay: 0.9s;
        animation-delay: 0.9s;
      }
    }

    &--11 {
      transform: rotate(300deg);

      &::before {
        -webkit-animation-delay: 1s;
        animation-delay: 1s;
      }
    }

    &--12 {
      transform: rotate(330deg);

      &::before {
        -webkit-animation-delay: 1.1s;
        animation-delay: 1.1s;
      }
    }
  }

  @-webkit-keyframes circleBounceDelay {
    0%, 80%, 100% {
      -webkit-transform: scale(0);
              transform: scale(0);
    } 40% {
      -webkit-transform: scale(1);
              transform: scale(1);
    }
  }

  @keyframes circleBounceDelay {
    0%, 80%, 100% {
      -webkit-transform: scale(0);
      transform: scale(0);
    } 40% {
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
</style>