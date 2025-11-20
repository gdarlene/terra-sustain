import React, { useEffect, useState } from "react";
import ProfileSideBar from "./ProfileSectionSidebar";
import axios from "axios";
import  type {AxiosResponse}  from 'axios';
import NgoSideBar from "./sidebar";
import NgoHeader from "./Ngo-header";

interface PersonProfileResponse {
  username: string;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  email: string | null;
  bio: string | null;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<PersonProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response :AxiosResponse<PersonProfileResponse> = await axios.get("http://localhost:8096/terrasustain/ngo/profile/", {
          withCredentials: true
        });
        setProfile(response.data);
      } catch (err) {
        console.error("404 | Failed to load page", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);
  const safe = (value: string | null | undefined) => value || "N/A";

  // Full name for header
  const fullName = profile
    ? `${safe(profile.firstName)} ${safe(profile.lastName)}`.trim()
    : "Loading...";

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 text-neutral-800 flex items-center justify-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gray-50 text-neutral-800 flex items-center justify-center">
        <p className="text-red-600">Failed to load profile. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-neutral-800">
      {/* Sidebar */}
      <NgoSideBar />
      <NgoHeader />

      {/* Main Layout Container */}
      <div className="flex">
        {/* Main Content Area */}
        <div className="py-2 flex-1 lg:ml-72">
          <div className="max-w-5xl mx-60 px-4 sm:px-6 lg:px-8 mt-8">
            {/* Inner Container */}
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Profile Info */}
              <div className="flex-1 space-y-6">
                <h1 className="text-2xl font-semibold">Account Settings</h1>

                {/* Profile Sidebar */}
                <ProfileSideBar />

                {/* Profile Card */}
                <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src="/images/happy-black-farmer.jpg"
                      alt="Profile"
                      className="h-20 w-20 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="text-xl font-semibold">
                        {fullName === "N/A N/A" ? profile.username : fullName}
                      </h2>
                      <p className="mt-1 text-lg">Citizen • Western Province</p>
                      <p className="mt-1 text-neutral-500 text-sm">Rubavu District, Rwanda</p>
                    </div>
                  </div>
                  <button className="mt-4 md:mt-0 rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-100 transition">
                    Edit
                  </button>
                </div>

                {/* Personal Information */}
                <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-subheadings font-medium">Personal Information</h3>
                    <button className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-100 transition">
                      Edit
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-neutral-500">First Name</p>
                      <p className="mt-1 font-medium">{safe(profile.firstName)}</p>
                    </div>
                    <div>
                      <p className="text-neutral-500">Last Name</p>
                      <p className="mt-1 font-medium">{safe(profile.lastName)}</p>
                    </div>
                    <div>
                      <p className="text-neutral-500">Email address</p>
                      <p className="mt-1 font-medium">{safe(profile.email)}</p>
                    </div>
                    <div>
                      <p className="text-neutral-500">Phone</p>
                      <p className="mt-1 font-medium">{safe(profile.phoneNumber)}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="text-neutral-500">Bio</p>
                      <p className="mt-1 font-medium">{safe(profile.bio)}</p>
                    </div>
                  </div>
                </div>

                {/* Address Section */}
                <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Address</h3>
                    <button className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-100 transition">
                      Edit
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-neutral-500">Country</p>
                      <p className="mt-1 font-medium">Rwanda</p>
                    </div>
                    <div>
                      <p className="text-neutral-500">City / District</p>
                      <p className="mt-1 font-medium">Kamonyi</p>
                    </div>
                    <div>
                      <p className="text-neutral-500">Postal Code</p>
                      <p className="mt-1 font-medium">RW-00256</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;