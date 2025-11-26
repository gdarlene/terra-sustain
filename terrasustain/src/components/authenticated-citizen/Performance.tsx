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
        // Fetch dashboard stats
        const statsRes = await axios.get(
          "http://localhost:8096/terrasustain/citizen/stats",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setStats(statsRes.data);

        // Fetch leaderboard
        const leaderboardRes = await axios.get(
          "http://localhost:8096/terrasustain/citizen/leaderboard",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setLeaderboard(leaderboardRes.data);

        // Find current user's rank
        const me = leaderboardRes.data.find(
          (user: LeaderboardUser) =>
            user.firstName.toLowerCase() === name.toLowerCase()
        );
        if (me) setMyRank(me.rank);
      } catch (err: any) {
        const msg =
          err.response?.data?.message || err.message || "Failed to load data";
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // badge color and emoji
  const getBadgeStyle = (badge: string) => {
    switch (badge) {
      case "BRONZE":   return { color: "#CD7F32", emoji: "🥉" };
      case "SILVER":   return { color: "#C0C0C0", emoji: "🥈" };
      case "GOLD":     return { color: "#FFD700", emoji: "🥇" };
      case "PLATINUM": return { color: "#E5E4E2", emoji: "Platinum", glow: true };
      default:         return { color: "#94a3b8", emoji: "Newbie" };
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
      <SideBar />
      <CitizenHeader />

      <main className="px-4 mx-72 max-w-7xl sm:px-6 lg:px-8">
        {/* PAGE TITLE */}
        <div className="transition-all duration-700 mt-10">
          <h1 className="text-4xl font-bold text-neutral-800 font-subheading">
            My Performance
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Track your impact, climb the ranks, and earn prestigious badges!
          </p>
        </div>

        {/* USER STATS GRID */}
        <section className="mt-10">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Points */}
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center transform hover:scale-105 transition">
              <h3 className="text-xl mt-5 font-semibold text-gray-700">Total Points</h3>
              <p className="text-5xl font-bold text-[#768600] mt-3">{stats.points}</p>
            </div>

            {/* Reports */}
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center transform hover:scale-105 transition">
              <h3 className="text-xl mt-3  font-semibold text-gray-700">Reports</h3>
              <p className="text-5xl font-bold text-[#768600] mt-3">{stats.totalReports}</p>
            </div>

            {/* Rank */}
            <div className="bg-white p-8 items-center rounded-2xl shadow-lg text-center transform hover:scale-105 transition">
              <h3 className="text-xl mt-3 font-semibold text-gray-700">Rank</h3>
              <p className="text-5xl font-bold text-[#768600] mt-3">
                {myRank ? `${myRank}` : "—"}
              </p>
            </div>

            {/* Badge */}
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center transform hover:scale-105 transition">
              <h3 className="text-xl font-semibold text-gray-700 mb-3">Current Badge</h3>
              <div className="flex flex-col items-center">
                <div
                  className={`text-6xl mb-3 ${badgeStyle.glow ? "animate-pulse" : ""}`}
                  style={{ filter: badgeStyle.glow ? "drop-shadow(0 0 10px gold)" : "" }}
                >
                  {badgeStyle.emoji}
                </div>
                <p
                  className="text-3xl font-bold"
                  style={{ color: badgeStyle.color }}
                >
                  {stats.badge}
                </p>
              </div>
            </div>
          </div>

          {/* Progress to Next Badge */}
          {/* {stats.nextBadge !== "MAX LEVEL" && (
            <div className="mt-10 bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-2xl shadow-md">
              <h3 className="text-2xl font-bold text-green-800 mb-4">
                Next Badge: <span className="text-[#888888]">{stats.nextBadge}</span>
              </h3>
              <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-500 to-[#688a51cb] h-full transition-all duration-1000"
                  style={{
                    width: `${Math.min(
                      100,
                      ((stats.points % 100) / (stats.pointsToNextBadge || 100)) * 100
                    )}%`,
                  }}
                />
              </div>
              <p className="mt-3 text-lg font-medium text-gray-700">
                {stats.pointsToNextBadge} points needed
              </p>
            </div>
          )} */}
        </section>

        {/* LEADERBOARD */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-green-800 mb-6">Leaderboard</h2>

          <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
            <table className="min-w-full">
              <thead>
                <tr className="bg-green-600/90 text-white">
                  <th className="py-3 px-4 text-left">Rank</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Badge</th>
                  <th className="py-3 px-4 text-left">Points</th>
                  <th className="py-3 px-4 text-left">Reports</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.slice(0, 20).map((user) => {
                  const isMe = user.firstName.toLowerCase() === firstName.toLowerCase();
                  const userBadge = getBadgeStyle(user.badge);

                  return (
                    <tr
                      key={user.id}
                      className={`border-b transition-all ${
                        isMe
                          ? "bg-green-100 font-bold text-green-900 scale-105"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <td className="py-5 px-6">
                        {user.rank <= 3 ? (
                          <span className="text-lg mx-6">
                            {user.rank === 1 && "1"}
                            {user.rank === 2 && "2nd"}
                            {user.rank === 3 && "3rd"}
                          </span>
                        ) : (
                          `#${user.rank}`
                        )}
                      </td>
                      <td className="py-5 px-6">
                        {user.firstName} {user.lastName}
                        {isMe && " (You)"}
                      </td>
                      <td className="py-5 px-6">
                        <span style={{ color: userBadge.color }}>
                          {userBadge.emoji} {user.badge}
                        </span>
                      </td>
                      <td className="py-5 px-6 font-semibold">{user.points}</td>
                      <td className="py-5 px-6">{user.totalReports}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Performance;