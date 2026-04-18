import { schedule } from "@/data/mockData";

export default function AdminSchedule() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-2xl font-bold">Schedule Management</h2>
        <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition">
          Edit Schedule
        </button>
      </div>
      <div className="bg-card rounded-xl shadow-md border overflow-hidden overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted text-muted-foreground">
              <th className="text-left px-4 py-3 font-semibold">Time</th>
              {schedule.days.map((day) => (
                <th key={day} className="text-left px-4 py-3 font-semibold">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {schedule.slots.map((slot, si) => (
              <tr key={slot} className={`border-t hover:bg-muted/50 ${si % 2 !== 0 ? "bg-muted/20" : ""}`}>
                <td className="px-4 py-3 font-medium text-muted-foreground whitespace-nowrap">{slot}</td>
                {schedule.days.map((day, di) => (
                  <td key={day} className="px-4 py-3">
                    <span className="px-2 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium">
                      {schedule.timetable[di]?.[si] || "—"}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
