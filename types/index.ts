export interface User {
  _id?: string;
  email: string;
  emailVerifiedAt?: string;
  username?: string;
  type: UserTypeEnum;
  country?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  phoneNumberVerifiedAt?: Date;
  referralCode: string;
  kycVerifications: any[];
}

export enum UserTypeEnum {
  ADMIN = 'admin',
  STUDENT = 'student',
}

export interface RegisterRequest {
  email: string;
  password: string;
  type: UserTypeEnum;
  referralCode?: string;
}

export interface RegisterResponse {
  status: string;
  data: {
    user: User;
    token: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  data: {
    user: User;
    token: string;
  };
}

export interface UserTypeUpdateRequest {
  type: Exclude<UserTypeEnum, 'none'>;
}

export interface UserTypeUpdateResponse {
  status: string;
  message: string;
}

export interface InitiatePasswordResetRequest {
  email: string;
}

export interface CompletePasswordResetRequest {
  email: string;
  password: string;
  token: string;
}

export interface InitiateEmailVerificationResponse {
  status: string;
  data: {
    resendDelaySeconds: number;
  };
}
