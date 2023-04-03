import React from "react";
import { GetMember } from "../../API/member";
import { GetOutlet } from "../../API/outlet";
import {
  DeleteTransaksi,
  DetailTransaksi,
  GetTransaksi,
  TambahTransaksi,
  UpdateTransaksi,
} from "../../API/transaksi";
import { GetUser } from "../../API/user";
import Button from "../../komponen/button";
import Input from "../../komponen/input";
import Option from "../../komponen/option";
import Textarea from "../../komponen/textArea";
import Swal from "sweetalert2";
import { GetPaket } from "../../API/paket";
import { GetDetailTransaksi } from "../../API/detailTransaksi";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment/moment";
import CurrencyInput from "react-currency-input-field";

export default function Transaksi() {
  // const role = useSelector((state) => state.authProses.role);
  const idOutlet = useSelector((state) => state.authProses.id_outlet);

  const navigate = useNavigate();
  const [showCreate, setShowCreate] = React.useState(false);
  const [showUpdate, setShowUpdate] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [outlet, setOutlet] = React.useState([]);
  const [member, setMember] = React.useState([]);
  const [user, setUser] = React.useState([]);
  const [paket, setPaket] = React.useState([]);
  const [transaksi, setTransaksi] = React.useState([]);
  const date = new Date().getTime();

  const [payload, setPayload] = React.useState({
    id_outlet: `${idOutlet}`,
    kode_invoice: `INV ${date}`,
    id_member: "",
    tgl_bayar: "",
    biaya_tambahan: "",
    diskon: "",
    pajak: "5",
    status: "",
    dibayar: "",
    id_user: "",
    id: "",
    qty: "",
    keterangan: "",
    id_paket: "",
  });
  //   console.log(payload.kode_invoice)
  const handleReset = () => {
    setPayload({
      id_outlet: "",
      kode_invoice: `INV ${date}`,
      id_member: "",
      tgl_bayar: "",
      biaya_tambahan: "",
      diskon: "",
      pajak: "5",
      status: "",
      dibayar: "",
      id_user: "",
      id: "",
      qty: "",
      id_paket: "",
    });
  };
  const handleChange = (e,biaya_tambahan) => {
    // console.log("handle change jalan pler");
    setPayload(()=> {
      return {
        ...payload,
        [e.target.name] : e.target.value
      }
    });
  };
  const getMemberHandle = async () => {
    try {
      const response = await GetMember();
      setMember(response.data.data);

      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getUser = async () => {
    try {
      const response = await GetUser();
      setUser(response.data.data.rows);
      console.log("user =>", user);
    } catch (error) {}
  };
  const getPaket = async () => {
    try {
      const response = await GetPaket();
      setPaket(response.data.data);
      console.log("user =>", paket);
    } catch (error) {}
  };
  const getOutletHandle = async (e) => {
    try {
      const response = await GetOutlet();
      setOutlet(response.data.data);
      console.log("outlet =>");
    } catch (error) {}
  };
  const getTransaksiHandle = async (e) => {
    try {
      const response = await GetTransaksi();
      setTransaksi(response.data.data);
      console.log("outlet =>");
    } catch (error) {}
  };
  const tambahTransaksiHandle = async (e) => {
    e.preventDefault();
    try {
      const response = await TambahTransaksi(payload);
      console.log("response =>", response);
      if (response?.status === 200) {
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
        handleReset();
        Toast.fire({
          icon: "success",
          title: "transaksi berhasil dibuat",
        });
      }
      setShowCreate(false);
      getTransaksiHandle();
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTransaksiHandle = async (id) => {
    Swal.fire({
      title: "yakin mau hapus transaksi?",
      text: "yang terhapus mungkin ga bisa balik",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ya, hapus aja",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          console.log("delete => delete jalan");
          const response = await DeleteTransaksi(id);
          console.log(response);
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
            title: "transaksi berhasil dihapus",
          });
          getTransaksiHandle();
        } catch (error) {
          console.log(error);
        }
      }
    });
  };
  const updateTransaksiHandle = async (e) => {
    e.preventDefault();
    console.log("pau", payload);
    try {
      setLoading(false);
      const response = await UpdateTransaksi(payload.id, payload);
      console.log(response);
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
        title: "transaksi berhasil diupdate",
      });
      setLoading(true);
      setShowUpdate(false);
      getTransaksiHandle();
    } catch (error) {}
  };
  const getDetailHandle = async (id) => {
    try {
      const detail = await DetailTransaksi(id);
      const detailTransaksi = detail.data.data;
      console.log(detailTransaksi);
      setPayload(() => {
        return {
          tgl_bayar: detailTransaksi.tgl_bayar,
          dibayar: detailTransaksi.dibayar,
          status: detailTransaksi.status,
          id: detailTransaksi.id,
        };
      });
      return setShowUpdate(true);
    } catch (error) {}
  };

  // const getDetailTransaksi = async (id) => {
  //   try {
  //     const response = await GetDetailTransaksi(id);
  //     console.log(response);
  //     setDetailTransaksi(response.data.data);
  //     return setShowDetail(true);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  React.useEffect(() => {
    getTransaksiHandle();
    getOutletHandle();
    getMemberHandle();
    getUser();
    getPaket();
  }, []);
  return (
    <React.Fragment>
      <div className="w-full h-full flex flex-col bg-white ">
        <p className="text-[25px] font-bold p-2 ml-4">Transaksi</p>
        <div className="flex justify-end w-[80%]">
          <button
            className=" text-black h-10 border border-black hover:bg-black active:bg-pink-600 font-bold uppercase text-sm px-6 rounded  outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            style={{
              background: "#fafafa",
            }}
            onClick={() => setShowCreate(true)}
          >
            Create Transaksi
          </button>
        </div>
        {showCreate ? (
          <section>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-screen">
              <div className="relative w-1/3 my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between py-4 px-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-2xl font-semibold">Create Transaksi</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-red-00 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowCreate(false)}
                    >
                      脳
                    </button>
                  </div>
                  {/*body*/}
                  <form action="" onSubmit={tambahTransaksiHandle}>
                    <div className="relative p-4 my-4 space-y-3 flex-auto flex-row">
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="Kode invoice"
                          name={"kode_invoice"}
                          label={"kode invoice :"}
                          labelStyle="text-sm font-medium"
                          onChange={handleChange}
                          value={payload.kode_invoice}
                          inputStyle="border border-gray-300 rounded-md px-4 py-3 w-full text-sm font-medium focus:outline-none focus:border focus:border-gray-400 placeholder:text-sm placeholder:font-medium placeholder:text-gray-500"
                        />
                        <Option
                          onChange={handleChange}
                          name="id_member"
                          label={"pilih member :"}
                          labelStyle="text-sm font-medium"
                          value={payload.id_member}
                          optionStyle={
                            " text-sm font-medium  border border-gray-300 rounded-md px-4 py-3 w-full  focus:outline-none focus:border focus:border-gray-400 placeholder:text-sm placeholder:font-medium placeholder:text-gray-500"
                          }
                        >
                          <option value="" className="">
                            pilih member
                          </option>
                          {member?.map((item, index) => {
                            return (
                              <option key={index} value={item?.id}>
                                {item?.nama}
                              </option>
                            );
                          })}
                        </Option>

                        <Input
                          placeholder="Diskon"
                          name={"diskon"}
                          label={"diskon :"}
                          labelStyle="text-sm font-medium"
                          onChange={handleChange}
                          value={payload.diskon}
                          inputStyle="my-1 border border-gray-300 rounded-md px-4 py-3 w-full text-sm font-medium focus:outline-none focus:border focus:border-gray-400 placeholder:text-sm placeholder:font-medium placeholder:text-gray-500"
                        />
                        <Input
                          placeholder="berat cucian"
                          name={"qty"}
                          label={"berat cucian :"}
                          labelStyle="text-sm font-medium"
                          onChange={handleChange}
                          value={payload.qty}
                          inputStyle="my-1 border border-gray-300 rounded-md px-4 py-3 w-full text-sm font-medium focus:outline-none focus:border focus:border-gray-400 placeholder:text-sm placeholder:font-medium placeholder:text-gray-500"
                        />
                        <Input
                          placeholder="keterangan"
                          name={"keterangan"}
                          label={"keterangan :"}
                          labelStyle="text-sm font-medium"
                          onChange={handleChange}
                          value={payload.keterangan}
                          inputStyle="my-1 border border-gray-300 rounded-md px-4 py-3 w-full text-sm font-medium focus:outline-none focus:border focus:border-gray-400 placeholder:text-sm placeholder:font-medium placeholder:text-gray-500"
                        />
                        <Input
                          placeholder="biaya tambahan"
                          name={"biaya_tambahan"}
                          label={"biaya tambahan :"}
                          labelStyle="text-sm font-medium"
                          onChange={handleChange}
                          value={payload.biaya_tambahan}
                          inputStyle="my-1 border border-gray-300 rounded-md px-4 py-3 w-full text-sm font-medium focus:outline-none focus:border focus:border-gray-400 placeholder:text-sm placeholder:font-medium placeholder:text-gray-500"
                        />
                        {/* <div className="">
                          <label htmlFor="" className="text-sm font-medium">
                            biaya tambahan :
                          </label>
                          <CurrencyInput
                            id="biaya_tambahan"
                            name={"biaya_tambahan"}
                            label={"biaya tambahan :"}
                            labelStyle="text-sm font-medium"
                            className=" border border-gray-300 h-[45px] rounded-md px-4 py-3 w-full text-sm font-medium focus:outline-none focus:border focus:border-gray-400 placeholder:text-sm placeholder:font-medium placeholder:text-gray-500"
                            value={payload.biaya_tambahan}
                            placeholder="Masukkan biaya tambahan"
                            defaultValue={1000}
                            decimalsLimit={2}
                            onValueChange={(value)=>{
                              handleChange(value)
                            }}
                          />
                        </div> */}
                      </div>
                      {/* <Input
                        placeholder="Tanggal bayar"
                        name={"tgl_bayar"}
                        onChange={handleChange}
                        value={payload.tgl_bayar}
                        inputStyle=" border border-gray-300 rounded-md px-4 py-3 w-full text-sm font-medium focus:outline-none focus:border focus:border-gray-400 placeholder:text-sm placeholder:font-medium placeholder:text-gray-500"
                      /> */}
                      <div className="grid grid-cols-2 gap-2">
                        {/* <Option
                          onChange={handleChange}
                          name="id_outlet"
                          label={"pilih outlet :"}
                          labelStyle="text-sm font-medium"
                          value={payload.id_outlet}
                          optionStyle={
                            " text-sm font-medium  border border-gray-300 rounded-md px-4 py-3 w-full  focus:outline-none focus:border focus:border-gray-400 placeholder:text-sm placeholder:font-medium placeholder:text-gray-500"
                          }
                        >
                          <option value="" className="">
                            pilih outlet
                          </option>
                          {outlet?.map((item, index) => {
                            return (
                              <option key={index} value={item?.id}>
                                {item?.nama}
                              </option>
                            );
                          })}
                        </Option> */}
                        <Option
                          onChange={handleChange}
                          name="id_paket"
                          label={"pilih paket :"}
                          labelStyle="text-sm font-medium"
                          value={payload.id_paket}
                          optionStyle={
                            " text-sm font-medium  border border-gray-300 rounded-md px-4 py-3 w-full  focus:outline-none focus:border focus:border-gray-400 placeholder:text-sm placeholder:font-medium placeholder:text-gray-500"
                          }
                        >
                          <option value="" className="">
                            pilih paket
                          </option>
                          {paket?.map((item, index) => {
                            return (
                              <option key={index} value={item?.id}>
                                {item?.nama_paket}
                              </option>
                            );
                          })}
                        </Option>
                      </div>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => {
                          setShowCreate(false);
                          handleReset();
                        }}
                      >
                        Close
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                        // onClick={handleSubmit}
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </section>
        ) : null}

        <section className="w-full h-full p-2 ml-4 mb-[20px]">
          <p className="text-black h-10 font-semibold">daftar transaksi</p>
          <div className="w-[95%] h-full grid grid-cols-2 gap-5">
            {transaksi.map((item, index) => {
              const convertRupiah = require("rupiah-format");
              let biaya = item.biaya_tambahan;
              let biayaTambahan = convertRupiah.convert(biaya);

              return (
                <div
                  key={index}
                  className="flex flex-col w-full h-[370px] rounded-md  shadow-md border border-slate-400 cursor-pointer p-2 hover:shadow-md hover:bg-white hover:border-2"
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
                      <p>{moment(item.tgl).format("DD/MM/YYYY HH:mm")}</p>
                      <p>
                        {moment(item.batas_waktu).format("DD/MM/YYYY HH:mm")}
                      </p>
                      <p>
                        {item.dibayar === "belum_dibayar" ? (
                          <p className="text-red-600 italic font-medium">
                            belum dibayar
                          </p>
                        ) : (
                          moment(item.tgl_bayar).format("DD/MM/YYYY HH:mm")
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
                      <button
                        className=" text-black h-10 border border-black hover:bg-black active:bg-pink-600 font-bold uppercase text-sm px-6 rounded  outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        style={{
                          background: "#fafafa",
                        }}
                        // onClick={() => {
                        //   navigate(`detail/${item.id}`);
                        // }}
                      >
                        Lihat detail
                      </button>
                    </div>
                    <div className="flex flex-row w-[180px]">
                      <Button
                        title={"update"}
                        buttonStyle="w-[80px] h-[40px] rounded-md text-white my-2 mx-2"
                        color="blue"
                        onClick={() => getDetailHandle(item.id)}
                      />
                      <Button
                        title={"delete"}
                        buttonStyle="w-[80px] h-[40px] rounded-md text-white my-2"
                        color="red"
                        onClick={() => deleteTransaksiHandle(item.id)}
                      />
                    </div>
                  </section>
                  {showUpdate ? (
                    <section>
                      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-screen">
                        <div className="relative w-1/3 my-6 mx-auto max-w-3xl">
                          {/*content*/}
                          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between py-4 px-5 border-b border-solid border-slate-200 rounded-t">
                              <h3 className="text-2xl font-semibold">
                                Update Outlet
                              </h3>
                              <button
                                className="p-1 ml-auto bg-transparent border-0 text-red-00 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => setShowUpdate(false)}
                              >
                                脳
                              </button>
                            </div>
                            {/*body*/}
                            {/* <p>{payload.id}</p> */}
                            <form
                              action=""
                              onSubmit={(e) =>
                                updateTransaksiHandle(e, payload.id)
                              }
                            >
                              <div className="relative p-6 my-4 space-y-3 flex-auto ">
                                <Input
                                  placeholder="Tanggal bayar"
                                  name={"tgl_bayar"}
                                  onChange={handleChange}
                                  value={payload.tgl_bayar}
                                  inputStyle=" border border-gray-300 rounded-md px-4 py-3 w-full text-sm font-medium focus:outline-none focus:border focus:border-gray-400 placeholder:text-sm placeholder:font-medium placeholder:text-gray-500"
                                />

                                <Option
                                  onChange={handleChange}
                                  value={payload.status}
                                  name={"status"}
                                  optionStyle={
                                    "text-sm font-medium  border border-gray-300 rounded-md px-4 py-3 w-full  focus:outline-none focus:border focus:border-gray-400 placeholder:text-sm placeholder:font-medium placeholder:text-gray-500"
                                  }
                                >
                                  <option value="">status</option>
                                  <option value="baru">baru</option>
                                  <option value="proses">proses</option>
                                  <option value="selesai">selesai</option>
                                  <option value="diambil">diambil</option>
                                </Option>

                                <Option
                                  onChange={handleChange}
                                  value={payload.dibayar}
                                  name={"dibayar"}
                                  optionStyle={
                                    "text-sm font-medium  border border-gray-300 rounded-md px-4 py-3 w-full  focus:outline-none focus:border focus:border-gray-400 placeholder:text-sm placeholder:font-medium placeholder:text-gray-500"
                                  }
                                >
                                  <option value="">status pembayaran</option>
                                  <option value="dibayar">dibayar</option>
                                  <option value="belum_dibayar">
                                    belum_dibayar
                                  </option>
                                </Option>
                              </div>
                              {/*footer*/}
                              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                <button
                                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                  type="button"
                                  onClick={() => {
                                    setShowUpdate(false);
                                    handleReset();
                                  }}
                                >
                                  Close
                                </button>
                                <button
                                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                  type="submit"
                                >
                                  update
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </section>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </React.Fragment>
  );
}
