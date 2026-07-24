export const cartApi = {
  async getCart(token: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch cart');
    }

    return response.json();
  },

  async addToCart(productId: string, quantity: number, token: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        productId,
        quantity,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to add product to cart');
    }

    return response.json();
  },

  async updateCartQuantity(itemId: string, quantity: number, token: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/${itemId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        quantity,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update cart quantity');
    }

    return response.json();
  },
};
