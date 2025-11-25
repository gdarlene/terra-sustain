import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "./sidebar";
import CitizenHeader from "./Citizen-header";

interface DashboardStats {
  totalReports: number;
  points: number;
  name: string;
}

const Performance: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("User not authenticated");
          return;
        }

        const res = await axios.get(
          "http://localhost:8096/terrasustain/citizen/stats",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setStats(res.data);
      } catch (err: any) {
        const msg =
          err.response?.data?.message ||
          err.message ||
          "Failed to load stats";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fcfff7c6] flex items-center justify-center">
        <p>Loading performance…</p>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="min-h-screen bg-[#fcfff7c6] flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfff7c6]">
      <SideBar />
      <CitizenHeader />

      <main className="px-4 mx-72 max-w-7xl sm:px-6 lg:px-8">

        {/* Page Title */}
        <div className="transition-all duration-700 mt-10">
          <h1 className="text-3xl font-bold text-neutral-800 font-subheading">
            My Performance
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Track your sustainability contributions.
          </p>
        </div>

        {/* Real-Time User Stats */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-green-800 mb-6">
            Your Stats
          </h2>

          <div className="grid gap-6 md:grid-cols-4">
            {/* Points */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Points
              </h3>
              <p className="text-3xl font-bold text-green-600">
                {stats.points}
              </p>
            </div>

            {/* Reports */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Reports Submitted
              </h3>
              <p className="text-3xl font-bold text-green-600">
                {stats.totalReports}
              </p>
            </div>

            {/* Rank Placeholder */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Current Rank
              </h3>
              <p className="text-3xl font-bold text-green-600">—</p>
              <p className="text-sm text-gray-500">Coming soon</p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Performance;