import React from "react";
import Header from "../komponen/header";
import Bulat from "../komponen/bulat";
import Kategori from "../komponen/kategori";
import Populer from "../komponen/populer";
export default function Home() {
  return (
    <React.Fragment>
      <div className="w-screen h-screen py-2 px-8 pl-10 flex flex-col">
        <header className="w-full h-[8%] sticky top-0 bg-white">
          <Header />
        </header>

        <body className="w-full h-[90%] flex flex-row pt-[20px]">
          <section className="kiri w-[80%] h-full ">
            <div className="promo flex flex-row items-center justify-center w-[98%] h-[150px] bg-[#FFF7ED] rounded-[40px]">
              <div className="w-[150px] h-[130px] bg-[#fb6d3acc] mr-[10px] rounded-xl"></div>
              <div className="flex flex-col">
                <p className="text-[#FB6D3A] text-[30px] font-bold">
                  Promo Hari ini
                </p>
                <p className="text-[#FB6D3A] text-[20px] font-semibold">
                  Perut kenyang,japron senang
                </p>
              </div>
            </div>
            {/* //////////////////////////////////////////////////////////////////////////////////////////////// */}
            <div className="w-[98%] h-[20px] flex flex-row items-center justify-center mt-[5px]">
              <Bulat warna={"bg-[#FB6D3A]"} />
              <Bulat warna={"bg-slate-400"} />
              <Bulat warna={"bg-slate-400"} />
              <Bulat warna={"bg-slate-400"} />
              <Bulat warna={"bg-slate-400"} />
            </div>
            {/* //////////////////////////////////////////////////////////////////////////////////////////////// */}
            <div className="flex flex-col h-[33%]">
              <div className="w-[98%] h-[20px] flex flex-row justify-between mt-[20px]">
                <p className="text-[30px] font-bold">Kategori</p>
                <div className="w-[100px] h-[40px] bg-[#FB6D3A] flex justify-center items-center rounded-lg">
                  <p className="text-white text-xs font-semibold">
                    Lebih lengkap
                  </p>
                </div>
              </div>
              <div className="w-[98%] h-[20px] flex flex-row mt-[20px] ">
                {[1, 2, 3, 4, 5].map(() => {
                  return <Kategori judul={"kategori"} />;
                })}
              </div>
            </div>
            {/* //////////////////////////////////////////////////////////////////////////////////////////////// */}
            <div className="">
              <p className="text-[30px] font-bold">Populer</p>
            </div>
            <div className="w-[98%] h-[20px] flex flex-row mt-[20px]">
              {[1, 2, 3].map(() => {
                return <Populer />;
              })}
            </div>
            {/* //////////////////////////////////////////////////////////////////////////////////////////////// */}
          </section>

          <section className="kanan flex flex-col w-[20%] h-full">
            <p className="text-[25px] font-semibold">Pesanan saya</p>
            <div className="flex flex-col justify-between py-5 px-3 w-full h-[150px] bg-[#6455C2] rounded-xl mt-5">
              <p className="text-white text-sm font-semibold">Mr.opang</p>
              <p className="text-white text-[17px] font-semibold">
                Rp.1.000.000.00
              </p>
              <p className="text-white text-[13px] ">1234**************3242</p>
            </div>
            {/* //////////////////////////////////////////////////////////////////////////////////////////////// */}
            <div className="flex flex-col w-full h-[45%]  px-1">
              {[1, 2, 3].map(() => {
                return (
                  <div className="flex flex-row items-center justify-between w-full h-[70px] mt-2">
                    <div className="h-[80%] w-[65px] bg-slate-400 rounded-xl">
                      
                    </div>
                    <p className="font-semibold">3</p>
                    <p className="font-semibold">x</p>
                    <div className="w-[80px] h-[50px] ">
                      <p className="text-start font-semibold">4 cheese pizza</p>
                    </div>
                    <div className="w-[80px]">
                      <p className="text-start text-[#00000072] font-semibold">
                        Rp.520k
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* //////////////////////////////////////////////////////////////////////////////////////////////// */}
            <div className="flex flex-col w-full justify-between h-[20%]">
              <div className="flex flex-row  items-center justify-between w-full h-[45%] ">
                <p className="font-semibold">Total :</p>
                <p className="font-semibold text-[25px] text-[#0000009d]">Rp.1.060.000</p>
              </div>
              <div className="flex flex-row items-center justify-center w-full h-[50%] bg-[#FCD561] rounded-xl">
                <p className="text-[17px] font-bold text-[#414141] text-center">pesan</p>
                <div>

                </div>
              </div>
            </div>
          </section>
        </body>
      </div>
    </React.Fragment>
  );
}
