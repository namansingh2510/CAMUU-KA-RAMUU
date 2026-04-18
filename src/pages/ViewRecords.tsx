import { Student } from "@/store/studentStore";

interface Props {
  students: Student[];
}

export default function ViewRecords({ students }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">View Records</h2>
      <div className="bg-card rounded-xl shadow-md border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted text-muted-foreground">
                <th className="text-left px-5 py-3 font-semibold">#</th>
                <th className="text-left px-5 py-3 font-semibold">Name</th>
                <th className="text-left px-5 py-3 font-semibold">Marks</th>
                <th className="text-left px-5 py-3 font-semibold">Rating</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr
                  key={s.id}
                  className={`border-t transition-colors hover:bg-muted/50 ${i % 2 === 0 ? "" : "bg-muted/20"}`}
                >
                  <td className="px-5 py-3">{i + 1}</td>
                  <td className="px-5 py-3 font-medium">{s.name}</td>
                  <td className="px-5 py-3">{s.marks}</td>
                  <td className="px-5 py-3">{"⭐".repeat(s.rating)}</td>
                </tr>
              ))}
              {students.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-muted-foreground">No records yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
