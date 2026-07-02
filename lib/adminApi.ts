const API = process.env.NEXT_PUBLIC_API_URL || "https://spaceclub.onrender.com";

function getToken() {
  return typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
}

function headers() {
  return { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` };
}

export async function adminLogin(password: string) {
  const res = await fetch(`${API}/api/admin/login`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Login failed.");
  localStorage.setItem("admin_token", data.token);
  return data;
}

export function adminLogout() { localStorage.removeItem("admin_token"); }
export function isLoggedIn() { return !!getToken(); }

async function req(path: string, method = "GET", body?: object) {
  const res = await fetch(`${API}/api/admin${path}`, {
    method, headers: headers(),
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed.");
  return data;
}

export const getStats = () => req("/stats");
export const getApplications = () => req("/applications");
export const updateApplication = (id: string, status: string) => req(`/applications/${id}`, "PATCH", { status });
export const deleteApplication = (id: string) => req(`/applications/${id}`, "DELETE");
export const getMessages = () => req("/messages");
export const markMessageRead = (id: string) => req(`/messages/${id}/read`, "PATCH");
export const deleteMessage = (id: string) => req(`/messages/${id}`, "DELETE");
export const getCoreMembers = () => req("/core-members");
export const addCoreMember = (data: object) => req("/core-members", "POST", data);
export const updateCoreMember = (id: string, data: object) => req(`/core-members/${id}`, "PATCH", data);
export const deleteCoreMember = (id: string) => req(`/core-members/${id}`, "DELETE");
