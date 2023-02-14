import { defineStore } from 'pinia';

import api from '../api';
import { useRequestsStore } from './requests';
import { IFreelancer } from '../types';

export const useFreelancerStore = defineStore('freelancers', {
  state: () => {
    return {
      selectedFreelancer: {} as IFreelancer,
      allFreelancers: [] as IFreelancer[],
      hiredFreelancers: [],
      savedFreelancers: [],
      invitedFreelancers: [],
    };
  },

  getters: {},

  actions: {
    async getFreelancers() {
      const requestsStore = useRequestsStore();
      const endRequest = requestsStore.startRequest();
      try {
        const res = await api.getAllFreelancers();
        this.allFreelancers = res.data;
      } finally {
        endRequest();
      }
    },
    async getAFreelancers(freelancerId: string) {
      const requestsStore = useRequestsStore();
      const endRequest = requestsStore.startRequest();
      try {
        const res = await api.fetchAFreelancer(freelancerId);
        this.selectedFreelancer = res.data;
      } finally {
        endRequest();
      }
    },
  },
});
