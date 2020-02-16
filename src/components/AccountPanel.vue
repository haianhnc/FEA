<template>
  <div>
    <section class="section">
      <Gravatar :email="email" />
        <div class="columns">
          <div class="column is-4 is-offset-4">
              <div class="field">
                <label class="label title-s1">Your Account Information</label>
              </div>
              <div v-show="!isEditing" class="field has-text-centered">
                {{ first_name }} {{ last_name }}
              </div>
              <div v-show="isEditing" class="columns">
                <div class="column field">
                  <div class="control">
                    <ValidationProvider ref="firstNameValidator" v-slot="v" rules="required">
                      <input
                        class="input"
                        type="text"
                        placeholder="First Name"
                        v-model="first_name"
                        :disabled="!isEditing"
                      >
                    <p class="help is-danger">{{ v.errors[0] }}</p>
                    </ValidationProvider>
                  </div>
                </div>
                <div class="column field">
                  <div class="control">
                    <ValidationProvider ref="lastNameValidator" v-slot="v" rules="required">
                      <input
                        class="input"
                        type="text" placeholder="Last Name"
                        v-model="last_name"
                        :disabled="!isEditing"
                      >
                      <p class="help is-danger">{{ v.errors[0] }}</p>
                    </ValidationProvider>
                  </div>
                </div>
              </div>
              <div class="field">
                <div class="control has-icons-left has-icons-right">
                  <ValidationProvider ref="emailValidator" v-slot="v" rules="required">
                    <input
                      class="input"
                      type="email"
                      placeholder="Email input"
                      v-model="email"
                      :disabled="!isEditing"
                    >
                    <span class="icon is-small is-left">
                    <i class="fa fa-envelope"></i>
                    </span>
                    <span class="icon is-small is-right">
                    <i class="fa fa-warning"></i>
                    </span>
                    <p class="help is-danger">{{ v.errors[0] }}</p>
                  </ValidationProvider>
                </div>
              </div>
              <div class="field">
                <ValidationProvider ref="passwordValidator" v-slot="v" rules="strong_password|required">
                  <p class="control has-icons-left">
                      <input
                        class="input"
                        :type="isShowPassword ? 'text' : 'password'"
                        placeholder="Password"
                        v-model="password"
                        :disabled="!isEditing"
                      >
                      <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                      </span>
                      <span
                        :class="['fa fa-fw fa-eye field-icon', { 'fa-eye-slash': isShowPassword }]"
                        @click="togglePasswordEye"
                      >
                      </span>
                  </p>
                  <Password
                    v-show="isEditing"
                    placeholder="Password"
                    v-model="password"
                    :strength-meter-only="true"
                  />
                  <p v-show="isEditing" class="help is-danger">{{ v.errors[0] }}</p>
                </ValidationProvider>
              </div>
              <div>
                  <button
                    class="button is-link "
                    @click="handleClick">
                     <span class="icon is-small">
                      <i :class="['fas', {'fa-check': isEditing}, { 'fa-edit': !isEditing }]"></i>
                    </span>
                    <span>{{ isEditing ? 'Submit' : 'Edit' }}</span>
                  </button>
                  <button
                    v-if="isEditing"
                    class="button is-warning"
                    @click="handleCancel">
                      <span class="icon is-small">
                        <i class="fas fa-times"></i>
                      </span>
                      <span> Cancel </span>
                  </button>
              </div>
          </div>
        </div>
    </section>
  </div>
</template>
<script>
import { ValidationProvider, extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';
import Password from 'vue-password-strength-meter';
import Gravatar from './Gravatar';

extend('required', {
  ...required,
  message: 'This field is required',
});
extend('email', {
  ...email,
  message: 'This email is invalid',
});

extend('strong_password', {
  message: 'The password should contain at least: 1 uppercase letter, 1 lowercase letter, 1 number, and one special character (E.g. , . _ & ? etc)',
  validate: (value) => {
    const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
    return strongRegex.test(value);
  },
});

export default {
  name: 'AccountPanel',
  components: {
    ValidationProvider,
    Gravatar,
    Password,
  },
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      first_name: this.user.first_name || '',
      last_name: this.user.last_name || '',
      email: this.user.email || '',
      password: this.user.password || '',
      isEditing: false,
      isShowPassword: false,
    };
  },
  methods: {
    handleClick() {
      if (this.isEditing) {
        // validate
        if (this.$refs.firstNameValidator.errors[0]) return;
        if (this.$refs.lastNameValidator.errors[0]) return;
        if (this.$refs.emailValidator.errors[0]) return;
        if (this.$refs.passwordValidator.errors[0]) return;
        // save data
        const params = {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          password: this.password,
        };
        this.$emit('updateUserInfo', params);
        this.isEditing = false;
      } else {
        this.isEditing = true;
      }
      this.isShowPassword = false;
    },
    handleCancel() {
      this.isEditing = false;
      this.isShowPassword = false;
    },
    togglePasswordEye() {
      this.isShowPassword = !this.isShowPassword;
    },
  },
};
</script>
<style scoped>
  .title-s1 {
    font-size: 18px;
  }
  .field-icon {
    float: right;
    margin-top: -25px;
    position: relative;
    z-index: 2;
  }
</style>
