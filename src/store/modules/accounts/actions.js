import axios from 'axios';
import * as types from './mutation-types';

export default {
  async getUserInformation({ commit }, params) {
    try {
      const res = await axios.get(`http://demo3848931.mockable.io/user/${params.id}`);
      commit(types.SET_USER_INFORMATION, res.data);
    } catch (error) {
      // console.log('error', error)
    }
  },
  async putUserInformation({ commit }, params) {
    try {
      const res = await axios.put('http://demo3848931.mockable.io/user/1', params);
      if (res.data.success) {
        commit(types.SET_USER_INFORMATION, { ...params });
      } else {
        // console.log('error');
      }
    } catch (error) {
      // console.log('error', error)
    }
  },
};
