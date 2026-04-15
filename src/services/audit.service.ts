import { getToken } from './auth.service';

const BASE_URL = 'http://209.209.42.109:5084/api/feedback';

export const logAction = async (
  action: string,
  details?: string,
  entityId?: number
): Promise<void> => {
  try {
    const token = getToken();
    await fetch(`${BASE_URL}/log-action`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ action, details, entityId }),
    });
  } catch {
    // Silent fail
  }
};