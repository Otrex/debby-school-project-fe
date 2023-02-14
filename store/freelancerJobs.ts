import { defineStore } from "pinia";

import api from "../api";
import { useRequestsStore } from "./requests";
import { ProposalType, BudgetType, RateType, IRecommendedJob } from "../types";

export const useFJobsStore = defineStore("freelancerJobs", {
  state: () => {
    return {
      recommendedJobsCurrentPage: 0,
      isLoadingRecommendedJobs: true,
      hasMoreRecommendedJobs: true,
      recommendedJobs: [] as IRecommendedJob[],
      activeJob: {} as IRecommendedJob,
      savedJobs: [] as IRecommendedJob[],
      proposal: {
        form: {
          type: ProposalType.PAID,
          coverLetter: "",
          rateType: "",
          rate: "",
        },
      },
    };
  },

  getters: {
    isSavedJob: (state) => {
      return (jobId: string) => {
        return state.savedJobs.map((j) => j._id).includes(jobId);
      };
    },
  },

  actions: {
    async getSingleJob(jobId: string) {
      const requestsStore = useRequestsStore();
      const endRequest = requestsStore.startRequest();
      try {
        const res = await api.fetchAJobPublic(jobId);
        this.activeJob = res.data;

        this.resetProposalForm();

        this.proposal.form.rateType =
          this.activeJob.budgetType === BudgetType.PER_HOUR
            ? RateType.PER_HOUR
            : RateType.FIXED_PRICE;

        return res;
      } finally {
        endRequest();
      }
    },

    resetProposalForm() {
      this.proposal.form.type = ProposalType.PAID;
      this.proposal.form.coverLetter = "";
      this.proposal.form.rateType = "";
      this.proposal.form.rate = "";
    },

    async submitProposal(jobId: string) {
      const requestsStore = useRequestsStore();
      const endRequest = requestsStore.startRequest();
      try {
        const res = await api.postAProposal(jobId, this.proposal.form);
        this.resetProposalForm();
        return res;
      } finally {
        endRequest();
      }
    },

    async getSavedJobs() {
      const requestsStore = useRequestsStore();
      const endRequest = requestsStore.startRequest();
      try {
        const res = await api.fetchSavedJobs();
        this.savedJobs = res.data.map((j: any) => j);
      } finally {
        endRequest();
      }
    },

    async getRecommendedJobs() {
      if (!this.hasMoreRecommendedJobs) {
        return;
      }

      const requestsStore = useRequestsStore();
      const endRequest = requestsStore.startRequest();

      try {
        this.recommendedJobsCurrentPage++;
        this.isLoadingRecommendedJobs = true;

        const res = await api.getRecommendedJobs(
          this.recommendedJobsCurrentPage
        );
        const recommendedJobs = res.data.map((j: any) => ({
          ...j.job,
          company: j.company,
        }));

        this.hasMoreRecommendedJobs = res.pageData.nextPage;
        this.recommendedJobs = this.recommendedJobs.concat(recommendedJobs);
      } finally {
        endRequest();
        this.isLoadingRecommendedJobs = false;
      }
    },
  },
});
