import {
  LayoutDashboard, UserPlus, Table, BarChart3, Globe, Users, ClipboardCheck,
  BookOpen, MessageSquare, Calendar, UserCircle, GraduationCap, FileText,
  Settings,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/context/AuthContext";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";
import { Role } from "@/data/mockData";

interface MenuItem {
  title: string;
  url: string;
  icon: React.ElementType;
}

const menusByRole: Record<Role, MenuItem[]> = {
  student: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Attendance", url: "/attendance", icon: ClipboardCheck },
    { title: "Marks", url: "/marks", icon: BookOpen },
    { title: "Feedback", url: "/feedback", icon: MessageSquare },
    { title: "Schedule", url: "/schedule", icon: Calendar },
    { title: "Profile", url: "/profile", icon: UserCircle },
  ],
  teacher: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Student Records", url: "/student-records", icon: Table },
    { title: "Attendance", url: "/attendance-manage", icon: ClipboardCheck },
    { title: "Marks", url: "/marks-manage", icon: BookOpen },
    { title: "Parent Details", url: "/parent-details", icon: Users },
    { title: "Schedule", url: "/schedule", icon: Calendar },
  ],
  admin: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Manage Students", url: "/manage-students", icon: GraduationCap },
    { title: "Manage Teachers", url: "/manage-teachers", icon: Users },
    { title: "Reports", url: "/reports", icon: BarChart3 },
    { title: "Schedule", url: "/schedule-manage", icon: Calendar },
    { title: "All Records", url: "/all-records", icon: FileText },
    { title: "Feedback", url: "/admin-feedback", icon: MessageSquare },
  ],
};

export function RoleSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { user } = useAuth();
  const role = user?.role || "student";
  const items = menusByRole[role];

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <div className="p-4">
          {!collapsed && (
            <h2 className="text-lg font-bold text-sidebar-primary-foreground tracking-tight">
              🎓 CMS
            </h2>
          )}
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>{role.charAt(0).toUpperCase() + role.slice(1)} Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="hover:bg-sidebar-accent/80 transition-colors"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
