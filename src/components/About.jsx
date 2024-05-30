import React from 'react'
import dinn from '../assets/dinn.webp'
import socialMedia from '../data/socialMedia'
import { Icon } from '@iconify/react'

function About() {
  return (
    <div className="w-[90%] mx-auto sm:h-[350px] bg-white rounded-lg shadow-2xl p-10 mt-20 flex flex-col gap-y-8 sm:flex-row items-center translate-y-16 sm:translate-y-24 -bottom-20 lg:h-96 dark:bg-slate-900">
      <div className="basis-1/2 flex place-content-center relative">
        <img
          src={dinn}
          alt="Ahmad Fahruddin Salim Web Developer Portfolio"
          className="w-[240px] rounded-sm lg:w-64"
          width={240}
          height={300}
        />
        <div className='p-2 bg-white shadow-md rounded-md absolute z-[2] -bottom-4 flex gap-x-5 transition-all hover:scale-105 lg:px-4 lg:py-3 dark:bg-slate-900 dark:shadow-slate-800'>
            { socialMedia.map((social, index) => (
                <a key={index} href={social.link} target='_blank' aria-label={social.link}><Icon icon={social.icon} className='text-3xl p-1 rounded-md text-purple-500 hover:text-white hover:bg-primary-500' /></a>
            ))}
        </div>
      </div>
      <div className="basis-1/2 flex flex-col items-start">
        <h1 className='text-3xl font-semibold lg:text-4xl dark:text-slate-200' data-aos='fade-in' data-aos-duration='200'>I am an Experienced <br /> Programmer</h1>
        <p className='font-light text-gray-700 text-sm mt-5 lg:text-lg dark:text-slate-500' data-aos='fade-in' data-aos-duration='300'>With a blend of creativity and technical expertise, i strive to turn ideas into interactive and dynamic web experiences.</p>
        <p className='font-light text-gray-700 text-sm lg:text-lg dark:text-slate-500' data-aos='fade-in' data-aos-duration='300'>From front-end aestethics to back-end functionality, my goal is to deliver seamless and enganging</p>
        <a href='https://github.com/udinesia325?tab=repositories' target='_blank' className='btn-primary mt-4 text-sm font-semibold lg:text-lg lg:px-4' data-aos='fade-in' data-aos-duration='400'>My Project</a>
      </div>
    </div>
  )
}

export default About
