export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  errors?: unknown[];
};

export const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("batik_token");
};

export const setAuthSession = (token: string, user: unknown) => {
  localStorage.setItem("batik_token", token);
  localStorage.setItem("batik_user", JSON.stringify(user));
};

export async function apiRequest<T>(
  path: string,
  options: RequestInit & { auth?: boolean } = {}
): Promise<ApiResponse<T>> {
  const headers = new Headers(options.headers);
  const isFormData = options.body instanceof FormData;

  if (!isFormData && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (options.auth) {
    const token = getToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });
  const result = (await response.json().catch(() => ({
    success: false,
    message: "Response API bukan JSON valid",
    errors: [],
  }))) as ApiResponse<T>;

  if (!response.ok) {
    throw new Error(result.message || "Request API gagal");
  }

  return result;
}
