import { useState, useEffect } from "react";
import { TeacherRecord } from "@/data/mockData";
import { getTeachers, addTeacher, deleteTeacher, updateTeacher } from "@/lib/api";
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
  const [subjects, setSubjects] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const startEdit = (t: TeacherRecord) => {
    setEditingId(t.id);
    setName(t.name);
    setEmail(t.email);
    setDept(t.department);
    setSubjects(t.subjects ? t.subjects.join(", ") : "");
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingId(null);
    setName(""); setEmail(""); setDept(""); setSubjects("");
    setShowForm(false);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) { toast.error("Fill all fields"); return; }
    
    // Convert comma separated subjects string to trimmed array filtering out empties
    const parsedSubjects = subjects.split(",").map(s => s.trim()).filter(s => s.length > 0);

    try {
      if (editingId) {
        const existingTeacher = teacherList.find(t => t.id === editingId);
        if (!existingTeacher) return;
        const updatedTeacher = { ...existingTeacher, name: name.trim(), email: email.trim(), department: dept.trim(), subjects: parsedSubjects };
        await updateTeacher(editingId, updatedTeacher);
        setTeacherList(p => p.map(t => t.id === editingId ? updatedTeacher : t));
        toast.success("Teacher updated");
      } else {
        const newTeacher = await addTeacher({ name: name.trim(), email: email.trim(), department: dept.trim(), subjects: parsedSubjects });
        setTeacherList((p) => [...p, newTeacher]);
        toast.success("Teacher added");
      }
      handleCancel();
    } catch {
      toast.error(editingId ? "Failed to update teacher" : "Failed to add teacher");
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
        <button onClick={() => showForm ? handleCancel() : setShowForm(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition">
          <Plus className="h-4 w-4" /> Add Teacher
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-card rounded-xl shadow-md border p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
          <input value={dept} onChange={(e) => setDept(e.target.value)} placeholder="Department" className="rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
          <div className="flex gap-2">
            <input value={subjects} onChange={(e) => setSubjects(e.target.value)} placeholder="Subjects (comma separated)" className="flex-1 rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
            <button type="submit" className="px-6 rounded-lg bg-success text-success-foreground text-sm font-medium hover:opacity-90 transition">Save</button>
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
                    <button onClick={() => startEdit(t)} className="p-1.5 rounded-lg hover:bg-primary/10 text-primary transition"><Pencil className="h-4 w-4" /></button>
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
