import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";

import ResetPw from "./page/restPw";
import Dashboard from "./page/admin/dashboard";
import Home from "./page/home";
import Member from "./page/admin/member";
import Outlets from "./page/admin/outlet";
import Paket from "./page/admin/paket";
import Login from "./page/auth/login";
import Register from "./page/auth/register";
import ProtectRoutes from "./routers/protectedRoute";
import User from "./page/admin/users";
import Transaksi from "./page/admin/transaksi";
import { useSelector } from "react-redux";
import Laporan from "./page/admin/laporan";
import DetailT from "./page/admin/detailTransaksi";
export default function App() {
  const role = useSelector((state) => state.authProses.role);

  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPw />} />
        <Route
          path={`home/`}
          element={
            <ProtectRoutes>
              <Home />
            </ProtectRoutes>
          }
        >
          <Route
            path="user"
            element={
              <ProtectRoutes>
                <User />
              </ProtectRoutes>
            }
          />
          <Route
            path="dashboard"
            element={
              <ProtectRoutes>
                <Dashboard />
              </ProtectRoutes>
            }
          />
          <Route
            path="member"
            element={
              <ProtectRoutes>
                <Member />
              </ProtectRoutes>
            }
          />
          <Route
            path="outlet"
            element={
              <ProtectRoutes>
                <Outlets />
              </ProtectRoutes>
            }
          />
          <Route
            path="paket"
            element={
              <ProtectRoutes>
                <Paket />
              </ProtectRoutes>
            }
          />
          <Route
            path="transaksi"
            element={
              <ProtectRoutes>
                <Transaksi />
              </ProtectRoutes>
            }
          >
            <Route
            path="detail/:id"
            element={
              <ProtectRoutes>
                <DetailT />
              </ProtectRoutes>
            }
          />
          </Route>
          <Route
            path="laporan"
            element={
              <ProtectRoutes>
                <Laporan />
              </ProtectRoutes>
            }
          />
        </Route>
        <Route
            path="detail/:id"
            element={
              <ProtectRoutes>
                <DetailT />
              </ProtectRoutes>
            }
          />
        <Route path="*" element={<Navigate to={"/"} replace />} />
      </Routes>
    </React.Fragment>
  );
}
