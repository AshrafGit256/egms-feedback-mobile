// 🔧 LOCAL API — switch to deployed URL when ready
const AUTH_BASE = "http://209.209.42.109:5085/api/auth";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName?: string;
  lastName?: string;
  first_Name?: string;
  last_Name?: string;
  email: string;
  password: string;
  role?: string;
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

export const saveAuth = (data: AuthResponse) => {
  localStorage.setItem("auth_token", data.token);
  localStorage.setItem("auth_user", JSON.stringify(data));
};

export const getToken = (): string | null => localStorage.getItem("auth_token");

export const getUser = (): AuthResponse | null => {
  const u = localStorage.getItem("auth_user");
  return u ? JSON.parse(u) : null;
};

export const isLoggedIn = (): boolean => !!getToken();

export const clearAuth = () => {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_user");
};

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  let res: Response;
  try {
    res = await fetch(`${AUTH_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch {
    throw new Error("Cannot reach the server. Make sure the API is running.");
  }
  if (!res.ok) {
    let message = "Login failed. Please check your credentials.";
    try {
      const err = await res.json();
      message =
        err.message ||
        err.errors?.[0] ||
        (res.status === 401 ? "Invalid email or password." : message);
    } catch {
      /* non-JSON */
    }
    throw new Error(message);
  }
  return res.json();
};

export const register = async (
  data: RegisterRequest,
): Promise<{ message: string }> => {
  let res: Response;
  try {
    res = await fetch(`${AUTH_BASE}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch {
    throw new Error("Cannot reach the server. Make sure the API is running.");
  }
  if (!res.ok) {
    try {
      const err = await res.json();
      console.error("FULL BACKEND ERROR:", JSON.stringify(err, null, 2));

      // ✅ Extract ASP.NET validation errors properly
      if (err.errors) {
        const messages = Object.entries(err.errors)
          .map(([field, msgs]: any) => `${field}: ${msgs.join(", ")}`)
          .join(" | ");

        throw new Error(messages);
      }

      if (err.message) {
        throw new Error(err.message);
      }

      throw new Error(JSON.stringify(err));
    } catch (parseError) {
      throw new Error(`Registration failed (status ${res.status})`);
    }
  }
  return res.json();
};

export const getMe = async (): Promise<any> => {
  const token = getToken();
  let res: Response;
  try {
    res = await fetch(`${AUTH_BASE}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch {
    throw new Error("Cannot reach the server.");
  }
  if (!res.ok) throw new Error("Session expired. Please sign in again.");
  return res.json();
};

export const logout = async (): Promise<void> => {
  const token = getToken();
  try {
    await fetch(`${AUTH_BASE}/logout`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch {
    /* ignore */
  }
  clearAuth();
};
