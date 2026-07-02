"use client";
import { useState, useEffect, useCallback } from "react";
import {
  Users, Mail, FileText, LayoutDashboard, Plus, Trash2,
  Edit2, Save, X, LogOut, Check, Eye, RefreshCw, Lock
} from "lucide-react";
import {
  adminLogin, adminLogout, isLoggedIn,
  getStats, getApplications, updateApplication, deleteApplication,
  getMessages, markMessageRead, deleteMessage,
  getCoreMembers, addCoreMember, updateCoreMember, deleteCoreMember,
} from "@/lib/adminApi";

type Tab = "dashboard" | "applications" | "messages" | "members";

const divisions = ["Leadership","Aerospace","Robotics","AI & Data","Embedded Systems","Software","Research","Astronomy","Media & Design","Events","Outreach"];
const roles = ["Faculty Head","Faculty Coordinator","Student Lead","Division Head","Core Member","Member"];
const types = ["faculty","student-lead","core"];
const avatarColors = ["bg-blue-600","bg-purple-600","bg-cyan-600","bg-indigo-600","bg-pink-600","bg-green-600","bg-orange-600","bg-rose-600"];

const blankMember = () => ({ name:"", role:"Core Member", division:"Software", year:"", email:"", type:"core", order:99 });

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [tab, setTab] = useState<Tab>("dashboard");
  const [stats, setStats] = useState<Record<string,number>>({});
  const [applications, setApplications] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [editId, setEditId] = useState<string|null>(null);
  const [form, setForm] = useState<any>(blankMember());
  const [search, setSearch] = useState("");
  const [filterDiv, setFilterDiv] = useState("All");
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  useEffect(() => { if (isLoggedIn()) { setAuthed(true); } }, []);

  const load = useCallback(async (t: Tab) => {
    setLoading(true);
    try {
      if (t === "dashboard") setStats(await getStats());
      else if (t === "applications") setApplications(await getApplications());
      else if (t === "messages") setMessages(await getMessages());
      else if (t === "members") setMembers(await getCoreMembers());
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => { if (authed) load(tab); }, [authed, tab, load]);

  const login = async () => {
    setLoginLoading(true); setLoginError("");
    try { await adminLogin(password); setAuthed(true); }
    catch (e: any) { setLoginError(e.message); }
    setLoginLoading(false);
  };

  const logout = () => { adminLogout(); setAuthed(false); setPassword(""); };

  const switchTab = (t: Tab) => { setTab(t); setAdding(false); setEditId(null); };

  // Applications
  const updateStatus = async (id: string, status: string) => {
    try { await updateApplication(id, status); setApplications(a => a.map(x => x._id===id ? {...x,status} : x)); showToast(`Marked as ${status}`); }
    catch {}
  };
  const delApp = async (id: string) => {
    try { await deleteApplication(id); setApplications(a => a.filter(x => x._id!==id)); showToast("Deleted."); }
    catch {}
  };

  // Messages
  const markRead = async (id: string) => {
    try { await markMessageRead(id); setMessages(m => m.map(x => x._id===id ? {...x,read:true} : x)); }
    catch {}
  };
  const delMsg = async (id: string) => {
    try { await deleteMessage(id); setMessages(m => m.filter(x => x._id!==id)); showToast("Deleted."); }
    catch {}
  };

  // Members
  const saveMember = async () => {
    try {
      if (editId) { const m = await updateCoreMember(editId, form); setMembers(ms => ms.map(x => x._id===editId ? m : x)); showToast("Updated!"); }
      else { const m = await addCoreMember(form); setMembers(ms => [...ms, m]); showToast("Member added!"); }
      setAdding(false); setEditId(null); setForm(blankMember());
    } catch {}
  };
  const delMember = async (id: string) => {
    try { await deleteCoreMember(id); setMembers(m => m.filter(x => x._id!==id)); showToast("Deleted."); }
    catch {}
  };

  const filteredMembers = members.filter(m => {
    const s = m.name?.toLowerCase().includes(search.toLowerCase()) || m.role?.toLowerCase().includes(search.toLowerCase());
    const d = filterDiv==="All" || m.division===filterDiv;
    return s && d;
  });

  const statusColor: Record<string,string> = { pending:"text-yellow-400 bg-yellow-400/10", approved:"text-green-400 bg-green-400/10", rejected:"text-red-400 bg-red-400/10" };

  // ── Login Screen ──
  if (!authed) return (
    <div className="min-h-screen section-bg flex items-center justify-center pt-20 px-4">
      <div className="glass rounded-2xl p-10 w-full max-w-sm text-center">
        <div className="w-14 h-14 bg-blue-500/10 border border-blue-400/30 rounded-2xl flex items-center justify-center mx-auto mb-5">
          <Lock size={24} className="text-blue-400" />
        </div>
        <h1 className="text-2xl font-bold mb-1" style={{color:"var(--text)"}}>Admin Portal</h1>
        <p className="text-sm mb-6" style={{color:"var(--text-muted)"}}>Space Club LPU — Restricted Access</p>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)}
          onKeyDown={e=>e.key==="Enter"&&login()}
          placeholder="Enter admin password"
          className="w-full px-4 py-3 rounded-xl text-sm mb-3 focus:outline-none focus:border-blue-400 transition-all"
          style={{background:"var(--bg-alt)",border:"1px solid var(--border)",color:"var(--text)"}}
        />
        {loginError && <p className="text-red-400 text-xs mb-3">{loginError}</p>}
        <button onClick={login} disabled={loginLoading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold rounded-xl text-sm transition-all">
          {loginLoading ? "Logging in..." : "Enter Portal"}
        </button>
        <p className="text-xs mt-4" style={{color:"var(--text-faint)"}}>Default password: spaceclub2024 — change in Render env vars.</p>
      </div>
    </div>
  );

  // ── Admin UI ──
  return (
    <div className="min-h-screen section-bg pt-20">
      {toast && (
        <div className="fixed top-24 right-4 z-50 px-4 py-2 bg-green-600 text-white text-sm rounded-xl shadow-lg">{toast}</div>
      )}

      {/* Sidebar + Content layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="flex flex-col lg:flex-row gap-6 pt-6">

          {/* Sidebar */}
          <aside className="lg:w-56 shrink-0">
            <div className="glass rounded-2xl p-4 sticky top-24">
              <div className="flex items-center gap-2 mb-6 px-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">SC</div>
                <div>
                  <div className="text-sm font-bold" style={{color:"var(--text)"}}>Admin</div>
                  <div className="text-xs" style={{color:"var(--text-faint)"}}>Space Club LPU</div>
                </div>
              </div>
              {([
                {id:"dashboard",icon:LayoutDashboard,label:"Dashboard"},
                {id:"applications",icon:FileText,label:"Applications"},
                {id:"messages",icon:Mail,label:"Messages"},
                {id:"members",icon:Users,label:"Core Members"},
              ] as {id:Tab,icon:any,label:string}[]).map(item => (
                <button key={item.id} onClick={()=>switchTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium mb-1 transition-all ${tab===item.id ? "bg-blue-600 text-white" : "hover:bg-blue-400/10"}`}
                  style={tab!==item.id ? {color:"var(--text-muted)"} : {}}>
                  <item.icon size={16}/> {item.label}
                  {item.id==="applications" && stats.pendingApps>0 && (
                    <span className="ml-auto text-xs bg-yellow-400 text-black rounded-full w-5 h-5 flex items-center justify-center font-bold">{stats.pendingApps}</span>
                  )}
                  {item.id==="messages" && stats.unreadMessages>0 && (
                    <span className="ml-auto text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center font-bold">{stats.unreadMessages}</span>
                  )}
                </button>
              ))}
              <button onClick={logout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium mt-4 text-red-400 hover:bg-red-400/10 transition-all">
                <LogOut size={16}/> Logout
              </button>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-xl font-bold" style={{color:"var(--text)"}}>
                {tab==="dashboard"&&"Dashboard"}
                {tab==="applications"&&"Join Applications"}
                {tab==="messages"&&"Contact Messages"}
                {tab==="members"&&"Core Members"}
              </h1>
              <button onClick={()=>load(tab)} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all hover:text-blue-400" style={{color:"var(--text-muted)",background:"var(--surface)",border:"1px solid var(--border)"}}>
                <RefreshCw size={12}/> Refresh
              </button>
            </div>

            {loading && <div className="text-center py-20 text-blue-400">Loading...</div>}

            {/* ── DASHBOARD ── */}
            {!loading && tab==="dashboard" && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  {label:"Total Applications",value:stats.totalApps||0,color:"text-blue-400",bg:"bg-blue-400/10"},
                  {label:"Pending Reviews",value:stats.pendingApps||0,color:"text-yellow-400",bg:"bg-yellow-400/10"},
                  {label:"Approved Members",value:stats.approvedApps||0,color:"text-green-400",bg:"bg-green-400/10"},
                  {label:"Total Messages",value:stats.totalMessages||0,color:"text-purple-400",bg:"bg-purple-400/10"},
                  {label:"Unread Messages",value:stats.unreadMessages||0,color:"text-red-400",bg:"bg-red-400/10"},
                  {label:"Core Members",value:stats.coreMembers||0,color:"text-cyan-400",bg:"bg-cyan-400/10"},
                ].map(s=>(
                  <div key={s.label} className="glass rounded-2xl p-5">
                    <div className={`text-3xl font-extrabold ${s.color} mb-1`}>{s.value}</div>
                    <div className="text-sm" style={{color:"var(--text-muted)"}}>{s.label}</div>
                  </div>
                ))}
                <div className="glass rounded-2xl p-5 col-span-2 sm:col-span-3">
                  <p className="text-sm font-semibold mb-3" style={{color:"var(--text)"}}>Quick Actions</p>
                  <div className="flex flex-wrap gap-3">
                    <button onClick={()=>switchTab("applications")} className="px-4 py-2 bg-yellow-400/10 hover:bg-yellow-400/20 text-yellow-400 text-xs font-semibold rounded-xl transition-all">Review Applications →</button>
                    <button onClick={()=>switchTab("messages")} className="px-4 py-2 bg-purple-400/10 hover:bg-purple-400/20 text-purple-400 text-xs font-semibold rounded-xl transition-all">Read Messages →</button>
                    <button onClick={()=>switchTab("members")} className="px-4 py-2 bg-blue-400/10 hover:bg-blue-400/20 text-blue-400 text-xs font-semibold rounded-xl transition-all">Manage Members →</button>
                  </div>
                </div>
              </div>
            )}

            {/* ── APPLICATIONS ── */}
            {!loading && tab==="applications" && (
              <div className="space-y-3">
                {applications.length===0 && <div className="text-center py-16" style={{color:"var(--text-faint)"}}>No applications yet.</div>}
                {applications.map(app=>(
                  <div key={app._id} className="glass rounded-2xl p-5">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="font-semibold text-sm" style={{color:"var(--text)"}}>{app.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${statusColor[app.status]||"text-gray-400 bg-gray-400/10"}`}>{app.status}</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-1 text-xs" style={{color:"var(--text-muted)"}}>
                          <span>📧 {app.email}</span>
                          <span>🎓 {app.year}</span>
                          <span>🏛 {app.branch}</span>
                          <span>🔭 {app.division}</span>
                        </div>
                        {app.why && <p className="text-xs mt-2 leading-relaxed" style={{color:"var(--text-faint)"}}><span className="font-medium">Why:</span> {app.why}</p>}
                        <p className="text-xs mt-1" style={{color:"var(--text-faint)"}}>{new Date(app.createdAt).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button onClick={()=>updateStatus(app._id,"approved")} className="flex items-center gap-1 px-3 py-1.5 bg-green-500/10 hover:bg-green-500/20 text-green-400 text-xs font-semibold rounded-lg transition-all"><Check size={12}/> Approve</button>
                        <button onClick={()=>updateStatus(app._id,"rejected")} className="flex items-center gap-1 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold rounded-lg transition-all"><X size={12}/> Reject</button>
                        <button onClick={()=>delApp(app._id)} className="w-8 h-8 flex items-center justify-center rounded-lg transition-all hover:text-red-400" style={{background:"var(--bg-alt)",color:"var(--text-muted)"}}><Trash2 size={13}/></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── MESSAGES ── */}
            {!loading && tab==="messages" && (
              <div className="space-y-3">
                {messages.length===0 && <div className="text-center py-16" style={{color:"var(--text-faint)"}}>No messages yet.</div>}
                {messages.map(msg=>(
                  <div key={msg._id} className={`glass rounded-2xl p-5 ${!msg.read?"border-l-4 border-blue-400":""}`}>
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-semibold text-sm" style={{color:"var(--text)"}}>{msg.name}</span>
                          <span className="text-xs" style={{color:"var(--text-faint)"}}>{msg.email}</span>
                          {!msg.read && <span className="text-xs px-2 py-0.5 bg-blue-400/10 text-blue-400 rounded-full font-medium">New</span>}
                        </div>
                        <p className="text-xs font-semibold text-blue-400 mb-1">{msg.subject}</p>
                        <p className="text-sm leading-relaxed" style={{color:"var(--text-muted)"}}>{msg.message}</p>
                        <p className="text-xs mt-2" style={{color:"var(--text-faint)"}}>{new Date(msg.createdAt).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        {!msg.read && <button onClick={()=>markRead(msg._id)} className="flex items-center gap-1 px-3 py-1.5 bg-blue-400/10 hover:bg-blue-400/20 text-blue-400 text-xs font-semibold rounded-lg transition-all"><Eye size={12}/> Read</button>}
                        <button onClick={()=>delMsg(msg._id)} className="w-8 h-8 flex items-center justify-center rounded-lg transition-all hover:text-red-400" style={{background:"var(--bg-alt)",color:"var(--text-muted)"}}><Trash2 size={13}/></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── CORE MEMBERS ── */}
            {!loading && tab==="members" && (
              <div>
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search members..."
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-blue-400 transition-all"
                    style={{background:"var(--surface)",border:"1px solid var(--border)",color:"var(--text)"}}/>
                  <select value={filterDiv} onChange={e=>setFilterDiv(e.target.value)}
                    className="px-4 py-2.5 rounded-xl text-sm focus:outline-none transition-all"
                    style={{background:"var(--surface)",border:"1px solid var(--border)",color:"var(--text)"}}>
                    <option value="All">All Divisions</option>
                    {divisions.map(d=><option key={d} value={d}>{d}</option>)}
                  </select>
                  <button onClick={()=>{setAdding(true);setEditId(null);setForm(blankMember());}}
                    className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all">
                    <Plus size={15}/> Add Member
                  </button>
                </div>

                {(adding||editId) && (
                  <div className="glass rounded-2xl p-6 mb-4 border border-blue-400/30">
                    <h3 className="font-semibold text-blue-400 mb-4">{adding?"New Member":"Edit Member"}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      {[{label:"Full Name *",key:"name",ph:"e.g. Arjun Sharma",type:"text"},{label:"Email",key:"email",ph:"member@lpu.in",type:"email"},{label:"Year / Designation",key:"year",ph:"2nd Year / Faculty",type:"text"}].map(({label,key,ph,type})=>(
                        <div key={key}>
                          <label className="block text-xs font-medium mb-1.5" style={{color:"var(--text-muted)"}}>{label}</label>
                          <input type={type} value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})} placeholder={ph}
                            className="w-full px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:border-blue-400 transition-all"
                            style={{background:"var(--bg-alt)",border:"1px solid var(--border)",color:"var(--text)"}}/>
                        </div>
                      ))}
                      {[{label:"Role",key:"role",opts:roles},{label:"Division",key:"division",opts:divisions},{label:"Type",key:"type",opts:types}].map(({label,key,opts})=>(
                        <div key={key}>
                          <label className="block text-xs font-medium mb-1.5" style={{color:"var(--text-muted)"}}>{label}</label>
                          <select value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})}
                            className="w-full px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:border-blue-400 transition-all"
                            style={{background:"var(--bg-alt)",border:"1px solid var(--border)",color:"var(--text)"}}>
                            {opts.map(o=><option key={o} value={o}>{o}</option>)}
                          </select>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <button onClick={saveMember} className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all"><Save size={14}/> Save</button>
                      <button onClick={()=>{setAdding(false);setEditId(null);setForm(blankMember());}}
                        className="flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-xl transition-all"
                        style={{background:"var(--bg-alt)",border:"1px solid var(--border)",color:"var(--text-muted)"}}>
                        <X size={14}/> Cancel
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredMembers.map((m,i)=>(
                    <div key={m._id} className="glass glass-hover rounded-2xl p-5 flex items-start gap-4">
                      <div className={`w-11 h-11 ${avatarColors[i%avatarColors.length]} rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                        {m.avatar||m.name?.slice(0,2).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm truncate" style={{color:"var(--text)"}}>{m.name}</div>
                        <div className="text-xs text-blue-400 font-medium">{m.role}</div>
                        <div className="text-xs mt-0.5" style={{color:"var(--text-faint)"}}>{m.division} · {m.year}</div>
                        {m.email&&<div className="text-xs truncate mt-0.5" style={{color:"var(--text-faint)"}}>{m.email}</div>}
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <button onClick={()=>{setEditId(m._id);setAdding(false);setForm({name:m.name,role:m.role,division:m.division,year:m.year,email:m.email,type:m.type,order:m.order});}}
                          className="w-8 h-8 rounded-lg flex items-center justify-center hover:text-blue-400 transition-all"
                          style={{background:"var(--bg-alt)",color:"var(--text-muted)"}}><Edit2 size={13}/></button>
                        <button onClick={()=>delMember(m._id)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center hover:text-red-400 transition-all"
                          style={{background:"var(--bg-alt)",color:"var(--text-muted)"}}><Trash2 size={13}/></button>
                      </div>
                    </div>
                  ))}
                  {filteredMembers.length===0&&<div className="col-span-3 text-center py-10" style={{color:"var(--text-faint)"}}>No members found.</div>}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
