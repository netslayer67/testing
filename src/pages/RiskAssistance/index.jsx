// import { skpp } from "../../config/images";
import skpp from '../../assets/img/SKPP.png';

const RiskAssistance = () => {
  return (
    <div
      className="flex md:flex-row flex-col items-center px-4 mt-20 "
      id="SKPP"
    >
      <div className="flex-1 md:pr-10 pr-0">
        <h1 className="md:text-5xl text-2xl font-extrabold mb-6 text-center md:text-left">
          PENDAMPINGAN RESIKO
        </h1>
        <p className="font-light text-base md:text-xl pr-0 text-justify">
          Pendampingan resiko yang berkelanjutan dengan memberikan
          masukan-masukan hukum, mendamping pemberi kuasa, menghadap, berbicara
          dengan penjabat / aparat bersangkutan, pemerintahan maupun swasta,
          melaporkan ke pihak berwajib, mengajukan upaya hukum dan melakukan
          tindakan-tindakan lainnya dalam rangka memperjuangkan kepentingan dan
          hak-hak pemberi kuasa, yang dibenarkan menurut ketentuan hukum yang
          berlaku. Sehingga nasabah mendapatkan bantuan dan pendampingan
          terhadap permasalahan yang sedang dialami.
        </p>
      </div>
      <div className=" md:mt-0 mt-14">
        <img
          src={skpp}
          className="h-[450px] w-[300px] mx-auto rounded-md shadow-lg"
        />
        <h4 className="text-center font-semibold text-xl mt-3">Contoh SKPP</h4>
        <p className="text-center">(Surat Kuasa Pengalihan Penagihan)</p>
      </div>
    </div>
  );
};

export default RiskAssistance;
