<template>
  <div>
    <AccountPanel v-if="isFinishLoading" :user="user" @updateUserInfo="updateUserInfo"/>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import AccountPanel from '../components/AccountPanel';

export default {
  name: 'Home',
  components: {
    AccountPanel,
  },
  data() {
    return {
      isFinishLoading: false,
    };
  },
  computed: {
    ...mapState('account', ['user']),
  },
  async mounted() {
    await this.getUserInformation({ id: 1 });
    this.isFinishLoading = true;
  },
  methods: {
    ...mapActions('account', ['getUserInformation', 'putUserInformation']),
    async updateUserInfo(params) {
      await this.putUserInformation(params);
    },
  },
};
</script>
