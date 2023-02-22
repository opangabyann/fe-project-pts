import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../komponen/button";
import Input from "../komponen/input";
// import Option from "../komponen/option";

export default function Register() {
  const navigate = useNavigate()
  return (
    <React.Fragment>
      <section className="w-screen h-screen bg-black flex justify-center items-center">
        <div className="w-[95%] h-[95%] bg-white flex justify-center">
        <div className="w-[25%] h-[25%] flex flex-col mt-[35px]">
            <p className="font-semibold text-[35px] text-center">Register</p>
            <Input
              label="nama"
              placeholder={"nama"}
              inputStyle={
                "border border-[rgb(194,194,194)] rounded-md px-2 py-1"
              }
              labelStyle={"ml-[10px] font-semibold mt-[20px] mb-[5px]"}
            />
            <Input
              label="username"
              placeholder={"username"}
              inputStyle={
                "border border-[rgb(194,194,194)] rounded-md px-2 py-1"
              }
              labelStyle={"ml-[10px] font-semibold mt-[20px] mb-[5px]"}
            />
            <Input
              label="password"
              placeholder={"password"}
              inputStyle={
                "border border-[rgb(194,194,194)] rounded-md px-2 py-1"
              }
              labelStyle={"ml-[10px] font-semibold mt-[20px] mb-[5px]"}
            />
            <Input
              label="role"
              placeholder={"role"}
              inputStyle={
                "border border-[rgb(194,194,194)] rounded-md px-2 py-1"
              }
              labelStyle={"ml-[10px] font-semibold mt-[20px] mb-[5px]"}
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
              title={"register"}
              buttonStyle={
                "w-[100%] bg-black text-white p-1 rounded-md mt-[30px]"
              }
            />
            {/* <div className="flex flex-row justify-center mt-10">
              <p className="text-[rgb(194,194,194)] text-[13px]">
                belum mempunyai akun?
              </p>
              <p
                className="text-black text-[13px] ml-1 cursor-pointer"
                onClick={() => {
                  return navigate("/register");
                }}
              >
                register
              </p>
            </div> */}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
