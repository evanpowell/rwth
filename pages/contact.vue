<template>
  <div>
    <h1 class="title">Contact</h1>
    <form
      class="contact-form"
      @submit="send">
      <div class="contact-form__group">
        <label for="name">Your Name</label>
        <input
          id="name"
          v-model="sendForm.name"
          type="text"
          class="contact-form__name--input contact-input"
          required>
      </div>
      <div class="contact-form__group">
        <label for="email">
          Your Email
          <span
            v-if="emailIsInvalid"
            class="inValidEmail">
            Please enter a valid email
          </span>
        </label>
        <input
          id="email"
          v-model="sendForm.email"
          type="email"
          class="contact-form__email contact-input"
          required>
      </div>
      <div class="contact-form__group">
        <label for="subject">Subject</label>
        <input
          id="subject"
          v-model="sendForm.subject"
          type="text"
          class="contact-form__subject contact-input"
          required>
      </div>
      <div class="contact-form__group">
        <label for="message">Message</label>
        <textarea
          id="message"
          v-model="sendForm.message"
          class="contact-form__message contact-input"
          required/>
      </div>
      <input
        type="submit"
        class="contact-form__submit"
        value="Send">
      <span
        v-if="isIncomplete"
        class="incomplete">
        Please fill in all fields
      </span>
    </form>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data () {
      return {
        sendForm: {
          name: '',
          email: '',
          subject: '',
          message: ''
        },
        emailIsInvalid: false,
        isIncomplete: false,
        isError: false
      }
    },
    methods: {
      send(event) {
        event.preventDefault();
        axios({
          url: '/api/send', 
          method: 'post',
          params: {
            sendForm: this.sendForm
          }
        })
          .then((res) => {
            console.log('success', res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
    // created() {

    //   axios({
    //     url: '/api/send', 
    //     method: 'post',
    //     params: {
    //       message: 'HEY'
    //     }
    //   })
    //     .then((res) => {
    //       console.log('success', res.data);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/scss/variables.scss';

  .contact-input {
    border: 1px solid transparent;
    border-radius: 3px;
    width: 100%;
    padding: 6px 8px;
    font-size: inherit;
    font-family: inherit;

    &:focus {
      outline: none;
      border: 1px solid $color-grey;
    }
  }

  .contact-form {
    width: 80rem;
    max-width: 100%;
    font-size: 1.8rem;
    padding: 3rem 5rem;
    background-color: $color-grey-light;
    border-radius: 3px;

    &__group {

      &:not(:last-child) {
        padding-bottom: 3rem;
      }
    }

    & label {
      display: block;
      font-size: 2.4rem;
      padding-bottom: .8rem;
      padding-left: 1rem;
      color: $color-grey;
    }

    &__message {
      min-height: 30rem;
      max-width: 100%;
      font-family: inherit;
      font-size: inherit;
    }

    &__submit {
      font-size: inherit;
      font-family: inherit;
      font-weight: 700;
      text-transform: uppercase;
      padding: 1rem 2rem;
      border: none;
      border-radius: 3px;
      background-color: $color-secondary;
      color: $color-white;
      box-shadow: 0 2px 4px 2px rgba($color-black, 0.2);
      transition: .2s ease;
      backface-visibility: hidden;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 3px 8px 2px rgba($color-black, 0.2);
        cursor: pointer;
      }
    }
  }
</style>