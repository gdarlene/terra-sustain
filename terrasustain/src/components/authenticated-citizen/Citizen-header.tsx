import { useState } from "react";
import React from 'react';
import { Notifications, AccountCircle, Language, Search, Menu } from "@mui/icons-material";

const CitizenHeader: React.FC = () => {
  const [openProfile, setOpenProfile] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between lg:w-[80%] bg-white px-4 sm:px-6 lg:mx-72 py-3 shadow-md">
      
      {/* Search Bar */}
      <div className="flex items-center bg-primary/5 rounded-md px-3 py-2 w-full lg:w-1/3">
        <Search className="text-textColor/60" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent text-textColor/80 outline-none ml-2 w-full font-medium"
        />
      </div>

      {/* Desktop Icons */}
      <div className="hidden lg:flex items-center space-x-5">
        <button className="hover:text-secondary/90">
          <Language fontSize="medium" />
        </button>

        <a href="/citizen/notifications" className="relative hover:text-secondary/90">
          <Notifications fontSize="medium" />
        </a>

        <div className="relative">
          <button
            onClick={() => setOpenProfile(!openProfile)}
            className="flex items-center hover:text-secondary/90"
          >
            <AccountCircle fontSize="large" />
          </button>

          {openProfile && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border border-gray-100">
              <ul className="text-sm text-gray-700">
                <a href="/citizen/profile">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
                </a>
                <a href="/citizen/profile">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
                </a>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Hamburger Menu (Inline) */}
      <div className="lg:hidden relative ml-3">
        <button
          onClick={() => setOpenMobileMenu(!openMobileMenu)}
          className="flex items-center hover:text-primary/70"
        >
          <Menu fontSize="large" />
        </button>

        {openMobileMenu && (
          <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-100 flex flex-col">
            <button className="flex items-center px-4 py-2 hover:bg-gray-100">
              <Language fontSize="small" className="mr-2" /> Language
            </button>
            <a href="/citizen/notifications" className="flex items-center px-4 py-2 hover:bg-gray-100">
              <Notifications fontSize="small" className="mr-2" /> Notifications
            </a>
            <a href="/citizen/profile" className="flex items-center px-4 py-2 hover:bg-gray-100">
              <AccountCircle fontSize="small" className="mr-2" /> Profile
            </a>
            <a href="/citizen/profile" className="flex items-center px-4 py-2 hover:bg-gray-100">
              <AccountCircle fontSize="small" className="mr-2" /> Settings
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default CitizenHeader;