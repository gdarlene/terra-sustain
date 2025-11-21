import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from './sidebar';
import CitizenHeader from './Citizen-header';
import axios from 'axios';
import { Search } from '@mui/icons-material';
interface UserSummary {
  id: number;
  username: string;
  province: string;
  points: number;
  avatarUrl?: string;
}

interface ReportResponse {
  id: number;
  issueDescription: string;
  mediaUrl: string;
  category: string;
  submittedDate: string;
  username: string;
  province: string;
  likes: number;
  comments: number;
}

const CommunityPage: React.FC = () => {
  const [members, setMembers] = useState<UserSummary[]>([]);
  const [reports, setReports] = useState<ReportResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [membersRes, reportsRes] = await Promise.all([
        axios.get('http://localhost:8096/terrasustain/citizen/members', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('http://localhost:8096/terrasustain/citizen/reports', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      setMembers(membersRes.data);
      setReports(reportsRes.data);
    } catch (err) {
      console.error("Failed to load community data", err);
    } finally {
      setLoading(false);
    }
  };

  const searchReports = async () => {
    if (!searchTerm.trim()) {
      fetchData();
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:8096/terrasustain/citizen/search?q=${encodeURIComponent(searchTerm)}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReports(res.data);
    } catch (err) {
      console.error("Search failed", err);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      searchReports();
    }, 500); // debounce
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const handleUserClick = (userId: number) => {
    navigate(`/profile/${userId}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="text-center mt-20">Loading community...</div>;
  }

  return (
    <div className="min-h-screen bg-[#fcfff7c6]">
      <SideBar />
      <CitizenHeader />

      <main className="lg:pl-64">
        <div className="mx-3 max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
          <h1 className="text-4xl font-bold text-green-800 mb-8 font-titles">
            Community Hub
          </h1>

         <div className='flex'>
            {/* Search */}
            <input
              type="text"
              placeholder="Search reports or citizens..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 mb-10 rounded-lg border border-gray-300 text-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
              <Search className='text-primary !w-7 !h-7 -mx-11 mt-4'/>
          </div>
          {/* Members */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Active Citizens</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {members.map(user => (
                <div
                  key={user.id}
                  onClick={() => handleUserClick(user.id)}
                  className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-xl transition cursor-pointer"
                >
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 border-4 border-green-100" />
                  <h3 className="font-bold text-sm">{user.username}</h3>
                  <p className="text-xs text-gray-600">{user.province}</p>
                  <p className="text-green-600 font-bold text-sm">{user.points} pts</p>
                </div>
              ))}
            </div>
          </section>

          {/* Reports Feed */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Environmental Reports</h2>
            <div className="space-y-8">
              {reports.length === 0 ? (
                <p className="text-center text-gray-500 py-10">No reports yet. Be the first!</p>
              ) : (
                reports.map(report => (
                  <div key={report.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gray-300 rounded-full mr-4" />
                        <div>
                          <h3 className="font-bold text-lg">{report.username}</h3>
                          <p className="text-sm text-gray-500">
                            {report.province} • {formatDate(report.submittedDate)}
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-800 mb-4 leading-relaxed">
                        {report.issueDescription}
                      </p>

                      {report.mediaUrl && (
                        <div className="mb-4 -mx-6">
                          {report.mediaUrl.includes('video') ? (
                            <video controls className="w-full">
                              <source src={report.mediaUrl} />
                            </video>
                          ) : (
                            <img
                              src={report.mediaUrl}
                              alt="Environmental issue"
                              className="w-full h-96 object-cover"
                            />
                          )}
                        </div>
                      )}

                      <div className="flex justify-between items-center pt-4 border-t">
                        <span className="text-gray-600">
                          {report.likes} likes
                        </span>
                        <span className="text-gray-600">
                          {report.comments} comments
                        </span>
                        <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                          {report.category.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default CommunityPage;