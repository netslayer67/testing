import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } md:h-10 md:w-10 h-4 w-4 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}
const Faq = () => {
  const [open, setOpen] = useState(0);

  const faqData = [
    {
      header: "Jenis Layanan Apa yang menjadi Spesialisasi Anda ?",
      body: "Semua jenis yang berkaitan dengan perbankan dan Fintech",
    },
    {
      header: "Seperti apa sistem kerja dan layanan yang anda sediakan ? ",
      body: "Memberikan edukasi melalui konsultasi, kemudian membantu dalam penyelesaian permasalahan Perbankan & Fintech secara profesional.",
    },
    {
      header: "Apakah ada pembayaran di awal ?",
      body: "Tidak ada biaya diawal atau Down Payment untuk layanan Penyelenggara dalam penggarapan aplikasi Fintech (Pinjol) & nasabah wajib bertemu Tim pada saat pengerjaan .",
    },
  ];

  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  return (
    <div className="bg-primary px-2 md:px-16 mt-10">
      <h1 className="text-xl font-bold md:text-5xl mb-6">F.A.Q</h1>
      <div>
        {faqData?.map((item, idx) => {
          return (
            <Accordion
              key={idx}
              open={open === idx + 1}
              icon={<Icon id={idx + 1} open={open} />}
              className=" px-3 py-2 rounded-lg bg-gradient-to-r from-goldPrimary via-[#fde68a] to-goldPrimary mb-5"
            >
              <AccordionHeader
                onClick={() => handleOpen(idx + 1)}
                className={`text-lg md:text-3xl font-normal transition-all duration-300 hover:text-white ${
                  open === idx + 1 ? "text-white" : "text-black"
                }`}
              >
                <AiOutlineQuestionCircle
                  className={`text-[3rem] md:mr-0 mr-3 transition-all duration-300 ${
                    open === idx + 1 ? "text-white" : "text-black"
                  }`}
                />
                {item.header}
              </AccordionHeader>
              <AccordionBody>
                <p
                  className={`md:text-xl text-base transition-all duration-300 ${
                    open === idx + 1 ? "text-white" : "text-black"
                  }`}
                >
                  {item.body}
                </p>
              </AccordionBody>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};

export default Faq;
