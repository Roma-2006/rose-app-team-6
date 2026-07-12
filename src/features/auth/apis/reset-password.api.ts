type ResetPasswordPayload = {
  token: string;
  newPassword: string;
  confirmPassword: string;
};

type ResetPasswordResponse = {
  status: boolean;
  code?: number;
  message?: string;
  payload?: unknown;
};

export async function resetPassword(data: ResetPasswordPayload): Promise<ResetPasswordResponse> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

  // NEXT_PUBLIC_API_URL already includes /api prefix.
  const finalUrl = `${apiBaseUrl}/api/auth/reset-password`;

  const response = await fetch(finalUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  });

  return (await response.json()) as ResetPasswordResponse;
}
