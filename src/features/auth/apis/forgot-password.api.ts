type ForgotPasswordResponse = {
  status: boolean;
  code?: number;
  message?: string;
  payload?: unknown;
};

export const forgotPassword = async (email: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const appBaseUrl = process.env.NEXT_PUBLIC_APP_URL;

  const redirectUrl = appBaseUrl ? `${appBaseUrl}/auth/reset-password` : '/auth/reset-password';

  try {
    const response = await fetch(`${baseUrl}/api/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        redirectUrl,
      }),
    });

    return (await response.json()) as ForgotPasswordResponse;
  } catch {
    return { status: false, message: 'Connection error' };
  }
};
