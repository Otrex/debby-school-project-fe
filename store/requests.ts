import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';

export const useRequestsStore = defineStore('requests', {
  state: () => {
    return {
      requests: new Set<string>(),
    };
  },

  getters: {
    hasActiveRequests: (state) => state.requests.size > 0,
  },

  actions: {
    startRequest() {
      const uuid = uuidv4();
      this.requests.add(uuid);
      return () => {
        this.requests.delete(uuid);
      };
    },
  },
});
