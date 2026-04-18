import { students, getGrade } from "@/data/mockData";

const student = students[0];

export default function StudentMarks() {
  const entries = Object.entries(student.marks);
  const total = entries.reduce((s, [, v]) => s + v, 0);
  const avg = Math.round(total / entries.length);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Marks</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-card rounded-xl shadow-md border p-5 text-center">
          <p className="text-sm text-muted-foreground">Total Marks</p>
          <p className="text-3xl font-bold mt-1">{total}/{entries.length * 100}</p>
        </div>
        <div className="bg-card rounded-xl shadow-md border p-5 text-center">
          <p className="text-sm text-muted-foreground">Average</p>
          <p className="text-3xl font-bold mt-1">{avg} <span className="text-lg text-muted-foreground">({getGrade(avg)})</span></p>
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-md border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted text-muted-foreground">
              <th className="text-left px-5 py-3 font-semibold">Subject</th>
              <th className="text-left px-5 py-3 font-semibold">Marks</th>
              <th className="text-left px-5 py-3 font-semibold">Grade</th>
            </tr>
          </thead>
          <tbody>
            {entries.map(([sub, val], i) => (
              <tr key={sub} className={`border-t hover:bg-muted/50 ${i % 2 !== 0 ? "bg-muted/20" : ""}`}>
                <td className="px-5 py-3 font-medium">{sub}</td>
                <td className="px-5 py-3">{val}</td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    val >= 80 ? "bg-success/10 text-success" :
                    val >= 60 ? "bg-warning/10 text-warning" :
                    "bg-destructive/10 text-destructive"
                  }`}>
                    {getGrade(val)}
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
