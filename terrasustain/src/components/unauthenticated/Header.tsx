import { Disclosure, DisclosureButton, DisclosurePanel} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react';
const navigation  = [
    {name:'Home',href:'/',current:false},
    {name:'Community',href:'#community',current:false},
    {name:'Report Issue',href:'/#issues',current:false},
    {name:'About Us',href:'/about',current:false},
    {name:'Contact Us',href:'#contacts',current:false},    
]
function className(...classes){
    return classes.filter(Boolean).join(' ')

}
const Header : React.FC = () =>{
   return (
    <Disclosure as="nav" className="sticky z-50 w-full top-0 bg-[#fff8f5]">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <span className='ml-0 text-2xl font-logo font-bold text-primary'><a href="/">TerraSustain</a></span>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4 ml-96">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={className(
                      item.current ? 'bg-gray-500 hover:bg-hoverGrays text-white' : 'underline-offset-8 hover:decoration-primary hover:decoration-2 hover:underline text-textColorte text-lg hover:bg-white/5 hover:text-hoverGrays',
                      'rounded-md px-3 py-2 text-sm font-medium',
                    )}
                  >
                    {item.name}
                  </a>
              
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={className(
                  item.current 
                    ? 'bg-neutral-400 text-white underline underline-offset-4' 
                    : 'text-gray-200 hover:bg-white/5  hover:underline hover:underline-offset-4',
                  'block rounded-md px-3 py-2 text-base font-medium transition-all duration-200',
                )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
export default Header;