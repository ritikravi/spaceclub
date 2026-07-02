"use client";
import { useState } from "react";
import { Users, Plus, Trash2, Edit2, Save, X, Lock } from "lucide-react";

const ADMIN_PIN = "spaceclub2024"; // simple client-side pin — replace with proper auth later

type Member = {
  id: number;
  name: string;
  role: string;
  division: string;
  year: string;
  email: string;
  avatar: string;
};

const initialMembers: Member[] = [
  { id: 1, name: "Dr. Jaisukh Paul", role: "Faculty Head", division: "Leadership", year: "Faculty", email: "jaisukh@lpu.in", avatar: "JP" },
  { id: 2, name: "Rohan Kumar", role: "Faculty Coordinator", division: "Leadership", year: "Faculty", email: "rohan@lpu.in", avatar: "RK" },
  { id: 3, name: "Ayush Pratap Singh", role: "Student Lead", division: "Leadership", year: "3rd Year", email: "ayush@lpu.in", avatar: "AS" },
  { id: 4, name: "Ritik Raushan", role: "Student Lead", division: "Software", year: "3rd Year", email: "ritik@lpu.in", avatar: "RR" },
];

const divisions = ["Leadership", "Aerospace", "Robotics", "AI & Data", "Embedded Systems", "Software", "Research", "Astronomy", "Media & Design", "Events", "Outreach"];
const roles = ["Faculty Head", "Faculty Coordinator", "Student Lead", "Division Head", "Core Member", "Member"];
const avatarColors = ["bg-blue-600", "bg-purple-600", "bg-cyan-600", "bg-indigo-600", "bg-pink-600", "bg-green-600", "bg-orange-600", "bg-rose-600"];

const blank = (): Omit<Member, "id"> => ({ name: "", role: "Core Member", division: "Software", year: "", email: "", avatar: "" });

