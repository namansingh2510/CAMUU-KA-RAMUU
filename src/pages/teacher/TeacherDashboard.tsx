import { Users, BookOpen, Calendar, ClipboardCheck } from "lucide-react";
import { SummaryCard } from "@/components/SummaryCard";
import { students } from "@/data/mockData";

export default function TeacherDashboard() {
  const totalStudents = students.length;
  const classesToday = 3;
  const avgAttendance = Math.round(
    students.reduce((s, st) => s + Math.round(Object.values(st.attendance).reduce((a, b) => a + b, 0) / Object.values(st.attendance).length), 0) / totalStudents
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Teacher Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard title="Total Students" value={totalStudents} icon={Users} color="primary" />
        <SummaryCard title="Classes Today" value={classesToday} icon={Calendar} color="accent" />
        <SummaryCard title="Avg Attendance" value={`${avgAttendance}%`} icon={ClipboardCheck} color="success" />
        <SummaryCard title="Subjects" value={2} icon={BookOpen} color="warning" />
      </div>

      <div className="bg-card rounded-xl shadow-md border p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {["Marked attendance for CS201", "Updated marks for Mathematics", "Submitted feedback report"].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
