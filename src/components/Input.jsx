import React, { useId } from 'react'

function Input({ type, name, placeholder, className, required = false }) {
  const id = useId()
  return (
    <div className={`relative z-0 ${className}`}>
      <input
        type={type}
        id={id}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b border-primary-300 appearance-none dark:border-gray-400 dark:focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-primary-600 peer"
        placeholder=" "
        name={name}
        required={required}
      />
      <label
        htmlFor={id}
        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-primary-600 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
      >
        {placeholder}
      </label>
    </div>
  )
}

export default Input
