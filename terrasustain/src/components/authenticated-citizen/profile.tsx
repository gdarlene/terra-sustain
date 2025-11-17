import React from "react";
import SideBar from "./sidebar";
import CitizenHeader from "./Citizen-header";
import ProfileSideBar from "./ProfileSectionSidebar";

const Profile: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-neutral-800">
      {/* Sidebar */}
      <SideBar />
      <CitizenHeader />
      {/* Main Layout Container */}
      <div className="flex">
        {/* Main Content Area */}
        <div className="py-2 flex-1 lg:ml-72 "> {/* Offset by sidebar width */}
          <div className="max-w-5xl mx-60 px-4 sm:px-6 lg:px-8 mt-8">
            {/* Inner Container */}
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main Profile Info */}
              <div className="flex-1 space-y-6">
                <h1 className="text-2xl font-semibold">Account Settings</h1>
                  {/* Profile Sidebar - Fixed on left */}
                  <ProfileSideBar />
                    {/* Profile Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center gap-4">
                        <img
                          src="/images/happy-black-farmer.jpg"
                          alt="Farmer"
                          className="h-20 w-20 rounded-full object-cover"
                        />
                        <div>
                          <h2 className="text-xl font-semibold">John Mutabazi</h2>
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
                          <p className="mt-1 font-medium">John</p>
                        </div>
                        <div>
                          <p className="text-neutral-500">Last Name</p>
                          <p className="mt-1 font-medium">Mutabazi</p>
                        </div>
                        <div>
                          <p className="text-neutral-500">Email address</p>
                          <p className="mt-1 font-medium">john@naica.co.rw</p>
                        </div>
                        <div>
                          <p className="text-neutral-500">Phone</p>
                          <p className="mt-1 font-medium">+250 788 123 456</p>
                        </div>
                        <div className="sm:col-span-2">
                          <p className="text-neutral-500">Bio</p>
                          <p className="mt-1 font-medium">Citizen in Western Province</p>
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