import { Button } from "@material-tailwind/react";
import Video from "../../assets/Video.mp4";
const Card = ({ title, desc, video }) => {
  return (
    <div className="bg-white rounded-3xl px-2 py-2 w-[18rem] h-[22rem] flex flex-col items-center cursor-pointer">
      <video
        autoPlay
        loop
        src={video}
        muted
        type="video/mp4"
        className="rounded-xl"
      >
        Your browser does not support HTML5 video.
      </video>
      <h5 className="md:text-xl text-lg font-semibold text-black px-1 text-center mt-2 mb-3">
        {title}
      </h5>
      <code className="font-light text-[#7D7D7D] text-sm md:text-base">
        {desc}
      </code>
    </div>
  );
};

const EducationVideo = () => {
  return (
    <div className="px-2 md:px-16 mt-24" id="seminar">
      <h1 className="text-xl  font-bold md:text-5xl mb-6">
        Edukasi yang kami sediakan
      </h1>
      <div className="flex justify-center">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-x-7 gap-y-5">
          <Card video={Video} title="Judullll" desc="Deskripsi Singkat" />
          <Card video={Video} title="Judullll" desc="Deskripsi Singkat" />
          <Card video={Video} title="Judullll" desc="Deskripsi Singkat" />
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <Button className="px-8 py-2 text-base hover:bg-blue-gray-400 border-none">
          Tampilkan Lainnya
        </Button>
      </div>
    </div>
  );
};

export default EducationVideo;