export default function AdminPage() {
  const [pin, setPin] = useState("");
  const [authed, setAuthed] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [adding, setAdding] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(blank());
  const [search, setSearch] = useState("");
  const [filterDiv, setFilterDiv] = useState("All");

  const login = () => {
    if (pin === ADMIN_PIN) { setAuthed(true); setPinError(false); }
    else setPinError(true);
  };

  const addMember = () => {
    if (!form.name || !form.role) return;
    const initials = form.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
    setMembers(prev => [...prev, { ...form, id: Date.now(), avatar: initials }]);
    setForm(blank()); setAdding(false);
  };

  const startEdit = (m: Member) => {
    setEditId(m.id);
    setForm({ name: m.name, role: m.role, division: m.division, year: m.year, email: m.email, avatar: m.avatar });
  };

  const saveEdit = () => {
    setMembers(prev => prev.map(m => m.id === editId ? { ...m, ...form } : m));
    setEditId(null); setForm(blank());
  };

  const deleteMember = (id: number) => setMembers(prev => prev.filter(m => m.id !== id));

  const filtered = members.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.role.toLowerCase().includes(search.toLowerCase());
    const matchDiv = filterDiv === "All" || m.division === filterDiv;
    return matchSearch && matchDiv;
  });

  const colorFor = (i: number) => avatarColors[i % avatarColors.length];

  if (!authed) {
    return (
      <div className="min-h-screen section-bg flex items-center justify-center pt-20">
        <div className="glass rounded-2xl p-10 w-full max-w-sm text-center">
          <div className="w-14 h-14 bg-blue-500/10 border border-blue-400/30 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Lock size={24} className="text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--text)" }}>Admin Portal</h1>
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>Space Club LPU — Core Team Management</p>
          <input
            type="password"
            value={pin}
            onChange={e => setPin(e.target.value)}
            onKeyDown={e => e.key === "Enter" && login()}
            placeholder="Enter admin PIN"
            className="w-full px-4 py-3 rounded-xl text-sm mb-3 focus:outline-none focus:border-blue-400 transition-all"
            style={{ background: "var(--bg-alt)", border: "1px solid var(--border)", color: "var(--text)" }}
          />
          {pinError && <p className="text-red-400 text-xs mb-3">Incorrect PIN. Try again.</p>}
          <button onClick={login} className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-sm transition-all">
            Enter Portal
          </button>
          <p className="text-xs mt-4" style={{ color: "var(--text-faint)" }}>Contact club admin for PIN access.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen section-bg pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pt-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Users size={20} className="text-blue-400" />
              <h1 className="text-2xl font-bold" style={{ color: "var(--text)" }}>Core Member Management</h1>
            </div>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>{members.length} total members</p>
          </div>
          <button
            onClick={() => { setAdding(true); setEditId(null); setForm(blank()); }}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all"
          >
            <Plus size={16} /> Add Member
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or role..."
            className="flex-1 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-blue-400 transition-all"
            style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}
          />
          <select
            value={filterDiv}
            onChange={e => setFilterDiv(e.target.value)}
            className="px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-blue-400 transition-all"
            style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}
          >
            <option value="All">All Divisions</option>
            {divisions.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        {/* Add / Edit form */}
        {(adding || editId !== null) && (
          <div className="glass rounded-2xl p-6 mb-6 border border-blue-400/30">
            <h3 className="font-semibold mb-4 text-blue-400">{adding ? "Add New Member" : "Edit Member"}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {[
                { label: "Full Name *", key: "name", placeholder: "e.g. Arjun Sharma", type: "text" },
                { label: "Email", key: "email", placeholder: "member@lpu.in", type: "email" },
                { label: "Year / Designation", key: "year", placeholder: "e.g. 2nd Year, Faculty", type: "text" },
              ].map(({ label, key, placeholder, type }) => (
                <div key={key}>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>{label}</label>
                  <input
                    type={type}
                    value={(form as Record<string, string>)[key]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    placeholder={placeholder}
                    className="w-full px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:border-blue-400 transition-all"
                    style={{ background: "var(--bg-alt)", border: "1px solid var(--border)", color: "var(--text)" }}
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Role *</label>
                <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:border-blue-400 transition-all"
                  style={{ background: "var(--bg-alt)", border: "1px solid var(--border)", color: "var(--text)" }}>
                  {roles.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Division *</label>
                <select value={form.division} onChange={e => setForm({ ...form, division: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:border-blue-400 transition-all"
                  style={{ background: "var(--bg-alt)", border: "1px solid var(--border)", color: "var(--text)" }}>
                  {divisions.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={adding ? addMember : saveEdit}
                className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all"
              >
                <Save size={14} /> {adding ? "Add Member" : "Save Changes"}
              </button>
              <button
                onClick={() => { setAdding(false); setEditId(null); setForm(blank()); }}
                className="flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-xl transition-all"
                style={{ background: "var(--bg-alt)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
              >
                <X size={14} /> Cancel
              </button>
            </div>
          </div>
        )}

        {/* Members grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((m, i) => (
            <div key={m.id} className="glass glass-hover rounded-2xl p-5 flex items-start gap-4">
              <div className={`w-12 h-12 ${colorFor(i)} rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                {m.avatar || m.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm truncate" style={{ color: "var(--text)" }}>{m.name}</div>
                <div className="text-xs text-blue-400 font-medium">{m.role}</div>
                <div className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>{m.division} · {m.year}</div>
                {m.email && <div className="text-xs truncate mt-0.5" style={{ color: "var(--text-faint)" }}>{m.email}</div>}
              </div>
              <div className="flex gap-1 shrink-0">
                <button onClick={() => startEdit(m)} aria-label="Edit"
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:text-blue-400"
                  style={{ background: "var(--bg-alt)", color: "var(--text-muted)" }}>
                  <Edit2 size={13} />
                </button>
                <button onClick={() => deleteMember(m.id)} aria-label="Delete"
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:text-red-400"
                  style={{ background: "var(--bg-alt)", color: "var(--text-muted)" }}>
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16" style={{ color: "var(--text-faint)" }}>
            No members found. Add one above.
          </div>
        )}

        {/* Summary by division */}
        <div className="mt-12">
          <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text)" }}>Division Summary</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {divisions.map(d => {
              const count = members.filter(m => m.division === d).length;
              if (!count) return null;
              return (
                <div key={d} className="glass rounded-xl p-4 text-center">
                  <div className="text-2xl font-extrabold text-blue-400">{count}</div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{d}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
