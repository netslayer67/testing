import React, { useMemo, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
  Input,
  Stepper,
  Step,
} from "@material-tailwind/react";

const Modal = ({
  open,
  screen,
  titleHeader,
  isStepper,
  stepAmount,
  textFooter,
  onClickFooter,
  activeStep,
  setActiveStep,
  handleClose,
}) => {
  const renderStepper = useMemo(() => {
    if (!isStepper) {
      return null;
    }
    const handlePrev = () => {
      setActiveStep((prev) => prev - 1);
      // setIsFirstStep(activeStep === 1);
      // setIsLastStep(false);
    };

    const handleNext = () => {
      if (activeStep === 0) {
        // Jika langkah pertama, pindah ke langkah kedua
        setActiveStep(1);
        //   setIsFirstStep(false);
      } else {
        // Jika langkah kedua, simpan data tambahan
        // Anda dapat menambahkan logika pengolahan data di sini

        // Kembali ke langkah pertama
        setActiveStep(0);
        //   setIsFirstStep(true);
        //   setIsLastStep(false);
      }
    };
    return (
      <div className="w-full py-4 px-8">
        <Stepper
          activeStep={activeStep}
          //   isLastStep={(value) => setIsLastStep(value)}
          //   isFirstStep={(value) => setIsFirstStep(value)}
        >
          {Array.from({ length: stepAmount }).map((_, idx) => (
            <Step
              key={idx}
              className="h-4 w-4 cursor-pointer"
              onClick={() => setActiveStep(idx)}
            />
          ))}
        </Stepper>
        <div className="mt-6 flex justify-between">
          <Button onClick={handlePrev} disabled={activeStep === 0}>
            Kembali
          </Button>
          {activeStep === 1 ? ( // Tampilkan tombol "Masuk" jika aktif di langkah kedua
            <Button className="focus:shadow-none" type="submit">
              Masuk
            </Button>
          ) : (
            <Button
              className="focus:shadow-none"
              onClick={handleNext}
              disabled={activeStep === stepAmount}
            >
              Selanjutnya
            </Button>
          )}
        </div>
      </div>
    );
  }, [activeStep, isStepper, stepAmount]);

  const renderFooter = useMemo(() => {
    if (!textFooter?.length) {
      return null;
    }
    return (
      <Typography variant="small" color="gray" className="text-center mt-4">
        {textFooter[0]}
        <span
          onClick={onClickFooter}
          className="font-medium text-blue-600 cursor-pointer"
        >
          {textFooter[1]}
        </span>
      </Typography>
    );
  }, [onClickFooter, textFooter]);

  return (
    <Dialog
      open={open}
      handler={handleClose}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <DialogHeader className={`flex items-center ${titleHeader ? 'justify-between' : 'justify-end'}`}>
        {titleHeader && <div className="font-bold">{titleHeader}</div>}
        <button onClick={handleClose} className="rounded-full shadow-md p-2 w-8 h-8 text-sm">
          X
        </button>
      </DialogHeader>
      <DialogBody>
        {screen}
        {renderStepper}
        {renderFooter}
      </DialogBody>
    </Dialog>
  );
};

export default Modal;
