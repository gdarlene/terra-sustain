import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "./sidebar";
import CitizenHeader from "./Citizen-header";

interface DashboardStats {
  totalReports: number;
  points: number;
  badge: string;
  pointsToNextBadge: number;
  nextBadge: string;
}

interface LeaderboardUser {
  id: number;
  firstName: string;
  lastName: string;
  points: number;
  totalReports: number;
  badge: string;
  rank: number;
}

const Performance: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [myRank, setMyRank] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("firstName") || "";
    setFirstName(name);

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Please log in to view your performance");
          return;
        }

        const statsRes = await axios.get(
          "http://localhost:8096/terrasustain/citizen/stats",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setStats(statsRes.data);

        const leaderboardRes = await axios.get(
          "http://localhost:8096/terrasustain/citizen/leaderboard",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setLeaderboard(leaderboardRes.data);

        const me = leaderboardRes.data.find(
          (user: LeaderboardUser) => user.firstName.toLowerCase() === name.toLowerCase()
        );
        if (me) setMyRank(me.rank);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getBadgeStyle = (badge: string) => {
    switch (badge) {
      case "BRONZE": return { color: "#CD7F32", emoji: "🥉" };
      case "SILVER": return { color: "#C0C0C0", emoji: "🥈" };
      case "GOLD": return { color: "#FFD700", emoji: "🥇" };
      case "PLATINUM": return { color: "#E5E4E2", emoji: "🏆", glow: true };
      default: return { color: "#94a3b8", emoji: "Newbie" };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fcfff7c6] flex items-center justify-center">
        <p className="text-xl">Loading your performance...</p>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="min-h-screen bg-[#fcfff7c6] flex items-center justify-center">
        <p className="text-red-600 text-xl">{error}</p>
      </div>
    );
  }

  const badgeStyle = getBadgeStyle(stats.badge);

  return (
    <div className="min-h-screen bg-[#fcfff7c6]">
      {/* Sidebar for large screens */}
      <SideBar />
      <CitizenHeader />
      
      {/* Main content */}
      <div className="flex-1 lg:ml-28 w-full">
        <main className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
          {/* Page title */}
          <div className="text-center sm:text-left mt-4 sm:mt-6">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-800">
              My Performance
            </h1>
            <p className="mt-1 sm:mt-2 text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl">
              Track your impact, climb the ranks, and earn prestigious badges!
            </p>
          </div>

          {/* User Stats Grid */}
          <section className="mt-6 sm:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg text-center hover:scale-105 transform transition duration-200">
              <h3 className="text-xs sm:text-sm lg:text-lg font-semibold text-gray-700">Total Points</h3>
              <p className="text-2xl sm:text-3xl lg:text-5xl font-bold text-[#768600] mt-2 sm:mt-3">{stats.points}</p>
            </div>
            <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg text-center hover:scale-105 transform transition duration-200">
              <h3 className="text-xs sm:text-sm lg:text-lg font-semibold text-gray-700">Reports</h3>
              <p className="text-2xl sm:text-3xl lg:text-5xl font-bold text-[#768600] mt-2 sm:mt-3">{stats.totalReports}</p>
            </div>
            <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg text-center hover:scale-105 transform transition duration-200">
              <h3 className="text-xs sm:text-sm lg:text-lg font-semibold text-gray-700">Rank</h3>
              <p className="text-2xl sm:text-3xl lg:text-5xl font-bold text-[#768600] mt-2 sm:mt-3">{myRank ?? "—"}</p>
            </div>
            <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg text-center hover:scale-105 transform transition duration-200">
              <h3 className="text-xs sm:text-sm lg:text-lg font-semibold text-gray-700 mb-2 sm:mb-3">Current Badge</h3>
              <div className="flex flex-col items-center">
                <div
                  className={`text-3xl sm:text-4xl lg:text-6xl mb-2 sm:mb-3 ${badgeStyle.glow ? "animate-pulse" : ""}`}
                  style={{ filter: badgeStyle.glow ? "drop-shadow(0 0 8px gold)" : "" }}
                >
                  {badgeStyle.emoji}
                </div>
                <p className="text-lg sm:text-xl lg:text-3xl font-bold" style={{ color: badgeStyle.color }}>
                  {stats.badge}
                </p>
              </div>
            </div>
          </section>

          {/* Next Badge Progress */}
          <div className="mt-4 sm:mt-6 bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg">
            <h3 className="text-base sm:text-lg font-semibold text-gray-700">Next Badge: {stats.nextBadge}</h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-2">
              You need <strong>{stats.pointsToNextBadge}</strong> more points.
            </p>
            <div className="w-full bg-gray-300 rounded-full h-2 sm:h-2.5">
              <div
                className="h-2 sm:h-2.5 rounded-full bg-green-700"
                style={{ width: `${Math.min(100, (stats.points / (stats.points + stats.pointsToNextBadge)) * 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Leaderboard */}
          <section className="mt-6 sm:mt-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-800 mb-3 sm:mb-4">Leaderboard</h2>
            <div className="overflow-x-auto rounded-lg sm:rounded-xl">
              <table className="min-w-full bg-white shadow-sm sm:shadow rounded-lg sm:rounded-xl">
                <thead>
                  <tr className="bg-green-600/90 text-white text-xs sm:text-sm lg:text-base">
                    <th className="py-2 px-2 sm:px-3 lg:px-4 text-left whitespace-nowrap">Rank</th>
                    <th className="py-2 px-2 sm:px-3 lg:px-4 text-left whitespace-nowrap">Name</th>
                    <th className="py-2 px-2 sm:px-3 lg:px-4 text-left whitespace-nowrap hidden xs:table-cell">Badge</th>
                    <th className="py-2 px-2 sm:px-3 lg:px-4 text-left whitespace-nowrap">Points</th>
                    <th className="py-2 px-2 sm:px-3 lg:px-4 text-left whitespace-nowrap hidden sm:table-cell">Reports</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.slice(0, 20).map((user) => {
                    const isMe = user.firstName.toLowerCase() === firstName.toLowerCase();
                    const userBadge = getBadgeStyle(user.badge);
                    return (
                      <tr
                        key={user.id}
                        className={`border-b transition-all text-xs sm:text-sm lg:text-base ${
                          isMe ? "bg-green-100 font-bold text-green-900" : "hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        <td className="py-2 px-2 sm:px-3 lg:px-4 whitespace-nowrap">
                          {user.rank <= 3 ? user.rank : `#${user.rank}`}
                        </td>
                        <td className="py-2 px-2 sm:px-3 lg:px-4 whitespace-nowrap truncate max-w-[80px] sm:max-w-none">
                          {user.firstName} {user.lastName}{isMe && " (You)"}
                        </td>
                        <td className="py-2 px-2 sm:px-3 lg:px-4 whitespace-nowrap hidden xs:table-cell" style={{ color: userBadge.color }}>
                          <span className="hidden xs:inline">{userBadge.emoji} </span>
                          <span className="hidden sm:inline">{user.badge}</span>
                        </td>
                        <td className="py-2 px-2 sm:px-3 lg:px-4 whitespace-nowrap font-semibold">{user.points}</td>
                        <td className="py-2 px-2 sm:px-3 lg:px-4 whitespace-nowrap hidden sm:table-cell">{user.totalReports}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Performance;