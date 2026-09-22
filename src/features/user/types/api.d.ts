export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ActionResponse {
  success: boolean;

  message: string;
}
