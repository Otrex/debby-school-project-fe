import { UserTypeEnum } from './../types/enums/index';
import { useAuthStore } from './auth';
import { IMessage, MessageContentType } from './../types/models/index';
import { defineStore } from 'pinia';
import { useWebSocket } from '@vueuse/core';

import api from '../api';
export enum WSActionEnum {
  SEND_MESSAGE = 'create:message',
  SUBSCRIBE = 'subscribe',
}

type WSMessage = { type: string; message: IMessage | any };
type MessageRequest = {
  content: string;
  contentType: MessageContentType.TEXT;
  conversation: string;
  flag?: string;
};
type StoreState = {
  me?: string;
  close: boolean;
  popup: boolean;
  title?: string;
  loading: boolean;
  client?: WebSocket;
  unreadMessage: number;
  conversationId?: string;
  userType?: UserTypeEnum;
  messages: IMessage[];
  messageEl: any;
  name: string;
  hasInvitedAdmin: boolean;
};

export enum SendMessageType {
  RECIEVED = 'recieved',
  SENT = 'sent',
  ERROR = 'error',
}

export const useMessagingStore = defineStore('messaging', {
  state: (): StoreState => {
    return {
      me: undefined,
      close: false,
      popup: false,
      title: undefined,
      client: undefined,
      loading: false,
      unreadMessage: 0,
      userType: undefined,
      conversationId: undefined,
      messages: [],
      name: '',
      messageEl: null,
      hasInvitedAdmin: false,
    };
  },

  getters: {
    getMessages: (state) => state.messages,
  },

  actions: {
    tooglePopup() {
      this.popup = !this.popup;
      if (this.popup) this.unreadMessage = 0;
    },

    setCredentials(conversationId: string, title: string) {
      const auth = useAuthStore();
      this.conversationId = conversationId;
      this.name = auth.user.firstName as string;
      this.title = title;
    },

    clearState() {
      this.messages = [];
    },

    async startMessaging() {
      const auth = useAuthStore();
      this.clearState();
      try {
        this.loading = true;
        await this.connect();

        this.me = auth.user._id;
        this.userType = auth.user.type;
        await this.getPreviousMessages();

        this.close = false;
      } finally {
        this.loading = false;
      }
    },

    connectToReceiver(wsUrl: string) {
      const auth = useAuthStore();
      useWebSocket(wsUrl, {
        autoReconnect: true,
        heartbeat: true,

        onConnected: (ws) => {
          this.client = ws;
          ws.send(
            JSON.stringify({
              action: WSActionEnum.SUBSCRIBE,
              payload: { token: auth.token },
            })
          );
          console.log({
            message: 'ws connection successful',
            timestamp: new Date(),
          });
        },
        onMessage: (ws, event) => {
          const payload = JSON.parse(event.data.toString()) as WSMessage;
          switch (payload.type) {
            case SendMessageType.ERROR:
              console.log(payload.message);
              break;

            case SendMessageType.RECIEVED:
              if (!this.popup) this.unreadMessage += 1;
              if (this.conversationId === payload.message.conversation) {
                this.messages.push(payload.message);
              }
              break;

            case SendMessageType.SENT:
              const message: IMessage = payload.message;
              const idx = this.messages.findIndex(
                (m) => m.content === message.content
              );
              this.messages[idx] = message;
              break;

            default:
              break;
          }
          this.scrollToBottom();
        },
        onDisconnected: (ws) => {
          console.log({
            message: 'ws disconnected successful',
            timestamp: new Date(),
          });
          this.client = undefined;
        },
      });
    },

    scrollToBottom() {
      this.messageEl?.scroll({
        top: this.messageEl?.scrollHeight,
        behavior: 'smooth',
      });
    },

    async connect() {
      try {
        this.loading = true;
        this.clearState();
        await api.connectToMessaging();
      } finally {
        this.loading = false;
      }
    },

    async getPreviousMessages(conversationId?: string) {
      try {
        this.clearState();
        this.loading = true;
        if (!this.conversationId && conversationId) {
          this.conversationId = conversationId;
        }
        console.log('id', this.conversationId);
        const res = await api.getPreviousMessaging(this.conversationId!);
        this.messages = res.data.data;
      } finally {
        this.loading = false;
      }
    },

    async inviteAdmin(conversationId?: string) {
      try {
        this.loading = true;
        if (!this.conversationId && conversationId) {
          this.conversationId = conversationId;
        }
        console.log('id', this.conversationId);
        await this.checkIfAdminIsInvited();
        await api.inviteAdmin(this.conversationId!);
      } finally {
        this.loading = false;
      }
    },

    async sendMessage(message: Partial<IMessage>) {
      try {
        this.loading = true;
        const msgRequest = {
          ...message,
          conversation: this.conversationId,
          sender: this.me,
        };

        this.client?.send(
          JSON.stringify({
            action: WSActionEnum.SEND_MESSAGE,
            payload: msgRequest,
          })
        );

        this.messages.push(msgRequest as any);
      } catch (err) {
        console.log('message could not be sent');
      } finally {
        this.loading = false;
        // console.log(this.messages);
      }
    },

    async checkIfAdminIsInvited() {
      console.log('calling...');
      if (!this.conversationId) {
        // TODO throw conversation error
        return;
      }
      try {
        this.loading = true;
        const res = await api.getInvite(this.conversationId);
        const invite = res.data.data;
        this.hasInvitedAdmin = !!invite._id;
        return this.hasInvitedAdmin;
      } finally {
        this.loading = false;
      }
    },
  },
});
