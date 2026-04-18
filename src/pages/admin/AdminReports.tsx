import { students, getOverallMarks, getOverallAttendance, getGrade } from "@/data/mockData";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";

const COLORS = ["hsl(var(--success))", "hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--warning))", "hsl(var(--destructive))"];

export default function AdminReports() {
  const gradeMap: Record<string, number> = { "A+": 0, A: 0, B: 0, C: 0, D: 0, F: 0 };
  students.forEach((s) => { gradeMap[getGrade(getOverallMarks(s))]++; });
  const gradeData = Object.entries(gradeMap).filter(([, v]) => v > 0).map(([name, value]) => ({ name, value }));

  const attendanceData = [
    { range: "90-100%", count: students.filter((s) => getOverallAttendance(s) >= 90).length },
    { range: "75-89%", count: students.filter((s) => { const a = getOverallAttendance(s); return a >= 75 && a < 90; }).length },
    { range: "60-74%", count: students.filter((s) => { const a = getOverallAttendance(s); return a >= 60 && a < 75; }).length },
    { range: "<60%", count: students.filter((s) => getOverallAttendance(s) < 60).length },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Reports</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl shadow-md border p-6">
          <h3 className="text-lg font-semibold mb-4">Grade Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={gradeData} innerRadius={50} outerRadius={90} dataKey="value" label>
                  {gradeData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-card rounded-xl shadow-md border p-6">
          <h3 className="text-lg font-semibold mb-4">Attendance Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="range" tick={{ fontSize: 11 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--accent))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
