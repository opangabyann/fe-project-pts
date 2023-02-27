import React from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { BsGrid1X2Fill,BsPeopleFill,BsShop } from "react-icons/bs";
import {RiFileList3Fill} from "react-icons/ri"
export default function Home() {
  const location = useLocation();

  let checkpath = location.pathname.split("/")[2];

  let activeStyle = "flex flex-row items-center text-white bg-[#CADF58] rounded-md p-2";

  let nonActiveStyle = "flex flex-row items-center text-[#4B4F39] mb-[10px]";

  return (
    <React.Fragment>
      <div className="w-screen h-screen flex flex-row bg-[#CADF58] justify-center items-center">
        <section className="kiri w-[15%] h-[100%] border border-black bg-white">
          <div className="flex flex-row items-end ml-10 rounded-md">
            <p className="text-[25px] font-bold text-[#CADF58]">Clean</p>
            <p className="text-[20px] font-semibold text-[#4B4F39] mt-[5px]">
              it
            </p>
          </div>

          <div className="h-[50%] w-[150px] flex flex-col ml-10 mt-[40px]">
            <NavLink
              to="/home/dashboard"
             
            >
              <div className={checkpath === "dashboard" ? activeStyle : nonActiveStyle}>
                <BsGrid1X2Fill size={15} />
                <p className="ml-2 font-semibold">Dashboard</p>
              </div>
            </NavLink>
            {/* //////////// */}
            <NavLink
              to="/home/member"
            >
              <div className={checkpath === "member" ? activeStyle : nonActiveStyle}>
                <BsPeopleFill size={15} />
                <p className="ml-2 font-semibold">Member</p>
              </div>
            </NavLink>
            {/* /////////////// */}
            <NavLink
              to="/home/outlet"
            >
              <div className={checkpath === "outlet" ? activeStyle : nonActiveStyle}>
                <BsShop size={15} />
                <p className="ml-2 font-semibold">Outlet</p>
              </div>
            </NavLink>
            {/* ///////////////////////////// */}
            <NavLink
              to="/home/paket"
            >
              <div className={checkpath === "paket" ? activeStyle : nonActiveStyle}>
                <RiFileList3Fill size={15} />
                <p className="ml-2 font-semibold">Paket</p>
              </div>
            </NavLink>
          </div>
        </section>

        <section className="kanan  w-[85%] h-[100%] border border-black bg-white">
          <Outlet />
        </section>
      </div>
    </React.Fragment>
  );
}
