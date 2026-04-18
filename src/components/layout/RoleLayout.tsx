import { SidebarProvider } from "@/components/ui/sidebar";
import { RoleSidebar } from "./RoleSidebar";
import { RoleNavbar } from "./RoleNavbar";

export function RoleLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <RoleSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <RoleNavbar />
          <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
