import { useState, useEffect } from "react";
import { Users, GraduationCap, BookOpen, TrendingUp } from "lucide-react";
import { SummaryCard } from "@/components/SummaryCard";
import { students, teachers } from "@/data/mockData";
import { getStudents, getTeachers } from "@/lib/api";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function AdminDashboard() {
  const [studentCount, setStudentCount] = useState(students.length);
  const [teacherCount, setTeacherCount] = useState(teachers.length);

  useEffect(() => {
    getStudents().then(res => setStudentCount(res.length)).catch(console.error);
    getTeachers().then(res => setTeacherCount(res.length)).catch(console.error);
  }, []);
  const avgMarks = Math.round(
    students.reduce((s, st) => s + Math.round(Object.values(st.marks).reduce((a, b) => a + b, 0) / Object.values(st.marks).length), 0) / students.length
  );

  const deptData = teachers.map((t) => ({ name: t.department, students: Math.floor(Math.random() * 50) + 20 }));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard title="Total Students" value={studentCount} icon={GraduationCap} color="primary" />
        <SummaryCard title="Total Teachers" value={teacherCount} icon={Users} color="accent" />
        <SummaryCard title="Departments" value={4} icon={BookOpen} color="success" />
        <SummaryCard title="Avg Performance" value={`${avgMarks}%`} icon={TrendingUp} color="warning" />
      </div>

      <div className="bg-card rounded-xl shadow-md border p-6">
        <h3 className="text-lg font-semibold mb-4">Students by Department</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={deptData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="students" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
