export const forgotPassword = async (email: string, redirectUrl: string) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, redirectUrl }),
    });

    return await response.json();
  } catch (error) {
    return { status: false, message: 'Connection error' };
  }
};
