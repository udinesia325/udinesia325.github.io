import React from 'react'
import navbar from '../data/navbar'

function Footer() {
  return (
    <div className='w-full pt-32 pb-10 bg-[#2B384C] flex flex-col sm:flex-row gap-4 sm:gap-0 justify-around items-center'>
        <a href='#' className='text-2xl font-semibold text-white lg:text-3xl' data-aos='fade-in' data-aos-delay='300' data-aos-anchor-placement='bottom-bottom'>DINNN</a>
        <ul className='flex gap-2' data-aos='fade-in' data-aos-delay='300' data-aos-anchor-placement='bottom-bottom'>
            {navbar.map((nav,index) => (
                <li key={index}><a href={nav.href} className='text-white/80 text-xs font-light lg:text-sm'>{nav.title}</a></li>
            ))}
        </ul>
        <span className='text-xs text-white font-light lg:text-sm' data-aos='fade-in' data-aos-delay='300' data-aos-anchor-placement='bottom-bottom'>Copyright &copy; {new Date().getFullYear()} DINNN.</span>
    </div>
  )
}

export default Footer