import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa6";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { getUser, login, register } from "../redux/reducers/authReducer";
import { RESPONSE_STATUS, STATUS_CODE } from "../utils/constant";
import { toastError, toastSuccess } from "./toast";
import { resetAuth } from "../redux/reducers/authReducer";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

export default function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    status: statusAuth,
    data: dataAuth,
    isLoggedIn,
    user: dataUser,
  } = useSelector((state) => state.auth) || {};
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formListAccount, setFormListAccount] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
    name: "",
    nik: "",
    age: 0,
    pob: "",
    dob: "",
    location: "",
    phoneNumber: "",
  });

  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  const [formListApp, setFormListApp] = useState([
    {
      appName: "",
      totalLimit: "",
      expiryDate: "",
      installment: "",
    },
  ]);

  const handleChange = useCallback(
    (e, type) => {
      const { value, name } = e;

      if (type === "register") {
        setFormListAccount({
          ...formListAccount,
          [name]: value,
        });
      } else {
        setFormLogin((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    },
    [formListAccount, formLogin]
  );

  const handleOpenLogin = () => {
    setOpenRegisterModal(false);
    setOpenLoginModal((prev) => !prev);
  };

  const handleOpenRegister = () => {
    setOpenLoginModal(false);
    setOpenRegisterModal(true);
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleFormSubmitRegister = (event) => {
    event.preventDefault();
    try {
      const jsonForm = JSON.stringify(formListAccount);
      dispatch(register(jsonForm));
    } catch (error) {
      console.log(error);
    }
    // Handle form submission here
  };

  const handleSubmitLogin = useCallback(
    (event) => {
      event.preventDefault();
      try {
        const jsonForm = JSON.stringify(formLogin);
        dispatch(login(jsonForm));
      } catch (error) {
        toastError(error);
      }
    },
    [dispatch, formLogin]
  );

  const validateDisableRegisterButton = useCallback(() => {
    return (
      !formListAccount.age ||
      !formListAccount.dob ||
      !formListAccount.email ||
      !formListAccount.location ||
      !formListAccount.name ||
      !formListAccount.nik ||
      !formListAccount.password ||
      !formListAccount.phoneNumber ||
      !formListAccount.pob
    );
  }, [formListAccount]);

  const validateInputRegister = useCallback(
    (name) => {
      if (statusAuth === STATUS_CODE.ERROR && openRegisterModal) {
        return dataAuth[name];
      }
    },
    [dataAuth, statusAuth, openRegisterModal]
  );

  const validateInputLogin = useCallback(
    (message) => {
      if (openLoginModal && statusAuth === STATUS_CODE.ERROR) {
        return dataAuth[message];
      }
    },
    [dataAuth, openLoginModal, statusAuth]
  );

  const renderLoginForm = useMemo(() => {
    const _screen = (
      <div className="flex flex-col gap-4">
        <form className="space-y-6" onSubmit={handleSubmitLogin}>
          <div className="flex flex-col md:flex-row md:space-x-4 gap-3 mb-1">
            <div className="flex-grow">
              <Input
                type="email"
                size="regular"
                label="Email"
                name="email"
                onChange={(e) => handleChange(e.target, "login")}
                error={validateInputLogin("email")}
              />
              {validateInputLogin("email") && (
                <p className="ml-2 mt-1 text-red-400 text-sm">
                  {validateInputLogin("email")}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4 gap-3 mb-1">
            <div className="flex-grow">
              <Input
                type={showPassword ? "text" : "password"}
                size="regular"
                label="Password"
                name="password"
                onChange={(e) => handleChange(e.target, "login")}
                error={validateInputLogin("password")}
                icon={
                  showPassword ? (
                    <FaEyeSlash onClick={handleTogglePassword} />
                  ) : (
                    <FaEye onClick={handleTogglePassword} />
                  )
                }
              />
              {validateInputLogin("password") && (
                <p className="ml-2 mt-1 text-red-400 text-sm">
                  {validateInputLogin("password")}
                </p>
              )}
            </div>
          </div>
          <Button
            variant="gradient"
            type="submit"
            fullWidth
            disabled={statusAuth === STATUS_CODE.LOADING}
          >
            {statusAuth === STATUS_CODE.LOADING ? "Harap tunggu..." : "Masuk"}
          </Button>
        </form>
      </div>
    );

    return (
      <Modal
        screen={_screen}
        open={openLoginModal}
        textFooter={["Don't have an account?", "Sign Up"]}
        onClickFooter={handleOpenRegister}
        handleClose={() => setOpenLoginModal(false)}
        titleHeader={"Login"}
      />
    );
  }, [
    handleSubmitLogin,
    validateInputLogin,
    showPassword,
    openLoginModal,
    handleChange,
  ]);

  const renderRegisterForm = useMemo(() => {
    const _screen = (
      <div className="flex flex-col gap-4">
        <form className="space-y-6" onSubmit={handleFormSubmitRegister}>
          <div className="flex flex-col md:flex-row md:space-x-4 gap-3 mb-5">
            <div className="flex-grow">
              <Input
                type="text"
                size="regular"
                label="Nama"
                name="name"
                onChange={(e) => handleChange(e.target, "register")}
                error={validateInputRegister("name")}
              />
              {validateInputRegister("name") && (
                <p className="ml-2 mt-1 text-red-400 text-sm">
                  {validateInputRegister("name")}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4 gap-3 mb-5">
            <div className="flex-grow">
              <Input
                type="number"
                size="regular"
                label="Usia"
                name="age"
                onChange={(e) => handleChange(e.target, "register")}
                error={validateInputRegister("age")}
              />
              {validateInputRegister("age") && (
                <p className="ml-2 mt-1 text-red-400 text-sm">
                  {validateInputRegister("age")}
                </p>
              )}
            </div>
            <div className="flex-grow">
              <Input
                type="number"
                size="regular"
                label="Nomor HP Pengajuan"
                name="phoneNumber"
                onChange={(e) => handleChange(e.target, "register")}
                error={validateInputRegister("phoneNumber")}
              />
              {/* {validateInputRegister("phoneNumber") && (
                <p className="ml-2 mt-1 text-red-400 text-sm">
                  {validateInputRegister("phoneNumber")}
                </p>
              )} */}
            </div>
          </div>
          <div className="mb-4">
            <Input
              type="text"
              size="regular"
              label="Alamat Rumah Saat Ini"
              onChange={(e) => handleChange(e.target, "register")}
              name="location"
              error={validateInputRegister("location")}
            />
          </div>
          <div className="mt-4">
            <div className="mb-4">
              <Input
                type="email"
                size="regular"
                label="Email"
                onChange={(e) => handleChange(e.target, "register")}
                name="email"
                error={validateInputRegister("email")}
              />
              {validateInputRegister("email") && (
                <p className="ml-2 mt-1 text-red-400 text-sm">
                  {validateInputRegister("email")}
                </p>
              )}
            </div>
            <div className="mb-4">
              <Input
                type={showPassword ? "text" : "password"}
                size="regular"
                label="Password"
                name="password"
                onChange={(e) => handleChange(e.target, "register")}
                icon={
                  showPassword ? (
                    <FaEyeSlash onClick={handleTogglePassword} />
                  ) : (
                    <FaEye onClick={handleTogglePassword} />
                  )
                }
                error={validateInputRegister("password")}
              />
              {validateInputRegister("password") && (
                <p className="ml-2 mt-1 text-red-400 text-sm">
                  {validateInputRegister("password")}
                </p>
              )}
            </div>
            <div className="mb-4">
              <Input
                type={showPassword ? "text" : "password"}
                size="regular"
                label="Konfirmasi Password"
                name="passwordConfirmation"
                onChange={(e) => handleChange(e.target, "register")}
                icon={
                  showPassword ? (
                    <FaEyeSlash onClick={handleTogglePassword} />
                  ) : (
                    <FaEye onClick={handleTogglePassword} />
                  )
                }
                error={validateInputRegister("passwordConfirmation")}
              />
              {validateInputRegister("passwordConfirmation") && (
                <p className="ml-2 mt-1 text-red-400 text-sm">
                  {validateInputRegister("passwordConfirmation")}
                </p>
              )}
            </div>
            <div className="mb-4">
              <Input
                type="text"
                size="regular"
                label="NIK"
                name="nik"
                onChange={(e) => handleChange(e.target, "register")}
                error={validateInputRegister("nik")}
              />
              {validateInputRegister("nik") && (
                <p className="ml-2 mt-1 text-red-400 text-sm">
                  {validateInputRegister("nik")}
                </p>
              )}
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4 gap-3 mb-5">
              <div className="flex-grow">
                <Input
                  type="text"
                  size="regular"
                  label="Tempat Lahir"
                  name="pob"
                  onChange={(e) => handleChange(e.target, "register")}
                  error={validateInputRegister("pob")}
                />
                {/* {validateInputRegister("pob") && (
                  <p className="ml-2 mt-1 text-red-400 text-sm">
                    {validateInputRegister("pob")}
                  </p>
                )} */}
              </div>
              <div className="flex-grow">
                <Input
                  type="date"
                  size="regular"
                  label="Tanggal Lahir"
                  name="dob"
                  onChange={(e) => handleChange(e.target, "register")}
                  error={validateInputRegister("dob")}
                />
                {/* {validateInputRegister("pob") && (
                  <p className="ml-2 mt-1 text-red-400 text-sm">
                    {validateInputRegister("pob")}
                  </p>
                )} */}
              </div>
            </div>
          </div>
          <Button
            variant="gradient"
            type="submit"
            fullWidth
            disabled={
              validateDisableRegisterButton() ||
              statusAuth === STATUS_CODE.LOADING
            }
          >
            {statusAuth === STATUS_CODE.LOADING
              ? "Sedang diproses..."
              : "Daftar"}
          </Button>
        </form>
      </div>
    );

    return (
      <Modal
        screen={_screen}
        textFooter={["Already have an account?", "Sign In"]}
        open={openRegisterModal}
        onClickFooter={handleOpenLogin}
        titleHeader={"Register"}
        handleClose={() => setOpenRegisterModal(false)}
      />
    );
  }, [
    handleChange,
    handleFormSubmitRegister,
    openRegisterModal,
    showPassword,
    formListAccount,
  ]);

  useEffect(() => {
    if (!openRegisterModal) {
      setFormListAccount({
        email: "",
        password: "",
        passwordConfirmation: "",
        name: "",
        nik: "",
        age: 0,
        pob: "",
        dob: "",
        location: "",
        phoneNumber: "",
      });
      dispatch(resetAuth());
    }
    if (!openLoginModal) {
      setFormLogin({
        email: "",
        password: "",
      });
      dispatch(resetAuth());
    }
  }, [openRegisterModal, openLoginModal]);

  useEffect(() => {
    if (
      statusAuth === STATUS_CODE.IDLE &&
      dataAuth?.data?.status === RESPONSE_STATUS.SUCCESS
    ) {
      setOpenRegisterModal(false);
      toastSuccess("Pendaftaran Berhasil");
    }
    if (
      isLoggedIn &&
      dataAuth?.message === "Authentication Success." &&
      statusAuth === STATUS_CODE.IDLE
    ) {
      dispatch(getUser(jwtDecode(localStorage.getItem("token"))));
      toastSuccess("Berhasil Masuk");
      setOpenLoginModal(false);
    }
  }, [statusAuth, dataAuth, isLoggedIn]);

  useEffect(() => {
    if (dataUser?.role?.name === "User") {
      navigate("/profile");
    }
    if (dataUser?.role?.name === "Admin") {
      navigate("/dashboard/admin/profile");
    }
    if (dataUser?.role?.name === "Joki") {
      navigate("/dashboard/joki/profile");
    }
    if (dataUser?.role?.name === "Superadmin") {
      navigate("/dashboard/super-admin/profile");
    }
  }, [dataUser]);

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-5">
        {!isLoggedIn ? (
          <Button
            onClick={() => setOpenLoginModal(true)}
            className="mb-4 w-full max-w-sm px-6 py-2 text-sm font-medium leading-normal text-white bg-gray-700 rounded-full shadow-md transition duration-150 ease-in-out hover:bg-zinc-600 focus:outline-none focus:ring-0 focus:bg-zinc-600 dark:hover:bg-cyan-700"
          >
            <div className="flex items-center justify-start">
              <FaLock />
              <p className="flex-1 text-center ">Masuk</p>
            </div>
          </Button>
        ) : (
          <h3 className="font-bold text-2xl text-white">Selamat Datang</h3>
        )}

        {renderLoginForm}
        {renderRegisterForm}
      </div>
    </>
  );
}
