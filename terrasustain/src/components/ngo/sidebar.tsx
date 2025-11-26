import { HomeIcon, DocumentIcon, UserGroupIcon, BookOpenIcon, StarIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const SideBar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', icon: HomeIcon, href: '/citizen' },
    { name: 'Community', icon: UserGroupIcon, href: '/citizen/community' },
    { name: 'Report Issue', icon: DocumentIcon, href: '/citizen/add_issue' },
    { name: 'Sustainability Resources', icon: BookOpenIcon, href: '/citizen/resources' },
    { name: 'My Performance', icon: StarIcon, href: '/citizen/performance' },
  ];

  const API_BASE = "http://localhost:8096/terrasustain";

  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE}/logout`, {}, { withCredentials: true });
      window.location.href = '/login';
    } catch (err) {
      console.warn("Logout failed", err);
      window.location.href = '/login';
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-64 lg:flex lg:flex-col bg-white shadow-xl">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 py-8">
          {/* Logo */}
          <div className="mb-8">
            <a href="/citizen" className="text-3xl font-bold text-primary font-logo">
              TerraSustain
            </a>
          </div>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={`group flex items-center gap-x-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                      isActive(item.href)
                        ? 'bg-primary text-white shadow-md'
                        : 'text-gray-700 hover:bg-primary hover:text-white'
                    }`}
                  >
                    <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
            {/* Logout */}
            <div className="mt-auto pt-8 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-x-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </nav>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden z-50">
        <nav className="grid grid-cols-5 py-2">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-2 py-2 text-xs font-medium transition ${
                isActive(item.href) ? 'text-primary' : 'text-gray-600'
              }`}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-[10px]">{item.name.split(' ')[0]}</span>
            </a>
          ))}
        </nav>
      </div>
      <div className="hidden lg:block lg:w-64 lg:flex-shrink-0" aria-hidden="true" />
    </>
  );
};

export default SideBar;