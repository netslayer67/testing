import React from "react";
import Logo from "../../assets/img/Logo_Malahayati.svg";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Avatar,
  MenuItem,
  MenuHandler,
  Menu,
  MenuList,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { AiOutlineDown } from "react-icons/ai";
import { useSelector } from "react-redux";

const navListItem = [
  {
    title: "SKPP",
    link: "#SKPP",
  },
  {
    title: "Legalitas",
    link: "#",
  },
  {
    title: "Seminar",
    link: "#seminar",
  },
  {
    title: "Anggota",
    link: "#ourTeam",
  },
];

const NavListMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const renderItems = navListItem.map(({ title, link }) => (
    <a href={link} key={title}>
      <MenuItem className="hover:bg-gray-300">
        <Typography
          variant="p"
          color="blue-gray"
          className="mb-1 font-medium hover:text-yellow-800 transition-all duration-300"
        >
          {title}
        </Typography>
      </MenuItem>
    </a>
  ));

  return (
    <>
      <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography
            as="a"
            variant="small"
            className="p-1 font-normal hidden md:block overflow-hidden group"
            color="blue-gray"
          >
            <MenuItem className="text-sm font-normal capitalize bg-transparent hover:shadow-transparent shadow-transparent text-black md:flex  items-center gap-2 p-0 hover:bg-transparent transition-all duration-500 hover:text-yellow-800 hover:ease-in-out hidden">
              <span className="text-base capitalize font-Poppins">
                Informasi
              </span>

              <AiOutlineDown
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </MenuItem>
            <div className="-translate-x-16 group-hover:translate-x-0 transition-all duration-300 w-full  h-[2px] bg-yellow-800" />
          </Typography>
        </MenuHandler>
        <MenuList className="hidden w-14 grid-cols-2 gap-3 overflow-visible lg:grid">
          <ul className="col-span-4 flex w-full flex-col gap-1 ">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <Menu>
        <MenuHandler className="flex items-center justify-center text-blue-gray-900 lg:hidden hover:bg-none bg-none">
          <MenuItem>
            <Button
              size="sm"
              className="text-sm font-normal bg-transparent hover:shadow-transparent shadow-transparent text-black p-0 hover:bg-transparent transition-all overflow-hidden duration-500 hover:text-yellow-800 hover:ease-in-out group"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="capitalize font-Poppins flex items-center gap-2 ">
                informasi
              </span>
              <div className="-translate-x-10 group-hover:translate-x-0 transition-all duration-300 w-full  h-[2px] bg-yellow-800" />
            </Button>
          </MenuItem>
        </MenuHandler>
        <MenuList className="lg:hidden">
          <ul className="flex w-full flex-col gap-1 lg:hidden">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
    </>
  );
};

const NavbarComp = () => {
  const {isLoggedIn} = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const handleScrollToTop = (event) => {
    event.preventDefault(); // Menghentikan perilaku default tautan
    window.scrollTo({ top: 0, behavior: "smooth" }); // Menggulirkan halaman ke atas dengan efek halus
  };

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#">
          <Button
            size="sm"
            onClick={handleScrollToTop}
            className="text-sm font-normal bg-transparent hover:shadow-transparent shadow-transparent text-black p-0 hover:bg-transparent transition-all  overflow-hidden duration-500 hover:text-yellow-800 hover:ease-in-out group "
          >
            <span className="capitalize font-Poppins text-base">Beranda</span>
            <div className="-translate-x-8  group-hover:translate-x-0 transition-all duration-300 w-full  h-[2px] bg-yellow-800" />
          </Button>
        </a>
      </Typography>
      <NavListMenu />
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#tetangKami">
          <Button
            size="sm"
            className="text-sm font-normal bg-transparent hover:shadow-transparent shadow-transparent text-black p-0 hover:bg-transparent transition duration-500 overflow-hidden hover:text-yellow-800 hover:ease-in-out group"
          >
            <span className="capitalize font-Poppins text-base">
              Tentang Kami
            </span>
            <div className="-translate-x-20 group-hover:translate-x-0 transition-all duration-300 w-full  h-[2px] bg-yellow-800" />
          </Button>
        </a>
      </Typography>
    </ul>
  );
  return (
    <Navbar className="sticky top-0 z-10 mx-auto bg-[#eaeaeaa8] max-w-screen-3xl py-2 px-4 lg:px-8 lg:py-4 shadow-none border-0">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="cursor-pointer font-medium"
          onClick={handleScrollToTop}
        >
          <Avatar src={Logo} alt="avatar" className="rounded-full h-16 w-16" />
        </Typography>
        <div className="hidden lg:block">{navList}</div>
        <Button
          variant="gradient"
          size="sm"
          className="hidden lg:inline-block"
          onClick={() => navigate("/profile")}
        >
          <span>{isLoggedIn ? 'Profile' : 'Masuk'}</span>
        </Button>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
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
      <MobileNav open={openNav}>
        <div className="flex justify-center text-center">{navList}</div>
        <Button variant="gradient" size="sm" fullWidth className="mb-2 p-2">
          <span>Masuk</span>
        </Button>
      </MobileNav>
    </Navbar>
  );
};

export default NavbarComp;
