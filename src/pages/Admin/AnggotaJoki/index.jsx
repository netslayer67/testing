import { BsTrashFill } from "react-icons/bs";
import { ceoQuotes } from "../../../config/Images";

const CardJoki = ({ counter }) => {
  return (
    <div
      className={`${
        counter === 0 ? "opacity-40" : ""
      } flex items-center justify-between bg-primary px-2 rounded-lg py-1 mb-3`}
    >
      <img src={ceoQuotes} className="w-12 rounded-full h-12 shadow-lg" />
      <h1 className="text-xl font-semibold text-black">Luthfi</h1>

      <div className="flex items-center gap-x-3">
        <BsTrashFill
          className={`${
            counter > 0 ? "cursor-pointer" : ""
          } text-base text-red-500`}
        />
        <span className="w-6 h-6 flex justify-center items-center text-sm bg-black rounded-full text-white">
          {counter ?? 0}
        </span>
      </div>
    </div>
  );
};

const AnggotaJoki = () => {
  return (
    <div className="p-3 w-full">
      <div className="bg-goldPrimary rounded-lg px-3 py-5 text-white font-semibold w-[90%] mx-auto">
        Anggota Joki Cabang Mampang
      </div>
      <div className="flex justify-center">
        <div className="mt-4 w-full md:w-[30rem] px-1 py-1 max-h-[22rem] overflow-y-scroll">
          <CardJoki counter={3} />
          <CardJoki counter={3} />
          <CardJoki counter={3} />
          <CardJoki counter={0} />
          <CardJoki counter={3} />
          <CardJoki counter={2} />
        </div>
      </div>
    </div>
  );
};

export default AnggotaJoki;
