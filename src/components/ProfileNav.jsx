import React from 'react'
import { useNavigate } from 'react-router-dom';
import {
    Navbar,
    Typography,
    IconButton,
    Avatar,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import Logo from '../assets/img/Logo_Malahayati.svg';
import { FaArrowRightFromBracket } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../redux/reducers/authReducer';

export default function ProfileNav() {
    const {isLoggedIn} = useSelector((state) => state.auth);
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();

    const handleOpen = () => setOpen(!open);
    const navigate = useNavigate()
    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    const handleLogout = () => {
        dispatch(logOut());
        setOpen(false);
    }


    return (
        <Navbar className="sticky top-0 z-30 mx-auto bg-[#eaeaeaa8] max-w-screen-3xl max-h-24 py-2 px-4 lg:px-8 lg:py-4 shadow-none border-0 rounded-none rounded-b-xl">
            <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
                <Typography
                    as="a"
                    href="#"
                    className="cursor-pointer font-medium"
                >
                    <Avatar src={Logo} alt="avatar" className='rounded-full h-16 w-16' onClick={() => navigate('/')} />
                </Typography>
                {/* <div className="hidden lg:block">{navList}</div> */}
                {isLoggedIn && (
                <IconButton size="md" color='red' className="hidden lg:inline-block rounded-full focus:shadow-none" onClick={handleOpen}>
                    <FaArrowRightFromBracket />
                </IconButton>
                )}
                <Dialog open={open} handler={handleOpen}>
                    <div className="flex items-center justify-center">
                        <DialogHeader>Logout</DialogHeader>
                        {/* <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="mr-3 h-5 w-5 cursor-pointer"
                            onClick={handleOpen}
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                clipRule="evenodd"
                            />
                        </svg> */}
                    </div>
                    <DialogBody>
                        <p className="text-center">Are you sure you want to logout?</p>
                    </DialogBody>
                    <DialogFooter className="space-x-2 flex justify-center">
                        <Button variant="outlined" color="red" onClick={handleOpen}>
                            Cancel
                        </Button>
                        <Button variant="outlined" color="blue" onClick={handleLogout}>
                            Logout
                        </Button>
                    </DialogFooter>
                </Dialog>
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
            {/* <Button variant="gradient" size="sm" fullWidth className="mb-2 p-2">
                <span>Masuk</span>
            </Button> */}
            {/* <MobileNav open={openNav}>
                <div className="flex justify-center text-center">
                    {navList}
                </div>
            </MobileNav> */}
        </Navbar>
    );
}
