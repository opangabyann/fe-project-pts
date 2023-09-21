import React from "react";
import Input from "./input";
import { MdRamenDining,MdOutlineFavorite } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { BsBoxSeam } from "react-icons/bs";

export default function Header() {
  return (
    <React.Fragment>
      <div className="w-full h-[50px] rounded-md  flex flex-row justify-between sticky">
        <section className="flex flex-row  items-center w-[78%]">
          <div className="w-[20px] h-50% mr-[5px]">
            <MdRamenDining size={23} color="#FB6D3A" />
          </div>
          <div className="flex flex-row mr-[80px]">
            <p className="text-[#FB6D3A] font-bold text-lg">My</p>
            <p className="text-[#6455C2] font-bold text-lg">Kantin</p>
          </div>
          <div className="flex flex-row">
            <div className="flex items-center justify-center">
              <AiOutlineSearch size={20} />
            </div>
            <Input inputStyle={"text-[13px]"} placeholder={"Cari Makan Bang?"} />
          </div>
        </section>

        <section className="flex flex-row items-center ">
          <div className="mr-5">
            <BsBoxSeam size={20} />
          </div>
          <div className="mr-5">
            <MdOutlineFavorite size={20} />
          </div>
          <div className="flex flex-row items-center justify-center w-[20px] h-[20px] bg-yellow-400 rounded-full mr-5">
            <p className="text-sm font-semibold ">3</p>
          </div>
          <div className="flex flex-row items-center justify-center w-[25px] h-[25px] bg-slate-500 rounded-full">
            
          </div>
        </section>
      </div>
    </React.Fragment>
  );
}
