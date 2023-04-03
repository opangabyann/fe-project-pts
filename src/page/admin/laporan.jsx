import React from "react";
import { downloadLaporan, GetTransaksi } from "../../API/transaksi";
import Button from "../../komponen/button";

export default function Laporan() {
  const [transaksi, setTransaksi] = React.useState([]);

  const getTransaksiHandle = async (e) => {
    try {
      const response = await GetTransaksi();
      setTransaksi(response.data.data);
      console.log("outlet =>");
    } catch (error) {}
  };
  React.useEffect(() => {
    getTransaksiHandle();
  }, []);
  return (
    <React.Fragment>
      <div className="w-full h-full flex flex-col bg-white ">
        <p className="text-[25px] font-bold p-2 ml-4">Laporan</p>
        <div className="flex justify-end w-[80%]">
          <button
            className=" text-black h-10 border border-black hover:bg-black active:bg-pink-600 font-bold uppercase text-sm px-6 rounded  outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            style={{
              background: "#fafafa",
            }}
            // onClick={() => setShowCreate(true)}
            onClick={async () => {
                try {
                  const response = await downloadLaporan();
                  const blob = new Blob([response.data], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                  });
                  const url = window.URL.createObjectURL(blob);
                  const link = document.createElement("a");
                  link.href = url;
                  link.setAttribute(
                    "download",
                    "detail-laporan-transaksi.xlsx"
                  );
                  document.body.appendChild(link);
                  link.click();
                } catch (error) {
                  console.log("downlaoderr", error);
                }
              }}
          >
            Buat laporan
          </button>
        </div>
        <section className="w-full h-full p-2 ml-4 mb-[20px]">
          {/* <p className="text-black h-10 font-semibold">daftar transaksi</p> */}
          <div className="w-[95%] h-full grid grid-cols-2 gap-5">
            {transaksi?.map((item, index) => {
              const convertRupiah = require("rupiah-format");
              let biaya = item.biaya_tambahan;
              let biayaTambahan = convertRupiah.convert(biaya);
              if (item.dibayar === "dibayar") {
                return (
                  <div
                    key={index}
                    className="flex flex-col w-full h-[370px] rounded-md  shadow-md border border-slate-400 cursor-pointer p-2 hover:shadow-md hover:bg-white hover:border-2"
                    //   onClick={}
                  >
                    <section className="flex flex-row w-full  justify-between py-2 px-14 border-slate-400 border-b-[2px] ">
                      <div className="flex flex-col  justify-center items-center w-[150px]">
                        <p className="font-semibold  text-[#4B4F39] text-sm ml-3 mb-[3px]">
                          nama outlet
                        </p>
                        <div className="w-[70px] h-[1px] bg-slate-400 ml-4"></div>
                        <p className="font-semibold italic text-[#4B4F39] ">
                          {item.outlet.nama}
                        </p>
                      </div>
                      {/* ////////////////////////////////////// */}
                      <div className="flex flex-col justify-center items-center w-[150px] bg-">
                        <p className="font-semibold  text-[#4B4F39] text-sm ml-4 mb-[3px]">
                          nama user
                        </p>
                        <div className="w-[60px] h-[1px] bg-slate-400 ml-[18px]"></div>
                        <p className="font-semibold italic text-[#4B4F39] ">
                          {item.user.nama}
                        </p>
                      </div>
                    </section>

                    <section className="flex flex-row px-6 mt-4">
                      <div className="mr-[15px]">
                        <p>nama member</p>
                        <p>kode invoice</p>
                        <p>tanggal </p>
                        <p>batas waktu</p>
                        <p>tanggal bayar</p>
                        <p>biaya tambahan</p>
                        <p>pajak</p>
                        <p>status</p>
                        <p>status pembayaran</p>
                      </div>

                      <div className="">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => {
                          return <p>:</p>;
                        })}
                      </div>

                      <div className="ml-3">
                        <p>{item.member.nama}</p>
                        <p>{item.kode_invoice}.</p>
                        <p>{item.tgl}</p>
                        <p>{item.batas_waktu}</p>
                        <p>
                          {item.dibayar === "belum_dibayar" ? (
                            <p className="text-red-600 italic font-medium">
                              belum dibayar
                            </p>
                          ) : (
                            item.tgl_bayar
                          )}
                        </p>
                        <p>{biayaTambahan}</p>
                        <p>{item.pajak} %</p>
                        <p>{item.status}</p>
                        <p>
                          {item.dibayar === "belum_dibayar" ? (
                            <p className="text-red-600 italic font-medium">
                              belum dibayar
                            </p>
                          ) : (
                            <p className="text-green-600 italic font-medium">
                              {item.dibayar}
                            </p>
                          )}
                        </p>
                      </div>
                    </section>

                    <section className="w-full flex justify-between">
                      <div className="h-[50px] flex flex-col justify-end">
                        <p className="text-xs text-[#4B4F39]  font-semibold italic ">
                          *klik untuk melihat detail transaksi
                        </p>
                      </div>
                      <div className="flex flex-row w-[180px]">
                        <Button
                          title={"update"}
                          buttonStyle="w-[80px] h-[40px] rounded-md text-white my-2 mx-2"
                          color="blue"
                          // onClick={() => getDetailHandle(item.id)}
                        />
                        <Button
                          title={"delete"}
                          buttonStyle="w-[80px] h-[40px] rounded-md text-white my-2"
                          color="red"
                          // onClick={() => deleteTransaksiHandle(item.id)}
                        />
                      </div>
                    </section>
                  </div>
                );
              }
            })}
          </div>
        </section>
      </div>
    </React.Fragment>
  );
}
