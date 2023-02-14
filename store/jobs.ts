import { defineStore } from "pinia";

import api from "../api";
import { useRequestsStore } from "./requests";
import {
  IBusinessJob,
  IOngoingJob,
  IProposalDetail,
  IPublishedJobs,
} from "../types";

export const useJobStore = defineStore("jobs", {
  state: () => {
    return {
      publishedJobs: [] as IPublishedJobs[],
      selectedJob: {} as IBusinessJob,
      allJobs: [] as IBusinessJob[],
      allProposals: [],
      hiredJobs: [] as IOngoingJob[],
      completedJobs: [] as IOngoingJob[],
      savedJobs: [],
      invitedJobs: [] as any[],
      proposal: {} as IProposalDetail,
      edittingState: false,
    };
  },

  getters: {},

  actions: {
    async getPublishedJobs() {
      const requestsStore = useRequestsStore();
      const endRequest = requestsStore.startRequest();
      try {
        const res = await api.getPublishedJobs();
        this.publishedJobs = res.data;
      } finally {
        endRequest();
      }
    },

    async getHiredJobs(status: string) {
      const requestsStore = useRequestsStore();
      const endRequest = requestsStore.startRequest();
      try {
        const res = await api.fetchHiredJobs(status);
        if(status === 'completed') {
          this.completedJobs = res.data;
        }
        else this.hiredJobs = res.data;
      } finally {
        endRequest();
      }
    },

    async getSavedJobs() {
      const requestsStore = useRequestsStore();
      const endRequest = requestsStore.startRequest();
      try {
        const res = await api.fetchSavedJobs();
        this.savedJobs = res.data;
      } finally {
        endRequest();
      }
    },

    async getInvitedJobs() {
      const requestsStore = useRequestsStore();
      const endRequest = requestsStore.startRequest();
      try {
        const res = await api.fetchInvitedJobs();
        this.invitedJobs = res.data;
      } finally {
        endRequest();
      }
    },

    async saveAJob(jobId: string) {
      const requestsStore = useRequestsStore();
      const endRequest = requestsStore.startRequest();
      try {
        const res = await api.saveAJob(jobId);
      } finally {
        endRequest();
      }
    },

    async fetchAJob(jobId: string) {
      const requestsStore = useRequestsStore();
      const endRequest = requestsStore.startRequest();
      try {
        const res = await api.fetchAJob(jobId);
        this.selectedJob = res.data;
      } finally {
        endRequest();
      }
    },

    async postAproposal(proposalId: string, proposalData: any) {
      const requestsStore = useRequestsStore();
      const endRequest = requestsStore.startRequest();
      try {
        const res = await api.postAProposal(proposalId, proposalData);
      } finally {
        endRequest();
      }
    },

    async fetchProposals(jobId: string) {
      const requestsStore = useRequestsStore();
      const endRequest = requestsStore.startRequest();
      try {
        const res = await api.fetchProposals();
        this.allProposals = res.data;
      } finally {
        endRequest();
      }
    },

    // Business
    async getJobs() {
      const requestsStore = useRequestsStore();
      const endRequest = requestsStore.startRequest();
      try {
        const res = await api.getJobs();
        console.log("res");
        console.log(res.data.length);
        console.log(JSON.stringify(res.data));
        this.allJobs = [...res.data];
      } finally {
        endRequest();
      }
    },

    async postAJob(jobData: any) {
      const requestsStore = useRequestsStore();
      const endRequest = requestsStore.startRequest();
      try {
        const res = await api.postAJob(jobData);

        return res;
      } finally {
        endRequest();
      }
    },
    async patchAJob(jobId: string, jobData: any) {
      const requestsStore = useRequestsStore();
      const endRequest = requestsStore.startRequest();
      try {
        const res = await api.patchAJob(jobId, jobData);
      } finally {
        endRequest();
      }
    },
    async publishAJob(jobId: string) {
      const requestsStore = useRequestsStore();
      const endRequest = requestsStore.startRequest();
      try {
        const res = await api.publishAJob(jobId);
      } finally {
        endRequest();
      }
    },
    async inviteAFreelancer(jobId: string, freelancerId: string) {
      const requestsStore = useRequestsStore();
      const endRequest = requestsStore.startRequest();
      try {
        const res = await api.inviteAFreelancer(jobId, freelancerId, "");
      } finally {
        endRequest();
      }
    },
    async getAJobProposal(jobId: string) {
      const requestsStore = useRequestsStore();
      const endRequest = requestsStore.startRequest();
      try {
        const res = await api.getAJobProposal(jobId);
        return res;
      } finally {
        endRequest();
      }
    },
  },
});
