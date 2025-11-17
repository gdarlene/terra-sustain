import SideBar from './sidebar';
import {UserGroupIcon, PlusCircleIcon} from '@heroicons/react/24/outline';
import CitizenHeader from './Citizen-header';
const firstName = localStorage.getItem("firstName");
const lastName = localStorage.getItem("lastName");
const stats = [
  //we display the true value from the database
  { name: 'Total Reports', value: '12'},
  { name: 'Total trees planted', value: '8'},
  { name: 'Community events attended', value: '23'},
  { name: 'Ranking', value: '3'},
];
const CitizenDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fcfff7c6]">
      {/* Sidebar - Desktop */}
      <SideBar/>
      {/* header */}
      <CitizenHeader/>
      {/* Main Content */}
      <main className="lg:pl-64">
        <div className="px-4 sm:px-6 lg:px-8 py-8 pb-20 lg:pb-8">
          {/* Welcome text */}
          <div  className={`transition-all duration-700 `}>
            {/* we will display the real name of the person who logged in from the database */}
            <h1 className="text-3xl font-bold text-neutral-800 font-subheadings">Welcome back, {firstName} {lastName}!</h1>
            <p className="mt-1 text-lg text-textColor/85 font-body">Give your contribution to sustainability with real time update.</p>
          </div>
          {/* Stats Grid */}
          <div  className={`mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 transition-all duration-700 delay-150 `}>
            {stats.map((stat, idx) => (
              <div
                key={stat.name}
                className="overflow-hidden rounded-xl bg-white p-6 h-[15vh] shadow-md hover:shadow-lg transition-shadow"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {/* <stat.icon className="h-10 w-10 text-primary" /> */}
                  </div>
                  <div className="ml-4">
                    <p className="mt-2 text-sm font-medium text-textColor/60">{stat.name}</p>
                    <p className="mt-1 text-2xl font-bold text-textColor/90">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Quick Actions */}
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="/citizen/add_issue">
            <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-white font-medium hover:bg-primary/90 transition shadow-md">
                <PlusCircleIcon className="h-5 w-5" />
                Report a new issue
            </button>
            </a>
            <a href="citizen/community">
              <button className="flex items-center gap-2 rounded-xl border border-primary px-5 py-3 text-primary font-medium hover:bg-primary/50 foucs:bg-primary/70 hover:text-white transition">
                <UserGroupIcon className="h-5 w-5" />
                Browse nearby community events
              </button>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};
export default CitizenDashboard;