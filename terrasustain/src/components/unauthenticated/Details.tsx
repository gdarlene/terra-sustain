import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon,UserIcon } from '@heroicons/react/20/solid';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import React from 'react';

const Details: React.FC = () => {
  return (
    <Disclosure as="div" className="relative bg-primary">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-12 items-center justify-between">
          {/* Left side: Text */}
          <div className="flex shrink-0 items-center">
            <p className="ml-0 text-white">
              We Empower Sustainability activists with real time improvement of sustainability
            </p>
          </div>
          <div className='relative'>
            <p className="text-white">
              terrasustain@gmail.com
            </p>
          </div>
          <div className='flex items-center gap-2'>
            {/* Right side: Language Menu */}
            <Menu as="div" className="relative">
              <MenuButton className="inline-flex items-center gap-x-1.5 border-none px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:text-white/90 ring-1 ring-inset ring-white">
                English
                <ChevronDownIcon
                  aria-hidden="true"
                  className=" h-5 w-5 text-white hover:text-white/90"
                />
              </MenuButton>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[enter]:ease-out data-[leave]:duration-75 data-[leave]:ease-in"
              >
                <div className="py-1">
                  <MenuItem>
                    {({ focus }) => (
                      <a
                        href="#"
                        className={`block px-4 py-2 text-sm hover:text-white ${
                          focus
                            ? 'bg-neutral1-100 text-white'
                            : 'text-white font-semibold'
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
                        className={`block px-4 py-2 text-sm hover:text-white ${
                          focus
                            ? 'bg-neutral1-100 text-gray-900'
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
                        className={`block px-4 py-2 text-sm hover:text-white ${
                          focus
                            ? 'bg-neutral1-100 text-gray-900'
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
                        className={`block px-4 py-2 text-sm hover:text-white ${
                          focus
                            ? 'bg-neutral1-100 text-gray-900'
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
            
            {/* authentication buttons options */}
              <Menu as="div" className="relative ml-3">
                <MenuButton className="relative flex rounded-full focus-visible:outline-none focus-visible:outline-offset-2">          
                  <div className="flex items-center gap-5 ml-3">
                      <a
                        href="/login"
                        className="flex items-center gap-1 text-white  hover:text-white/90"
                      >
                        <UserIcon className="h-6 w-6 hover:text-white/90" />
                        Login
                      </a>

                      <a
                        href="/role"
                        className="py-2 px-4 bg-white hover:bg-white/90 text-primary font-medium rounded-md transition"
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
  );
};

export default Details;