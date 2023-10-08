import Aos from "aos";
import { useEffect } from "react";
import CountUp from "react-countup";
import { FaUsers } from "react-icons/fa";
import { HiMiniHandThumbUp } from "react-icons/hi2";

const CounterSection = () => {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <section className="px-5 mb-10">
      <div className="py-4 bg-white rounded-lg border-2 border-black flex">
        <div className=" flex-1 flex flex-col justify-center items-center">
          <div
            data-aos="fade-right"
            data-aos-duration="1000"
            className="md:w-20 w-12 h-12 md:h-20 rounded-full flex justify-center items-center p-2 bg-black mb-3"
          >
            <FaUsers className="text-white md:text-5xl text-xl" />
          </div>
          <div className="flex items-center justify-center gap-x-2">
            <CountUp
              end={5000}
              duration={5}
              className="md:text-5xl text-2xl font-semibold"
            />
            <span className="md:text-6xl text-xl font-bold">+</span>
          </div>
          <span className="font-light md:text-sm text-xs md:text-left text-center">
            Nasabah yang menggunakan Jasa kami
          </span>
        </div>
        <div className=" flex-1 flex flex-col justify-center items-center">
          <div
            data-aos="fade-left"
            data-aos-duration="1000"
            className="md:w-20 w-12 h-12 md:h-20 rounded-full flex justify-center items-center p-2 bg-black mb-3"
          >
            <HiMiniHandThumbUp className="text-white md:text-5xl text-xl" />
          </div>
          <div className="flex items-center justify-center gap-x-2">
            <CountUp
              end={97}
              duration={8}
              className="md:text-5xl text-2xl font-semibold"
            />
            <span className="md:text-6xl text-xl font-bold">%</span>
          </div>
          <span className="font-light md:text-sm text-xs md:text-left text-center">
            Nasabah kami merekomendasikan kami
          </span>
        </div>
      </div>
    </section>
  );
};

export default CounterSection;
