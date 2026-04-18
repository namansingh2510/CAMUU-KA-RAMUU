import { useState, useEffect } from "react";
import { TeacherRecord } from "@/data/mockData";
import { getTeachers, addTeacher, deleteTeacher } from "@/lib/api";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function ManageTeachers() {
  const [teacherList, setTeacherList] = useState<TeacherRecord[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getTeachers().then(setTeacherList).catch(() => toast.error("Ensure .NET API is running. Cannot fetch from API."));
  }, []);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dept, setDept] = useState("");

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) { toast.error("Fill all fields"); return; }
    try {
      const newTeacher = await addTeacher({ name: name.trim(), email: email.trim(), department: dept, subjects: [] });
      setTeacherList((p) => [...p, newTeacher]);
      setName(""); setEmail(""); setDept(""); setShowForm(false);
      toast.success("Teacher added");
    } catch {
      toast.error("Failed to add teacher to API");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTeacher(id);
      setTeacherList((p) => p.filter((t) => t.id !== id));
      toast.success("Teacher removed");
    } catch {
      toast.error("Failed to remove teacher from API");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-2xl font-bold">Manage Teachers</h2>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition">
          <Plus className="h-4 w-4" /> Add Teacher
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-card rounded-xl shadow-md border p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
          <div className="flex gap-2">
            <input value={dept} onChange={(e) => setDept(e.target.value)} placeholder="Department" className="flex-1 rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
            <button type="submit" className="px-4 rounded-lg bg-success text-success-foreground text-sm font-medium hover:opacity-90 transition">Save</button>
          </div>
        </form>
      )}

      <div className="bg-card rounded-xl shadow-md border overflow-hidden overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted text-muted-foreground">
              <th className="text-left px-5 py-3 font-semibold">Name</th>
              <th className="text-left px-5 py-3 font-semibold">Email</th>
              <th className="text-left px-5 py-3 font-semibold">Department</th>
              <th className="text-left px-5 py-3 font-semibold">Subjects</th>
              <th className="text-center px-5 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teacherList.map((t, i) => (
              <tr key={t.id} className={`border-t hover:bg-muted/50 ${i % 2 !== 0 ? "bg-muted/20" : ""}`}>
                <td className="px-5 py-3 font-medium">{t.name}</td>
                <td className="px-5 py-3 text-primary">{t.email}</td>
                <td className="px-5 py-3">{t.department}</td>
                <td className="px-5 py-3">{t.subjects.join(", ") || "—"}</td>
                <td className="px-5 py-3 text-center">
                  <div className="flex justify-center gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-primary/10 text-primary transition"><Pencil className="h-4 w-4" /></button>
                    <button onClick={() => handleDelete(t.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-destructive transition"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
