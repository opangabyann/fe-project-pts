import React from "react";
import { BiLabel } from "react-icons/bi";

export default function Option({ label,labelStyle,optionStyle, children,...props }) {
  return (
    <div className="flex flex-col ">
      <label
        class={`${labelStyle}`}
      >
        {label}
      </label>
      <select
        {...props}
        className={`${optionStyle}`}
      >
        {children}
      </select>

      {/* <label className="text-white">{label}</label>
      <select {...props} className={`${optionStyle} `}>
        <option>pilih gender</option>
        <option>laki-laki</option>
        <option>perempuan</option>
      </select> */}
    </div>
  );
}