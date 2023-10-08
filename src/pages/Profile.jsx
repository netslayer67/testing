// import React from 'react'
import ProfileNav from "../components/ProfileNav";
import { FaUserLarge, FaCheck } from "react-icons/fa6";
import { IconButton } from "@material-tailwind/react";
import Auth from "../components/Auth";
import Tab from "../components/Tab";
import { useSelector } from "react-redux";

export default function Profile() {
  const {
    user: dataUser,
    isLoggedIn,
  } = useSelector((state) => state.auth)
  return (
    <>
      <div className="min-h-screen bg-blue-gray-600">
        <ProfileNav />
        <div className="flex justify-center mt-20 ">
          <IconButton
            size="lg"
            className="rounded-full bg-[#88a8b4c5] p-9 hover:bg-cyan-700 transition duration-150 ease-in-out"
          >
            <FaUserLarge className="text-2xl" />
          </IconButton>
        </div>
        <Auth />

        <div className="max-w-screen-md mx-auto px-4 py-8 flex justify-center">
          <ul className="text-cyan-200 space-y-4">
            <li className="text-center">
              Dapatkan Promo Menarik Untuk Pembelian Pertama:
            </li>
            <li>
              <ul className="list-inside list-disc ml-4 space-y-1">
                <li className="flex items-center">
                  <FaCheck className="text-xs mr-2" />
                  Chat langsung dengan admin.
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-xs mr-2" />
                  Jadilah yang pertama mendapat promo menarik.
                </li>
                <li className="flex items-center">
                  <FaCheck className="text-xs mr-2" />
                  Pengiriman aman dan terjamin.
                </li>
              </ul>
            </li>
          </ul>
        </div>
        {isLoggedIn && dataUser?.role?.name === "User"  ? (
          <Tab />
        ) : null}
      </div>
    </>
  );
}
