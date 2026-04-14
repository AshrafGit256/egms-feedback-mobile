const AUTH_BASE = 'http://209.209.42.109:5085/api/auth';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  first_Name: string;
  last_Name: string;
  email: string;
  password: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  userId: string;
  email: string;
  first_Name: string;
  last_Name: string;
  role: string;
  expires: string;
}

// Save token to localStorage
export const saveAuth = (data: AuthResponse) => {
  localStorage.setItem('auth_token',   data.token);
  localStorage.setItem('auth_user',    JSON.stringify(data));
};

// Get saved token
export const getToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

// Get saved user
export const getUser = (): AuthResponse | null => {
  const u = localStorage.getItem('auth_user');
  return u ? JSON.parse(u) : null;
};

// Check if logged in
export const isLoggedIn = (): boolean => {
  return !!getToken();
};

// Clear auth
export const clearAuth = () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('auth_user');
};

// POST /api/auth/login
export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const res = await fetch(`${AUTH_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.errors?.[0] || 'Login failed.');
  }
  return res.json();
};

// POST /api/auth/register
export const register = async (data: RegisterRequest): Promise<{ message: string }> => {
  const res = await fetch(`${AUTH_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.errors?.[0] || 'Registration failed.');
  }
  return res.json();
};

// GET /api/auth/me
export const getMe = async (): Promise<any> => {
  const token = getToken();
  const res = await fetch(`${AUTH_BASE}/me`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Session expired.');
  return res.json();
};

// POST /api/auth/logout
export const logout = async (): Promise<void> => {
  const token = getToken();
  await fetch(`${AUTH_BASE}/logout`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  clearAuth();
};