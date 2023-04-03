import React from "react";
import {
  DeletePaket,
  DetailPaket,
  GetPaket,
  TambahPaket,
  UpdatePaket,
} from "../../API/paket";
import Input from "../../komponen/input";
import Textarea from "../../komponen/textArea";
import Swal from "sweetalert2";
import Button from "../../komponen/button";
import { GetOutlet } from "../../API/outlet";
import Option from "../../komponen/option";

export default function Paket() {
  const [showCreate, setShowCreate] = React.useState(false);
  const [showUpdate, setShowUpdate] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [paket, setPaket] = React.useState([]);
  const [outlet, setOutlet] = React.useState([]);
  const [query, setQuery] = React.useState({
    keyword: "",
  });
  const [payload, setPayload] = React.useState({
    id_outlet: "",
    jenis: "",
    nama_paket: "",
    harga: "",
    id: "",
  });
  const getDetailHandle = async (id) => {
    try {
      const detail = await DetailPaket(id);
      const detailPaket = detail.data.data;
      console.log(detailPaket);
      setPayload(() => {
        return {
          jenis: detailPaket.jenis,
          id_outlet: detailPaket.id_outlet,
          nama_paket: detailPaket.nama_paket,
          harga: detailPaket.harga,
          id: detailPaket.id,
        };
      });
      return setShowUpdate(true);
    } catch (error) {}
  };
  const updatePaketHandle = async (e) => {
    e.preventDefault();
    console.log("pau", payload);
    try {
      setLoading(false);
      const response = await UpdatePaket(payload.id, payload);
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
        title: "paket berhasil diupdate",
      });
      setLoading(true);
      setShowUpdate(false);
      getPaket();
    } catch (error) {}
  };
  const handleReset = () => {
    // console.log("reset berjalan")
    setPayload({
      id_outlet: "",
      jenis: "",
      nama_paket: "",
      harga: "",
      id: "",
    });
  };
  const handleChange = async (e) => {
    setQuery(() => {
      return {
        ...query,
        [e.target.name]: e.target.value,
      };
    });
    setPayload(() => {
      return {
        ...payload,
        [e.target.name]: e.target.value,
      };
    });
  };
  const getOutletHandle = async (e) => {
    try {
      const response = await GetOutlet(query.keyword);
      setOutlet(response.data.data.rows);
      console.log("outlet =>");
    } catch (error) {}
  };

  const getPaket = async () => {
    try {
      const response = await GetPaket(query.keyword);
      setPaket(response.data.data.rows);
      console.log("paket =>", paket);
    } catch (error) {}
  };
  const tambahPaketHandle = async (e) => {
    try {
      e.preventDefault();
      const response = await TambahPaket(payload);
      console.log("status =>", response.data);

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

        Toast.fire({
          icon: "success",
          title: "paket berhasil dibuat",
        });
        setShowCreate(false);
        getPaket();
        handleReset()
      }
    } catch (error) {}
  };

  const deletePaketHandle = async (id) => {
    console.log("delete jalan");
    Swal.fire({
      title: "yakin mau hapus paket?",
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
          const response = await DeletePaket(id);
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
            title: "paket berhasil didelete",
          });
          getPaket();
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  React.useEffect(() => {
    getPaket();
    getOutletHandle();
  }, [query.keyword]);
  return (
    <React.Fragment>
      <div className="w-full h-full flex flex-col bg-white">
        <p className="text-[25px] font-bold p-2 ml-4">Paket</p>

        <div className="flex justify-end w-[80%]">
        <Input
              placeholder="cari nama paket"
              name={"keyword"}
              // label={"nama : "}
              labelStyle={"text-sm font-medium"}
              onChange={handleChange}
              value={query.keyword}
              inputStyle=" border border-gray-300 mr-[80px] rounded-md px-4 py-3 w-full text-sm font-medium focus:outline-none focus:border focus:border-gray-400 placeholder:text-sm placeholder:font-medium placeholder:text-gray-500"
            />
          <button
            className="ml-[100px] text-black h-10 border border-black hover:bg-black active:bg-pink-600 font-bold uppercase text-sm px-6 rounded  outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            style={{
              background: "#fafafa",
            }}
            onClick={() => setShowCreate(true)}
          >
            Create Paket
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
                    <h3 className="text-2xl font-semibold">Create Paket</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-red-00 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowCreate(false)}
                    >
                      脳
                    </button>
                  </div>
                  {/*body*/}
                  <form action="" onSubmit={tambahPaketHandle}>
                    <div className="relative p-6 my-4 space-y-3 flex-auto ">
                      <Option
                        onChange={handleChange}
                        name="id_outlet"
                        label={"pilih outlet :"}
                          labelStyle="text-sm font-medium"
                        value={payload.id_outlet}
                        optionStyle={
                          "text-sm font-medium  border border-gray-300 rounded-md px-4 py-3 w-full  focus:outline-none focus:border focus:border-gray-400 placeholder:text-sm placeholder:font-medium placeholder:text-gray-500"
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
                      </Option>
                      <Option
                        onChange={handleChange}
                        name="jenis"
                        label={"jenis paket :"}
                          labelStyle="text-sm font-medium"
                        value={payload.jenis}
                        optionStyle={
                          "text-sm font-medium  border border-gray-300 rounded-md px-4 py-3 w-full  focus:outline-none focus:border focus:border-gray-400 placeholder:text-sm placeholder:font-medium placeholder:text-gray-500"
                        }
                      >
                        <option value="" className="">
                          pilih jenis
                        </option>
                        <option value={"kiloan"}>kiloan</option>
                        <option value={"selimut"}>selimut</option>
                        <option value={"bed_cover"}>bed cover</option>
                        <option value={"kaos"}>kaos</option>
                        <option value={"lain"}>lain</option>
                      </Option>
                      <p className="text-red-600 font-semibold italic text-xs">
                        {/* {msgError} */}
                      </p>
                      <Input
                        placeholder="nama paket"
                        name={"nama_paket"}
                        label={"nama paket :"}
                          labelStyle="text-sm font-medium"
                        onChange={handleChange}
                        value={payload.nama_paket}
                        inputStyle=" border border-gray-300 rounded-md px-4 py-3 w-full text-sm font-medium focus:outline-none focus:border focus:border-gray-400 placeholder:text-sm placeholder:font-medium placeholder:text-gray-500"
                      />
                      <p className="text-red-600 font-semibold italic text-xs">
                        {/* {msgError} */}
                      </p>

                      <Input
                        placeholder="harga"
                        name={"harga"}
                        label={"harga :"}
                          labelStyle="text-sm font-medium"
                        type="number"
                        onChange={handleChange}
                        value={payload.harga}
                        inputStyle=" border border-gray-300 rounded-md px-4 py-3 w-full text-sm font-medium focus:outline-none focus:border focus:border-gray-400 placeholder:text-sm placeholder:font-medium placeholder:text-gray-500"
                      />
                      <p className="text-red-600 font-semibold italic text-xs">
                        {/* {tlpError} */}
                      </p>
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
                        onClick={tambahPaketHandle}
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

        <section className="w-full h-full p-2 ml-4 ">
          <p className="text-black h-10 font-semibold">daftar paket</p>
          <table className="w-[98%]">
            <thead className="bg-[#CADF58] text-white">
              <tr>
                <th className="w-[70px] h-[50px] text-start pl-2 rounded-tl-md">
                  no
                </th>
                <th className="w-[150px] h-[50px] text-start pl-2">
                  nama outlet
                </th>
                <th className="w-[150px] h-[50px] text-start">jenis</th>
                <th className="w-[150px] h-[50px] text-start">nama paket</th>
                <th className="w-[150px] h-[50px] text-start">harga</th>
                <th className="w-[150px] h-[50px] text-start rounded-tr-md">
                  aksi
                </th>
              </tr>
            </thead>
            {paket.map((item, index) => {
              const convertRupiah = require("rupiah-format");
              let harga = item.harga;
              let hargaConvert = convertRupiah.convert(harga);
              return (
                <tbody key={index}>
                  <tr className="h-[30px] border-spacing-y-5">
                    <td className="border-spacing-y-5 font-semibold text-[#4B4F39] pl-2 border-y-2">
                      {index + 1}
                    </td>
                    <td className="border-spacing-y-5 font-semibold text-[#4B4F39] border-y-2 mb-5 pl-2">
                      {item.outlet.nama}
                    </td>
                    <td className="border-spacing-y-0 font-semibold text-[#4B4F39] border-y-2 pl-2">
                      {item.jenis}
                    </td>
                    <td className="border-spacing-y-0 font-semibold text-[#4B4F39] border-y-2 pl-2">
                      {item.nama_paket}
                    </td>
                    <td className="border-spacing-y-0 font-semibold text-[#4B4F39] border-y-2 pl-2">
                      {hargaConvert}
                    </td>
                    <th className="w-[200px] text-start border-y-2 pl-2">
                      <Button
                        title={"delete"}
                        buttonStyle="w-[80px] h-[40px] rounded-md text-white my-2"
                        color="red"
                        onClick={() => deletePaketHandle(item.id)}
                      />

                      <Button
                        title={"update"}
                        buttonStyle="w-[80px] h-[40px] rounded-md text-white my-2 ml-3"
                        color="blue"
                        onClick={() => {
                          getDetailHandle(item.id);
                        }}
                      />
                    </th>
                  </tr>
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
                            <form
                              action=""
                              onSubmit={(e) => updatePaketHandle(e, payload.id)}
                            >
                              <div className="relative p-6 my-4 space-y-3 flex-auto ">
                                <Option
                                  onChange={handleChange}
                                  name="id_outlet"
                                  label={"pilih outlet :"}
                          labelStyle="text-sm font-medium"
                                  value={payload.id_outlet}
                                  optionStyle={
                                    "text-sm font-medium  border border-gray-300 rounded-md px-4 py-3 w-full  focus:outline-none focus:border focus:border-gray-400 placeholder:text-sm placeholder:font-medium placeholder:text-gray-500"
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
                                </Option>
                                <Option
                                  onChange={handleChange}
                                  name="jenis"
                                  label={"pilih jenis :"}
                          labelStyle="text-sm font-medium"
                                  value={payload.jenis}
                                  optionStyle={
                                    "text-sm font-medium  border border-gray-300 rounded-md px-4 py-3 w-full  focus:outline-none focus:border focus:border-gray-400 placeholder:text-sm placeholder:font-medium placeholder:text-gray-500"
                                  }
                                >
                                  <option value="" className="">
                                    pilih jenis
                                  </option>
                                  <option value={"kiloan"}>kiloan</option>
                                  <option value={"selimut"}>selimut</option>
                                  <option value={"bed_cover"}>bed cover</option>
                                  <option value={"kaos"}>kaos</option>
                                  <option value={"lain"}>lain</option>
                                </Option>
                                <p className="text-red-600 font-semibold italic text-xs">
                                  {/* {msgError} */}
                                </p>
                                <Input
                                  placeholder="nama paket"
                                  name={"nama_paket"}
                                  label={"nama paket :"}
                          labelStyle="text-sm font-medium"
                                  onChange={handleChange}
                                  value={payload.nama_paket}
                                  inputStyle=" border border-gray-300 rounded-md px-4 py-3 w-full text-sm font-medium focus:outline-none focus:border focus:border-gray-400 placeholder:text-sm placeholder:font-medium placeholder:text-gray-500"
                                />
                                <p className="text-red-600 font-semibold italic text-xs">
                                  {/* {msgError} */}
                                </p>

                                <Input
                                  placeholder="harga"
                                  name={"harga"}
                                  label={"harga :"}
                          labelStyle="text-sm font-medium"
                                  type="number"
                                  onChange={handleChange}
                                  value={payload.harga}
                                  inputStyle=" border border-gray-300 rounded-md px-4 py-3 w-full text-sm font-medium focus:outline-none focus:border focus:border-gray-400 placeholder:text-sm placeholder:font-medium placeholder:text-gray-500"
                                />
                                <p className="text-red-600 font-semibold italic text-xs">
                                  {/* {tlpError} */}
                                </p>
                              </div>
                              {/*footer*/}
                              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                <button
                                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                  type="button"
                                  onClick={() => {
                                    setShowUpdate(false);
                                    //   handleReset();
                                  }}
                                >
                                  Close
                                </button>
                                <button
                                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                  type="submit"
                                  // onClick={() => updateOutletHandle(item.id)}
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
                </tbody>
              );
            })}
          </table>

          {/* <div  className="flex flex-row w-[80%] h-[60px] space-x-10 border border-black rounded-md items-center">
            <p className="text-black font-semibold ml-2">{item.nama}</p>
            <p className="text-black font-semibold">{item.alamat}</p>
            <p className="text-black font-semibold">{item.tlp}</p>

            <Button title={"delete"} buttonStyle = "w-[80px] h-[40px] rounded-md text-white" color="red"/>
          </div> */}
        </section>
      </div>
    </React.Fragment>
  );
}
