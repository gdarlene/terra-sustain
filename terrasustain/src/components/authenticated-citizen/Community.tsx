import React, { useState, useEffect } from 'react';
import SideBar from './sidebar';
import CitizenHeader from './Citizen-header';
import axios from 'axios';
import { Search } from '@mui/icons-material';
import { PlusCircleIcon } from "@heroicons/react/24/outline";

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
  const [reports, setReports] = useState<ReportResponse[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const reportsRes = await axios.get(
        'http://localhost:8096/terrasustain/citizen/reports',
        { headers: { Authorization: `Bearer ${token}` } }
      );

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
    const timeout = setTimeout(() => searchReports(), 500);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

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
        <div className="mx-3 max-w-7xl px-4 sm:px-6 lg:px-8 mt-9">
          <h1 className="text-4xl font-bold text-green-800 mb-8 font-titles">
            Community Hub
          </h1>

          {/* Search & Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search reports or citizens..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-4 rounded-lg border border-gray-300 text-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary text-lg" />
            </div>
            <a href="/citizen/add_issue" className="flex-shrink-0">
              <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-white font-medium hover:bg-primary/90 transition shadow-md w-full sm:w-auto justify-center">
                <PlusCircleIcon className="h-5 w-5" />
                Add Issue
              </button>
            </a>
          </div>

          {/* Reports Feed */}
          <section className="mt-7">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Environment Posts from peers</h2>
            <div className="space-y-8">
              {reports.length === 0 ? (
                <p className="text-center text-gray-500 py-10">No reports yet. Be the first!</p>
              ) : (
                reports.map(report => (
                  <div key={report.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="p-6 flex flex-col md:flex-row md:gap-6">
                      {/* Left: User info */}
                      <div className="mb-4 md:mb-0 flex-shrink-0">
                        <h3 className="font-bold text-lg">{report.username}</h3>
                        <p className="text-sm text-gray-500">
                          {report.province} • {formatDate(report.submittedDate)}
                        </p>
                      </div>

                      {/* Right: Report content */}
                      <div className="flex-1">
                        <p className="text-gray-800 mb-4 leading-relaxed">
                          {report.issueDescription}
                        </p>

                        {report.mediaUrl && (
                          <div className="mb-4 w-full">
                            {report.mediaUrl.includes('video') ? (
                              <video controls className="w-full max-h-96 rounded-lg">
                                <source src={report.mediaUrl} />
                              </video>
                            ) : (
                              <img
                                src={report.mediaUrl}
                                alt="Environmental issue"
                                className="w-full max-h-96 object-cover rounded-lg"
                              />
                            )}
                          </div>
                        )}

                        <div className="flex flex-wrap justify-between items-center pt-4 border-t text-sm text-gray-600 gap-2">
                          <span>{report.likes} likes</span>
                          <span>{report.comments} comments</span>
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                            {report.category.replace('_', ' ')}
                          </span>
                        </div>
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