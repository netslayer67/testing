import Aos from "aos";
import React from "react";
import { useEffect } from "react";
// @ts-ignore
import bgImage from "../../assets/img/Logo_Malahayati.svg";

const VisionMission = () => {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div className="flex md:flex-row w-full h-full  relative  flex-col items-center justify-evenly md:py-28 py-14 bg-white/10">
      <img
        src={bgImage}
        alt="bg-image"
        className="absolute z-0 object-contain opacity-20 w-full h-full"
      />

      <div className="relative">
        <h1 className="font-light text-3xl md:text-6xl text-center">
          Visi dan Misi <br />
          <span className="font-bold text-black">Malahayati Consultant</span>
        </h1>
      </div>
      <div className="relative">
        <div className="md:w-[39rem] w-full px-6 md:mt-0 mt-10">
          <ol className="border-l-2 border-[#858484]">
            <li>
              <div className="flex-start flex items-center ">
                <div className="md:ml-[10px] lg:-ml-[12px] -ml-[11px] mr-3 h-[1.3rem] w-[1.3rem] rounded-full bg-black" />
                <h4
                  data-aos="fade-left"
                  data-aos-duration="1000"
                  className="mb-1.5 md:ml-3 ml-1 text-3xl md:text-5xl  font-semibold"
                >
                  VISI
                </h4>
              </div>
              <div className="mb-6 ml-4 mt-2">
                <p className="mb-3 text-black text-lg w-full">
                  PT. Malahayati Nusantara Raya menjadi perusahaan penyedia Jasa
                  Konsultan Keuangan yang mengedepankan Transparansi, Edukasi,
                  ddan Integritas serta memberantas Hama Fintech yang
                  meresahkan, mengatasi permasalahan di Lembaga pembiayaan
                  dengan jalur diplomasi yang terukur dan terarah.
                </p>
              </div>
            </li>
            <li>
              <div className="flex-start flex items-center pt-3">
                <div className="md:ml-[10px] lg:-ml-[12px] -ml-[11px] mr-1 h-[1.3rem] w-[1.3rem] rounded-full bg-black" />
                <h4
                  className="mb-1.5 md:ml-3 ml-1 text-3xl md:text-5xl font-semibold"
                  data-aos="fade-left"
                  data-aos-duration="1000"
                >
                  MISI
                </h4>
              </div>
              <div className="mb-6 ml-4 mt-2">
                <p className="mb-3 text-black text-lg">
                  Mencerdaskan sesama dengan metode ESRF (Excelent Strategy Of
                  Reach Fintech) guna meminimalisir tingkat Fraud berbasis On
                  Line di berbagai lembaga pembiayaan.
                </p>
              </div>
              <div className="md:ml-[10px] lg:-ml-[12px] -ml-[11px] mr-3 h-[1.3rem] w-[1.3rem] rounded-full bg-black" />
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default VisionMission;
