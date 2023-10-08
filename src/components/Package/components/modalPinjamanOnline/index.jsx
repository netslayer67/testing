import { Button, Input, Option, Select } from "@material-tailwind/react";
import React, { useState } from "react";
import { toastError, toastSuccess } from "../../../toast";
import { API } from "../../../../config/API";

const ModalPinjamanOnline = ({ setModalIndex }) => {
  const [optionRadio, setOptionRadio] = useState(null);
  const [inputFailedApps, setInputFailedApps] = useState("");
  const [inputRejectedApps, setInputRejectedApps] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    phoneBrand: "",
    phoneRam: "",
    simCardStatus: "",
    recommendation: {},
    maintainedApps: [],
    paymentFailedApps: [],
    rejectedApps: [],
  });
  const [inputMaintainedApps, setInputMaintainedApps] = useState([
    { name: "", totalLimit: 0, dueDate: "", remainingInstallment: 0 },
  ]);

  const handleChangeForm = (e, type) => {
    if (type === "text") {
      const { name, value } = e.target;
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        simCardStatus: e,
      }));
    }
  };

  const handleRecommendation = (value) => {
    if (optionRadio === "PERSON") {
      setForm((prev) => ({
        ...prev,
        recommendation: {
          person: value,
        },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        recommendation: {
          socialMedia: value,
        },
      }));
    }
  };

  const addInputMaintained = () => {
    setInputMaintainedApps([
      ...inputMaintainedApps,
      { name: "", totalLimit: 0, dueDate: "", remainingInstallment: 0 },
    ]);
  };

  const removeInputMaintained = (index) => {
    const dupState = [...inputMaintainedApps];
    const filterDup = dupState.filter((_, idx) => idx !== index);
    setInputMaintainedApps(filterDup);
  };

  const handleChangeMaintainedApps = (idx, e) => {
    const { name, value } = e.target;
    const dupState = [...inputMaintainedApps];
    dupState[idx][name] =
      name === "totalLimit" || name === "remainingInstallment"
        ? Number(value)
        : value;
    setInputMaintainedApps(dupState);
  };

  const handleInputArrayString = (type) => {
    if (type === "paymentFailedApps") {
      setForm((prev) => ({
        ...prev,
        paymentFailedApps: [...prev[type], inputFailedApps],
      }));
      setInputFailedApps("");
    } else {
      setForm((prev) => ({
        ...prev,
        rejectedApps: [...prev[type], inputRejectedApps],
      }));
      setInputRejectedApps("");
    }
  };

  const removeBlockText = (idx, type) => {
    if (type === "paymentFailedApps") {
      let dupState = { ...form };
      const deleteState = dupState[type].filter((_, index) => index !== idx);
      dupState = {
        ...form,
        [type]: deleteState,
      };
      setForm(dupState);
    } else {
      let dupState = { ...form };
      const deleteState = dupState[type].filter((_, index) => index !== idx);
      dupState = {
        ...form,
        [type]: deleteState,
      };
      setForm(dupState);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const payload = {
        ...form,
        maintainedApps: inputMaintainedApps,
      };
      await API.post("/fap/create-fap", payload);
      toastSuccess("Berhasil Terdaftar");
      setModalIndex(0);
      setForm({
        phoneBrand: "",
        phoneRam: "",
        simCardStatus: "",
        recommendation: {},
        maintainedApps: [],
        paymentFailedApps: [],
        rejectedApps: [],
      });
      setInputMaintainedApps([
        { name: "", totalLimit: 0, dueDate: "", remainingInstallment: 0 },
      ]);
    } catch (error) {
      setModalIndex(0);
      toastError("Gagal mendaftar, wajib login terlebih dahulu dan mengisi data secara lengkap!");
    } finally {
      setIsLoading(false);
    }
  };

  const validateDisabled = (form) => {
    const {
      phoneBrand,
      phoneRam,
      simCardStatus,
      paymentFailedApps,
      rejectedApps,
    } = form;
    return (
      !phoneBrand ||
      !phoneRam ||
      !simCardStatus ||
      paymentFailedApps.length === 0 ||
      rejectedApps.length === 0
    );
  };

  return (
    <div className="flex flex-col gap-4 overflow-y-scroll">
      <form className="space-y-6 max-h-[500px] pb-10">
        <Input
          type="text"
          size="regular"
          label="Jenis Handphone"
          name="phoneBrand"
          value={form.phoneBrand}
          onChange={(e) => handleChangeForm(e, "text")}
        />
        <Input
          type="text"
          size="regular"
          label="RAM Handphone"
          name="phoneRam"
          value={form.phoneRam}
          onChange={(e) => handleChangeForm(e, "text")}
        />
        <Select
          label="Status Sim Card"
          onChange={(e) => handleChangeForm(e, "select")}
          name="simCardStatus"
        >
          <Option value="MASIH ADA">MASIH ADA</Option>
          <Option value="SUDAH TIDAK ADA">SUDAH TIDAK ADA</Option>
        </Select>

        <h4>Rekomendasi dari</h4>
        <div className="flex gap-x-3">
          <Input
            type="radio"
            label="Teman/Saudara"
            name="recommendation"
            size="sm"
            value="PERSON"
            onChange={(e) => setOptionRadio(e.target.value)}
          />
          <Input
            type="radio"
            label="Sosial Media"
            name="recommendation"
            size="sm"
            value="SOSIAL MEDIA"
            onChange={(e) => setOptionRadio(e.target.value)}
          />
        </div>

        <Input
          type="text"
          size="regular"
          label="Sebutkan rekomendasi"
          disabled={!optionRadio}
          onChange={(e) => handleRecommendation(e.target.value)}
        />

        <h3>Aplikasi Rawatan</h3>
        {inputMaintainedApps.map((item, idx) => {
          return (
            <div key={idx + "maintainedApp"} className="flex flex-col gap-6">
              <Input
                type="text"
                size="regular"
                label="Nama"
                name="name"
                value={item.name}
                onChange={(e) => handleChangeMaintainedApps(idx, e)}
              />
              <Input
                type="number"
                size="regular"
                label="Total Limit"
                name="totalLimit"
                value={item.totalLimit > 0 ? item.totalLimit : ''}
                onChange={(e) => handleChangeMaintainedApps(idx, e)}
              />
              <Input
                type="date"
                size="regular"
                label="Jatuh Tempo"
                name="dueDate"
                value={item.dueDate}
                onChange={(e) => handleChangeMaintainedApps(idx, e)}
              />
              <Input
                type="number"
                size="regular"
                label="Sisa Angsuran"
                name="remainingInstallment"
                value={item.remainingInstallment}
                onChange={(e) => handleChangeMaintainedApps(idx, e)}
              />
              <div>
                <Button
                  size="md"
                  color="red"
                  disabled={inputMaintainedApps.length < 2}
                  onClick={() => removeInputMaintained(idx)}
                >
                  X
                </Button>
              </div>
            </div>
          );
        })}
        <div className="flex justify-end">
          <Button
            color="green"
            size="md"
            className="px-10 text-2xl py-0 mr-2"
            onClick={addInputMaintained}
          >
            +
          </Button>
        </div>

        <div className="flex gap-x-2">
          <Input
            type="text"
            size="regular"
            label="Aplikasi Gagal bayar"
            name="paymentFailedApps"
            onChange={(e) => setInputFailedApps(e.target.value)}
            value={inputFailedApps}
          />
          <Button
            size="sm"
            className="text-xs"
            onClick={() => handleInputArrayString("paymentFailedApps")}
            disabled={!inputFailedApps}
          >
            Tambahkan
          </Button>
        </div>
        <div className="flex gap-3 w-full flex-wrap">
          {form.paymentFailedApps?.map((item, idx) => {
            return (
              <div className="flex items-center justify-between " key={idx}>
                <div className="h-10 rounded-md bg-gray-400 py-1 flex items-center px-4">
                  {item}
                </div>
                <span
                  className="font-bold text-red-400 h-7 px-1 flex items-center bg-gray-400 cursor-pointer"
                  onClick={() => removeBlockText(idx, "paymentFailedApps")}
                >
                  X
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex gap-x-2 w-full">
          <Input
            type="text"
            size="regular"
            label="Aplikasi Tolakan"
            name="rejectedApps"
            onChange={(e) => setInputRejectedApps(e.target.value)}
            value={inputRejectedApps}
          />
          <Button
            size="sm"
            className="text-xs"
            onClick={() => handleInputArrayString("rejectedApps")}
            disabled={!inputRejectedApps}
          >
            Tambahkan
          </Button>
        </div>
        <div className="flex gap-3 flex-wrap w-full">
          {form.rejectedApps?.map((item, idx) => {
            return (
              <div className="flex items-center justify-between " key={idx}>
                <div className="h-10 rounded-md bg-gray-400 py-1 flex items-center px-4">
                  {item}
                </div>
                <span
                  className="font-bold text-red-400 h-7 px-1 flex items-center bg-gray-400 cursor-pointer"
                  onClick={() => removeBlockText(idx, "rejectedApps")}
                >
                  X
                </span>
              </div>
            );
          })}
        </div>

        <Button
          variant="gradient"
          type="submit"
          fullWidth
          disabled={isLoading || validateDisabled(form)}
          onClick={handleSubmit}
        >
          {isLoading ? "Sedang diproses..." : "Daftar"}
        </Button>
      </form>
    </div>
  );
};

export default ModalPinjamanOnline;
