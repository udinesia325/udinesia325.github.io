import React from 'react'
import process from '../data/process'
import { Icon } from '@iconify/react'

function Process() {
  const result = process.reduce((acc, curr, idx) => {
    if (idx % 2 === 0) {
      acc.push([curr])
    } else {
      acc[acc.length - 1].push(curr)
    }
    return acc
  }, [])
  return (
    <div id='process' className="h-[750px] bg-gray-100 flex place-items-center place-content-center">
      <div className="w-full sm:max-w-2xl flex flex-col sm:flex-row justify-center gap-3 p-2">
        <div className="basis-1/2 flex flex-col justify-center items-start">
          <h1 className="text-3xl font-semibold">Work Process</h1>
          <p className="font-light text-gray-500 text-xs mt-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla purus
            arcu, varius eget velit non, laoreet imperdiet orci. Mauris ultrices
            eget lorem ac vestibulum. Suspendis imperdiet,
          </p>
          <p className="font-light text-gray-500 text-xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla purus
            arcu, varius eget velit non.
          </p>
        </div>
        <div className="basis-1/2 flex gap-4">
          {result.map((proc, idx) => {
            return (
              <div key={idx} className={`flex flex-col gap-4 ${idx == 1 ? 'translate-y-4':''}`}>
                {proc.map((data, index) => (
                  <div
                    key={index}
                    className="basis-1/2 flex flex-col items-start justify-start rounded-md shadow-sm p-3 group bg-white/80 transition-all hover:bg-white hover:scale-105"
                  >
                    <Icon icon={data.icon} className='text-primary-500 bg-primary-100 rounded-md text-4xl p-1 group-hover:bg-primary-500 group-hover:text-white' />
                    <h1 className='text-sm font-semibold mt-2 mb-1'>
                     {data.title}
                    </h1>
                    <p className='text-xs font-light text-gray-500'>{data.description}</p>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Process
