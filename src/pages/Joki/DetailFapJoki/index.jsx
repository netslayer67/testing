import React, { useEffect, useState } from "react";
import { FaDumpster, FaRegCircleUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getDestBranch,
  getJoki,
} from "../../../redux/reducers/nasabahAdminReducer";
import getStatusColor from "../../../utils/getStatusColor";
import {
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Input,
  List,
  ListItem,
  Option,
  Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { Table, toastError, toastSuccess } from "../../../components";
import formatDate from "../../../utils/formatDate";
import formatNumber from "../../../utils/formatNumber";
import { AiOutlinePlus } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import {
  RESP_FAP_ACT,
  MODAL_NAME,
  FAP_APPR_STAT,
} from "../../../utils/constant";
import { API } from "../../../config/API";
import { getDetailJokiFap } from "../../../redux/reducers/jokiReducer";

const DetailFapJoki = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    dataDetail: fap,
    status: statusRedux,
    branches,
    joki,
  } = useSelector((state) => state.joki);
  const { user } = useSelector((state) => state.auth);

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setErrorMode({ destBranch: false, joki: false });
    setDestBranch(null);
    setJokiPayload(null);
    setShowModal(null);
  };

  const [destBranch, setDestBranch] = useState(null);
  const [jokiPayload, setJokiPayload] = useState(null);
  const [fetching, setFetching] = useState(true);

  const [Laporan, setLaporan] = useState({
    firstReport: "0",
    secondReport: "0",
  });

  const [errorMode, setErrorMode] = useState({
    joki: false,
    destBranch: false,
  });

  const [inputPenggarapan, setInputPenggarapan] = useState([
    { name: "", revenue: 0, desc: "" },
  ]);

  const handleInputChange = (e, index, field) => {
    const updatedInputs = [...inputPenggarapan];
    updatedInputs[index][field] =
      field === "revenue" ? Number(e.target.value) : e.target.value;
    setInputPenggarapan(updatedInputs);
  };

  const handleAddInput = () => {
    setInputPenggarapan([
      ...inputPenggarapan,
      { name: "", revenue: 0, desc: "" },
    ]);
  };

  const handleRemoveInput = (index) => {
    const updatedInputs = [...inputPenggarapan];
    updatedInputs.splice(index, 1);
    setInputPenggarapan(updatedInputs);
  };

  const handleApprove = async (id) => {
    try {
      await API.patch(`/joki/${id}/joki-appr`);
      toastSuccess("Berhasil Update");
      navigate("/dashboard/joki/data-tugas");
    } catch (error) {
      toastError("Gagal Update");
    }
  };

  const handleDone = async (id, dataInput) => {
    try {
      const payload = {
        user: id,
        progressApps: dataInput,
      };
      await API.post(`/joki/${fap?.data?._id}/send-fap-rep`, payload);
      toastSuccess("Berhasil Update");
      navigate("/dashboard/joki/data-tugas");
    } catch (error) {
      toastError("Gagal Update");
    }
  };

  // const handleRespondFap = (action, id) => {
  //   let payload = null;
  //   if (action === RESP_FAP_ACT.DELEGATE) {
  //     if (destBranch === null) {
  //       setErrorMode({ ...errorMode, destBranch: true });
  //     } else {
  //       payload = { action: RESP_FAP_ACT.DELEGATE, destBranch, id };
  //       dispatch(respondFap(payload));
  //       setShowModal(null);
  //       setFetching(true);
  //       return;
  //     }
  //   } else if (action === RESP_FAP_ACT.APPROVAL) {
  //     if (jokiPayload === null) {
  //       setErrorMode({ ...errorMode, joki: true });
  //     } else {
  //       payload = {
  //         action: RESP_FAP_ACT.APPROVAL,
  //         joki: jokiPayload,
  //         status: FAP_APPR_STAT.DISETUJUI,
  //         id,
  //       };
  //       dispatch(respondFap(payload));
  //       setShowModal(null);
  //       setFetching(true);

  //       return;
  //     }
  //   } else if (action === RESP_FAP_ACT.REJECTION) {
  //     payload = {
  //       action,
  //       status: FAP_APPR_STAT.DITOLAK,
  //       id,
  //     };
  //     dispatch(respondFap(payload));
  //     setShowModal(null);
  //     setFetching(true);

  //     return;
  //   } else {
  //     setShowModal(null);
  //   }
  // };

  const colTblMaintained = [
    {
      Header: "Nama",
      accessor: "name",
      Cell: ({ value }) => {
        return (
          <div className="font-medium text-white flex items-center gap-x-2 text-base">
            {value}
          </div>
        );
      },
    },
    {
      Header: "Total Limit",
      accessor: "totalLimit",
      Cell: ({ value }) => {
        return (
          <div className="font-medium text-white flex items-center gap-x-2 text-base">
            {formatNumber.toRupiah(value)}
          </div>
        );
      },
    },
    {
      Header: "Tanggal Tempo",
      accessor: "dueDate",
      Cell: ({ value }) => {
        return (
          <div className="font-medium text-white flex items-center gap-x-2 text-base">
            {formatDate.toLocal(value)}
          </div>
        );
      },
    },
    {
      Header: "Sisa Angsuran",
      accessor: "remainingInstallment",
      Cell: ({ value }) => {
        return (
          <div className="font-medium text-white flex items-center gap-x-2 text-base">
            {formatNumber.toRupiah(value)}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    // dispatch(resetNasabah());
    dispatch(getDetailJokiFap(id));
  }, []);

  useEffect(() => {
    if (fetching) {
      dispatch(getDetailJokiFap(id));

      if (branches === null) {
        dispatch(getDestBranch());
      }

      if (joki === null) {
        dispatch(getJoki());
      }

      setFetching(false);
      //   () => {
      //       clearTimeout(timeOut);
      //   }
    }
  }, [fap, fetching, setFetching, dispatch]);

  return (
    <>
      <div className="p-3 w-full overflow-x-hidden">
        <section className="flex items-center gap-x-5">
          <FaRegCircleUser className="w-20 h-20 rounded-full" />
          <main>
            <div className="flex items-start flex-col gap-y-3">
              <h1 className=" py-[2px] px-6 font-semibold rounded-md text-white">
                {fap?.data?.user?.name}
              </h1>
              <span
                className={`${getStatusColor(
                  fap?.data?.status
                )} rounded-full px-6 text-sm text-white font-medium`}
              >
                {fap?.data?.status}
              </span>
            </div>
          </main>
        </section>
        <section className="mt-14 flexjustify-between items-start gap-x-5">
          <div className="w-full">
            <div className="mb-3">
              <label className="font-semibold text-goldPrimary text-xl">
                NIK
              </label>
              <Input disabled value={fap?.data?.user?.nik} />
            </div>
            <div className="mb-3">
              <label className="font-semibold text-goldPrimary text-xl">
                Usia
              </label>
              <Input disabled value={fap?.data?.user?.age} />
            </div>
            <div className="mb-3">
              <label className="font-semibold text-goldPrimary text-xl">
                Alamat
              </label>
              <Textarea disabled value={fap?.data?.user?.location} />
            </div>
            <div className="mb-3">
              <label className="font-semibold text-goldPrimary text-xl">
                No Handphone
              </label>
              <Input disabled value={fap?.data?.user?.phoneNumber} />
            </div>
            <div className="mb-3">
              <label className="font-semibold text-goldPrimary text-xl">
                Merk Handphone
              </label>
              <Input disabled value={fap?.data?.phoneBrand} />
            </div>
            <div className="mb-3">
              <label className="font-semibold text-goldPrimary text-xl">
                RAM Handphone
              </label>
              <Input disabled value={fap?.data?.phoneRam} />
            </div>
            <div className="mb-3">
              {fap?.data?.maintainedApps.length > 0 && (
                <>
                  <h1 className="text-goldPrimary text-xl font-bold">
                    Aplikasi Rawatan
                  </h1>
                  <Table
                    columns={colTblMaintained}
                    data={fap?.data?.maintainedApps ?? []}
                    // forcePage={1}
                  />
                </>
              )}
            </div>
            <div className="mb-3">
              {fap?.data?.paymentFailedApps && (
                <List>
                  <h1 className="text-goldPrimary text-xl font-bold">
                    Aplikasi Gagal Bayar
                  </h1>
                  {fap?.data?.paymentFailedApps?.map((fApps, idx) => (
                    <ListItem
                      key={idx}
                      className="bg-goldPrimary text-white mb-1"
                    >
                      {fApps}
                    </ListItem>
                  ))}
                </List>
              )}
            </div>
            <div className="mb-3">
              {fap?.data?.rejectedApps && (
                <List>
                  <h1 className="text-goldPrimary text-xl font-bold">
                    Aplikasi Tolakan
                  </h1>
                  {fap?.data?.rejectedApps?.map((rApps, idx) => (
                    <ListItem
                      key={idx}
                      className="bg-goldPrimary text-white mb-1"
                    >
                      {rApps}
                    </ListItem>
                  ))}
                </List>
              )}
            </div>
            <div>
              <h3 className="font-bold ml-2">Input Disini</h3>
            </div>
            {inputPenggarapan?.map((item, idx) => {
              return (
                <div
                  key={idx}
                  className="border-b-2 border-black pb-3 mb-2  p-3"
                >
                  <div className="mb-5">
                    <Input
                      type="text"
                      name="name"
                      value={item.name}
                      label="Nama"
                      placeholder="Nama"
                      onChange={(e) => handleInputChange(e, idx, "name")}
                      className="bg-white"
                    />
                  </div>
                  <div className="mb-5">
                    <Input
                      type="number"
                      name="revenue"
                      label="Pencairan"
                      value={item.revenue > 0 ? item.revenue : ""}
                      placeholder="Pencairan"
                      onChange={(e) => handleInputChange(e, idx, "revenue")}
                      className="bg-white"
                    />
                  </div>
                  <div className="mb-5">
                    <Input
                      type="text"
                      name="desc"
                      label="Deskripsi"
                      value={item.desc}
                      placeholder="Deskripsi"
                      onChange={(e) => handleInputChange(e, idx, "desc")}
                      className="bg-white"
                    />
                  </div>
                  <div>
                    <Button
                      onClick={() => handleRemoveInput(idx)}
                      disabled={inputPenggarapan.length < 2}
                      color="red"
                    >
                      X
                    </Button>
                  </div>
                </div>
              );
            })}
            <div className="flex justify-end">
              <Button className="" onClick={() => handleAddInput()}>
                <AiOutlinePlus />
              </Button>
            </div>
            {fap?.data?.status === "DISETUJUI" ? (
              <>
                <div>
                  <Button
                    variant="gradient"
                    size="sm"
                    color="green"
                    className="hidden lg:inline-block"
                    onClick={() => handleApprove(fap?.data?._id)}
                    disabled={
                      !fap?.data?.reportStatus?.firstReport ||
                      fap?.data?.reportStatus?.firstReport === "0"
                    }
                  >
                    Mulai Garap
                  </Button>
                </div>
              </>
            ) : fap?.data?.status === "DALAM PENGGARAPAN" ? (
              <div>
                <Button
                  variant="gradient"
                  size="sm"
                  className="hidden lg:inline-block"
                  onClick={() =>
                    handleDone(fap?.data?.user?._id, inputPenggarapan)
                  }
                  color="green"
                  disabled={
                    !fap?.data?.reportStatus?.secondReport ||
                    fap?.data?.reportStatus?.secondReport === "0"
                  }
                >
                  Selesai
                </Button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default DetailFapJoki;
