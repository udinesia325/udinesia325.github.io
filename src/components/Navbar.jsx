import React from 'react'
import navbar from '../data/navbar'

function Navbar() {
  return (
    <div className='container max-w-5xl flex justify-between items-center py-4 bg-white sticky top-0 z-50'>
        <h1 className='font-bold text-3xl'>DINNN</h1>
        <ul className='flex items-center text-sm font-semibold'>
            {navbar.map((link,index) => (
                <li key={index} className='cursor-pointer hover:bg-primary-100/20 py-2 px-3 ml-2'><a href={link.href}>{link.title}</a></li>
            ))}
            <li className='btn-primary ml-4'>Contact</li>
        </ul>
    </div>
  )
}

export default Navbar