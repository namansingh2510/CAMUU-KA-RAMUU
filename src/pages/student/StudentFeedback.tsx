import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { postFeedback, getTeachers } from "@/lib/api";
import { TeacherRecord } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";

export default function StudentFeedback() {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [teachers, setTeachers] = useState<TeacherRecord[]>([]);
  const [selectedTeacher, setSelectedTeacher] = useState<string>("");

  useEffect(() => {
    getTeachers().then(setTeachers).catch(() => toast.error("Failed to load teachers"));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTeacher) { toast.error("Please select a teacher"); return; }
    if (rating === 0) { toast.error("Please select a rating"); return; }
    
    try {
      const teacher = teachers.find(t => t.id.toString() === selectedTeacher);
      if (!teacher) return;
      
      await postFeedback({
        studentName: user?.name || "Student",
        teacherId: teacher.id,
        teacherName: teacher.name,
        rating,
        comment
      });
      toast.success("Feedback submitted successfully!");
      setRating(0);
      setComment("");
      setSelectedTeacher("");
    } catch {
      toast.error("Failed to submit feedback");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="bg-card rounded-xl shadow-md border p-8 w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold">Submit Feedback</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">Teacher</label>
            <select
              value={selectedTeacher}
              onChange={(e) => setSelectedTeacher(e.target.value)}
              className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
            >
              <option value="">-- Select Teacher --</option>
              {teachers.map(t => (
                <option key={t.id} value={t.id.toString()}>{t.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hover || rating) ? "fill-warning text-warning" : "text-muted"
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1.5">Comments</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              placeholder="Share your feedback..."
              className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}
