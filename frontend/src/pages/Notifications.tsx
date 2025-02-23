import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";

const Notifications = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <div className="flex-1">
          <Header />
          <main className="max-w-2xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-6">Notifications</h1>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600">🔔</span>
                  </div>
                  <div>
                    <p className="text-gray-900">New follower: @johndoe</p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600">❤️</span>
                  </div>
                  <div>
                    <p className="text-gray-900">@janesmith liked your post</p>
                    <p className="text-sm text-gray-500">4 hours ago</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-purple-600">💬</span>
                  </div>
                  <div>
                    <p className="text-gray-900">@mike commented on your post</p>
                    <p className="text-sm text-gray-500">1 day ago</p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Notifications;
