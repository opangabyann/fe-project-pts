import React from "react";
import { useParams } from "react-router-dom";
import { GetDetailTransaksi } from "../../API/detailTransaksi";

export default function DetailT() {
  const [detailTransaksi, setDetailTransaksi] = React.useState([]);
  const { id } = useParams();

  const getDetailTransaksi = async (id) => {
    try {
      const response = await GetDetailTransaksi(id);
      console.log(response);
      setDetailTransaksi(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    getDetailTransaksi(id);
  }, []);
  return (
    <React.Fragment>
      <div className="w-full h-full flex flex-col bg-white ">
        <p className="text-[25px] font-bold p-2 ml-4">Detail Transaksi</p>
      </div>
    </React.Fragment>
  );
}
