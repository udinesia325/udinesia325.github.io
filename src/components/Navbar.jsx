import React, { useEffect, useState } from 'react'
import navbar from '../data/navbar'
import { Icon } from '@iconify/react'
import MobileMenu from './MobileMenu'

function Navbar({ dark, setDark}) {
  const [scroll, setScroll] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)
  const [selectedNavbarItem, setSelectedNavbarItem] = useState('')
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        setScroll(true)
      } else {
        setScroll(false)
      }
      setOpenMenu(false)
    })
  }, [])
  const toggleMenu = () => {
    setOpenMenu((prev) => !prev)
  }

  const handleSelectNavbar = (data) => {
    setSelectedNavbarItem(data == 'Home' ? '' : data)
  }

  useEffect(() => {
    document.title = `Fahruddin ${selectedNavbarItem ? '|':''}  ${selectedNavbarItem}`
  }, [selectedNavbarItem])

  return (
    <div
      className={`container flex justify-between items-center py-4 px-2 sm:px-5 sticky top-0 z-50 transition-all 
      ${scroll ? 'shadow-lg bg-white/80 backdrop-blur-sm dark:bg-slate-900/80' : 'bg-white dark:bg-slate-800'}`}
    >
      <a href="#" className="font-bold text-3xl dark:text-slate-200">
        DINNN
      </a>

      {/* dark mode toggler */}
      <div className="transition-all cursor-pointer sm:ml-auto sm:mr-5" style={{ rotate: dark ? '280deg' : '0deg' }} onClick={() => setDark(!dark)}>
        {dark ?
          <Icon icon="line-md:sunny-outline-to-moon-alt-loop-transition" className="text-gray-900 text-3xl dark:text-slate-200" />
          :
          <Icon icon="line-md:moon-to-sunny-outline-loop-transition" className="text-gray-900 text-3xl dark:text-slate-200" />
        }
      </div>

      <ul className="hidden sm:flex items-center text-sm font-semibold" >
        {navbar.map((link, index) => (
          <li
            key={index}
            onClick={handleSelectNavbar.bind(this,link.title)}
            className={`cursor-pointer !opacity-100 transition-all ml-4 dark:text-slate-200 ${link.title == selectedNavbarItem ? "before:content-[''] before:w-6 before:h-1 before:absolute before:bottom-5 before:bg-purple-300 before:rounded-full text-primary-500 hover:text-primary-500" : 'hover:text-primary-700'}`}
          >
            <a href={link.href}>{link.title}</a>
          </li>
        ))}
        <li className="btn-primary ml-4 opacity-100">
          <a href="#contact">Contact</a>
        </li>
      </ul>
      <div
        onClick={toggleMenu}
        className={`transition-all cursor-pointer block sm:hidden ${
          openMenu ? '-rotate-180' : 'rotate-0'
        }`}
      >
        {openMenu ? (
          <Icon icon="mingcute:close-fill" className="text-gray-900 text-3xl dark:text-slate-200" />
        ) : (
          <Icon icon="gg:menu-right-alt" className="text-gray-900 text-3xl dark:text-slate-200" />
        )}
      </div>

      <MobileMenu openMenu={openMenu} toggleMenu={toggleMenu} />
    </div>
  )
}

export default Navbar
