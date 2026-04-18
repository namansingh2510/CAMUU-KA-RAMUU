import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserCircle } from "lucide-react";

export function TopNavbar() {
  return (
    <header className="h-14 border-b bg-card flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <h1 className="text-base font-semibold text-foreground">
          Student Performance & Feedback System
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground hidden sm:inline">Admin</span>
        <UserCircle className="h-8 w-8 text-primary" />
      </div>
    </header>
  );
}
