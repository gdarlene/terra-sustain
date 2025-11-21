import React, { useState, useEffect } from "react";
import SideBar from "./sidebar";
import CitizenHeader from "./Citizen-header";

const mockLeaderboard = [
  {
    id: 1,
    name: "Thomas L. Fletcher",
    points: 2450,
    reports: 54,
    level: 60,
  },
  {
    id: 2,
    name: "Jane Doe",
    points: 2400,
    reports: 50,
    level: 58,
  },
  {
    id: 3,
    name: "Wade Warren",
    points: 2350,
    reports: 48,
    impact: 410,
    level: 57,
  },
];

const currentUser = {
  id: 4,
  name: "Your Name",
  // role: "Citizen Reporter",
  // avatar: "/images/your-avatar.jpg",
  points: 2200,
  reports: 45,
  level: 55,
  rank: 4, 
};
const Performance: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState(mockLeaderboard);
  const [userRank, setUserRank] = useState(currentUser.rank);

  useEffect(() => {
    
  }, []);

  return (
    <div className="min-h-screen bg-[#fcfff7c6]">
      <SideBar />
      <CitizenHeader />
      <main className="px-4 mx-72 max-w-7xl sm:px-6 lg:px-8">
        {/* Introduction to page */}
        <div className="transition-all duration-700 mt-10">
          <h1 className="text-3xl font-bold text-neutral-800 font-subheading">
            My Performance
          </h1>
          <p className="mt-2 text-lg text-gray-600 font-body">
            Track your contributions to the world's sustainability fight, view your stats, and see how you rank among other citizens.
          </p>
        </div>

        {/* Personal Stats Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-green-800 font-subheading mb-6">
            Your Rank
          </h2>
          <div className="grid gap-6 md:grid-cols-4">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Points</h3>
              <p className="text-3xl font-bold text-green-600">{currentUser.points}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Reports Submitted</h3>
              <p className="text-3xl font-bold text-green-600">{currentUser.reports}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Current Rank</h3>
              <p className="text-3xl font-bold text-green-600">#{userRank}</p>
            </div>
          </div>
        </section>
        {/* Leaderboard Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-green-800 font-subheading mb-6">
            Leaderboard
          </h2>
          <p className="text-lg text-gray-600 font-body mb-6">
            See how you stack up against other guardians. Ranked by points earned from reports and engagements.
          </p>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-green-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reports</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leaderboard.map((user, index) => (
                  <tr
                    key={user.id}
                    className={`${user.id === currentUser.id ? 'bg-green-50' : ''}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {index + 1} {index < 3 && <span className="text-yellow-500">🏅</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          {/* <div className="text-sm text-gray-500">{user.role}</div> */}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.points}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.reports}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <a href="#" className="text-secondary font-semibold hover:text-orange-900">Follow</a>
                    </td>
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