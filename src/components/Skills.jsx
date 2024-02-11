import { Icon } from '@iconify/react'
import React from 'react'
import skills from '../data/skills'

function Skills() {
  return (
    <div className="w-full py-10 skill-gradient">
      <h1 className="text-center text-3xl font-semibold text-gray-900">
        Skills
      </h1>
      <p className="text-sm text-center mt-3 text-gray-500">
        Below is a collection of frameworks, libraries <br /> and software
        development tools that I use
      </p>
      <div className="mt-10 mx-auto flex flex-wrap gap-y-4 w-3/4">
        {skills.map((skill, index) => (
          <Icon
            icon={skill}
            key={index}
            className={`text-4xl basis-1/3 sm:basis-1/6 transition-all text-gray-500 hover:text-black hover:scale-105 ${
              skill.includes('react') ? 'animate-spin-slow' : ''
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default Skills
