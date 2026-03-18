const BASE_URL = 'http://209.209.42.109:5084/api/feedback';

export const logAction = async (
  action: string,
  details?: string,
  entityId?: number
): Promise<void> => {
  try {
    await fetch(`${BASE_URL}/log-action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, details, entityId }),
    });
  } catch {
    // Silently fail — never block the user for a logging error
  }
};