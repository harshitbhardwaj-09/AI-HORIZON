import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";

const SentimentAnalysis = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <div className="flex-1">
          <Header />
          <main className="max-w-2xl mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-6">Sentiment Analysis</h1>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Overall Sentiment</h2>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-green-600 font-medium">Positive</div>
                    <div className="text-2xl font-bold">65%</div>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="text-yellow-600 font-medium">Neutral</div>
                    <div className="text-2xl font-bold">25%</div>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="text-red-600 font-medium">Negative</div>
                    <div className="text-2xl font-bold">10%</div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Recent Analysis</h2>
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <p className="text-gray-600 mb-2">"Great experience with the new features!"</p>
                    <div className="flex items-center gap-2">
                      <span className="text-green-600 font-medium">Positive</span>
                      <span className="text-sm text-gray-500">Score: 0.92</span>
                    </div>
                  </div>
                  <div className="border-b pb-4">
                    <p className="text-gray-600 mb-2">"The app is okay, but could use some improvements."</p>
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-600 font-medium">Neutral</span>
                      <span className="text-sm text-gray-500">Score: 0.45</span>
                    </div>
                  </div>
                  <div className="pb-4">
                    <p className="text-gray-600 mb-2">"Having issues with loading times."</p>
                    <div className="flex items-center gap-2">
                      <span className="text-red-600 font-medium">Negative</span>
                      <span className="text-sm text-gray-500">Score: 0.15</span>
                    </div>
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

export default SentimentAnalysis;
