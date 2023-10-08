import { Input } from "@material-tailwind/react";

const HeaderCardContainer = ({ title, handleSearch }) => {
  return (
    <div className="bg-goldPrimary rounded-lg px-3 py-5 flex items-center justify-between w-[90%] mx-auto">
      <h1 className="text-blackPrimary font-semibold">{title}</h1>
      {handleSearch && (
        <div className="">
          <Input
            type="text"
            className="border-black bg-white"
            placeholder="Cari.."
            color="black"
            onChange={(e) => handleSearch(e)}
          />
        </div>
      )}
    </div>
  );
};

export default HeaderCardContainer;
