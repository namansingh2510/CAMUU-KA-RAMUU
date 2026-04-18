import { type LucideIcon } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: "primary" | "accent" | "success" | "warning";
}

const colorMap = {
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent/10 text-accent",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
};

export function SummaryCard({ title, value, icon: Icon, color }: SummaryCardProps) {
  return (
    <div className="bg-card rounded-xl shadow-md p-5 flex items-center gap-4 border transition-shadow hover:shadow-lg">
      <div className={`p-3 rounded-lg ${colorMap[color]}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold text-card-foreground">{value}</p>
      </div>
    </div>
  );
}
