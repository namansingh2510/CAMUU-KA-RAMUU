import { useState, useEffect } from "react";
import { StudentRecord, getOverallMarks, getOverallAttendance } from "@/data/mockData";
import { getStudents, addStudent, deleteStudent, updateStudent } from "@/lib/api";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function ManageStudents() {
  const [studentList, setStudentList] = useState<StudentRecord[]>([]);
  
  useEffect(() => {
    getStudents().then(setStudentList).catch(() => toast.error("Ensure .NET API is running. Cannot fetch API data."));
  }, []);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [course, setCourse] = useState("B.Tech CSE");
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [parentEmail, setParentEmail] = useState("");

  const startEdit = (s: StudentRecord) => {
    setEditingId(s.id);
    setName(s.name);
    setRollNo(s.rollNo);
    setCourse(s.course);
    setParentName(s.parentName || "");
    setParentPhone(s.parentPhone || "");
    setParentEmail(s.parentEmail || "");
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingId(null);
    setName("");
    setRollNo("");
    setCourse("B.Tech CSE");
    setParentName("");
    setParentPhone("");
    setParentEmail("");
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !rollNo.trim()) { toast.error("Fill all fields"); return; }
    
    try {
      if (editingId) {
        const existingStudent = studentList.find(s => s.id === editingId);
        if (!existingStudent) return;
        const updatedStudent = { ...existingStudent, name: name.trim(), rollNo: rollNo.trim(), course, parentName: parentName.trim(), parentPhone: parentPhone.trim(), parentEmail: parentEmail.trim() };
        await updateStudent(editingId, updatedStudent);
        setStudentList(p => p.map(s => s.id === editingId ? updatedStudent : s));
        toast.success("Student updated successfully");
      } else {
        const newStudent = await addStudent({
          name: name.trim(), rollNo: rollNo.trim(), course, semester: 1,
          marks: {}, attendance: {}, parentName: parentName.trim() || "—", parentPhone: parentPhone.trim() || "—", parentEmail: parentEmail.trim() || "—",
        });
        setStudentList((p) => [...p, newStudent]);
        toast.success("Student added successfully");
      }
      handleCancel();
    } catch {
      toast.error(editingId ? "Failed to update student" : "Failed to add student");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteStudent(id);
      setStudentList((p) => p.filter((s) => s.id !== id));
      toast.success("Student removed successfully");
    } catch {
      toast.error("Failed to delete student from the database");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-2xl font-bold">Manage Students</h2>
        <button onClick={() => showForm ? handleCancel() : setShowForm(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition">
          <Plus className="h-4 w-4" /> Add Student
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-card rounded-xl shadow-md border p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Student Name" className="rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
            <input value={rollNo} onChange={(e) => setRollNo(e.target.value)} placeholder="Roll No" className="rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
            <input value={course} onChange={(e) => setCourse(e.target.value)} placeholder="Course" className="rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input value={parentName} onChange={(e) => setParentName(e.target.value)} placeholder="Parent Name" className="rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
            <input value={parentPhone} onChange={(e) => setParentPhone(e.target.value)} placeholder="Parent Phone" className="rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
            <div className="flex gap-2">
              <input value={parentEmail} onChange={(e) => setParentEmail(e.target.value)} placeholder="Parent Email" className="flex-1 rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
              <button type="submit" className="px-6 rounded-lg bg-success text-success-foreground text-sm font-medium hover:opacity-90 transition">Save</button>
            </div>
          </div>
        </form>
      )}

      <div className="bg-card rounded-xl shadow-md border overflow-hidden overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted text-muted-foreground">
              <th className="text-left px-5 py-3 font-semibold">Name</th>
              <th className="text-left px-5 py-3 font-semibold">Roll No</th>
              <th className="text-left px-5 py-3 font-semibold">Course</th>
              <th className="text-left px-5 py-3 font-semibold">Avg Marks</th>
              <th className="text-left px-5 py-3 font-semibold">Attendance</th>
              <th className="text-center px-5 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {studentList.map((s, i) => (
              <tr key={s.id} className={`border-t hover:bg-muted/50 ${i % 2 !== 0 ? "bg-muted/20" : ""}`}>
                <td className="px-5 py-3 font-medium">{s.name}</td>
                <td className="px-5 py-3">{s.rollNo}</td>
                <td className="px-5 py-3">{s.course}</td>
                <td className="px-5 py-3">{Object.keys(s.marks).length ? getOverallMarks(s) : "—"}</td>
                <td className="px-5 py-3">{Object.keys(s.attendance).length ? `${getOverallAttendance(s)}%` : "—"}</td>
                <td className="px-5 py-3 text-center">
                  <div className="flex justify-center gap-1">
                    <button onClick={() => startEdit(s)} className="p-1.5 rounded-lg hover:bg-primary/10 text-primary transition"><Pencil className="h-4 w-4" /></button>
                    <button onClick={() => handleDelete(s.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-destructive transition"><Trash2 className="h-4 w-4" /></button>
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
