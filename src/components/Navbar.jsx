import React, { useEffect, useState } from 'react'
import navbar from '../data/navbar'
import { Icon } from '@iconify/react'
import MobileMenu from './MobileMenu'

function Navbar() {
  const [scroll, setScroll] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)
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

  return (
    <div
      className={`container max-w-5xl flex justify-between items-center py-4 px-2 sm:px-5 sticky top-0 z-50 transition-all ${
        scroll ? 'shadow-lg bg-white/80 backdrop-blur-sm' : 'bg-white'
      }`}
    >
      <a href="#" className="font-bold text-3xl">
        DINNN
      </a>
      <ul className="hidden sm:flex items-center text-sm font-semibold">
        {navbar.map((link, index) => (
          <li
            key={index}
            data-aos="fade-in"
            data-aos-delay={100 * index}
            className="cursor-pointer transition-all hover:text-primary-400 hover:bg-primary-100/20 py-2 px-3 ml-2"
          >
            <a href={link.href}>{link.title}</a>
          </li>
        ))}
        <li
          data-aos="zoom-in"
          data-aos-delay="500"
          className="btn-primary ml-4"
        >
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
