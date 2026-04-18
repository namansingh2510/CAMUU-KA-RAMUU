import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function RoleNavbar() {
  const { user, logout } = useAuth();

  return (
    <header className="h-14 border-b bg-card flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <h1 className="text-base font-semibold text-foreground">
          College Management System
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-lg hover:bg-muted/50 transition-colors">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full" />
        </button>
        <div className="hidden sm:flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">{user?.name}</span>
          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium capitalize">
            {user?.role}
          </span>
        </div>
        <button
          onClick={logout}
          className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
          title="Logout"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
