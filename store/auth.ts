import { defineStore } from "pinia";
import Gleap from "gleap";

import api from "../api";
import { useRequestsStore } from "./requests";
import {
  User,
  UserTypeEnum,
  FreelancerProfile,
  BusinessProfile,
  CompletePasswordResetRequest,
  UserTypeUpdateRequest,
} from "../types";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      form: {
        email: "",
        password: "",
      },
      token: "",
      user: {
        type: UserTypeEnum.FREELANCER,
      } as User,
      profile: {} as FreelancerProfile,
      businessProfile: {} as BusinessProfile,
    };
  },

  getters: {
    getToken: (state) => state.token,
    isAuthenticated: (state) => !!state.token,
    profileFetched: (state) => !!Object.keys(state.profile).length,
    profileCompletionFlags: (state) => {
      let kycCompleted = false;
      let personalCompleted = false;
      let hasSkills = false;
      let professionalCompleted = false;
      let hasProjects = false;
      let companyCompleted = false;

      if (!Object.keys(state.profile).length) {
        return [
          kycCompleted,
          personalCompleted,
          hasSkills,
          professionalCompleted,
          hasProjects,
          companyCompleted,
        ];
      }

      kycCompleted = !!state.profile.kyc?.isVerified;
      personalCompleted = Object.values(state.profile.personal).every(
        (value) => !!value
      );

      if (state.user.type === UserTypeEnum.FREELANCER) {
        hasSkills = !!state.profile.personal?.skills.length;
        professionalCompleted = Object.values(state.profile.professional).every(
          (value) => !!value.length
        );
        hasProjects = !!state.profile.portfolio.length;
      }

      if (state.user.type === UserTypeEnum.BUSINESS) {
        const temp = { ...state.profile.company };
        delete (temp as any).__v;
        delete (temp as any)._id;
        delete (temp as any).createdAt;
        delete (temp as any).updatedAt;
        delete (temp as any).user;
        const values = Object.values(temp);
        companyCompleted =
          !!values.length && values.every((value) => !!value.length);
      }

      return [
        kycCompleted,
        personalCompleted,
        hasSkills,
        professionalCompleted,
        hasProjects,
        companyCompleted,
      ];
    },
    profileCompletionPrecent(state): number {
      const [
        kycCompleted,
        personalCompleted,
        hasSkills,
        professionalCompleted,
        hasProjects,
        companyCompleted,
      ] = this.profileCompletionFlags;

      const sections = [kycCompleted];

      if (state.user.type === UserTypeEnum.FREELANCER) {
        sections.push(personalCompleted && hasSkills);
        sections.push(professionalCompleted);
        sections.push(hasProjects);
      }

      if (state.user.type === UserTypeEnum.BUSINESS) {
        sections.push(personalCompleted);
        sections.push(companyCompleted);
      }

      const total = sections.length;
      const completed = sections.filter((s) => s).length;

      return Math.floor((completed / total) * 100);
    },
    isFreelancer: (state) => state.user.type === UserTypeEnum.FREELANCER,
    isBusiness: (state) => state.user.type === UserTypeEnum.BUSINESS,
  },

  actions: {
    setAuthSession() {
      api.setToken(this.token);

      const maxAge = 1 * 60 * 60 * 24;
      const expires = new Date(Date.now() + maxAge * 1000);
      const options = {
        maxAge,
        expires,
      };
      useCookie("token", options).value = this.token;
      useCookie<User>("user", options).value = this.user;

      Gleap.identify(this.user.email, {
        email: this.user.email,
      });
    },
    async register(referralCode?: string) {
      const requestsStore = useRequestsStore();
      const endRequest = requestsStore.startRequest();

      try {
        const res = await api.register({
          ...this.form,
          type: this.user.type,
          referralCode,
        });

        this.token = res.data.token;
        this.user = res.data.user;

        this.setAuthSession();
      } finally {
        endRequest();
      }
    },

    async login() {
      const requestsStore = useRequestsStore();
      const endRequest = requestsStore.startRequest();

      try {
        const res = await api.login({
          ...this.form,
        });

        this.token = res.data.token;
        this.user = res.data.user;

        this.setAuthSession();
      } finally {
        endRequest();
      }
    },

    logout() {
      const maxAge = -1000;
      const expires = new Date(Date.now() + maxAge * 1000);
      const options = {
        maxAge,
        expires,
      };

      useCookie<any>("token", options).value = "";
      useCookie<any>("user", options).value = "";

      Gleap.clearIdentity();

      window.location.href = window.location.origin + "/sign-in";
    },

    async initatePasswordReset() {
      const requestsStore = useRequestsStore();
      const endRequest = requestsStore.startRequest();

      try {
        await api.resetPasswordInitiate(this.form.email);
      } finally {
        endRequest();
      }
    },

    async sendEmailVerificationLink() {
      const requestsStore = useRequestsStore();
      const endRequest = requestsStore.startRequest();

      try {
        return await api.verifyEmailInitiate();
      } finally {
        endRequest();
      }
    },

    async verifyEmail(email: string, token: string) {
      const res = await api.verifyEmailComplete(email, token);

      this.token = res.data.token;
      this.user = res.data.user as User;

      return res;
    },

    async completePasswordReset(data: CompletePasswordResetRequest) {
      const requestsStore = useRequestsStore();
      const endRequest = requestsStore.startRequest();

      try {
        const res = await api.resetPasswordComplete(data);

        return res;
      } finally {
        endRequest();
      }
    },

    async getProfile() {
      const requestsStore = useRequestsStore();
      const endRequest = requestsStore.startRequest();

      try {
        const res = await api.getUserProfile();
        this.profile = res.data as any;

        return res;
      } finally {
        endRequest();
      }
    },

    async getUser() {
      const requestsStore = useRequestsStore();
      const endRequest = requestsStore.startRequest();

      try {
        const res = await api.getUserDetails();
        this.user = res.data as any;
        useCookie<User>("user").value = this.user;

        return res;
      } finally {
        endRequest();
      }
    },

    async updateProfile(data: any) {
      const requestsStore = useRequestsStore();
      const endRequest = requestsStore.startRequest();

      try {
        const res = await api.patchPersonalProfile(data);
        await this.getProfile();

        return res;
      } finally {
        endRequest();
      }
    },

    async updateProfileImage(s3Key: string) {
      const requestsStore = useRequestsStore();
      const endRequest = requestsStore.startRequest();

      try {
        const res = await api.updateProfileImage(s3Key);
        this.profile = res.data;

        return res;
      } finally {
        endRequest();
      }
    },

    async setUserAccountType(data: UserTypeUpdateRequest) {
      const requestsStore = useRequestsStore();
      const endRequest = requestsStore.startRequest();

      try {
        const res = await api.setUserType(data);
        await this.getUser();

        return res;
      } finally {
        endRequest();
      }
    },
  },
});
