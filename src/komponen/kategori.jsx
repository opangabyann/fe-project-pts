import React from "react";

export default function Kategori({judul}){
    return (
        <React.Fragment>
            <div className="flex flex-row items-center justify-center w-[200px] h-[100px] bg-slate-400 rounded-[20px] mr-[20px] mt-[10px]">
                <p className="text-[20px] text-white font-bold">{judul}</p>
            </div>
        </React.Fragment>
    )
}