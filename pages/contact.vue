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
      <div
        v-if="error !== ''"
        class="form-sent form-sent__error">
        <span>
          Error:
        </span>
        {{ error }}
      </div>
      <div
        v-if="isSuccess"
        class="form-sent form-sent__success">
        <span>
          Thank you!
        </span>
        We'll get back to you shortly. :)
      </div>
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
        error: '',
        isSuccess: false,
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
          .then(() => {
            this.isSuccess = true;
            this.error = '';
            this.sendForm.name = '';
            this.sendForm.email = '';
            this.sendForm.subject = '';
            this.sendForm.message = '';
          })
          .catch((err) => {
            const { data } = err.response;
            if (data === 'incomplete') {
              this.error = 'Some fields were recognized as incomplete';
            } else if (data === 'invalidEmail') {
              this.error = 'Your email was recognized as invalid';
            } else {
              this.error = 'Something went wrong'
            }
          });
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/scss/variables.scss';

  .contact-input {
    border: 1.5px solid transparent;
    border-radius: 3px;
    width: 100%;
    padding: 6px 8px;
    font-size: inherit;
    font-family: inherit;

    &:focus {
      outline: none;
      border: 1.5px solid $color-primary-light;
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
      min-width: 100%;
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
      transition: .1s ease;
      backface-visibility: hidden;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 3px 8px 2px rgba($color-black, 0.2);
        cursor: pointer;
      }

      &:active {
        transform: translateY(-3px);
        box-shadow: 0 3px 6px 2px rgba($color-black, 0.2);
      }

      &:focus {
        outline: none;
      }
    }
  }

  .form-sent {
    display: inline-block;
    padding-left: 2rem;
    
    & span {
      font-weight: 700;
    }

    &__error {
      color: $color-alert;
    }

    &__success {
      color: $color-primary-light;
    }
  }
</style>