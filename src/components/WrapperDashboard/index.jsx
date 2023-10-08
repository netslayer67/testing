import {
  Avatar,
  Button,
  Collapse,
  IconButton,
  Navbar,
  Typography,
} from "@material-tailwind/react";
import Sidebar from "../Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LogoMalahayati } from "../../config/Svgs";
import { useDispatch, useSelector } from "react-redux";
import { menuAdmin, menuJoki, menuSuperAdmin } from "../../utils/constant";
import { logOut } from "../../redux/reducers/authReducer";
import { toastError } from "../toast";

const NavbarDashboard = ({ pathname }) => {
  const splitedPathname = pathname?.split("/");
  return (
    <nav className="w-full bg-[#9FAAAF] rounded-lg p-4 mt-3">
      <main>
        <div>
          {splitedPathname
            .filter((item) => item !== "")
            .map((item, idx) => {
              return (
                <span className="font-light text-sm text-[#2A3F52]" key={idx}>
                  {item.charAt(0).toUpperCase()}
                  {item.slice(1)} {idx !== splitedPathname.length - 1 && "/"}{" "}
                </span>
              );
            })}
        </div>
        <b className="text-base text-[#2A3F52] mt-2">
          {splitedPathname[splitedPathname.length - 1]
            ?.split("-")
            ?.map((value) => {
              const capital = value.charAt(0).toUpperCase();
              const nextWord = value.slice(1);
              return capital + nextWord;
            })
            .join(" ")}
        </b>
      </main>
    </nav>
  );
};

const WrapperDashboard = ({ children }) => {
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openMobileNav, setOpenMobileNav] = useState(false);

  const isMobileDevice = () => {
    return window.innerWidth <= 768;
  };

  const getMenus = () => {
    let menuMapping = [];

    if (user?.role?.name === "Admin") {
      menuMapping = menuAdmin;
    } else if (user?.role?.name === "Joki") {
      menuMapping = menuJoki;
    } else if (user?.role?.name === "Superadmin") {
      menuMapping = menuSuperAdmin;
    }

    return menuMapping?.map((item, idx) => (
      <Typography
        key={idx}
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
        onClick={() => navigate(item.link)}
      >
        {item.name}
      </Typography>
    ));
  };

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/");
  };

  useEffect(() => {
    if (!user && !isLoggedIn) {
      navigate("/");
      toastError("Silahkan Login terlebih dahulu");
    }

    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenMobileNav(false)
    );
  }, []);

  useEffect(() => {
    const splittedPathname = pathname.split("/");
    const lastPathname = splittedPathname[splittedPathname.length - 1];
    if (user?.role?.name === "Admin") {
      const hasAccess = menuAdmin.some((val) => pathname === val.link);
      const detailLinkAccess =
        pathname === `/dashboard/admin/detail-fap/${lastPathname}`;
      if (!hasAccess) {
        if (detailLinkAccess) {
          return;
        }
        navigate("/not-found");
      }
    } else if (user?.role?.name === "Joki") {
      const hasAccess = menuJoki.some((val) => pathname === val.link);
      const detailLinkAccess =
        pathname === `/dashboard/joki/detail/${lastPathname}`;
      if (!hasAccess) {
        if (detailLinkAccess) {
          return;
        }
        navigate("/not-found");
      }
    } else if (user?.role?.name === "Superadmin") {
      const hasAccess = menuSuperAdmin.some((val) => pathname === val.link);
      const detailLinkAccess =
        pathname === `/dashboard/super-admin/detail/${lastPathname}`;
      if (!hasAccess) {
        if (detailLinkAccess) {
          return;
        }
        navigate("/not-found");
      }
    }
  }, [pathname]);

  return (
    <>
      {isMobileDevice() && (
        <Navbar className="sticky top-0 z-10 mx-auto bg-[#eaeaeaa8] max-w-screen-3xl py-2 px-4 lg:px-8 lg:py-4 shadow-none border-0 ">
          <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
            <Avatar
              src={LogoMalahayati}
              alt="avatar"
              className="rounded-full h-16 w-16"
            />
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenMobileNav(!openMobileNav)}
            >
              {openMobileNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
          <Collapse open={openMobileNav}>
            <div className="flex justify-center text-center ">
              <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                {getMenus()}
              </ul>
            </div>
            <Button
              variant="gradient"
              size="sm"
              fullWidth
              className="mb-2 p-2"
              onClick={() => handleLogout()}
            >
              <span>Log Out</span>
            </Button>
          </Collapse>
        </Navbar>
      )}
      <main className="flex gap-x-4 h-screen min-w-full">
        {!isMobileDevice() ? <Sidebar /> : null}
        <div className="flex-1 md:pr-5 pr-0 flex flex-col overflow-hidden">
          <NavbarDashboard pathname={pathname} />
          <div className="px-3 mt-3 mb-2 overflow-y-scroll py-2 bg-brownPrimary rounded-lg ">
            {children}
          </div>
        </div>
      </main>
    </>
  );
};

export default WrapperDashboard;
