import React from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  BsGrid1X2Fill,
  BsPeopleFill,
  BsShop,
  BsPersonCircle,
} from "react-icons/bs";
import { RiFileList3Fill } from "react-icons/ri";
import { SlLogout } from "react-icons/sl";
import { BiDollarCircle } from "react-icons/bi";
import { HiDocumentText } from "react-icons/hi";

import { useSelector } from "react-redux";
import Swal from "sweetalert2";

import Cookies from "js-cookie";

export default function Home() {
  const nama = useSelector((state) => state.authProses.username);
  const role = useSelector((state) => state.authProses.role);
  const namaOutlet = useSelector((state) => state.authProses.nama_outlet);
  const navigate = useNavigate();
  const location = useLocation();
  let checkpath = location.pathname.split("/")[3];

  let activeStyle =
    "flex flex-row items-center text-white bg-[#CADF58] mb-[18px] rounded-md p-2";

  let nonActiveStyle =
    "flex flex-row items-center text-[#4B4F39] mb-[18px] cursor-pointer hover:bg-[#cbdf586e] hover:rounded-md hover:p-2";

  return (
    <React.Fragment>
      <div className="w-screen h-screen flex flex-row bg-[#CADF58] justify-center items-center">
        <section className="kiri flex flex-col w-[20%] h-[100%] border border-black bg-white">
          <div className="flex flex-row  items-end ml-10 rounded-md">
            <p className="text-[25px] font-bold text-[#CADF58]">Clean</p>
            <p className="text-[20px] font-semibold text-[#4B4F39] mt-[5px]">
              it
            </p>
          </div>
          <div className="flex flex-row  items-end ml-10 rounded-md">
            <p className="text-[15px] font-bold text-[#4B4F39]">oulet :</p>
            <p className="text-[15px] font-semibold text-[#4B4F39] mt-[5px]">
              {namaOutlet}
            </p>
          </div>

          <div className="h-[80%] w-[150px] flex flex-col ml-10 mt-[40px]">
          <NavLink to={`/home/dashboard`}>
              <div
                className={
                  checkpath === "dashboard" ? activeStyle : nonActiveStyle
                }
              >
                <BsGrid1X2Fill size={15} />
                <p className="ml-2 font-semibold">Dashboard</p>
              </div>
            </NavLink>

            {role !== "admin" ? null : (
              <NavLink to={`/home/user`}>
                <div
                  className={
                    checkpath === "user" ? activeStyle : nonActiveStyle
                  }
                >
                  <BsPeopleFill size={15} />
                  <p className="ml-2 font-semibold">User</p>
                </div>
              </NavLink>
            )}

           
            {/* //////////// */}
            {role === "owner" ? null : (
              <NavLink to={`/home/member`}>
                <div
                  className={
                    checkpath === "member" ? activeStyle : nonActiveStyle
                  }
                >
                  <BsPeopleFill size={15} />
                  <p className="ml-2 font-semibold">Member</p>
                </div>
              </NavLink>
            )}

            {/* /////////////// */}
            {role !== "admin" ? null : (
              <NavLink to={`/home/outlet`}>
                <div
                  className={
                    checkpath === "outlet" ? activeStyle : nonActiveStyle
                  }
                >
                  <BsShop size={15} />
                  <p className="ml-2 font-semibold">Outlet</p>
                </div>
              </NavLink>
            )}

            {/* ///////////////////////////// */}

            {role !== "admin" ? null : (
              <NavLink to={`/home/paket`}>
                <div
                  className={
                    checkpath === "paket" ? activeStyle : nonActiveStyle
                  }
                >
                  <RiFileList3Fill size={15} />
                  <p className="ml-2 font-semibold">Paket</p>
                </div>
              </NavLink>
            )}
            {role === " owner" ? null : (
              <NavLink to={`/home/transaksi`}>
                <div
                  className={
                    checkpath === "transaksi" ? activeStyle : nonActiveStyle
                  }
                >
                  <BiDollarCircle size={15} />
                  <p className="ml-2 font-semibold">Transaksi</p>
                </div>
              </NavLink>
            )}
            <NavLink to={`/home/laporan`}>
                <div
                  className={
                    checkpath === "laporan" ? activeStyle : nonActiveStyle
                  }
                >
                  <HiDocumentText size={15} />
                  <p className="ml-2 font-semibold">Laporan</p>
                </div>
              </NavLink>
          </div>

          <div className="flex flex-row items-center h-[10%] w-[100%] border border-t-black">
            <BsPersonCircle size={40} className="ml-[10px]" />

            <div className="flex flex-col ml-5">
              <p className="text-[#4B4F39] font-semibold">{nama}</p>
              <div className="w-[100px] h-[1px] bg-[#4B4F39]"></div>
              <p className="text-[#4B4F39] font-semibold">{role}</p>
            </div>

            <SlLogout
              size={20}
              className="font-semibold ml-[40px]"
              onClick={() => {
                Swal.fire({
                  title: "yakin ingin logout?",
                  // text: "yang terhapus mungkin ga bisa balik",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "ya",
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    Cookies.remove("myapps_token");
                    console.log("delete => delete jalan");
                    const Toast = Swal.mixin({
                      toast: true,
                      position: "top-end",
                      showConfirmButton: false,
                      timer: 3000,
                      timerProgressBar: true,
                      didOpen: (toast) => {
                        toast.addEventListener("mouseenter", Swal.stopTimer);
                        toast.addEventListener("mouseleave", Swal.resumeTimer);
                      },
                    });

                    Toast.fire({
                      icon: "success",
                      title: "anda berhasil logout",
                    });
                    navigate("/login");
                  }
                });
              }}
            />
          </div>
        </section>

        <section className="kanan  w-[80%] h-full border border-y-black bg-white overflow-scroll overflow-x-hidden">
          <Outlet />
        </section>
      </div>
    </React.Fragment>
  );
}
