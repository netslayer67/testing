// import React from 'react';
import { Typography, Button } from "@material-tailwind/react";

export default function Dashboard() {
  return (
    <>
      <div className="mt-10 mb-2 px-5" id="tetangKami">
        <div
          data-aos="zoom-in"
          data-aos-duration="1000"
          className="py-16 bg-white rounded-lg border-2 border-black"
        >
          <div className="text-center">
            <Typography
              variant="h1"
              className="font-Poppins mb-4 font-light md:text-4xl text-xl"
            >
              Selamat Datang di{" "}
              <span className="font-extrabold">Malahayati Consultant</span>
            </Typography>
          </div>
          <div className="text-center">
            <Typography
              variant="h5"
              className="font-Poppins md:my-8 md:mb-0 mb-10 md:text-2xl text-base"
            >
              Selesaikan masalah Pinjol dan Perbankan anda!!!{" "}
              <span className="text-gray-200 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.7)]">
                Dengan cara yang
              </span>{" "}
              <span
                className="text-[#DCBA39] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.7)]"
                style={{
                  textDecorationLine: "underline",
                  textUnderlineOffset: "0.7rem",
                }}
              >
                Menguntungkan
              </span>
            </Typography>
          </div>
          <div className="text-center flex justify-center md:mt-10">
            <Typography
              variant="p"
              className="md:text-xl font-Poppins text-black text-justify md:text-center md:px-3 px-4"
            >
              PT. Malahayati Nusantara Raya hadir untuk membantu Anda terutama
              menyelesaikan permasalahan pinjol dan perbankan secara aman.
              Jangan biarkan masalah pinjol dan perbankan mengganggu hidup Anda,
              segera hubungi PT. Malahayati Nusantara Raya untuk mendapatkan
              solusi terbaik.
            </Typography>
          </div>
          <div className="mt-7 flex justify-center">
            <div className="border-none">
              <Button className="px-5 text-xs font-normal hover:bg-blue-gray-400 border-none">
                Segera Ajukan Bantuan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
