import React from 'react'
import dinn from '../assets/dinn.jpg'
import socialMedia from '../data/socialMedia'
import { Icon } from '@iconify/react'

function About() {
  return (
    <div className="w-[90%] mx-auto sm:h-[350px] bg-white rounded-lg shadow-2xl p-10 mt-20 flex flex-col gap-y-4 sm:flex-row items-center translate-y-24 -bottom-20">
      <div className="basis-1/2 flex place-content-center relative">
        <img
          src={dinn}
          alt="gambar fahruddin"
          className="w-[240px] rounded-sm"
        />
        <div className='p-2 bg-white shadow-md rounded-md absolute z-[2] -bottom-4 flex gap-x-5 transition-all hover:scale-105'>
            { socialMedia.map((social, index) => (
                <a key={index} href={social.link} target='_blank'><Icon icon={social.icon} className='text-3xl p-1 rounded-md text-purple-500 hover:text-white hover:bg-primary-500' /></a>
            ))}
        </div>
      </div>
      <div className="basis-1/2 flex flex-col items-start">
        <h1 className='text-3xl font-semibold'>I am an Experienced <br /> Programmer</h1>
        <p className='font-light text-gray-700 text-sm mt-5'>I design and develop services for customers specializing creating stylish, modern websites, web services and online stores. My passion is to design digital user experiences.</p>
        <p className='font-light text-gray-700 text-sm'>I design and develop services for customers specializing creating stylish, modern websites, web services.</p>
        <button className='btn-primary mt-4 text-sm font-semibold'>My Project</button>
      </div>
    </div>
  )
}

export default About
