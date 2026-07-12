export const forgotPassword = async (email: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(`${baseUrl}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return await response.json();
  } catch (error) {
    return { status: false, message: 'Connection error' };
  }
};
