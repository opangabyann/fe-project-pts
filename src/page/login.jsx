import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../komponen/button";
import Input from "../komponen/input";

export default function Login() {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <section className="w-screen h-screen bg-[#CADF58] flex justify-center items-center">
        <div className="w-[95%] h-[95%] bg-white flex justify-center rounded-md">
          <div className="w-[25%] h-[25%] flex flex-col mt-[35px]">
            <p className="font-semibold text-[35px] text-center text-[#4B4F39]">Login</p>
            <Input
              label="Alamat email"
              placeholder={"email"}
              inputStyle={
                "border border-[rgb(194,194,194)] rounded-md px-2 py-1"
              }
              labelStyle={"text-center text-[#4B4F39] font-semibold mt-[40px] mb-[5px]"}
            />
            <Input
              label="password"
              placeholder={"password"}
              inputStyle={
                "border border-[rgb(194,194,194)] rounded-md px-2 py-1"
              }
              labelStyle={"text-center text-[#4B4F39] font-semibold mt-[20px] mb-[5px]"}
            />
            <p
              className="text-[rgb(194,194,194)] text-[13px] flex justify-end cursor-pointer"
              onClick={() => {
                return navigate ("/reset-password");
              }}
            >
              lupa password?
            </p>
            <Button
              title={"login"}
              onClick = {() => {
                return navigate ('/home')
              }}
              buttonStyle={
                "w-[100%] bg-[#CADF58] text-[#4B4F39] font-semibold p-1 rounded-md mt-[30px]"
              }
            />
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
