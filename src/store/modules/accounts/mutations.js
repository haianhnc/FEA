import * as types from './mutation-types';

export default {
  [types.SET_USER_INFORMATION](state, data) {
    state.user = data;
  },
};
