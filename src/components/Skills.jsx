import { Icon } from '@iconify/react'
import React from 'react'
import skills from '../data/skills'

function Skills() {
  return (
    <div className="w-full py-10 skill-gradient">
      <h1 className="text-center text-3xl font-semibold text-gray-900 lg:text-4xl dark:text-slate-200" data-aos='fade-in'>
        Skills
      </h1>
      <p className="text-sm text-center mt-3 text-gray-500 lg:text-lg dark:text-slate-400" data-aos='fade-in' data-aos-delay='100'>
        Below is a collection of frameworks, libraries <br /> and software
        development tools that I use
      </p>
      <div className="mt-10 mx-auto flex flex-wrap gap-y-4 w-3/4" data-aos='fade-up' data-aos-delay='200'>
        {skills.map((skill, index) => (
          <div className='basis-1/3 sm:basis-1/6 flex justify-center items-center'>
            <div className='group transition-all text-gray-500 hover:text-black relative text-4xl w-fit'>
              <p className='hidden md:hidden md:group-hover:block absolute -top-5 right-0 text-left bg-black text-white px-2 rounded-sm text-xs'>{skill.name}</p>
              <Icon
                icon={skill.icon}
                key={index}
                className={`text-4xl basis-1/3 sm:basis-1/6 transition-all text-gray-500 hover:text-black hover:scale-105 dark:text-slate-200 ${
                  skill.icon.includes('react') ? 'animate-spin-slow' : ''
                }`}
              />
            </div>
        </div>
        ))}
      </div>
    </div>
  )
}

export default Skills
