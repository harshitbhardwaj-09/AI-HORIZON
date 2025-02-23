import { Home, Bell, User, BarChart, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";

const menuItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Bell, label: "Notifications", href: "/notifications" },
  { icon: BarChart, label: "Sentiment Analysis", href: "/sentiment" },
  { icon: User, label: "Profile", href: "/profile" },
];

export function AppSidebar() {
  const { toast } = useToast();
  const currentPath = window.location.pathname;

  const handleLogout = () => {
    toast({
      title: "Logging out...",
      description: "You have been successfully logged out.",
    });
    // Add actual logout logic here when authentication is implemented
  };

  return (
    <Sidebar className="border-r border-gray-200 flex flex-col justify-between">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="py-16">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 
                        ${
                          currentPath === item.href
                            ? "bg-gray-100 text-blue-600"
                            : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                        }
                        group relative overflow-hidden`}
                    >
                      <item.icon
                        className={`h-5 w-5 transition-colors duration-200 
                        ${
                          currentPath === item.href
                            ? "text-blue-600"
                            : "text-gray-500 group-hover:text-blue-600"
                        }`}
                      />
                      <span className="font-medium">{item.label}</span>
                      {currentPath === item.href && (
                        <span className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r" />
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 w-full text-gray-700 hover:bg-gray-50 hover:text-red-600 rounded-md transition-all duration-200 group"
        >
          <LogOut className="h-5 w-5 text-gray-500 group-hover:text-red-600 transition-colors duration-200" />
          <span className="font-medium">Logout</span>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
}
