import { students } from "@/data/mockData";

export default function TeacherParentDetails() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Parent Details</h2>
      <div className="bg-card rounded-xl shadow-md border overflow-hidden overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted text-muted-foreground">
              <th className="text-left px-5 py-3 font-semibold">Student</th>
              <th className="text-left px-5 py-3 font-semibold">Parent Name</th>
              <th className="text-left px-5 py-3 font-semibold">Phone</th>
              <th className="text-left px-5 py-3 font-semibold">Email</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => (
              <tr key={s.id} className={`border-t hover:bg-muted/50 ${i % 2 !== 0 ? "bg-muted/20" : ""}`}>
                <td className="px-5 py-3 font-medium">{s.name}</td>
                <td className="px-5 py-3">{s.parentName}</td>
                <td className="px-5 py-3">{s.parentPhone}</td>
                <td className="px-5 py-3 text-primary">{s.parentEmail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
