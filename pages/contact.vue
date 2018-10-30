<template>
  <div>
    <h1 class="title">Contact</h1>
    <form
      class="contact-form"
      @submit="send">
      <div class="contact-form__group">
        <label for="name">
          Name
          <span
            v-if="error.name"
            class="error-message">
            *Name required
          </span>
        </label>
        <input
          id="name"
          v-model="sendForm.name"
          :class="[{invalid : error.name}, 'contact-form__name--input', 'contact-input']"
          type="text"
          required
          @blur="validateFieldOnBlur($event, 'name')"
          @input="validateFieldOnInput($event, 'name')">
      </div>
      <div class="contact-form__group">
        <label for="email">
          Email
          <span
            v-if="error.email !== ''"
            class="error-message">
            {{ error.email === 'required' ? '*Email required' : '*Must be valid email' }}
          </span>
        </label>
        <input
          id="email"
          v-model="sendForm.email"
          :class="[{invalid : error.email}, 'contact-form__email--input', 'contact-input']"
          type="email"
          required
          @blur="validateFieldOnBlur($event, 'email')"
          @input="validateFieldOnInput($event, 'email')">
      </div>
      <div class="contact-form__group">
        <label for="subject">
          Subject
          <span
            v-if="error.subject"
            class="error-message">
            *Subject required
          </span>
        </label>
        <input
          id="subject"
          v-model="sendForm.subject"
          :class="[{invalid : error.subject}, 'contact-form__subject--input', 'contact-input']"
          type="text"
          required
          @blur="validateFieldOnBlur($event, 'subject')"
          @input="validateFieldOnInput($event, 'subject')">
      </div>
      <div class="contact-form__group">
        <label for="message">
          Message
          <span
            v-if="error.message"
            class="error-message">
            *Message required
          </span>
        </label>
        <textarea
          id="message"
          v-model="sendForm.message"
          :class="[{invalid : error.message}, 'contact-form__message', 'contact-input']"
          required
          @blur="validateFieldOnBlur($event, 'message')"
          @input="validateFieldOnInput($event, 'message')"/>
      </div>
      <input
        :class="[{disabled: !isValidated}, 'contact-form__submit']"
        :disabled="!isValidated"
        type="submit"
        value="Send">
      <div
        v-if="isSending"
        class="form-sent">
        Sending...
      </div>
      <div
        v-if="error.response"
        class="form-sent form-sent__error">
        <span>
          Error:
        </span>
        Something went wrong, please try again later.
      </div>
      <div
        v-if="isSuccess"
        class="form-sent form-sent__success">
        <span>
          Message Sent!
        </span>
        Thank you! We'll get back to you shortly. :)
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    asyncData({ req }) {
      const host = req ? req.headers.host : window.location.host;
      return { host };
    },
    data () {
      return {
        sendForm: {
          name: '',
          email: '',
          subject: '',
          message: ''
        },
        error: {
          name: false,
          email: '',
          subject: false,
          message: false,
          response: false,
        },
        isSending: false,
        isSuccess: false,
      }
    },
    computed: {
      isValidated: function() {
        for (let field in this.sendForm) {
          if (!this.sendForm[field] || this.error[field]) {
            return false;
          } else if (field === 'email' && !this.validateEmail(this.sendForm[field])) {
            return false;
          }
        }
        return true;
      }
    },
    methods: {
      send(event) {
        event.preventDefault();
        this.isSending = true;
        this.$axios({
          url: `http://${this.host}/api/send`, 
          method: 'post',
          params: {
            sendForm: this.sendForm
          }
        })
          .then(() => {
            this.isSending = false;
            this.isSuccess = true;
            this.error = {
              name: false,
              email: '',
              subject: false,
              message: false,
              response: false,
            };
            this.sendForm.name = '';
            this.sendForm.email = '';
            this.sendForm.subject = '';
            this.sendForm.message = '';
          })
          .catch((err) => {
            this.isSending = false;
            const { data } = err.response;
            if (data === 'incomplete') {
              this.error.response = 'Some fields were recognized as incomplete';
            } else if (data === 'invalidEmail') {
              this.error.response = 'Your email was recognized as invalid';
            } else {
              this.error.response = 'Something went wrong';
            }
          });
      },
      validateFieldOnBlur(e, field) {
        if (field === 'name' && this.sendForm.name === '') {
          this.error.name = true;
        } else if (field === 'email') {
          if (this.sendForm.email === '') {
            this.error.email = 'required';
          } else if (!this.validateEmail(this.sendForm.email)) {
            this.error.email = 'invalid';
          }
        } else if (field === 'subject' && this.sendForm.subject === '') {
          this.error.subject = true;
        } else if (field === 'message' && this.sendForm.message === '') {
          this.error.message = true;
        }
      },
      validateFieldOnInput(e, field) {
        this.$nextTick(() => {
          if (field === 'name') {
            this.error.name = this.sendForm.name === '';
          } else if (field === 'email') {
            if (this.sendForm.email === '') {
              this.error.email = 'required';
            } else if (this.error.email === 'invalid') {
              this.error.email = this.validateEmail(this.sendForm.email) ? '' : 'invalid';
            } else {
              this.error.email = '';
            }
          } else if (field === 'subject') {
            this.error.subject = this.sendForm.subject === '';
          } else if (field === 'message') {
            this.error.message = this.sendForm.message === '';
          }
        });
      },
      validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
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
      border: 1.5px solid $color-grey;
    }
  }

  .invalid {
    background-color: #ffebe3;

    &:focus {
      border: 1.5px solid $color-alert;
    }
  }

  .error-message {
    color: $color-alert;
    font-size: 1.7rem;
    padding-left: 1rem;
  }

  .contact-form {
    width: 80rem;
    max-width: 100%;
    margin: 0 auto;
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
      width: 100%;
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
        background-color: $color-secondary-light;
        cursor: pointer;
      }

      &:active {
        transform: translateY(3px);
        background-color: $color-secondary-dark;
      }

      &:focus {
        outline: none;
      }
    }
  }

  .disabled {
    background-color: rgba($color-grey, .3) !important;
    box-shadow: none;

    &:hover {
      cursor: auto;
    }
  }

  .form-sent {
    margin-top: 2rem;
    
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