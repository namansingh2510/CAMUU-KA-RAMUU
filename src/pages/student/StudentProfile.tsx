import { students } from "@/data/mockData";
import { UserCircle } from "lucide-react";

const student = students[0];

export default function StudentProfile() {
  const fields = [
    { label: "Full Name", value: student.name },
    { label: "Roll Number", value: student.rollNo },
    { label: "Course", value: student.course },
    { label: "Semester", value: student.semester },
    { label: "Parent/Guardian", value: student.parentName },
    { label: "Parent Contact", value: student.parentPhone },
  ];

  return (
    <div className="flex justify-center">
      <div className="bg-card rounded-xl shadow-md border p-8 w-full max-w-md space-y-6">
        <div className="flex flex-col items-center gap-3">
          <div className="p-4 rounded-full bg-primary/10">
            <UserCircle className="h-16 w-16 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">{student.name}</h2>
          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            {student.course}
          </span>
        </div>
        <div className="space-y-3">
          {fields.map((f) => (
            <div key={f.label} className="flex justify-between py-2 border-b last:border-0">
              <span className="text-sm text-muted-foreground">{f.label}</span>
              <span className="text-sm font-medium">{f.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
