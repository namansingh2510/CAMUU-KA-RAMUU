import { students } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const student = students[0];

export default function StudentAttendance() {
  const overall = Math.round(
    Object.values(student.attendance).reduce((a, b) => a + b, 0) / Object.values(student.attendance).length
  );

  const chartData = Object.entries(student.attendance).map(([sub, val]) => ({
    subject: sub.length > 10 ? sub.slice(0, 10) + "…" : sub,
    attendance: val,
  }));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Attendance</h2>

      <div className="bg-card rounded-xl shadow-md border p-6 text-center">
        <p className="text-sm text-muted-foreground">Overall Attendance</p>
        <p className={`text-4xl font-bold mt-1 ${overall >= 75 ? "text-success" : "text-destructive"}`}>
          {overall}%
        </p>
      </div>

      <div className="bg-card rounded-xl shadow-md border p-6">
        <h3 className="text-lg font-semibold mb-4">Subject-wise Attendance</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="subject" tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="attendance" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-md border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted text-muted-foreground">
              <th className="text-left px-5 py-3 font-semibold">Subject</th>
              <th className="text-left px-5 py-3 font-semibold">Attendance %</th>
              <th className="text-left px-5 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(student.attendance).map(([sub, val], i) => (
              <tr key={sub} className={`border-t hover:bg-muted/50 ${i % 2 !== 0 ? "bg-muted/20" : ""}`}>
                <td className="px-5 py-3 font-medium">{sub}</td>
                <td className="px-5 py-3">{val}%</td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${val >= 75 ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                    {val >= 75 ? "Good" : "Low"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
