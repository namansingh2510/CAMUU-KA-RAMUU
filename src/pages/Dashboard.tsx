import { Users, TrendingUp, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { SummaryCard } from "@/components/SummaryCard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Student } from "@/store/studentStore";

interface Props {
  students: Student[];
  totalStudents: number;
  averageMarks: number;
  highestScore: number;
  lowestScore: number;
}

export default function Dashboard({ students, totalStudents, averageMarks, highestScore, lowestScore }: Props) {
  const chartData = students.slice(0, 8).map((s) => ({ name: s.name.split(" ")[0], marks: s.marks }));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard title="Total Students" value={totalStudents} icon={Users} color="primary" />
        <SummaryCard title="Average Marks" value={averageMarks} icon={TrendingUp} color="accent" />
        <SummaryCard title="Highest Score" value={highestScore} icon={ArrowUpCircle} color="success" />
        <SummaryCard title="Lowest Score" value={lowestScore} icon={ArrowDownCircle} color="warning" />
      </div>
      <div className="bg-card rounded-xl shadow-md p-6 border">
        <h3 className="text-lg font-semibold mb-4">Student Marks Overview</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))" }} />
              <Bar dataKey="marks" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
