import { defineStore } from "pinia";

import api from "../api";
import { useRequestsStore } from "./requests";

export const useWalletStore = defineStore("wallet", {
  state: () => {
    return {
      loadingWallet: true,
      wallet: {
        balances: {},
        depositAddresses: [],
        transactions: [],
      } as {
        balances: Record<string, number>;
        depositAddresses: any[];
        transactions: {
          currency: string;
          amount: number;
          description: string;
          createdAt: string;
        }[];
      },
    };
  },

  getters: {
    ayaCreditsBalance: (state) => state.wallet.balances.AYA_CREDITS,
  },

  actions: {
    async getWallet() {
      const requestsStore = useRequestsStore();
      const endRequest = requestsStore.startRequest();
      
      try {
        this.loadingWallet = true;
        const res = await api.getWallet();
        this.wallet = res.data;
      } finally {
        this.loadingWallet = false;
        endRequest();
      }
    },

    async getWalletAddress(data: any) {
      const requestsStore = useRequestsStore();
      const endRequest = requestsStore.startRequest();

      try {
        const res = await api.createWalletAddresses(data);

        this.wallet.depositAddresses.push(res.data);

        return res;
      } finally {
        endRequest();
      }
    },
  },
});
