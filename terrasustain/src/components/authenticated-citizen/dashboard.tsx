import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "./sidebar";
import CitizenHeader from "./Citizen-header";
import { UserGroupIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

interface DashboardStats {
  totalReports: number;
  ranking: number;
  name:string;
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
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(res.data);
    } catch (err: any) {
      const msg =
        err.response?.data?.message || err.message || "Failed to load stats";
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
        <p className="text-primary text-xl font-medium">Loading dashboard…</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen bg-[#fcfff7c6] flex items-center justify-center">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }
  const formattedStats = [
    { name: "Total Reports", value: stats?.totalReports },
  ];

  return (
    <div className="min-h-screen bg-[#fcfff7c6]">
      <SideBar />
      <CitizenHeader />

      <main className="lg:pl-64">
        <div className="px-4 sm:px-6 lg:px-8 py-8 pb-20 lg:pb-8">

          {/* Welcome */}
          <div className="transition-all duration-700">
            <h1 className="text-3xl font-bold text-neutral-800 font-subheadings">
              Welcome back, {firstName} {lastName}!
            </h1>
            <p className="mt-1 text-lg text-textColor/85 font-body">
              Give your contribution to sustainability with real time data.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {formattedStats.map((stat, idx) => (
              <div
                key={stat.name}
                className="overflow-hidden rounded-xl bg-white p-6 h-[15vh] shadow-md hover:shadow-lg transition-shadow"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <p className="mt-2 text-sm font-medium text-textColor/60">
                  {stat.name}
                </p>
                <p className="mt-1 text-2xl font-bold text-textColor/90">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="/citizen/add_issue">
              <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-white font-medium hover:bg-primary/90 transition shadow-md">
                <PlusCircleIcon className="h-5 w-5" />
                Report a new issue
              </button>
            </a>

            <a href="/citizen/community">
              <button className="flex items-center gap-2 rounded-xl border border-primary px-5 py-3 text-primary font-medium hover:bg-primary/50 hover:text-white transition">
                <UserGroupIcon className="h-5 w-5" />
                Browse nearby community events
              </button>
            </a>
          </div>

        </div>
      </main>
    </div>
  );
};

export default CitizenDashboard;