import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, ChevronDownIcon, UserIcon } from '@heroicons/react/24/outline'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import React from 'react'

const navigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'Community', href: '/#community', current: false },
  { name: 'Our Partners', href: '/#partners', current: false },
  { name: 'About Us', href: '/about', current: false },
  { name: 'Contact Us', href: '/#contacts', current: false },
]

function classNames(...classes: (string | boolean | null | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

const Header: React.FC = () => {
  return (
    <Disclosure as="nav" className="sticky top-0 z-50 w-full bg-sectionBg-50/90 backdrop-blur-md shadow-sm">
      {() => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">

              {/* Mobile Menu Button */}
              <div className="flex items-center sm:hidden">
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-primary hover:text-hoverGrays transition-colors">
                  <Bars3Icon className="h-6 w-6 data-[open]:hidden" />
                  <XMarkIcon className="hidden h-6 w-6 data-[open]:block" />
                </DisclosureButton>
              </div>

              {/* Logo */}
              <div className="flex flex-1 items-center justify-center sm:justify-start">
                <a href="/" className="font-logo text-2xl sm:text-3xl font-bold text-primary tracking-tight">
                  TerraSustain
                </a>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden sm:flex sm:items-center sm:space-x-8">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'text-primary font-semibold underline underline-offset-4'
                        : 'text-textColor hover:text-primary hover:font-medium transition-all duration-200',
                      'text-base font-medium font-body'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Menu Panel */}
          <DisclosurePanel className="sm:hidden bg-sectionBg-50 border-t border-neutral-300">
            <div className="space-y-1 px-4 pb-4 pt-2">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-neutral-100 text-primary font-semibold'
                      : 'text-textColor hover:bg-neutral-300 hover:text-primary',
                    'block rounded-lg px-4 py-3 text-base font-medium transition-all duration-200 font-body'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
            {/* mobile only details */}
            <div className="px-4 pb-5 border-t border-gray-50 mt-1 sm:hidden">
              {/* Language Selector */}
              <Menu as="div" className="relative mb-4">
                <MenuButton className="inline-flex items-center gap-x-1.5 px-3 py-2 text-sm font-medium text-primary bg-neutral-100 rounded-md ring-1 ring-neutral-300">
                  English
                  <ChevronDownIcon className="h-5 w-5 text-primary" />
                </MenuButton>

                <MenuItems
                  transition
                  className="absolute mt-2 w-40 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black/5
                             data-[closed]:scale-95 data-[closed]:opacity-0"
                >
                  <div className="py-1">
                    {['English', 'Français', 'Ikinyarwanda', 'Swahili'].map((lang) => (
                      <MenuItem key={lang}>
                        {({ focus }) => (
                          <a
                            href="#"
                            className={`block px-4 py-2 text-sm ${
                              focus ? 'bg-neutral1-100 text-primary' : 'text-gray-700'
                            }`}
                          >
                            {lang}
                          </a>
                        )}
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              {/* Auth Buttons */}
              <div className="flex flex-col gap-3">
                <a href="/login" className="flex items-center gap-2 text-primary font-medium">
                  <UserIcon className="h-5 w-5 text-primary" />
                  Login
                </a>

                <a
                  href="/role"
                  className="py-2 px-4 bg-primary text-white rounded-md text-center font-medium"
                >
                  Signup
                </a>
              </div>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}

export default Header
