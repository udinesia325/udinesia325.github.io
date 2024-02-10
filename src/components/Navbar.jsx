import React from 'react'

function Navbar() {
  return (
    <div className='container flex justify-between items-center py-4 bg-white sticky top-0 z-50'>
        <h1 className='font-bold text-3xl'>DINNN</h1>
        <ul className='flex gap-5 items-center text-sm'>
            <li>Home</li>
            <li>About</li>
            <li>Process</li>
            <li>Portfolio</li>
            <li>Services</li>
            <li className='btn-primary' >Contact</li>
        </ul>
    </div>
  )
}

export default Navbar