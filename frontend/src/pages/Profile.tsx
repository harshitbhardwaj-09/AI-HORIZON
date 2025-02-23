import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Camera } from "lucide-react";

const Profile = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <div className="flex-1">
          <Header />
          <main className="max-w-2xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-6">Profile</h1>
            <Card className="p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute bottom-0 right-0 rounded-full"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <form className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Display Name</label>
                  <Input defaultValue="John Doe" />
                </div>
                <div>
                  <label className="text-sm font-medium">Username</label>
                  <Input defaultValue="@johndoe" />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" defaultValue="john@example.com" />
                </div>
                <div>
                  <label className="text-sm font-medium">Bio</label>
                  <Textarea
                    defaultValue="Software developer and tech enthusiast."
                    rows={4}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Save Changes
                </Button>
              </form>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Profile;
