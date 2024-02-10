import React from 'react'

const links = [
    {
        title: 'Home',
        href: '#'
    },
    {
        title: 'About',
        href: '#'
    },
    {
        title: 'Process',
        href: '#'
    },
    {
        title: 'Portfolio',
        href: '#'
    },
    {
        title: 'Services',
        href: '#'
    },
]

function Navbar() {
  return (
    <div className='container max-w-5xl flex justify-between items-center py-4 bg-white sticky top-0 z-50'>
        <h1 className='font-bold text-3xl'>DINNN</h1>
        <ul className='flex gap-5 items-center text-sm font-semibold'>
            {links.map((link,index) => (
                <li key={index} className='cursor-pointer hover:bg-primary-100/20 py-2 px-3'><a href={link.href}>{link.title}</a></li>
            ))}
            <li className='btn-primary'>Contact</li>
        </ul>
    </div>
  )
}

export default Navbar