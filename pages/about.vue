<template>
  <div>
    <h1 class="title">About</h1>
    <div class="main-image"/>
    <div class="about">
      <p>
        <span class="accent large">Run with the Hare</span>
        is a traditional Irish music trio based in Austin, Texas. The band includes
        <span class="accent">Nicolle Fig</span> (song, bodhrán, button accordion),
        <span class="accent">Jonathan Milton</span>  (flute, pipes, guitar), and
        <span class="accent">Evan Powell</span> (piano, flute). Their love for the music and decades of combined experience forge a sound that is full of joy, power, and grace. 
      </p>
    </div>
    <div class="members">
      <img
        class="members__photo"
        src="../assets/images/bio-nicolle.png"
        alt="Nicolle Fig">
      <div class="members__info">
        <h2 class="members__name">Nicolle Fig</h2>
        <p class="members__bio">
          Nicolle Fig moved to Ireland from the USA at age 18. She quickly developed a passion for Irish traditional music while attending the University of Limerick, where she studied
          under many renowned masters of the music. She graduated with first class honours from UL in 2016. She earned a Bachelor of Arts in Irish Music and Dance, specialising in bodhrán,
          traditional singing, and button accordion. Nicolle also studied classical singing at the university level and has appeared in numerous musical theatre performances. A former
          member of the Irish Chamber Orchestra choir, she has also performed at the Concert Hall in Limerick and played in over 30 festivals in Ireland. In 2017, she moved to Austin,
          where she performed and recorded with bluegrass band Three Quarter Moon, had guest appearances on KOOP radio, and performed in concert with Gourisankar Karmakar. Nicolle is an
          in-demand teacher with over 10 years’ experience teaching in Mexico, Ireland, and the USA. Her success as a teacher is reflected by her large following and viewership on YouTube,
          where she has developed a strong professional reputation as a welcoming and skillful teacher. Her distinctive, lyric style of playing has made her a highly sought-after session
          musician and accompanist, both at home and abroad.
        </p>
      </div>   
    </div>
    <div class="members">
      <img
        class="members__photo"
        src="../assets/images/bio-jonathan.png"
        alt="Jonathan Milton">
      <div class="members__info">
        <h2 class="members__name">Jonathan Milton</h2>
        <p class="members__bio">
          Jonathan Milton is a performer, composer, and arranger of traditional and modern instrumental music. A veteran Irish flute and guitar player in the Austin scene, he’s an in-demand
          session musician, having played on records ranging from traditional Irish to singer-songwriter to rockabilly to electronic pop. Jonathan’s solo album, “Just One More,” was released
          in 2013 to critical acclaim. He’s also a former member of Aidan, a legendary traditional Irish band which toured Ireland on the success of their album, “The Time is Right,” in 2013.
          Over the following years, he composed a large collection of music for future projects. Jonathan met Nicolle and Evan in 2017, and they formed Run with the Hare shortly thereafter.
          Aside from performing and recording, Jonathan continues to teach and write about approaches to flute, whistle, and guitar playing for beginner to advanced students.
        </p>
      </div>   
    </div>
    <div class="members">
      <img
        class="members__photo"
        src="../assets/images/bio-evan.png"
        alt="Evan Powell">
      <div class="members__info">
        <h2 class="members__name">Evan Powell</h2>
        <p class="members__bio">
          Evan Powell is an award-winning pianist, keyboardist, and Irish flutist with a multifaceted career spanning several genres, including jazz, neo-soul, reggae, indie-rock, and folk.
          He holds first place senior titles for solo piano, accompaniment, and composition from the Comhaltas Mid-Atlantic Fleadh Cheoil (2012). Also an accomplished educator, he has given
          multiple lectures on jazz performance and improvisation in the states and abroad, and is a former instructor of the Irish ensemble at his alma mater, Florida State University. Growing
          up in South Florida, he was inspired towards improvisation by his parents’ jazz records, and was heavily influenced by the intricate harmonic voicings of jazz legends Bill Evans,
          Oscar Peterson, and Keith Jarrett. His unique style of backing subtly reflects his jazz origins, and is as much influenced by Irish guitar as it is Irish piano, taking queue from the
          rhythms and harmonies of such players as Paul Brady and Paul McSherry. Apart from his ongoing musical career, Evan also works as a software engineer for the state of Texas.
        </p>
      </div>   
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
  @import '../assets/scss/variables';
  @import '../assets/scss/mixins';

  .main-image {
    width: 100%;
    height: 0;
    padding-top: 56.25%;
    background-image: url('../assets/images/rwth-about.png');
    background-size: cover;
    border-radius: 3px;
    box-shadow: 0 2px 6px 3px rgba($color-black, 0.3);
  }

  .about {
    font-size: 2rem;
    padding-top: 3rem;
    padding-bottom: 3rem;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      height: 1px;
      width: 100%;
      border-bottom: 2px solid $color-grey-light;

      @include respond(phone) {
        width: 85%;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }

  .members {
    font-size: 2rem;
    width: 100%;
    @include clearfix;
    padding-top: 3rem;
    position: relative;

    &:not(:last-child) {
      padding-bottom: 3rem;

      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        height: 1px;
        width: 100%;
        border-bottom: 2px solid $color-grey-light;

        @include respond(phone) {
          width: 85%;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }

    &__info {
      min-height: 35rem;
    }

    &__photo {
      max-width: 25rem;
      float: left;
      margin-right: 3rem;
      border-radius: 3px;
      box-shadow: 0 2px 6px 2px rgba($color-black, 0.3);
      display: block;
      margin-bottom: 3rem;

      @include respond(phone) {
        float: none;
        margin: 0 auto;
        margin-bottom: 3rem;
      }
    }

    &__name {
      padding-bottom: 3rem;

      @include respond(phone) {
        text-align: center;
      }
    }
  }

  .accent {
    font-weight: 700;
  }

  .large {
    font-size: 120%;
    color: $color-primary;
  }
</style>