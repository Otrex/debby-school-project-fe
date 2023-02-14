import { defineStore } from "pinia";

import api from "../api";
import { useRequestsStore } from "./requests";
import { IBusinessJob, IProposalDetail, IPublishedJobs } from "../types";

export const useBusinessJobsStore = defineStore("business-jobs", {
  state: () => ({
    loadingMyJobs: true,
    myJobs: [] as IBusinessJob[],
    ongoingJobs: [] as IBusinessJob[],
  }),

  actions: {
    async getJobs() {
      const requestsStore = useRequestsStore();
      const endRequest = requestsStore.startRequest();
      try {
        this.loadingMyJobs = true;
        const res = await api.getJobs();
        this.myJobs = [...res.data];
      } finally {
        endRequest();
        this.loadingMyJobs = false;
      }
    },
    async getOngoingJobs() {
      const requestsStore = useRequestsStore();
      const endRequest = requestsStore.startRequest();
      try {
        const res = await api.getOngoingJobs();
        this.ongoingJobs = [...res.data];
      } finally {
        endRequest();
      }
    },
  },
});
