"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { getStudentProfile, updateStudentProfile, markNotificationsRead, getLeaderboard } from "@/lib/studentApi";
import { Bell, Star, Calendar, User, Edit2, Save, X, LogOut, Trophy, Rocket } from "lucide-react";
import Link from "next/link";

type Tab = "overview" | "profile" | "events" | "notifications" | "leaderboard";

const statusConfig: Record<string, { color: string; label: string; desc: string }> = {
  not_applied: { color: "text-gray-400 bg-gray-400/10", label: "Not Applied", desc: "You haven't applied to Space Club yet." },
  pending: { color: "text-yellow-400 bg-yellow-400/10", label: "⏳ Under Review", desc: "Your application is being reviewed by the team." },
  approved: { color: "text-green-400 bg-green-400/10", label: "✅ Approved", desc: "Welcome to LPU Space Club! You're an official member." },
  rejected: { color: "text-red-400 bg-red-400/10", label: "❌ Not Approved", desc: "Your application wasn't approved. You can reapply next semester." },
};

const skillsList = ["Python", "Arduino", "CAD", "MATLAB", "GIS", "Machine Learning", "PCB Design", "Astrophotography", "Research", "Web Dev", "ROS", "RTOS", "Embedded C", "3D Printing"];

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [tab, setTab] = useState<Tab>("overview");
  const [profile, setProfile] = useState<any>(null);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  useEffect(() => {
    if (session?.user?.email) {
      getStudentProfile(session.user.email, session.user.name || "", session.user.image || "")
        .then(p => { setProfile(p); setEditForm({ bio: p.bio || "", year: p.year || "", branch: p.branch || "", skills: p.skills || [], linkedin: p.linkedin || "", github: p.github || "" }); })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [session]);

  useEffect(() => {
    if (tab === "leaderboard") {
      getLeaderboard().then(setLeaderboard).catch(() => {});
    }
    if (tab === "notifications" && profile) {
      markNotificationsRead(profile.email).catch(() => {});
    }
  }, [tab, profile]);

  const saveProfile = async () => {
    if (!profile) return;
    setSaving(true);
    try {
      const updated = await updateStudentProfile({ email: profile.email, ...editForm });
      setProfile(updated);
      setEditing(false);
      showToast("Profile updated!");
    } catch { showToast("Failed to save."); }
    setSaving(false);
  };

  const toggleSkill = (skill: string) => {
    setEditForm((f: any) => ({
      ...f,
      skills: f.skills.includes(skill) ? f.skills.filter((s: string) => s !== skill) : [...f.skills, skill],
    }));
  };

  if (status === "loading") return <div className="min-h-screen section-bg flex items-center justify-center pt-20 text-blue-400">Loading...</div>;

  if (!session) return (
    <div className="min-h-screen section-bg flex items-center justify-center pt-20 px-4">
      <div className="glass rounded-2xl p-10 text-center max-w-sm w-full">
        <div className="text-5xl mb-4">🚀</div>
        <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--text)" }}>Student Dashboard</h1>
        <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>Sign in with your Google account to access your Space Club dashboard.</p>
        <button onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl shadow-md text-sm border border-gray-200">
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.2l6.7-6.7C35.7 2.5 30.2 0 24 0 14.7 0 6.7 5.4 2.7 13.3l7.8 6C12.4 13.1 17.8 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4 6.9-10 6.9-17z"/>
            <path fill="#FBBC05" d="M10.5 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7l-7.8-6A24 24 0 0 0 0 24c0 3.9.9 7.5 2.7 10.7l7.8-6z"/>
            <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.5-5.8c-2 1.4-4.6 2.2-7.7 2.2-6.2 0-11.5-4.2-13.4-9.8l-7.8 6C6.7 42.6 14.7 48 24 48z"/>
          </svg>
          Continue with Google
        </button>
      </div>
    </div>
  );

  const unread = profile?.notifications?.filter((n: any) => !n.read).length || 0;

  return (
    <div className="min-h-screen section-bg pt-20">
      {toast && <div className="fixed top-24 right-4 z-50 px-4 py-2 bg-green-600 text-white text-sm rounded-xl shadow-lg">{toast}</div>}

      <div className="max-w-screen-xl mx-auto px-6 sm:px-10 py-8">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="glass rounded-2xl p-5 sticky top-24">
              {/* User */}
              <div className="flex flex-col items-center text-center mb-6 pb-5 border-b" style={{ borderColor: "var(--border)" }}>
                {profile?.photo || session.user?.image ? (
                  <img src={profile?.photo || session.user?.image || ""} alt="avatar" className="w-16 h-16 rounded-full border-2 border-blue-400/40 mb-3" />
                ) : (
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-3">
                    {session.user?.name?.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div className="font-bold text-sm" style={{ color: "var(--text)" }}>{session.user?.name}</div>
                <div className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>{session.user?.email}</div>
                {profile && (
                  <div className={`mt-2 text-xs px-2 py-0.5 rounded-full font-semibold ${statusConfig[profile.applicationStatus]?.color}`}>
                    {statusConfig[profile.applicationStatus]?.label}
                  </div>
                )}
                <div className="mt-2 flex items-center gap-1 text-yellow-400 text-sm font-bold">
                  <Star size={14} className="fill-yellow-400" /> {profile?.points || 0} pts
                </div>
              </div>

              {/* Nav */}
              {([
                { id: "overview", icon: Rocket, label: "Overview" },
                { id: "profile", icon: User, label: "My Profile" },
                { id: "events", icon: Calendar, label: "My Events" },
                { id: "notifications", icon: Bell, label: "Notifications", badge: unread },
                { id: "leaderboard", icon: Trophy, label: "Leaderboard" },
              ] as { id: Tab; icon: any; label: string; badge?: number }[]).map(item => (
                <button key={item.id} onClick={() => setTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium mb-1 transition-all ${tab === item.id ? "bg-blue-600 text-white" : "hover:bg-blue-400/10"}`}
                  style={tab !== item.id ? { color: "var(--text-muted)" } : {}}>
                  <item.icon size={16} /> {item.label}
                  {item.badge ? <span className="ml-auto text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center font-bold">{item.badge}</span> : null}
                </button>
              ))}

              <button onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium mt-3 text-red-400 hover:bg-red-400/10 transition-all">
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          </aside>

          {/* Main */}
          <main className="flex-1 min-w-0">
            {loading && <div className="text-center py-20 text-blue-400">Loading your profile...</div>}

            {/* OVERVIEW */}
            {!loading && tab === "overview" && profile && (
              <div className="space-y-5">
                {/* IMPORTANT MESSAGES BOX - shows key notifications */}
                {(profile.applicationStatus === "approved" || profile.applicationStatus === "rejected" || profile.notifications?.some((n: any) => n.type === "success" || n.type === "warning")) && (
                  <div className={`glass rounded-2xl p-6 border-l-4 ${profile.applicationStatus === "approved" ? "border-green-400 bg-green-400/5" : profile.applicationStatus === "rejected" ? "border-red-400 bg-red-400/5" : "border-blue-400 bg-blue-400/5"}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${profile.applicationStatus === "approved" ? "bg-green-400/20 text-green-400" : profile.applicationStatus === "rejected" ? "bg-red-400/20 text-red-400" : "bg-blue-400/20 text-blue-400"}`}>
                        {profile.applicationStatus === "approved" ? "✅" : profile.applicationStatus === "rejected" ? "❌" : "📢"}
                      </div>
                      <h2 className="font-bold text-lg" style={{ color: "var(--text)" }}>Important Messages</h2>
                    </div>
                    
                    <div className="space-y-3">
                      {/* Application status message */}
                      {profile.applicationStatus === "approved" && (
                        <div className="bg-green-400/10 border border-green-400/20 rounded-xl p-4">
                          <div className="flex items-start gap-2">
                            <div className="text-green-400 mt-0.5">✅</div>
                            <div>
                              <div className="font-semibold text-green-400 text-sm">🎉 Welcome to LPU Space Club!</div>
                              <div className="text-slate-300 text-xs mt-1">Your application has been approved. You're now an official member!</div>
                              <div className="flex items-center gap-2 mt-2 text-xs">
                                <span className="text-green-400">+50 points awarded</span>
                                <span className="text-slate-500">•</span>
                                <span className="text-blue-400 hover:text-blue-300 cursor-pointer" onClick={() => setTab("notifications")}>View all notifications →</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {profile.applicationStatus === "rejected" && (
                        <div className="bg-red-400/10 border border-red-400/20 rounded-xl p-4">
                          <div className="flex items-start gap-2">
                            <div className="text-red-400 mt-0.5">❌</div>
                            <div>
                              <div className="font-semibold text-red-400 text-sm">Application Update</div>
                              <div className="text-slate-300 text-xs mt-1">Your application wasn't approved this time. You can reapply next semester.</div>
                              <div className="mt-2">
                                <a href="/join" className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs">
                                  Reapply next semester →
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Show recent important notifications (success/warning) */}
                      {profile.notifications?.filter((n: any) => n.type === "success" || n.type === "warning").slice(0, 2).map((n: any, i: number) => (
                        <div key={i} className={`rounded-xl p-4 ${n.type === "success" ? "bg-green-400/10 border border-green-400/20" : "bg-yellow-400/10 border border-yellow-400/20"}`}>
                          <div className="flex items-start gap-2">
                            <div className={`mt-0.5 ${n.type === "success" ? "text-green-400" : "text-yellow-400"}`}>
                              {n.type === "success" ? "✅" : "⚠️"}
                            </div>
                            <div>
                              <div className="font-semibold text-sm" style={{ color: "var(--text)" }}>{n.message}</div>
                              <div className="text-slate-400 text-xs mt-1">
                                {new Date(n.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {profile.notifications?.length === 0 && profile.applicationStatus === "pending" && (
                        <div className="bg-blue-400/10 border border-blue-400/20 rounded-xl p-4">
                          <div className="flex items-start gap-2">
                            <div className="text-blue-400 mt-0.5">⏳</div>
                            <div>
                              <div className="font-semibold text-blue-400 text-sm">Application Under Review</div>
                              <div className="text-slate-300 text-xs mt-1">Your application is being reviewed by the admin team. We'll notify you once a decision is made.</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {profile.notifications?.length > 2 && (
                      <button onClick={() => setTab("notifications")} className="mt-4 text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
                        View all {profile.notifications.length} notifications →
                      </button>
                    )}
                  </div>
                )}

                {/* Status card — always visible */}
                <div className={`glass rounded-2xl p-6 border-l-4 ${
                  profile.applicationStatus === "approved" ? "border-green-400 bg-green-400/5" :
                  profile.applicationStatus === "pending" ? "border-yellow-400 bg-yellow-400/5" :
                  profile.applicationStatus === "rejected" ? "border-red-400 bg-red-400/5" :
                  "border-gray-400"
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="font-bold text-lg" style={{ color: "var(--text)" }}>Application Status</h2>
                    <span className={`text-xs px-3 py-1 rounded-full font-bold ${statusConfig[profile.applicationStatus]?.color}`}>
                      {statusConfig[profile.applicationStatus]?.label}
                    </span>
                  </div>
                  <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>{statusConfig[profile.applicationStatus]?.desc}</p>

                  {/* Step tracker */}
                  {profile.applicationStatus !== "not_applied" && (
                    <div className="flex items-center gap-0 mt-4">
                      {[
                        { key: "applied", label: "Applied", done: true },
                        { key: "review", label: "Under Review", done: profile.applicationStatus === "approved" || profile.applicationStatus === "rejected" || profile.applicationStatus === "pending" },
                        { key: "decision", label: profile.applicationStatus === "approved" ? "Approved ✅" : profile.applicationStatus === "rejected" ? "Rejected ❌" : "Decision", done: profile.applicationStatus === "approved" || profile.applicationStatus === "rejected" },
                      ].map((step, i, arr) => (
                        <div key={step.key} className="flex items-center flex-1">
                          <div className="flex flex-col items-center">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                              step.done
                                ? profile.applicationStatus === "rejected" && i === 2 ? "bg-red-500 border-red-500 text-white" : "bg-blue-600 border-blue-600 text-white"
                                : "border-white/20 text-slate-500"
                            }`}>{step.done ? (profile.applicationStatus === "rejected" && i === 2 ? "✕" : "✓") : i + 1}</div>
                            <div className={`text-xs mt-1.5 font-medium whitespace-nowrap ${step.done ? (profile.applicationStatus === "rejected" && i === 2 ? "text-red-400" : "text-blue-400") : "text-slate-500"}`}>{step.label}</div>
                          </div>
                          {i < arr.length - 1 && (
                            <div className={`flex-1 h-0.5 mx-1 mb-5 ${step.done && arr[i+1].done ? "bg-blue-600" : "bg-white/10"}`} />
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {profile.applicationStatus === "not_applied" && (
                    <Link href="/join" className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all">
                      Apply Now →
                    </Link>
                  )}
                  {profile.applicationStatus === "pending" && (
                    <p className="text-xs mt-3 text-yellow-400/80">You'll get a notification here and via email once the admin reviews your application.</p>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: "Points", value: profile.points || 0, color: "text-yellow-400", icon: "⭐" },
                    { label: "Events", value: profile.registeredEvents?.length || 0, color: "text-blue-400", icon: "📅" },
                    { label: "Badges", value: profile.badges?.length || 0, color: "text-purple-400", icon: "🏆" },
                    { label: "Notifications", value: profile.notifications?.length || 0, color: "text-green-400", icon: "🔔" },
                  ].map(s => (
                    <div key={s.label} className="glass rounded-2xl p-5 text-center">
                      <div className="text-2xl mb-1">{s.icon}</div>
                      <div className={`text-2xl font-extrabold ${s.color}`}>{s.value}</div>
                      <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Quick info */}
                <div className="glass rounded-2xl p-6">
                  <h3 className="font-semibold mb-4" style={{ color: "var(--text)" }}>Quick Info</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {[
                      { label: "Division", value: profile.division || "Not set" },
                      { label: "Branch", value: profile.branch || "Not set" },
                      { label: "Year", value: profile.year || "Not set" },
                      { label: "Skills", value: profile.skills?.join(", ") || "Not set" },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <div className="text-xs mb-0.5" style={{ color: "var(--text-faint)" }}>{label}</div>
                        <div className="font-medium" style={{ color: "var(--text)" }}>{value}</div>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setTab("profile")} className="mt-4 text-xs text-blue-400 hover:text-blue-300 transition-colors">Edit Profile →</button>
                </div>
              </div>
            )}

            {/* PROFILE */}
            {!loading && tab === "profile" && profile && (
              <div className="glass rounded-2xl p-7">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-bold text-xl" style={{ color: "var(--text)" }}>My Profile</h2>
                  {!editing ? (
                    <button onClick={() => setEditing(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 text-sm font-medium rounded-xl transition-all border border-blue-400/30">
                      <Edit2 size={14} /> Edit
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button onClick={saveProfile} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all disabled:opacity-60">
                        <Save size={14} /> {saving ? "Saving..." : "Save"}
                      </button>
                      <button onClick={() => setEditing(false)} className="flex items-center gap-2 px-3 py-2 text-sm rounded-xl transition-all" style={{ background: "var(--bg-alt)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-5">
                  {editing ? (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { label: "Year", key: "year", ph: "e.g. 2nd Year" },
                          { label: "Branch", key: "branch", ph: "e.g. CSE" },
                          { label: "LinkedIn", key: "linkedin", ph: "https://linkedin.com/in/..." },
                          { label: "GitHub", key: "github", ph: "https://github.com/..." },
                        ].map(({ label, key, ph }) => (
                          <div key={key}>
                            <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>{label}</label>
                            <input value={editForm[key]} onChange={e => setEditForm({ ...editForm, [key]: e.target.value })} placeholder={ph}
                              className="w-full px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:border-blue-400 transition-all"
                              style={{ background: "var(--bg-alt)", border: "1px solid var(--border)", color: "var(--text)" }} />
                          </div>
                        ))}
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Bio</label>
                        <textarea rows={3} value={editForm.bio} onChange={e => setEditForm({ ...editForm, bio: e.target.value })} placeholder="Tell us about yourself..."
                          className="w-full px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:border-blue-400 transition-all resize-none"
                          style={{ background: "var(--bg-alt)", border: "1px solid var(--border)", color: "var(--text)" }} />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-2" style={{ color: "var(--text-muted)" }}>Skills (select all that apply)</label>
                        <div className="flex flex-wrap gap-2">
                          {skillsList.map(skill => (
                            <button key={skill} onClick={() => toggleSkill(skill)}
                              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${editForm.skills.includes(skill) ? "bg-blue-600 text-white" : "text-sm"}`}
                              style={!editForm.skills.includes(skill) ? { background: "var(--bg-alt)", border: "1px solid var(--border)", color: "var(--text-muted)" } : {}}>
                              {skill}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        {profile.photo && <img src={profile.photo} alt="avatar" className="w-16 h-16 rounded-full border-2 border-blue-400/30" />}
                        <div>
                          <div className="font-bold text-lg" style={{ color: "var(--text)" }}>{profile.name}</div>
                          <div className="text-sm" style={{ color: "var(--text-muted)" }}>{profile.email}</div>
                        </div>
                      </div>
                      {profile.bio && <p className="text-sm" style={{ color: "var(--text-muted)" }}>{profile.bio}</p>}
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        {[["Year", profile.year], ["Branch", profile.branch], ["Division", profile.division]].map(([l, v]) => v ? (
                          <div key={l}>
                            <div className="text-xs" style={{ color: "var(--text-faint)" }}>{l}</div>
                            <div className="font-medium" style={{ color: "var(--text)" }}>{v}</div>
                          </div>
                        ) : null)}
                      </div>
                      {profile.skills?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {profile.skills.map((s: string) => (
                            <span key={s} className="px-2 py-0.5 bg-blue-400/10 border border-blue-400/20 text-blue-400 text-xs rounded">{s}</span>
                          ))}
                        </div>
                      )}
                      <div className="flex gap-4">
                        {profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:text-blue-300">LinkedIn →</a>}
                        {profile.github && <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-white">GitHub →</a>}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* EVENTS */}
            {!loading && tab === "events" && profile && (
              <div>
                <h2 className="font-bold text-xl mb-5" style={{ color: "var(--text)" }}>My Events</h2>
                {profile.registeredEvents?.length === 0 ? (
                  <div className="glass rounded-2xl p-10 text-center">
                    <div className="text-4xl mb-3">📅</div>
                    <p style={{ color: "var(--text-muted)" }}>No events registered yet.</p>
                    <Link href="/events" className="mt-4 inline-block text-blue-400 hover:text-blue-300 text-sm transition-colors">Browse Events →</Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {profile.registeredEvents.map((ev: any) => (
                      <div key={ev.eventId} className="glass rounded-2xl p-5 flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-sm" style={{ color: "var(--text)" }}>{ev.title}</div>
                          <div className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>Registered: {new Date(ev.registeredAt).toLocaleDateString("en-IN")}</div>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${ev.attended ? "text-green-400 bg-green-400/10" : "text-yellow-400 bg-yellow-400/10"}`}>
                          {ev.attended ? "✅ Attended" : "⏳ Upcoming"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* NOTIFICATIONS */}
            {!loading && tab === "notifications" && profile && (
              <div>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-bold text-xl" style={{ color: "var(--text)" }}>Notifications</h2>
                  {profile.notifications?.length > 0 && (
                    <div className="text-xs text-slate-400">
                      {profile.notifications.filter((n: any) => !n.read).length} unread • {profile.notifications.length} total
                    </div>
                  )}
                </div>
                
                {profile.notifications?.length === 0 ? (
                  <div className="glass rounded-2xl p-10 text-center">
                    <div className="text-4xl mb-3">🔔</div>
                    <p style={{ color: "var(--text-muted)" }}>No notifications yet.</p>
                    <p className="text-slate-500 text-sm mt-2">Important messages will appear here when your application status changes or when admins send announcements.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {[...profile.notifications].reverse().map((n: any, i: number) => {
                      const icon = n.type === "success" ? "✅" : n.type === "warning" ? "⚠️" : n.type === "error" ? "❌" : "📢";
                      const typeColor = n.type === "success" ? "text-green-400" : n.type === "warning" ? "text-yellow-400" : n.type === "error" ? "text-red-400" : "text-blue-400";
                      const bgColor = n.type === "success" ? "bg-green-400/10 border-green-400/20" : n.type === "warning" ? "bg-yellow-400/10 border-yellow-400/20" : n.type === "error" ? "bg-red-400/10 border-red-400/20" : "bg-blue-400/10 border-blue-400/20";
                      
                      return (
                        <div key={i} className={`rounded-2xl p-5 border ${bgColor} ${!n.read ? "ring-1 ring-blue-400/30" : ""}`}>
                          <div className="flex gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg ${typeColor} ${n.type === "success" ? "bg-green-400/20" : n.type === "warning" ? "bg-yellow-400/20" : n.type === "error" ? "bg-red-400/20" : "bg-blue-400/20"}`}>
                              {icon}
                            </div>
                            <div className="flex-1">
                              <div className="text-sm" style={{ color: "var(--text)" }}>{n.message}</div>
                              <div className="flex items-center gap-3 mt-2">
                                <div className="text-xs" style={{ color: "var(--text-faint)" }}>
                                  {new Date(n.createdAt).toLocaleDateString("en-IN", { 
                                    day: "numeric", 
                                    month: "short", 
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit"
                                  })}
                                </div>
                                {!n.read && (
                                  <span className="text-xs text-blue-400 font-medium">NEW</span>
                                )}
                                {n.type === "success" && (
                                  <span className="text-xs text-green-400 font-medium">SUCCESS</span>
                                )}
                                {n.type === "warning" && (
                                  <span className="text-xs text-yellow-400 font-medium">WARNING</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                
                {profile.notifications?.length > 0 && (
                  <div className="mt-6 text-center">
                    <button 
                      onClick={() => markNotificationsRead(profile.email).then(() => {
                        // Refresh profile to mark as read
                        getStudentProfile(profile.email).then(setProfile).catch(() => {});
                      })}
                      className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Mark all as read →
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* LEADERBOARD */}
            {tab === "leaderboard" && (
              <div>
                <h2 className="font-bold text-xl mb-5" style={{ color: "var(--text)" }}>🏆 Leaderboard</h2>
                <div className="glass rounded-2xl overflow-hidden">
                  {leaderboard.length === 0 ? (
                    <div className="p-10 text-center" style={{ color: "var(--text-muted)" }}>No data yet. Points are earned by registering for events, submitting projects, and participating.</div>
                  ) : (
                    leaderboard.map((s: any, i: number) => (
                      <div key={s._id} className={`flex items-center gap-4 px-6 py-4 border-b last:border-0 ${s.email === session?.user?.email ? "bg-blue-400/5" : ""}`} style={{ borderColor: "var(--border)" }}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-extrabold ${i === 0 ? "bg-yellow-400 text-black" : i === 1 ? "bg-gray-300 text-black" : i === 2 ? "bg-orange-400 text-white" : "bg-white/10 text-slate-400"}`}>
                          {i + 1}
                        </div>
                        {s.photo ? <img src={s.photo} alt={s.name} className="w-9 h-9 rounded-full" /> : <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">{s.name?.slice(0,2).toUpperCase()}</div>}
                        <div className="flex-1">
                          <div className="text-sm font-semibold" style={{ color: "var(--text)" }}>{s.name} {s.email === session?.user?.email && <span className="text-xs text-blue-400">(You)</span>}</div>
                          <div className="text-xs" style={{ color: "var(--text-faint)" }}>{s.division}</div>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-400 font-bold">
                          <Star size={14} className="fill-yellow-400" /> {s.points}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
