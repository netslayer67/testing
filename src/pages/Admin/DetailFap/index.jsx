import React, { useEffect, useState } from 'react';
import { FaDumpster, FaRegCircleUser } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
    getDestBranch,
    getDetailFap,
    getJoki,
    resetNasabah,
    respondFap,
} from '../../../redux/reducers/nasabahAdminReducer';
import getStatusColor from '../../../utils/getStatusColor';
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
} from '@material-tailwind/react';
import { Table, toastError, toastSuccess } from '../../../components';
import formatDate from '../../../utils/formatDate';
import formatNumber from '../../../utils/formatNumber';
import {
    BsBriefcaseFill,
    BsFillTelephoneFill,
    BsCheckLg,
} from 'react-icons/bs';
import { FaTimes } from 'react-icons/fa';
import {
    RESP_FAP_ACT,
    MODAL_NAME,
    FAP_APPR_STAT,
} from '../../../utils/constant';
import { API } from '../../../config/API';

const DetailFap = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        dataDetail: fap,
        status: statusRedux,
        branches,
        joki,
    } = useSelector((state) => state.nasabahAdmin);
    const { user } = useSelector((state) => state.auth);

    const [showModal, setShowModal] = useState(null);
    const handleShowModal = (name) => setShowModal(name);
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
        firstReport: '0',
        secondReport: '0',
    });

    const [errorMode, setErrorMode] = useState({
        joki: false,
        destBranch: false,
    });

    const handleChangeLaporan = (jenisLaporan) => {
        if (jenisLaporan == 1) {
            setLaporan({ firstReport: '1' });
        } else if (jenisLaporan == 2) {
            setLaporan({ secondReport: '1' });
        }
    };

    const handleDestBranchChange = (value) => {
        setDestBranch((prevState) => (prevState === value ? null : value));
    };

    const handleChangeJoki = (value) => {
        console.log(value, '<-= value')
        setJokiPayload((prevState) => (prevState === value ? null : value));
    };

    const handleUpdateLaporan = async (id) => {
        try {
            await API.patch(`/admin/${id}/upd-rep-stat`, Laporan);
            toastSuccess('Berhasil Update');
            navigate('/dashboard/admin/nasabah');
        } catch (error) {
            toastError('Gagal Update');
        }
    };

    const handleRespondFap = (action, id) => {
        let payload = null;
        if (action === RESP_FAP_ACT.DELEGATE) {
            if (destBranch === null) {
                setErrorMode({ ...errorMode, destBranch: true });
            } else {
                payload = { action: RESP_FAP_ACT.DELEGATE, destBranch, id };
                dispatch(respondFap(payload));
                setShowModal(null);
                setFetching(true);
                navigate('/dashboard/admin/nasabah');
                return;
            }
        } else if (action === RESP_FAP_ACT.APPROVAL) {
            if (jokiPayload === null) {
                setErrorMode({ ...errorMode, joki: true });
            } else {
                payload = {
                    action: RESP_FAP_ACT.APPROVAL,
                    joki: jokiPayload,
                    status: FAP_APPR_STAT.DISETUJUI,
                    id,
                };
                dispatch(respondFap(payload));
                setShowModal(null);
                setFetching(true);
                navigate('/dashboard/admin/nasabah');

                return;
            }
        } else if (action === RESP_FAP_ACT.REJECTION) {
            payload = {
                action,
                status: FAP_APPR_STAT.DITOLAK,
                id,
            };
            dispatch(respondFap(payload));
            setShowModal(null);
            setFetching(true);
            navigate('/dashboard/admin/nasabah');

            return;
        } else {
            setShowModal(null);
        }
    };

    const colTblMaintained = [
        {
            Header: 'Nama',
            accessor: 'name',
            Cell: ({ value }) => {
                return (
                    <div className="font-medium text-white flex items-center gap-x-2 text-base">
                        {value}
                    </div>
                );
            },
        },
        {
            Header: 'Total Limit',
            accessor: 'totalLimit',
            Cell: ({ value }) => {
                return (
                    <div className="font-medium text-white flex items-center gap-x-2 text-base">
                        {formatNumber.toRupiah(value)}
                    </div>
                );
            },
        },
        {
            Header: 'Tanggal Tempo',
            accessor: 'dueDate',
            Cell: ({ value }) => {
                return (
                    <div className="font-medium text-white flex items-center gap-x-2 text-base">
                        {formatDate.toLocal(value)}
                    </div>
                );
            },
        },
        {
            Header: 'Sisa Angsuran',
            accessor: 'remainingInstallment',
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
        dispatch(resetNasabah());
        dispatch(getDetailFap(id));
        dispatch(getDestBranch());
        dispatch(getJoki());
    }, []);

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
                            <Textarea
                                disabled
                                value={fap?.data?.user?.location}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="font-semibold text-goldPrimary text-xl">
                                No Handphone
                            </label>
                            <Input
                                disabled
                                value={fap?.data?.user?.phoneNumber}
                            />
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
                                    {fap?.data?.paymentFailedApps?.map(
                                        (fApps, idx) => (
                                            <ListItem
                                                key={idx}
                                                className="bg-goldPrimary text-white mb-1"
                                            >
                                                {fApps}
                                            </ListItem>
                                        )
                                    )}
                                </List>
                            )}
                        </div>
                        <div className="mb-3">
                            {fap?.data?.rejectedApps && (
                                <List>
                                    <h1 className="text-goldPrimary text-xl font-bold">
                                        Aplikasi Tolakan
                                    </h1>
                                    {fap?.data?.rejectedApps?.map(
                                        (rApps, idx) => (
                                            <ListItem
                                                key={idx}
                                                className="bg-goldPrimary text-white mb-1"
                                            >
                                                {rApps}
                                            </ListItem>
                                        )
                                    )}
                                </List>
                            )}
                        </div>
                        {fap?.data?.status === 'DISETUJUI' || fap?.data?.status === 'DALAM PENGGARAPAN' ? (
                            <>
                                <div className="mb-3">
                                    <Checkbox
                                        value={true}
                                        label="Laporan Pertama"
                                        labelProps={{ className: 'text-white' }}
                                        color="blue"
                                        onChange={() => handleChangeLaporan(1)}
                                        disabled={
                                            fap?.data?.reportStatus
                                                ?.firstReport === '1' ||
                                            fap?.data?.status ===
                                                'DALAM PENGGARAPAN'
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <Checkbox
                                        value={true}
                                        label="Laporan Kedua"
                                        labelProps={{ className: 'text-white' }}
                                        color="blue"
                                        onChange={() => handleChangeLaporan(2)}
                                        disabled={
                                            fap?.data?.reportStatus
                                                ?.secondReport === '1' ||
                                            fap?.data?.status !==
                                                'DALAM PENGGARAPAN'
                                        }
                                    />
                                </div>

                                <div>
                                    <Button
                                        variant="success"
                                        color="green"
                                        size="sm"
                                        className="hidden lg:inline-block"
                                        onClick={() =>
                                            handleUpdateLaporan(fap?.data?._id)
                                        }
                                        disabled={
                                            fap?.data?.reportStatus
                                                ?.firstReport === '1' &&
                                            fap?.data?.status ===
                                                'DISETUJUI'
                                        }
                                    >
                                        Kirim
                                    </Button>
                                </div>
                            </>
                        ) : fap?.data?.status === 'MENUNGGU VALIDASI' ? (
                            <div className="mb-3 flex justify-center items-center gap-x-8">
                                <Button
                                    className="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    onClick={() =>
                                        handleShowModal(MODAL_NAME.DELEGATE)
                                    }
                                >
                                    <BsBriefcaseFill />
                                </Button>
                                <Button className="middle none center rounded-lg bg-orange-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-orange-500/20 transition-all hover:shadow-lg hover:shadow-orange-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                                    <BsFillTelephoneFill />
                                </Button>
                                <Button
                                    className="middle none center mr-4 rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    onClick={() =>
                                        handleShowModal(MODAL_NAME.APPROVAL)
                                    }
                                >
                                    <BsCheckLg />
                                </Button>
                                <Button
                                    onClick={() =>
                                        handleShowModal(MODAL_NAME.REJECTION)
                                    }
                                    className="middle none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                >
                                    <FaTimes />
                                </Button>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                </section>
            </div>
            {/* Modal Delegate */}
            <Dialog
                open={showModal === MODAL_NAME.DELEGATE}
                handler={handleShowModal}
                size="sm"
            >
                <DialogHeader className="justify-between">
                    <Typography>Lempar Admin</Typography>
                    <IconButton
                        color="blue-gray"
                        size="sm"
                        variant="text"
                        onClick={() => handleCloseModal()}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </IconButton>
                </DialogHeader>
                <DialogBody divider>
                    <List>
                        <ListItem>
                            <h3>
                                Pilih Cabang Tujuan{' '}
                                <span className="text-red-600">
                                    *
                                    <em
                                        className={`${
                                            errorMode.destBranch ? '' : 'hidden'
                                        }`}
                                    >
                                        Harap memilih cabang tujuan.
                                    </em>
                                </span>
                            </h3>
                        </ListItem>
                        {branches?.data?.map((branch, idx) => (
                            <ListItem
                                key={idx}
                                onClick={() =>
                                    handleDestBranchChange(branch?._id)
                                }
                            >
                                <Checkbox
                                    checked={destBranch === branch?._id}
                                    onChange={(e) =>
                                        handleDestBranchChange(e.target.value)
                                    }
                                    label={branch?.name}
                                    value={branch?._id}
                                />
                            </ListItem>
                        ))}
                    </List>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={() => handleCloseModal()}
                        className="mr-1"
                    >
                        <span>Kembali</span>
                    </Button>
                    <Button
                        variant="gradient"
                        color="blue"
                        onClick={() =>
                            handleRespondFap(RESP_FAP_ACT.DELEGATE, id)
                        }
                    >
                        <span>Kirim</span>
                    </Button>
                </DialogFooter>
            </Dialog>
            {/* Modal Approval */}
            <Dialog
                open={showModal === MODAL_NAME.APPROVAL}
                handler={handleShowModal}
                size="sm"
            >
                <DialogHeader className="justify-between">
                    <Typography>Persetujuan Validasi</Typography>
                    <IconButton
                        color="blue-gray"
                        size="sm"
                        variant="text"
                        onClick={() => handleCloseModal()}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </IconButton>
                </DialogHeader>
                <DialogBody divider>
                    <List>
                        <ListItem>
                            <h3>
                                Pilih Joki{' '}
                                <span className="text-red-600">
                                    *
                                    <em
                                        className={`${
                                            errorMode.joki ? '' : 'hidden'
                                        }`}
                                    >
                                        Harap pilih Joki.
                                    </em>
                                </span>
                            </h3>
                        </ListItem>
                        {joki?.data?.map((j, idx) => (
                            <ListItem
                                key={idx}
                                disabled={
                                    j.status === 'CUTI' || j.countTasks >= 2
                                }
                            >
                                <Checkbox
                                    onClick={(e) => handleChangeJoki(e.target.value)}
                                    checked={jokiPayload === j._id}
                                    label={j.name}
                                    disabled={
                                        j.status === 'CUTI' || j.countTasks >= 2
                                    }
                                    value={j._id}
                                />
                                <Chip
                                    className={`ml-1 ${getStatusColor(
                                        j.status
                                    )}`}
                                    value={j.status}
                                />
                                <Chip
                                    className={`ml-1 ${
                                        j.countTasks >= 2
                                            ? 'bg-gray-400'
                                            : 'bg-[#7AC943]'
                                    }`}
                                    value={j.countTasks}
                                />
                            </ListItem>
                        ))}
                    </List>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={() => handleCloseModal()}
                        className="mr-1"
                    >
                        <span>Batal</span>
                    </Button>
                    <Button
                        variant="gradient"
                        color="green"
                        onClick={() => {
                            handleRespondFap(
                                RESP_FAP_ACT.APPROVAL,
                                fap?.data?._id
                            );
                        }}
                    >
                        <span>Setujui</span>
                    </Button>
                </DialogFooter>
            </Dialog>
            {/* Modal Rejection */}
            <Dialog
                open={showModal === MODAL_NAME.REJECTION}
                size="sm"
                handler={handleShowModal}
            >
                <DialogHeader className="justify-between">
                    <Typography>Penolakan</Typography>
                    <IconButton
                        color="blue-gray"
                        size="sm"
                        variant="text"
                        onClick={() => handleCloseModal()}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </IconButton>
                </DialogHeader>
                <DialogBody divider>
                    <Typography>
                        Apakah anda yakin ingin menolakan data nasabah{' '}
                        {fap?.data?.user?.name}
                    </Typography>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="green"
                        onClick={() => handleCloseModal()}
                        className="mr-1"
                    >
                        <span>Batal</span>
                    </Button>
                    <Button
                        variant="gradient"
                        color="red"
                        onClick={() => {
                            handleRespondFap(
                                RESP_FAP_ACT.REJECTION,
                                fap?.data?._id
                            );
                        }}
                    >
                        <span>Tolak</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
};

export default DetailFap;
