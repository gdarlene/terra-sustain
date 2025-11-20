import {HomeIcon, ShoppingBagIcon, BellIcon,} from '@heroicons/react/24/outline';

const ProfileSideBar: React.FC = () => {
  const navItems = [
    { name: 'Personal Info', icon: HomeIcon, href: '/citizen/personal_info', current: true },
    { name: 'Emails & passwords', icon: ShoppingBagIcon, href: '/citizen/security', current: false },
    { name: 'Notifications', icon: BellIcon, href: '/citizen/notifications', current: false },
  ];
  return (
    <div className="bg-sectionBg-50">
      {/* Sidebar - Desktop */}
      <aside className="hidden max-h-[75vh] -mx-64 mt-40 lg:fixed lg:inset-y-0 lg:flex lg:w-60 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 shadow-lg">
          <nav className="flex flex-1 flex-col">
            {/* logo */}
            <div className="mt-5 items-center">
              <h3 className='text-primary/80 rounded-full font-semibold font-titles text-lg '>My Profile</h3>
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
                            ? 'bg-[#e4e4e4a1] hover:bg-white/95 hover:text-primary  text-textColor mt-3'
                            : 'text-neutral-800 hover:bg-white/95 hover:text-primary'
                        }`}
                      >
                        <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-300 lg:hidden z-50">
        <nav className="flex justify-around py-2">
          {navItems.slice(0, 5).map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center p-2 text-xs ${
                item.current ? 'text-primary' : 'text-neutral-600'
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

export default ProfileSideBar;