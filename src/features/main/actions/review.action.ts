'use server';

import { authOptions } from '@/auth';
import { getServerSession } from 'next-auth/next';
import { IAddReviewFormData } from '../types/product-reviews';
import { IAddReviewActionResponse, IAddReviewResponse } from '../types/api';

export async function CreateReviewAction(
  data: IAddReviewFormData & { productId: string }
): Promise<IAddReviewActionResponse> {
  try {
    const session = await getServerSession(authOptions);

    // Verify the token...
    if (!session || !session.token) {
      throw new Error('Unauthorized: Please login first');
    }

    const payload: IReviewApiPayload = {
      productId: data.productId,
      headline: data.title,
      content: data.review,
      rating: data.rating,
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = (await response.json().catch(() => ({}))) as IAddReviewResponse;
      throw new Error(errorData.message || 'Failed to create review');
    }

    const result = await response.json();

    if (result.status) {
      return { success: true, message: result.message || 'Review created successfully' };
    } else {
      return { success: false, error: result.message || 'Failed to create review' };
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Something went wrong';
    return { success: false, error: errorMessage };
  }
}
