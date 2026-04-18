import { useState } from "react";
import { toast } from "sonner";

interface Props {
  onAdd: (name: string, marks: number, rating: number) => void;
}

export default function AddStudent({ onAdd }: Props) {
  const [name, setName] = useState("");
  const [marks, setMarks] = useState("");
  const [rating, setRating] = useState("3");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !marks) {
      toast.error("Please fill in all fields");
      return;
    }
    onAdd(name.trim(), Number(marks), Number(rating));
    setName("");
    setMarks("");
    setRating("3");
    toast.success("Student added successfully!");
  };

  return (
    <div className="flex justify-center">
      <div className="bg-card rounded-xl shadow-md border p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Add Student Data</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1.5">Student Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter student name"
              className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1.5">Marks</label>
            <input
              type="number"
              min={0}
              max={100}
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              placeholder="0 – 100"
              className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1.5">Feedback Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
            >
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>
                  {r} — {["Poor", "Fair", "Good", "Very Good", "Excellent"][r - 1]}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
