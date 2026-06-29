import 'server-only';
import { HEADERS } from '@/shared/constants/api.constants';
import { Response } from '@/shared/types/api';
import { LoginFields, LoginResponse } from '../types/auth';
import { API_ENDPOINTS } from '../constants/endpoints';


export const login = async (loginFields: LoginFields) => {
  // console.log (`URL : ${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.login}`)
  // console.log(`Body: ${JSON.stringify(loginFields)}`); 

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.login}`, {
    method: 'POST',
    body: JSON.stringify(loginFields),
    headers: {
      ...HEADERS.jsonBody,
    },
  });

  if (!response.ok) {
    throw new Error(`Login request failed: ${response.status}`);
  }

  const payload: Response<LoginResponse> = await response.json();
  return payload;
};
