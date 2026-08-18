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

export async function uploadPhoto(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);
  const res = await fetch(`${API}/api/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${getToken()}` },
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Upload failed.");
  return data.url;
}

// ── ANNOUNCEMENTS ──
export async function getAnnouncements() {
  const res = await fetch(`${API}/api/admin/announcements/all`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  if (!res.ok) return [];
  return res.json();
}

export async function createAnnouncement(data: { title: string; message: string; type: string }) {
  const res = await fetch(`${API}/api/admin/announcements`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create announcement.");
  return res.json();
}

export async function toggleAnnouncement(id: string, active: boolean) {
  const res = await fetch(`${API}/api/admin/announcements/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
    body: JSON.stringify({ active }),
  });
  if (!res.ok) throw new Error("Failed to update.");
  return res.json();
}

export async function deleteAnnouncement(id: string) {
  await fetch(`${API}/api/admin/announcements/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` },
  });
}

export async function broadcastToAll(message: string, type: string) {
  const res = await fetch(`${API}/api/admin/broadcast`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
    body: JSON.stringify({ message, type }),
  });
  if (!res.ok) throw new Error("Broadcast failed.");
  return res.json();
}

// ── EVENTS ──
export async function getAdminEvents() {
  const res = await fetch(`${API}/api/admin/events`, { headers: headers() });
  if (!res.ok) return [];
  return res.json();
}

export async function createEvent(data: object) {
  const res = await fetch(`${API}/api/admin/events`, {
    method: "POST", headers: headers(), body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create event.");
  return res.json();
}

export async function updateEvent(id: string, data: object) {
  const res = await fetch(`${API}/api/admin/events/${id}`, {
    method: "PATCH", headers: headers(), body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update event.");
  return res.json();
}

export async function deleteEvent(id: string) {
  await fetch(`${API}/api/admin/events/${id}`, { method: "DELETE", headers: headers() });
}
