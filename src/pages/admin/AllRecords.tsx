import { getOverallMarks, getOverallAttendance, StudentRecord, TeacherRecord } from "@/data/mockData";
import { useState, useEffect } from "react";
import { getStudents, getTeachers } from "@/lib/api";
import { toast } from "sonner";

export default function AllRecords() {
  const [tab, setTab] = useState<"students" | "teachers">("students");
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [teachers, setTeachers] = useState<TeacherRecord[]>([]);

  useEffect(() => {
    getStudents().then(setStudents).catch(() => toast.error("Failed to fetch students from DB."));
    getTeachers().then(setTeachers).catch(() => toast.error("Failed to fetch teachers from DB."));
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">All Records</h2>

      <div className="flex gap-2">
        {(["students", "teachers"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
              tab === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "students" && (
        <div className="bg-card rounded-xl shadow-md border overflow-hidden overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted text-muted-foreground">
                <th className="text-left px-5 py-3 font-semibold">Name</th>
                <th className="text-left px-5 py-3 font-semibold">Roll No</th>
                <th className="text-left px-5 py-3 font-semibold">Course</th>
                <th className="text-left px-5 py-3 font-semibold">Sem</th>
                <th className="text-left px-5 py-3 font-semibold">Marks</th>
                <th className="text-left px-5 py-3 font-semibold">Attendance</th>
                <th className="text-left px-5 py-3 font-semibold">Parent</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr key={s.id} className={`border-t hover:bg-muted/50 ${i % 2 !== 0 ? "bg-muted/20" : ""}`}>
                  <td className="px-5 py-3 font-medium">{s.name}</td>
                  <td className="px-5 py-3">{s.rollNo}</td>
                  <td className="px-5 py-3">{s.course}</td>
                  <td className="px-5 py-3">{s.semester}</td>
                  <td className="px-5 py-3">{s.marks && Object.keys(s.marks).length > 0 ? getOverallMarks(s) : "—"}</td>
                  <td className="px-5 py-3">{s.attendance && Object.keys(s.attendance).length > 0 ? `${getOverallAttendance(s)}%` : "—"}</td>
                  <td className="px-5 py-3">{s.parentName && s.parentName !== "—" ? s.parentName : "Not Provided"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "teachers" && (
        <div className="bg-card rounded-xl shadow-md border overflow-hidden overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted text-muted-foreground">
                <th className="text-left px-5 py-3 font-semibold">Name</th>
                <th className="text-left px-5 py-3 font-semibold">Email</th>
                <th className="text-left px-5 py-3 font-semibold">Department</th>
                <th className="text-left px-5 py-3 font-semibold">Subjects</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((t, i) => (
                <tr key={t.id} className={`border-t hover:bg-muted/50 ${i % 2 !== 0 ? "bg-muted/20" : ""}`}>
                  <td className="px-5 py-3 font-medium">{t.name}</td>
                  <td className="px-5 py-3 text-primary">{t.email}</td>
                  <td className="px-5 py-3">{t.department}</td>
                  <td className="px-5 py-3">{(t.subjects && t.subjects.length > 0) ? t.subjects.join(", ") : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
