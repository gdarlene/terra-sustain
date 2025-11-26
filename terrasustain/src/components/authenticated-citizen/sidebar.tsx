import { HomeIcon, DocumentIcon, UserGroupIcon, BookOpenIcon, StarIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import React from 'react';

const SideBar: React.FC = () => {
  const navItems = [
    { name: 'Home', icon: HomeIcon, href: '/citizen', current: false },
    { name: 'Community', icon: UserGroupIcon, href: '/citizen/community', current: false },
    { name: 'Report Issue', icon: DocumentIcon, href: '/citizen/add_issue', current: false },
    { name: 'Sustainability Resources', icon: BookOpenIcon, href: '/citizen/resources', current: false },
    { name: 'My Performance', icon: StarIcon, href: '/citizen/performance', current: false },
  ];

  const API_BASE = "http://localhost:8096/terrasustain";

  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE}/logout`, {}, { withCredentials: true });
      localStorage.clear();
      window.location.href = '/';
    } catch (err) {
      console.warn("Logout failed", err);
    }
  };

  return (
    <div className="bg-sectionBg-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 shadow-lg">
          <nav className="flex flex-1 flex-col">
            {/* Logo */}
            <div className="py-8 text-center">
              <span className="text-2xl font-logo font-bold text-primary">
                <a href="/citizen">TerraSustain</a>
              </span>
            </div>
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-3">
                  {navItems.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={`group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition ${
                          item.current
                            ? 'bg-primary/70 font-semibold mt-3 text-white'
                            : 'hover:bg-primary/70 hover:text-white'
                        }`}
                      >
                        <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="mt-auto">
                <button className="flex items-center gap-2 text-red-600 hover:text-red-800" onClick={handleLogout}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-300 lg:hidden z-50">
        <nav className="flex justify-around py-2">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center p-2 text-xs ${
                item.current ? 'text-primary' : 'text-primary/80'
              }`}
            >
              <item.icon className="h-6 w-6" />
              <span>{item.name}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default SideBar;