import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import {useNavigate } from "react-router-dom";

interface UserSummary {
  id: number;
  username: string;
  province: string;
  points: number;
  avatarUrl?: string;
}

const GvtCommunityFeed:React.FC =()=>{
    const navigate = useNavigate()
    const [members, setMembers] = useState<UserSummary[]>([]);
    const token = localStorage.getItem('token');
    useEffect(() => {
        fetchData();
    }, []);    
    const fetchData = async () => {
    try {
      const [membersRes] = await Promise.all([
        axios.get('http://localhost:8096/terrasustain/citizen/members', {
          headers: { Authorization: `Bearer ${token}` }
        }),
      ]);

      setMembers(membersRes.data);
    } catch (err) {
      console.error("Failed to load community data", err);
    }
  };
  const handleUserClick = (userId: number) => {
    navigate(`/profile/${userId}`);
  };

    return (
        <>
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
        </>
    )

}
export default GvtCommunityFeed