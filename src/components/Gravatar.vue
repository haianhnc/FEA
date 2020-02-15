<template>
  <img
    :src="url"
    :alt="alt"
    @load="onLoad"
    @error="onError"
  />
</template>

<script>
import md5 from 'md5';

export default {
  name: 'gravatar',
  props: {
    email: {
      type: String,
      default: '',
    },
  },
  computed: {
    url() {
      return ['https://www.gravatar.com/avatar/', md5(this.email.trim().toLowerCase()), 80, 'retro', 'g'].join('');
    },
  },
  methods: {
    onLoad(...args) {
      this.$emit('load', ...args);
    },
    onError(...args) {
      this.$emit('error', ...args);
    },
  },
};
</script>
