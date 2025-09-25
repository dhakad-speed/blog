import React, { useEffect, useState } from "react";
import "./App.css";
import authService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { logOut, login } from "./store/authSlice";
import component from "./components/component";
import { Outlet } from "react-router-dom";

export default function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logOut());
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-[#f4f4f7]">
      <div className="w-full block">
        <component.Header />
        <component.Container>
          <main className="min-h-screen">
            <component.SignupComponent />
          </main>
        </component.Container>
        <component.Footer />
      </div>
    </div>
  ) : null;
}
