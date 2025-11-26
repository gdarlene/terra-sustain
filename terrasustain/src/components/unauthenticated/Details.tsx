import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon, UserIcon } from '@heroicons/react/20/solid';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import React from 'react';

const Details: React.FC = () => {
  return (
    // 🚀 This class hides the entire Details banner on mobile, shows on desktop
    <div className="hidden sm:block">
      <Disclosure
        as="div"
        className="relative bg-primary text-white"
      >
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">

          {/* Responsive Container */}
          <div className="relative flex flex-col sm:flex-row h-auto sm:h-12 items-start sm:items-center justify-between gap-2 py-2">

            {/* Left side: Text */}
            <div className="flex shrink-0 items-center text-sm sm:text-base">
              <p className="ml-0">
                We Empower Sustainability activists with real time improvement of sustainability
              </p>
            </div>

            {/* Email */}
            <div className="relative text-sm sm:text-base">
              <p>terrasustain@gmail.com</p>
            </div>

            {/* Right Side: Language + Login/Signup */}
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-start sm:justify-end flex-wrap">

              {/* Language Menu */}
              <Menu as="div" className="relative">
                <MenuButton className="inline-flex items-center gap-x-1.5 border-none px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:text-white/90 ring-1 ring-inset ring-white rounded-md">
                  English
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="h-5 w-5 text-white"
                  />
                </MenuButton>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition 
                  data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[enter]:ease-out data-[leave]:duration-75 data-[leave]:ease-in"
                >
                  <div className="py-1">
                    <MenuItem>
                      {({ focus }) => (
                        <a
                          href="#"
                          className={`block px-4 py-2 text-sm ${
                            focus
                              ? 'bg-neutral1-100 text-white'
                              : 'text-gray-800 font-semibold'
                          }`}
                        >
                          English
                        </a>
                      )}
                    </MenuItem>

                    <MenuItem>
                      {({ focus }) => (
                        <a
                          href="#"
                          className={`block px-4 py-2 text-sm ${
                            focus
                              ? 'bg-neutral1-100 text-primary'
                              : 'text-gray-700'
                          }`}
                        >
                          Français
                        </a>
                      )}
                    </MenuItem>

                    <MenuItem>
                      {({ focus }) => (
                        <a
                          href="#"
                          className={`block px-4 py-2 text-sm ${
                            focus
                              ? 'bg-neutral1-100 text-primary'
                              : 'text-gray-700'
                          }`}
                        >
                          Ikinyarwanda
                        </a>
                      )}
                    </MenuItem>

                    <MenuItem>
                      {({ focus }) => (
                        <a
                          href="#"
                          className={`block px-4 py-2 text-sm ${
                            focus
                              ? 'bg-neutral1-100 text-primary'
                              : 'text-gray-700'
                          }`}
                        >
                          Swahili
                        </a>
                      )}
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>

              {/* Authentication Buttons */}
              <Menu as="div" className="relative ml-0 sm:ml-3">
                <MenuButton className="relative flex rounded-full focus-visible:outline-none">
                  <div className="flex items-center gap-4 ml-0 sm:ml-3">

                    <a
                      href="/login"
                      className="flex items-center gap-1 text-white hover:text-white/90 text-sm sm:text-base"
                    >
                      <UserIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                      Login
                    </a>

                    <a
                      href="/role"
                      className="py-1.5 px-3 sm:py-2 sm:px-4 bg-white hover:bg-white/90 text-primary font-medium rounded-md transition text-sm sm:text-base"
                    >
                      Signup
                    </a>
                  </div>
                </MenuButton>
              </Menu>

            </div>
          </div>
        </div>
      </Disclosure>
    </div>
  );
};

export default Details;