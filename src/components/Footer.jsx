import React from 'react'
import navbar from '../data/navbar'

function Footer() {
  return (
    <div className='w-full pt-32 pb-10 bg-[#2B384C] flex flex-col sm:flex-row gap-4 sm:gap-0 justify-around items-center'>
        <a href='#' className='text-2xl font-semibold text-white'>DINNN</a>
        <ul className='flex gap-2'>
            {navbar.map((nav,index) => (
                <li key={index}><a href={nav.href} className='text-white/80 text-xs font-light'>{nav.title}</a></li>
            ))}
        </ul>
        <span className='text-xs text-white font-light'>Copyright &copy; {new Date().getFullYear()} DINNN.</span>
    </div>
  )
}

export default Footer