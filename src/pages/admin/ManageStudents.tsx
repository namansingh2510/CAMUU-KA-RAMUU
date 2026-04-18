import { useState, useEffect } from "react";
import { StudentRecord, getOverallMarks, getOverallAttendance } from "@/data/mockData";
import { getStudents, addStudent, deleteStudent } from "@/lib/api";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function ManageStudents() {
  const [studentList, setStudentList] = useState<StudentRecord[]>([]);
  
  useEffect(() => {
    getStudents().then(setStudentList).catch(() => toast.error("Ensure .NET API is running. Cannot fetch API data."));
  }, []);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [course, setCourse] = useState("B.Tech CSE");

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !rollNo.trim()) { toast.error("Fill all fields"); return; }
    
    try {
      const newStudent = await addStudent({
        name: name.trim(), rollNo: rollNo.trim(), course, semester: 1,
        marks: {}, attendance: {}, parentName: "—", parentPhone: "—", parentEmail: "—",
      });
      setStudentList((p) => [...p, newStudent]);
      setName(""); setRollNo(""); setShowForm(false);
      toast.success("Student added successfully");
    } catch {
      toast.error("Failed to add student to the database");
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
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition">
          <Plus className="h-4 w-4" /> Add Student
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-card rounded-xl shadow-md border p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Student Name" className="rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
          <input value={rollNo} onChange={(e) => setRollNo(e.target.value)} placeholder="Roll No" className="rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
          <div className="flex gap-2">
            <input value={course} onChange={(e) => setCourse(e.target.value)} placeholder="Course" className="flex-1 rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
            <button type="submit" className="px-4 rounded-lg bg-success text-success-foreground text-sm font-medium hover:opacity-90 transition">Save</button>
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
                    <button className="p-1.5 rounded-lg hover:bg-primary/10 text-primary transition"><Pencil className="h-4 w-4" /></button>
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
