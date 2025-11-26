import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../authenticated-citizen/sidebar";
import CitizenHeader from "./Citizen-header";
import { UserGroupIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

interface DashboardStats {
  totalReports: number;
  points: number;
  name: string;
}

const CitizenDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    setFirstName(localStorage.getItem("firstName") || "");
    setLastName(localStorage.getItem("lastName") || "");
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("User not authenticated");
          return;
        }

        const res = await axios.get(
          "http://localhost:8096/terrasustain/citizen/stats",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setStats(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || "Failed to load stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <p className="min-h-screen flex items-center justify-center text-primary text-xl">Loading...</p>;
  if (error) return <p className="min-h-screen flex items-center justify-center text-red-600 text-lg">{error}</p>;

  const formattedStats = [
    { name: "Total Reports", value: stats?.totalReports },
    { name: "Points Earned", value: stats?.points },
  ];

  return (
    <div className="min-h-screen bg-[#fcfff7c6]">
      <SideBar />
      <CitizenHeader />
      <main className="lg:pl-64 pb-16 lg:pb-8">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome */}
          <div className="transition-all duration-700">
            <h1 className="text-3xl font-bold text-neutral-800 font-subheadings">
              Welcome back, {firstName} {lastName}!
            </h1>
            <p className="mt-1 text-lg text-textColor/85 font-body">
              Give your contribution to sustainability with real-time data.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {formattedStats.map((stat, idx) => (
              <div
                key={stat.name}
                className="overflow-hidden rounded-xl bg-white p-6 h-[15vh] shadow-md hover:shadow-lg transition-shadow"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <p className="mt-2 text-sm font-medium text-textColor/60">{stat.name}</p>
                <p className="mt-1 text-2xl font-bold text-textColor/90">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-10 flex flex-wrap gap-4 justify-center sm:justify-start">
            <a href="/citizen/add_issue">
              <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-white font-medium hover:bg-primary/90 transition shadow-md">
                <PlusCircleIcon className="h-5 w-5" />
                Report a new issue
              </button>
            </a>

            <a href="/citizen/community-events">
              <button className="flex items-center gap-2 rounded-xl border border-primary px-5 py-3 text-primary font-medium hover:bg-primary/50 hover:text-white transition">
                <UserGroupIcon className="h-5 w-5" />
                Browse nearby community events
              </button>
            </a>
          </div>
          <div className="mt-11">
            <p className="text-base sm:text-lg text-[#ab3d11] font-semibold font-body mb-6 max-w-2xl">
                More analytics and features coming soon!
              </p>
              <img
                src="/images/coming-soon.png"
                className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 object-contain"
                alt="feature coming soon alert"
              />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CitizenDashboard;