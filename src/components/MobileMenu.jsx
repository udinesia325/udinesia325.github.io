import React from 'react'
import navbar from '../data/navbar'

function MobileMenu({ openMenu, toggleMenu }) {
  return (
    <div
      className={`absolute -z-10 w-[95%] mx-auto bg-white/80 backdrop-blur-sm border shadow-lg py-3 rounded-md transition-all duration-300 ease-in-out block sm:hidden dark:bg-slate-700 dark:border-slate-500 ${
        openMenu ? 'top-20' : '-top-72'
      }`}
    >
      <ul className='flex flex-col gap-3 justify-center items-center'>
        {navbar.map((nav, index) => (
          <li key={index} onClick={toggleMenu}>
            <a href={nav.href} className='text-sm font-semibold transition-all hover:text-primary-400 hover:tracking-wide dark:text-slate-200'>{nav.title}</a>
          </li>
        ))}
        <li onClick={toggleMenu} className="btn-primary ml-4 w-[60%] text-center text-sm font-semibold"><a href="#contact">Contact</a></li>
      </ul>
    </div>
  )
}

export default MobileMenu
