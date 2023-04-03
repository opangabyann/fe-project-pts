import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../komponen/button";
import Input from "../../komponen/input";
import { useDispatch } from "react-redux";
import { authLogin } from "../../redux/action/authaction";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

export default function Login() {
  // const dispatch = useDispatch();
  const[loading,setLoading] = React.useState(true)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const role = useSelector((state) => state.authProses.role);

  const [payload, setPayload] = React.useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    // console.log("jalan")
    setPayload(() => {
      return {
        ...payload,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleSubmit = async(e)=> {
    e.preventDefault();

    try {
      setLoading(false)
       const response = await dispatch(authLogin(payload));
      // console.log("response =>", response.response.data.status);
      const role = response.user.role
      setLoading(true)
      // console.log(role)

      if (response?.response?.data.status === "Fail") {
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
          icon: "error",
          title: "email dan password tidak cocok",
        });
      }else{
      }
      if (response?.status === 'Success'){
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
          title: "berhasil login",
        });
        navigate(`/home/dashboard`)
  
      }
      
    } catch (error) {
      
    }finally{
      setLoading(true)
    }
  }
  return (
    <React.Fragment>
      <section className="w-screen h-screen bg-[#CADF58] flex justify-center items-center">
        <div className="w-[95%] h-[95%] bg-white flex justify-center rounded-md">
          <div className="w-[25%] h-[25%] flex flex-col mt-[35px]">
            <p className="font-semibold text-[35px] text-center text-[#4B4F39]">
              Login
            </p>
            <form onSubmit={handleSubmit}>
              <Input
                name="username"
                value={payload.username}
                onChange={handleChange}
                label="Username"
                placeholder={"username"}
                inputStyle={
                  "border border-[rgb(194,194,194)] font-medium rounded-md px-2 py-1 focus:border focus:border-[#CADF58] focus:outline-none focus:border-2 "
                }
                labelStyle={
                  "text-center text-[#4B4F39] font-semibold mt-[40px] mb-[5px] "
                }
              />
              <Input
                name="password"
                value={payload.password}
                onChange={handleChange}
                type = "password"
                label="password"
                placeholder={"password"}
                inputStyle={
                  "border border-[rgb(194,194,194)] font-medium rounded-md px-2 py-1 focus:border focus:border-[#CADF58] focus:outline-none focus:border-2"
                }
                labelStyle={
                  "text-center text-[#4B4F39] font-semibold mt-[20px] mb-[5px]"
                }
              />
              <p
                className="text-[rgb(194,194,194)] text-[13px] flex justify-end cursor-pointer"
                onClick={() => {
                  return navigate("/reset-password");
                }}
              >
                lupa password?
              </p>
              <Button
                title={loading ? "login" : "sedang login..."}
                color ={"#CADF58"}
                // onClick={() => {
                //   return navigate("/home");
                // }}
                buttonStyle={
                  "w-[100%] bg-[#CADF58] text-[#4B4F39] font-semibold p-1 rounded-md mt-[30px] hover:border hover:border-[#4B4F39]"
                }
              />
            </form>
            <div className="flex flex-row justify-center mt-10">
              <p className="text-[rgb(194,194,194)] text-[13px]">
                belum mempunyai akun?
              </p>
              <p
                className="text-[#4B4F39] text-[13px] ml-1 cursor-pointer"
                onClick={() => {
                  return navigate("/register");
                }}
              >
                register
              </p>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
