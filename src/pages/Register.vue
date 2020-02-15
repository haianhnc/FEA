<template>
  <div>
    <section class="section">
      <Gravatar :email="user.email" />
        <div class="columns">
          <div class="column is-4 is-offset-4">
              <div class="field">
                <label class="label title-s1">Your Account Information</label>
              </div>
              <div class="columns">
                <div class="column field">
                  <div class="control">
                      <input
                        class="input"
                        type="text"
                        placeholder="First Name"
                        :value="user.first_name"
                        :disabled="!isEditing"
                      >
                  </div>
                </div>
                <div class="column field">
                  <div class="control">
                      <input
                        class="input"
                        type="text" placeholder="Last Name"
                        :value="user.last_name"
                        :disabled="!isEditing"
                      >
                  </div>
                </div>
              </div>
              <div class="field">
                <!-- <label class="label">Email</label> -->
                <div class="control has-icons-left has-icons-right">
                    <input
                      class="input is-danger"
                      type="email"
                      placeholder="Email input"
                      :value="user.email"
                      :disabled="!isEditing"
                    >
                    <span class="icon is-small is-left">
                    <i class="fa fa-envelope"></i>
                    </span>
                    <span class="icon is-small is-right">
                    <i class="fa fa-warning"></i>
                    </span>
                </div>
                <p class="help is-danger">This email is invalid</p>
              </div>
              <div class="field">
                <p class="control has-icons-left">
                  <input
                    class="input"
                    :type="isShowPassword ? 'text' : 'password'"
                    placeholder="Password"
                    :value="user.password"
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
              </div>
              <div class="field is-grouped">
                <div class="control">
                    <button
                      class="button is-link"
                      @click="handleClick">
                        {{ isEditing ? 'Submit' : 'Edit' }}
                    </button>
                </div>
              </div>
          </div>
        </div>
    </section>
  </div>
</template>
<script>
import Gravatar from '../components/Gravatar';

export default {
  name: 'Register',
  components: {
    Gravatar,
  },
  data() {
    return {
      user: {
        first_name: 'DO MINH',
        last_name: 'HAI',
        email: 'haianhnc@gmail.com',
        password: 'toHardtof4ind',
      },
      isEditing: false,
      isShowPassword: false,
    };
  },
  asyncData() {
    console.log('WTF');
    // WIP fetching from API
    // this.user = {
    //   first_name: 'DO MINH',
    //   last_name: 'HAI',
    //   email: 'haianhnc@gmail.com',
    //   password: 'toHardtof4ind',
    // };
  },
  methods: {
    handleClick() {
      if (this.isEditing) {
        // save data
        this.isEditing = false;
      } else {
        this.isEditing = true;
      }
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
