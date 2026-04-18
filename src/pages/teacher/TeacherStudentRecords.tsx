import { students, getOverallMarks, getOverallAttendance } from "@/data/mockData";

export default function TeacherStudentRecords() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Student Records</h2>
      <div className="bg-card rounded-xl shadow-md border overflow-hidden overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted text-muted-foreground">
              <th className="text-left px-5 py-3 font-semibold">#</th>
              <th className="text-left px-5 py-3 font-semibold">Name</th>
              <th className="text-left px-5 py-3 font-semibold">Roll No</th>
              <th className="text-left px-5 py-3 font-semibold">Avg Marks</th>
              <th className="text-left px-5 py-3 font-semibold">Attendance %</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => (
              <tr key={s.id} className={`border-t hover:bg-muted/50 ${i % 2 !== 0 ? "bg-muted/20" : ""}`}>
                <td className="px-5 py-3">{i + 1}</td>
                <td className="px-5 py-3 font-medium">{s.name}</td>
                <td className="px-5 py-3">{s.rollNo}</td>
                <td className="px-5 py-3">{getOverallMarks(s)}</td>
                <td className="px-5 py-3">{getOverallAttendance(s)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
