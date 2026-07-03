const API = process.env.NEXT_PUBLIC_API_URL || "https://spaceclub.onrender.com";

export async function getStudentProfile(email: string, name?: string, photo?: string) {
  const params = new URLSearchParams({ email });
  if (name) params.append("name", name);
  if (photo) params.append("photo", photo);
  const res = await fetch(`${API}/api/student/me?${params}`);
  if (!res.ok) throw new Error("Failed to load profile.");
  return res.json();
}

export async function updateStudentProfile(data: Record<string, unknown>) {
  const res = await fetch(`${API}/api/student/me`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update profile.");
  return res.json();
}

export async function registerForEvent(email: string, eventId: string, title: string) {
  const res = await fetch(`${API}/api/student/register-event`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, eventId, title }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to register.");
  return data;
}

export async function markNotificationsRead(email: string) {
  await fetch(`${API}/api/student/mark-read`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
}

export async function getLeaderboard() {
  const res = await fetch(`${API}/api/student/leaderboard`);
  if (!res.ok) throw new Error("Failed to load leaderboard.");
  return res.json();
}
