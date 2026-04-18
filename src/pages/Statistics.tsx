import { Student } from "@/store/studentStore";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";

interface Props {
  students: Student[];
  averageMarks: number;
}

const GRADE_COLORS = [
  "hsl(var(--success))",
  "hsl(var(--primary))",
  "hsl(var(--accent))",
  "hsl(var(--warning))",
  "hsl(var(--destructive))",
];

function getGrade(marks: number) {
  if (marks >= 90) return "A";
  if (marks >= 80) return "B";
  if (marks >= 70) return "C";
  if (marks >= 60) return "D";
  return "F";
}

export default function Statistics({ students, averageMarks }: Props) {
  const percentage = averageMarks;
  const gradeMap: Record<string, number> = { A: 0, B: 0, C: 0, D: 0, F: 0 };
  students.forEach((s) => { gradeMap[getGrade(s.marks)]++; });
  const gradeData = Object.entries(gradeMap).map(([name, value]) => ({ name, value }));

  const rangeData = [
    { range: "0-40", count: students.filter((s) => s.marks <= 40).length },
    { range: "41-60", count: students.filter((s) => s.marks > 40 && s.marks <= 60).length },
    { range: "61-80", count: students.filter((s) => s.marks > 60 && s.marks <= 80).length },
    { range: "81-100", count: students.filter((s) => s.marks > 80).length },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Statistics</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Average Marks", value: averageMarks },
          { label: "Average %", value: `${percentage}%` },
          { label: "Total Students", value: students.length },
        ].map((item) => (
          <div key={item.label} className="bg-card rounded-xl shadow-md border p-5 text-center">
            <p className="text-sm text-muted-foreground">{item.label}</p>
            <p className="text-3xl font-bold mt-1">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl shadow-md border p-6">
          <h3 className="text-lg font-semibold mb-4">Marks Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rangeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="range" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--accent))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card rounded-xl shadow-md border p-6">
          <h3 className="text-lg font-semibold mb-4">Grade Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={gradeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                  {gradeData.map((_, i) => (
                    <Cell key={i} fill={GRADE_COLORS[i % GRADE_COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
