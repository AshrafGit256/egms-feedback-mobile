const BASE_URL = 'http://localhost:5084/api/feedback';

export interface FeedbackSubmit {
  Event_id: number;
  Rating: number;
  Category: string;
  Message: string;
  Is_Anonymous: boolean;
}

export const submitFeedback = async (data: FeedbackSubmit) => {
  const response = await fetch(`${BASE_URL}/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.title || 'Submission failed');
  }
  return response.json();
};

export const getFeedbackStatus = async (id: number) => {
  const response = await fetch(`${BASE_URL}/status/${id}`);
  if (!response.ok) throw new Error('Feedback not found');
  return response.json();
};

export const getFeedbackByEvent = async (eventId: number) => {
  const response = await fetch(`${BASE_URL}/event/${eventId}`);
  if (!response.ok) throw new Error('Failed to fetch feedback');
  return response.json();
};

export const updateFeedbackStatus = async (id: number, status: string) => {
  const response = await fetch(`${BASE_URL}/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(status),
  });
  if (!response.ok) throw new Error('Failed to update status');
  return response.json();
};

export const getAnalytics = async (eventId: number) => {
  const response = await fetch(`${BASE_URL}/analytics/${eventId}`);
  if (!response.ok) throw new Error('Failed to fetch analytics');
  return response.json();
};

export const getEvents = async () => {
  const response = await fetch(`${BASE_URL}/events`);
  if (!response.ok) throw new Error('Failed to fetch events');
  return response.json();
};