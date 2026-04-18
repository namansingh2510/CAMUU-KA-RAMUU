import { useState } from "react";
import { students } from "@/data/mockData";
import { toast } from "sonner";

export default function TeacherAttendance() {
  const [attendance, setAttendance] = useState<Record<number, boolean>>(
    Object.fromEntries(students.map((s) => [s.id, false]))
  );

  const toggle = (id: number) => setAttendance((prev) => ({ ...prev, [id]: !prev[id] }));
  const markAll = () => setAttendance(Object.fromEntries(students.map((s) => [s.id, true])));
  const handleSubmit = () => {
    const present = Object.values(attendance).filter(Boolean).length;
    toast.success(`Attendance submitted: ${present}/${students.length} present`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-2xl font-bold">Attendance Management</h2>
        <div className="flex gap-2">
          <button onClick={markAll} className="px-4 py-2 rounded-lg bg-accent text-accent-foreground text-sm font-medium hover:opacity-90 transition">
            Mark All Present
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition">
            Submit
          </button>
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-md border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted text-muted-foreground">
              <th className="text-left px-5 py-3 font-semibold">#</th>
              <th className="text-left px-5 py-3 font-semibold">Name</th>
              <th className="text-left px-5 py-3 font-semibold">Roll No</th>
              <th className="text-center px-5 py-3 font-semibold">Present</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => (
              <tr key={s.id} className={`border-t hover:bg-muted/50 ${i % 2 !== 0 ? "bg-muted/20" : ""}`}>
                <td className="px-5 py-3">{i + 1}</td>
                <td className="px-5 py-3 font-medium">{s.name}</td>
                <td className="px-5 py-3">{s.rollNo}</td>
                <td className="px-5 py-3 text-center">
                  <button
                    onClick={() => toggle(s.id)}
                    className={`w-10 h-6 rounded-full transition-colors ${
                      attendance[s.id] ? "bg-success" : "bg-muted"
                    } relative`}
                  >
                    <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-card shadow transition-transform ${
                      attendance[s.id] ? "translate-x-4" : "translate-x-0.5"
                    }`} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
