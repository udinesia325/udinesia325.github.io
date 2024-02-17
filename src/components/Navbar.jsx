import React, { useEffect, useState } from 'react'
import navbar from '../data/navbar'
import { Icon } from '@iconify/react'
import MobileMenu from './MobileMenu'

function Navbar() {
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
      className={`container flex justify-between items-center py-4 px-2 sm:px-5 sticky top-0 z-50 transition-all ${
        scroll ? 'shadow-lg bg-white/80 backdrop-blur-sm' : 'bg-white'
      }`}
    >
      <a href="#" className="font-bold text-3xl">
        DINNN
      </a>
      <ul className="hidden sm:flex items-center text-sm font-semibold" >
        {navbar.map((link, index) => (
          <li
            key={index}
            onClick={handleSelectNavbar.bind(this,link.title)}
            className={`cursor-pointer !opacity-100 transition-all  ml-4 ${link.title == selectedNavbarItem ? "before:content-[''] before:w-6 before:h-1 before:absolute before:bottom-5 before:bg-purple-300 before:rounded-full text-primary-500 hover:text-primary-500" : 'hover:text-primary-700'}`}
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
          <Icon icon="mingcute:close-fill" className="text-gray-900 text-3xl" />
        ) : (
          <Icon icon="gg:menu-right-alt" className="text-gray-900 text-3xl" />
        )}
      </div>

      <MobileMenu openMenu={openMenu} toggleMenu={toggleMenu} />
    </div>
  )
}

export default Navbar
