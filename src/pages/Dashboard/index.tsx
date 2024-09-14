import { Sidebar } from "../../components/Sidebar";

export const DashboardPage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            Welcome to the Dashboard
          </h2>
          <p>Your main content goes here.</p>
        </div>
      </main>
    </div>
  );
};
