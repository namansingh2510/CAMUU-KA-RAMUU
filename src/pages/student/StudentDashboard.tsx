import { Users, TrendingUp, ClipboardCheck, BookOpen } from "lucide-react";
import { SummaryCard } from "@/components/SummaryCard";
import { students, getOverallAttendance, getOverallMarks } from "@/data/mockData";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const student = students[0]; // logged-in student

export default function StudentDashboard() {
  const attendance = getOverallAttendance(student);
  const avgMarks = getOverallMarks(student);
  const totalSubjects = Object.keys(student.marks).length;

  const attendanceData = [
    { name: "Present", value: attendance },
    { name: "Absent", value: 100 - attendance },
  ];

  const marksData = Object.entries(student.marks).map(([sub, val]) => ({
    name: sub.length > 8 ? sub.slice(0, 8) + "…" : sub,
    marks: val,
  }));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Student Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard title="Attendance" value={`${attendance}%`} icon={ClipboardCheck} color="primary" />
        <SummaryCard title="Average Marks" value={avgMarks} icon={TrendingUp} color="accent" />
        <SummaryCard title="Subjects" value={totalSubjects} icon={BookOpen} color="success" />
        <SummaryCard title="Semester" value={student.semester} icon={Users} color="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl shadow-md border p-6">
          <h3 className="text-lg font-semibold mb-4">Attendance Overview</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={attendanceData} innerRadius={60} outerRadius={90} dataKey="value" label>
                  <Cell fill="hsl(var(--primary))" />
                  <Cell fill="hsl(var(--muted))" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-card rounded-xl shadow-md border p-6">
          <h3 className="text-lg font-semibold mb-4">Marks Overview</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={marksData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="marks" fill="hsl(var(--accent))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
