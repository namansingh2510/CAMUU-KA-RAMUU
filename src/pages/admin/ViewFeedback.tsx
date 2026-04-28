import { useState, useEffect } from "react";
import { getFeedbacks, FeedbackRecord } from "@/lib/api";
import { toast } from "sonner";
import { Star } from "lucide-react";

export default function ViewFeedback() {
  const [feedbacks, setFeedbacks] = useState<FeedbackRecord[]>([]);

  useEffect(() => {
    getFeedbacks()
      .then(setFeedbacks)
      .catch(() => toast.error("Failed to load feedbacks."));
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Feedback Analytics</h2>
      <div className="bg-card rounded-xl shadow-md border overflow-hidden overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted text-muted-foreground">
              <th className="text-left px-5 py-3 font-semibold">Date</th>
              <th className="text-left px-5 py-3 font-semibold">Student Name</th>
              <th className="text-left px-5 py-3 font-semibold">Teacher Name</th>
              <th className="text-left px-5 py-3 font-semibold">Rating</th>
              <th className="text-left px-5 py-3 font-semibold">Comment</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-4 text-center text-muted-foreground">
                  No feedback records found.
                </td>
              </tr>
            )}
            {feedbacks.map((f, i) => (
              <tr key={f.id} className={`border-t hover:bg-muted/50 ${i % 2 !== 0 ? "bg-muted/20" : ""}`}>
                <td className="px-5 py-3 whitespace-nowrap">
                  {f.createdAt ? new Date(f.createdAt).toLocaleDateString() : "—"}
                </td>
                <td className="px-5 py-3 font-medium">{f.studentName}</td>
                <td className="px-5 py-3">{f.teacherName}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-warning text-warning" />
                    <span className="font-semibold">{f.rating}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-muted-foreground">{f.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
