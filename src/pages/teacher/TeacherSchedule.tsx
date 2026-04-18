import { schedule } from "@/data/mockData";

export default function TeacherSchedule() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Schedule</h2>
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
                {schedule.days.map((day, di) => {
                  const sub = schedule.timetable[di]?.[si] || "—";
                  const isTeaching = sub === "Computer Science" || sub === "Mathematics";
                  return (
                    <td key={day} className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                        isTeaching ? "bg-primary/10 text-primary" : "bg-muted/50 text-muted-foreground"
                      }`}>
                        {sub}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
