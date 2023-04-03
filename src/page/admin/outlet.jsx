import React from "react";
import {
  DeleteOutlet,
  DetailOutlet,
  GetOutlet,
  TambahOutlet,
  UpdateOutlet,
} from "../../API/outlet";
import Input from "../../komponen/input";
import Textarea from "../../komponen/textArea";
import Swal from "sweetalert2";
import Button from "../../komponen/button";
import { useSelector } from "react-redux";
import nangis from "../../assets/images/nangis.png";
import {BsCaretRight,BsCaretLeft } from "react-icons/bs";

export default function Outlets() {
  const role = useSelector((state) => state.authProses.role);

  const [showCreate, setShowCreate] = React.useState(false);
  const [showUpdate, setShowUpdate] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [msgError, setMsgError] = React.useState("");
  const [alamatError, setAlamatError] = React.useState("");
  const [tlpError, setTlpError] = React.useState("");
  const [outlet, setOutlet] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [query, setQuery] = React.useState({
    keyword: "",
    // page : "1",
    pageSize: "6",
  });
  const [payload, setpayload] = React.useState({
    nama: "",
    alamat: "",
    tlp: "",
    id: "",
  });
  const updateOutletHandle = async (e) => {
    e.preventDefault();

    console.log("pau", payload);
    try {
      setLoading(false);
      const response = await UpdateOutlet(payload.id, payload);
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
        title: "outlet berhasil diupdate",
      });
      setLoading(true);
      setShowUpdate(false);
      getOutletHandle();
    } catch (error) {}
  };
  const getDetailHandle = async (id) => {
    try {
      const detail = await DetailOutlet(id);
      const detailOutlet = detail.data.data;
      console.log(detailOutlet);
      setpayload(() => {
        return {
          id: detailOutlet?.id,
          nama: detailOutlet?.nama,
          alamat: detailOutlet?.alamat,
          tlp: detailOutlet?.tlp,
        };
      });
      return setShowUpdate(true);
    } catch (error) {}
  };
  const handleChange = (e) => {
    // console.log("jalan")
    setQuery(() => {
      return {
        ...query,
        [e.target.name]: e.target.value,
      };
    });
    setpayload(() => {
      return {
        ...payload,
        [e.target.name]: e.target.value,
      };
    });

    if (payload.nama !== "" || payload.alamat !== "" || payload.tlp !== "") {
      if (payload.nama !== "") {
        setMsgError("");
      }

      if (payload.alamat !== "") {
        setAlamatError("");
      }
      if (payload.tlp !== "") {
        setTlpError("");
      }
      return;
    }
  };
  const handleReset = () => {
    // console.log("reset berjalan")
    setpayload({
      nama: "",
      alamat: "",
      tlp: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(payload);
    try {
      if (payload.nama === "" || payload.alamat === "" || payload.tlp === "") {
        if (payload.nama === "") {
          setMsgError("nama masih kosong!");
        }
        if (payload.alamat === "") {
          setAlamatError("alamat yang kosong!");
        }
        if (payload.tlp === "") {
          setTlpError("nomor telepon masih kosong!");
        }
        return;
      }

      const response = await TambahOutlet(payload);
      console.log(response);

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
          title: "outlet berhasil dibuat",
        });
        setShowCreate(false);
        handleReset();
      }
      getOutletHandle();
    } catch (error) {
      console.log(error);
    }
  };

  const getOutletHandle = async (e) => {
    try {
      const response = await GetOutlet(query.keyword, page, query.pageSize);
      setOutlet(response.data.data.rows);
      console.log("outlet =>");
    } catch (error) {}
  };

  const deleteOutletHandle = async (id) => {
    console.log("delete jalan");
    Swal.fire({
      title: "yakin mau hapus outlet?",
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
          const response = await DeleteOutlet(id);
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
            title: "outlet berhasil diDelete",
          });
          getOutletHandle();
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  React.useEffect(() => {
    getOutletHandle();
  }, [query.keyword, page, query.pageSize]);
  return (
    <React.Fragment>
      {role !== "admin" ? (
        <div className="w-full h-full flex flex-col bg-white overflow-hidden">
          <div className="flex items-center justify-center w[200px]">
            {/* <FaRegSadCry className="flex items-center justify-center" size={180}/> */}
            <img src={nangis} alt="" width={"200px"} />
          </div>
          <p className="flex items-center justify-center text-cyan-800 font-bold text-[20px] mt-5">
            anda tidak memiliki akses untuk page ini
          </p>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col bg-white">
          <p className="text-[25px] font-bold p-2 ml-4">Outlets</p>

          <div className="flex justify-end w-[80%]">
            <Input
              placeholder="cari nama outlet atau alamat outlet"
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
              Create Outlet
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
                      <h3 className="text-2xl font-semibold">Create Outlet</h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-red-00 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowCreate(false)}
                      >
                        脳
                      </button>
                    </div>
                    {/*body*/}
                    <form action="" onSubmit={handleSubmit}>
                      <div className="relative p-6 my-4 space-y-3 flex-auto ">
                        <Input
                          placeholder="Nama"
                          name={"nama"}
                          label={"nama :"}
                          labelStyle="text-sm font-medium"
                          onChange={handleChange}
                          value={payload.nama}
                          inputStyle=" border border-gray-300 rounded-md px-4 py-3 w-full text-sm font-medium focus:outline-none focus:border focus:border-gray-400 placeholder:text-sm placeholder:font-medium placeholder:text-gray-500"
                        />
                        <p className="text-red-600 font-semibold italic text-xs">
                          {msgError}
                        </p>
                        <Textarea
                          placeholder="Alamat"
                          name={"alamat"}
                          label={"alamat :"}
                          labelStyle="text-sm font-medium"
                          onChange={handleChange}
                          value={payload.alamat}
                          inputStyle=" border border-gray-300 rounded-md px-4 py-3 w-full text-sm font-medium focus:outline-none focus:border focus:border-gray-400 placeholder:text-sm placeholder:font-medium placeholder:text-gray-500"
                        />
                        <p className="text-red-600 font-semibold italic text-xs">
                          {alamatError}
                        </p>
                        <Input
                          placeholder="Telepon"
                          name={"tlp"}
                          label={"nomor telepon :"}
                          labelStyle="text-sm font-medium"
                          type="number"
                          onChange={handleChange}
                          value={payload.tlp}
                          inputStyle=" border border-gray-300 rounded-md px-4 py-3 w-full text-sm font-medium focus:outline-none focus:border focus:border-gray-400 placeholder:text-sm placeholder:font-medium placeholder:text-gray-500"
                        />
                        <p className="text-red-600 font-semibold italic text-xs">
                          {tlpError}
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
                          onClick={handleSubmit}
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

          <section className="w-full h-[70%] p-2 ml-4 ">
            <p className="text-black h-10 font-semibold">daftar outlet</p>
            <table className="table-auto w-[98%]  rounded-md">
              <thead className="bg-[#CADF58] text-white rounded-md">
                <tr>
                  <th className="w-[70px] h-[50px] text-start pl-2 rounded-tl-md">
                    no
                  </th>
                  <th className="w-[200px] text-start mb-2 h-[50px] pl-2">
                    nama laundry
                  </th>
                  <th className="w-[250px] text-start mb-2 h-[50px] pl-2">
                    alamat
                  </th>
                  <th className="w-[200px] text-start mb-2 h-[50px] pl-2">
                    nomor telepon
                  </th>
                  <th className="w-[200px] text-start mb-2 h-[50px] pl-2 rounded-tr-md">
                    aksi
                  </th>
                </tr>
              </thead>
              {outlet.map((item, index) => {
                return (
                  <tbody key={index}>
                    <tr className="h-[30px] border-spacing-y-5">
                      <td className="border-spacing-y-5 font-semibold text-[#4B4F39] border-y-2 pl-2">
                        {index + 1}
                      </td>
                      <td className="border-spacing-y-5 font-semibold text-[#4B4F39] border-y-2 pl-2">
                        {item.nama}
                      </td>
                      <td className="border-spacing-y-0 font-semibold text-[#4B4F39] border-y-2 pl-2">
                        {item.alamat}
                      </td>
                      <td className="border-spacing-y-0 font-semibold text-[#4B4F39] border-y-2 pl-2">
                        {item.tlp}
                      </td>
                      <td className="w-[200px] text-start border-y-2 pl-2">
                        <Button
                          title={"delete"}
                          buttonStyle="w-[80px] h-[40px] rounded-md text-white my-2"
                          color="red"
                          onClick={() => deleteOutletHandle(item.id)}
                        />

                        <Button
                          title={"update"}
                          buttonStyle="w-[80px] h-[40px] rounded-md text-white my-2 ml-3"
                          color="blue"
                          onClick={() => {
                            getDetailHandle(item.id);
                          }}
                        />
                      </td>
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
                              {/* <p>{payload.id}</p> */}
                              <form
                                action=""
                                onSubmit={(e) =>
                                  updateOutletHandle(e, payload.id)
                                }
                              >
                                <div className="relative p-6 my-4 space-y-3 flex-auto ">
                                  <Input
                                    placeholder="Nama"
                                    name={"nama"}
                                    label={"nama :"}
                                    labelStyle="text-sm font-medium"
                                    onChange={handleChange}
                                    value={payload.nama}
                                    inputStyle=" border border-gray-300 rounded-md px-4 py-3 w-full text-sm font-medium focus:outline-none focus:border focus:border-gray-400 placeholder:text-sm placeholder:font-medium placeholder:text-gray-500"
                                  />
                                  <p className="text-red-600 font-semibold italic text-xs">
                                    {msgError}
                                  </p>
                                  <Textarea
                                    placeholder="Alamat"
                                    name={"alamat"}
                                    label={"alamat :"}
                                    labelStyle="text-sm font-medium"
                                    onChange={handleChange}
                                    value={payload.alamat}
                                    inputStyle=" border border-gray-300 rounded-md px-4 py-3 w-full text-sm font-medium focus:outline-none focus:border focus:border-gray-400 placeholder:text-sm placeholder:font-medium placeholder:text-gray-500"
                                  />
                                  <p className="text-red-600 font-semibold italic text-xs">
                                    {alamatError}
                                  </p>
                                  <Input
                                    placeholder="Telepon"
                                    name={"tlp"}
                                    label={"nomor telepon :"}
                                    labelStyle="text-sm font-medium"
                                    type="number"
                                    onChange={handleChange}
                                    value={payload.tlp}
                                    inputStyle=" border border-gray-300 rounded-md px-4 py-3 w-full text-sm font-medium focus:outline-none focus:border focus:border-gray-400 placeholder:text-sm placeholder:font-medium placeholder:text-gray-500"
                                  />
                                  <p className="text-red-600 font-semibold italic text-xs">
                                    {tlpError}
                                  </p>
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
                                    {loading ? "update" : "sedang update"}
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
          </section>

          <section className="flex items-center justify-center w-[98%] h-[60px] mt-[30px]">
            <div className="flex flex-row items-start justify-start p-2 w-[40px] h-[40px] ">
              <div>
                <BsCaretLeft
                  size={25}
                  className="cursor-pointer"
                  onClick={() => {
                    return setPage(() => page - 1);
                  }}
                />
              </div>
              <p className="text-[20px] font-semibold">{page}</p>
              <div>
              <BsCaretRight
                size={25}
                className="text-[20px] cursor-pointer"
                onClick={() => {
                  return setPage(() => page + 1);
                }}
              />
              </div>
              
            </div>
          </section>
        </div>
      )}
    </React.Fragment>
  );
}
