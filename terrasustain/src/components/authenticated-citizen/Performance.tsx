import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "./sidebar";
import CitizenHeader from "./Citizen-header";

interface DashboardStats {
  totalReports: number;
  points: number;
}
interface LeaderboardUser {
  id: number;
  firstName: string;
  lastName: string;
  points: number;
  totalReports: number;
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
    setFirstName(localStorage.getItem("firstName") || "");
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("User not authenticated");
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
          (user: LeaderboardUser) => user.firstName === firstName
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
  }, [firstName]);

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

        {/* PAGE TITLE */}
        <div className="transition-all duration-700 mt-10">
          <h1 className="text-3xl font-bold text-neutral-800 font-subheading">
            My Performance
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Track your ongoing ranks and position and be able to receive awards and ranks!.
          </p>
        </div>

        {/* USER STATS */}
        <section className="mt-6">
          <div className="grid gap-6 md:grid-cols-4">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Points
              </h3>
              <p className="text-3xl font-bold text-green-600">
                {stats.points}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Reports Submitted
              </h3>
              <p className="text-3xl font-bold text-green-600">
                {stats.totalReports}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Current Rank
              </h3>
              <p className="text-3xl font-bold text-green-600">
                {myRank !== null ? `${myRank}` : "—"}
              </p>
            </div>
          </div>
        </section>

        {/* LEADERBOARD TABLE */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-green-800 mb-4">
            Leaderboard
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow rounded-lg">
              <thead>
                <tr className="bg-green-600/90 text-white">
                  <th className="py-3 px-4 text-left">Rank</th>
                  <th className="py-3 px-4 text-left">First Name</th>
                  <th className="py-3 px-4 text-left">Last Name</th>
                  <th className="py-3 px-4 text-left">Points</th>
                  <th className="py-3 px-4 text-left">Total Reports</th>
                </tr>
              </thead>

              <tbody>
                {leaderboard.map((user) => (
                  <tr
                    key={user.id}
                    className={`border-b hover:bg-gray-50 ${
                      user.firstName === firstName ? "bg-green-100/50 font-bold" : ""
                    }`}
                  >
                    <td className="py-3 px-4">#{user.rank}</td>
                    <td className="py-3 px-4">{user.firstName}</td>
                    <td className="py-3 px-4">{user.lastName}</td>
                    <td className="py-3 px-4">{user.points}</td>
                    <td className="py-3 px-4">{user.totalReports}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Performance;