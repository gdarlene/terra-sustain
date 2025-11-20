import { useState } from "react";
import React from 'react';
import { 
  Notifications, 
  AccountCircle, 
  Language, 
  Search 
} from "@mui/icons-material";

const  GvtHeader : React.FC = () =>{
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <header className="sticky top-2 z-0 rounded-lg flex items-center lg:w-[82%] max-w-full mx-72 justify-between bg-white px-12 py-3 shadow-md">
      {/* Search Bar */}
      <div className="flex items-center bg-primary/5 rounded-md px-3 py-2 w-1/3">
        <Search className="text-textColor/60" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-white/5 text-textColor/60 outline-none ml-2 w-full font-medium"
        />
      </div>

      {/* Icons Section */}
      <div className="flex items-center space-x-5">
        {/* Language Icon */}
        <button className="hover:text-secondary/90">
          <Language fontSize="medium" />
        </button>

        {/* Notifications */}
        <button className="relative hover:text-secondary/90">
          
          <a href="/gvt/notifications"><Notifications fontSize="medium" /></a>
          {/* if there are notifications it is to be shown */}
          {/* <span className="absolute top-0 right-0 block h-2 w-2 bg-red-500 rounded-full"></span> */}
        </button>

        {/* Profile Dropdown */}
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
                <a href="/gvt/profile">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
                </a>
                <a href="/gvt/profile">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</li>
                </a>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
export default GvtHeader;