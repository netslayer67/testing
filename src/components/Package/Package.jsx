// import React from 'react'
import {
  Typography,
  Card,
  // CardHeader,
  Input,
  CardBody,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import "./Package.css";
import { Modal } from "../../components";
import { useCallback, useEffect, useState } from "react";
import Aos from "aos";
import { ModalPinjamanOnline } from "./components";

export default function Package() {
  const [modalIndex, setModalIndex] = useState(0);
  const listCards = [
    {
      title: "Pinjaman Online",
      desc: "With plenty of talk and listen time, voice-activated Siri access, and an available wireless charging case.",
    },
    {
      title: "Kartu Kredit",
      desc: "With plenty of talk and listen time, voice-activated Siri access, and an available wireless charging case.",
    },
    {
      title: "Personal Loan",
      desc: "With plenty of talk and listen time, voice-activated Siri access, and an available wireless charging case.",
    },
    {
      title: "Hutang Instansi",
      desc: "With plenty of talk and listen time, voice-activated Siri access, and an available wireless charging case.",
    },
    {
      title: "Hutan Corporate",
      desc: "With plenty of talk and listen time, voice-activated Siri access, and an available wireless charging case.",
    },
    {
      title: "Hutang Pribadi",
      desc: "With plenty of talk and listen time, voice-activated Siri access, and an available wireless charging case.",
    },
  ];
  const renderModalPinjamanOnline = useCallback(() => {
    if (modalIndex === 0) return null;
    let _screen;
    let title;
    if (modalIndex === 1) {
      title = "Pinjaman Online";
      _screen = (
        <ModalPinjamanOnline setModalIndex={setModalIndex} />
      );
    } else if (modalIndex === 2) {
      title = "Kartu Kredit";
      _screen = (
        <div className="flex flex-col gap-4">
          <form className="space-y-6" onSubmit={{}}>
            <Input
              type="email"
              size="regular"
              label="Email"
              // value={email}
              // onChange={handleEmailChange}
            />
            <Button
              variant="gradient"
              type="submit"
              fullWidth
              // disabled={!email}
            >
              Masuk
            </Button>
          </form>
        </div>
      );
    }

    return (
      <Modal
        screen={_screen}
        open={modalIndex !== 0}
        handleClose={() => setModalIndex(0)}
        titleHeader={title}
      />
    );
  }, [modalIndex]);

  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <>
      <div className="bg-primary p-7 mx-4 rounded-xl md:mt-2 mt-0 my-5">
        <div className="flex justify-center">
          <Typography className="mb-4 text-center md:text-5xl text-2xl font-Poppins font-semibold">
            Jasa yang kami <br /> berikan
          </Typography>
        </div>
        {/* <div className="flex md:flex-row flex-col justify-center items-center gap-x-10 gap-y-7"> */}
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 lg:gap-10">
          <div className="flex flex-col items-center justify-center">
            <iframe
              className="rounded-lg w-full h-full  "
              src="https://www.youtube.com/embed/ty_0lQgRAeU?si=8Q34Pg31ozKF1lcz"
              allowFullScreen
            ></iframe>
            <div className="text-center my-5  w-full mx-auto ">
              <h3 className="font-bold lg:text-xl text-lg">
                Jasa Layanan yang kami berikan
              </h3>
              <p className="font-light md:text-base text-sm">
                Selain melayani konsultasi Pinjol dan Perbankan kami juga
                menyediakan Layanan lainnya sesuai visi kami.
              </p>
            </div>
          </div>
          <div className="col-span-2">
            {/* <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6 gap-2"> */}
            <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-4 gap-3">
              {renderModalPinjamanOnline()}
              {listCards.map((item, idx) => (
                <div
                  key={idx}
                  className="mb-4 w-full  hoverImg  rounded-xl"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <Card className="w-full lg:w-60  hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:delay-100">
                    <CardBody>
                      <div className="mb-2 flex items-center justify-center">
                        <Typography
                          color="blue-gray"
                          className="font-Poppins font-semibold cursor-default text-center"
                        >
                          {item.title}
                        </Typography>
                      </div>
                      <Typography
                        variant="small"
                        color="gray"
                        className="font-normal opacity-75 cursor-default text-center"
                      >
                        {item.desc}
                      </Typography>
                    </CardBody>
                    <CardFooter className="pt-0">
                      <Button
                        onClick={() => setModalIndex(idx + 1)}
                        fullWidth={true}
                        className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                      >
                        Daftar
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
