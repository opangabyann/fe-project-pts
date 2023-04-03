import React from 'react'

const Textarea = ({ label, labelStyle,isError, textError, ...props }) => {
  return (
    <div>
      <label htmlFor={label} className={`${labelStyle}`}>{label}</label>
      <textarea
        {...props}
        className=" border border-gray-300 rounded-md px-4 py-3 w-full text-sm font-medium focus:outline-none focus:border focus:border-gray-400 placeholder:text-sm placeholder:font-medium placeholder:text-gray-500"
        id={label}
      ></textarea>
      {isError && <p className="text-sm text-red-500 italic">{textError}</p>}
    </div>
  );
}

export default Textarea