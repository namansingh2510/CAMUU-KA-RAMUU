import { useState } from "react";
import { students, subjects } from "@/data/mockData";
import { toast } from "sonner";

export default function TeacherMarks() {
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [marks, setMarks] = useState<Record<number, string>>(
    Object.fromEntries(students.map((s) => [s.id, String(s.marks[selectedSubject] || "")]))
  );

  const handleSubjectChange = (sub: string) => {
    setSelectedSubject(sub);
    setMarks(Object.fromEntries(students.map((s) => [s.id, String(s.marks[sub] || "")])));
  };

  const handleSubmit = () => toast.success(`Marks updated for ${selectedSubject}`);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-2xl font-bold">Marks Management</h2>
        <button onClick={handleSubmit} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition">
          Save Marks
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {subjects.map((sub) => (
          <button
            key={sub}
            onClick={() => handleSubjectChange(sub)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              selectedSubject === sub ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      <div className="bg-card rounded-xl shadow-md border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted text-muted-foreground">
              <th className="text-left px-5 py-3 font-semibold">Name</th>
              <th className="text-left px-5 py-3 font-semibold">Roll No</th>
              <th className="text-left px-5 py-3 font-semibold">Marks</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => (
              <tr key={s.id} className={`border-t hover:bg-muted/50 ${i % 2 !== 0 ? "bg-muted/20" : ""}`}>
                <td className="px-5 py-3 font-medium">{s.name}</td>
                <td className="px-5 py-3">{s.rollNo}</td>
                <td className="px-5 py-3">
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={marks[s.id]}
                    onChange={(e) => setMarks((prev) => ({ ...prev, [s.id]: e.target.value }))}
                    className="w-20 rounded-lg border bg-background px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
