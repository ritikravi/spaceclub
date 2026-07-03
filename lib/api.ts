const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://spaceclub.onrender.com";

export async function submitJoinForm(data: {
  name: string;
  email: string;
  phone: string;
  year: string;
  branch: string;
  division: string;
  why: string;
}) {
  const res = await fetch(`${API_BASE}/api/join`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Something went wrong.");
  return json;
}

export async function submitContactForm(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const res = await fetch(`${API_BASE}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Something went wrong.");
  return json;
}

export async function fetchEvents(status?: "upcoming" | "past") {
  const url = status ? `${API_BASE}/api/events?status=${status}` : `${API_BASE}/api/events`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch events.");
  return res.json();
}

export async function getPublicAnnouncements() {
  try {
    const res = await fetch(`${API_BASE}/api/admin/announcements`);
    if (!res.ok) return [];
    return res.json();
  } catch { return []; }
}
