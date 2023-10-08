import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
// @ts-ignore
import ImageLogo from "../../assets/img/Logo_Malahayati.svg";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartSection = () => {
  const data = {
    datasets: [
      {
        // label: "# of Votes",
        data: [20, 70, 1, 9],
        backgroundColor: ["#ca8a04", "#ef4444", "#22c55e", "#93c5fd"],
        borderColor: ["#ca8a04", "#ef4444", "#22c55e", "#93c5fd"],
        // borderWidth: 1,
      },
    ],
    labels: false,
  };
  return (
    <div className="w-full h-full bg-black/75  lg:py-20 py-10 px-5 overflow-hidden ">
      <div className="lg:grid lg:grid-cols-3 lg:gap-3 flex flex-col gap-4  justify-center">
        <div className="bg-white rounded-lg lg:col-span-1 flex flex-col w-full items-center px-3 lg:px-0  ">
          <div className="w-52 h-52">
            <Pie
              // @ts-ignore
              data={data}
              className="cursor-pointer"
            />
          </div>
          <div className="w-full h-full  mx-auto flex flex-col items-center gap-2 py-5 lg:px-3 px-0 ">
            <div className="flex md:justify-center  w-full  items-center  lg:gap-3  gap-1">
              <div className="w-3 lg:w-5 lg:h-5 h-3 bg-red-500 rounded-full" />
              <p className="lg:text-xl text-base font-bold text-red-500">
                70 % :
              </p>
              <span className="text-sm lg:text-base  lg:w-64 w-60  ">
                Jasa Konsultan Bodong
              </span>
            </div>
            <div className="flex md:justify-center lg:justify-center  w-full items-center lg:gap-3  gap-1">
              <div className="lg:w-5 w-3  lg:h-5 h-3 bg-[#ca8a04] rounded-full" />
              <p className="lg:text-xl text-base font-bold text-[#ca8a04]">
                20 % :
              </p>
              <span className="lg:text-base text-sm  lg:w-64 w-60 ">
                Jasa Konsultan Real Tanpa Legalitas
              </span>
            </div>
            <div className="flex md:justify-center lg:justify-center  w-full  items-center lg:gap-3  gap-1">
              <div className="lg:w-5 w-3 lg:h-5 h-3  bg-[#93c5fd] rounded-full" />
              <p className="lg:text-xl text-base font-bold text-[#93c5fd]">
                9 % :
              </p>
              <span className="lg:text-base text-sm lg:w-64 w-60  ">
                Jasa Konsultan Profesional dan Memiliki Legalitas
              </span>
            </div>
            <div className="flex md:justify-center lg:justify-center  w-full items-center lg:gap-3  gap-1">
              <div className="lg:w-5 w-3  lg:h-5 h-3 bg-[#22c55e] rounded-full" />
              <p className="lg:text-xl text-base font-bold text-[#22c55e]">
                1 % :
              </p>
              <span className="lg:text-base text-sm  lg:w-64 w-60 ">
                Jasa Konsultan Profesional dan Memiliki Legalitas dengan basic
                Perbankan dan Fintech
              </span>
            </div>

            <div className="w-full text-center ">
              <p className="text-base lg:text-lg">
                Tentang Dunia Konsultan Pinjol: <br /> Menelusuri Kualitas yang
                Sejati
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-2 w-full h-full flex flex-col  justify-between gap-5 lg:gap-0 md:gap-5">
          <div className="w-full">
            <p className="text-white text-sm lg:text-base lg:w-[60%] w-full font-Poppins">
              Dalam jagat konsultan dan jasa joki pinjol, kami percaya bahwa
              pemahaman adalah kunci. Dari berbagai pilihan yang tersedia, kami
              menemukan bahwa{" "}
              <span className="text-goldPrimary font-semibold">
                dari 100% layanan yang ada
              </span>
              , sebagian besar mungkin tidak sesuai dengan harapan Anda. Namun,
              ini tidak berarti semua konsultan atau joki pinjol harus dianggap
              sama. Dari 100% layanan tersebut,{" "}
              <span className="text-green-500 font-semibold">
                terdapat 30% layanan
              </span>{" "}
              yang sesungguhnya bisa diandalkan dan{" "}
              <span className="text-red-500 font-semibold">
                70% lainnya tidak dapat diandalkan
              </span>
              .
            </p>
          </div>
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-0 justify-between items-center  w-full ">
            <p className="text-white text-sm lg:w-[60%] lg:translate-x-24 translate-x-0  w-full lg:text-base font-Poppins">
              Dari 30% layanan yang dapat diandalkan,{" "}
              <span className="text-blue-400 font-bold">hanya 10%</span> yang
              benar-benar memiliki legalitas yang sesuai. Dan ketika kita
              membahas legalitas, hanya PT. Malahayati Nusantara Raya yang dapat
              membanggakan diri sebagai satu-satunya konsultan dengan status PT
              (Perseroan Terbatas). Kami berkomitmen untuk memberikan panduan
              yang jelas dan jujur kepada Anda, para nasabah kami, agar Anda
              dapat membuat keputusan yang tepat dalam mengelola keuangan Anda.
              Tetaplah bijak dalam memilih, karena di dunia konsultan pinjol,
              kami percaya bahwa pengetahuan adalah kekuatan.
            </p>
            <div className="lg:w-52 lg:h-52 w-full h-full">
              <img
                src={ImageLogo}
                alt="logo-image"
                className="object-contain w-full h-full"
              />
            </div>
          </div>
        </div>
        {/* <div className="">image</div> */}
      </div>
    </div>
  );
};

export default ChartSection;
