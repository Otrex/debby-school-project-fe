import { defineStore } from 'pinia';

import api from '../api';
import { useRequestsStore } from './requests';

export const useMiscStore = defineStore('misc', {
  state: () => {
    return {
      searchTerm: '',
    };
  },
});
