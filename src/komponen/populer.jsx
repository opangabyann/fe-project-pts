import React from "react";
import {AiOutlineStar} from 'react-icons/ai';

export default function Populer({gambar}){
    return(
        <div className="flex flex-col justify-between w-[350px] h-[170px] mr-5">
            <div className="flex flex-col  w-full h-[85px] bg-slate-400 rounded-xl relative">
                <p className="absolute bottom-10 left-28">gambar makanan</p>
                <div className="flex items-center justify-center w-[90px] h-[30px] bg-slate-300 ml-2 mb-2 rounded-xl absolute bottom-0 left-0">
                    <p className="text-[12px] font-semibold">30-40 min</p>
                </div>
            </div>
            <div className="flex flex-col ">
                <p className="font-semibold text-lg mb-[10px]">nama makanan</p>
                <div className="flex flex-row ">
                    <div className="flex flex-row">
                        <AiOutlineStar size={20}/>
                        <p className="text-sm ml-3">4.7</p>
                    </div>
                    <p className="ml-10 text-sm font-semibold">Rp.100.000.00</p>
                </div>
            </div>
        </div>
    )
}