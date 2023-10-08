// import React from 'react';
import { Typography } from '@material-tailwind/react';
// import './Footer.css'; // Buat file CSS terpisah jika diperlukan
import logo from '../../assets/img/Logo_Malahayati.svg'
import SpeedDials from '../SpeedDial/SpeedDial';

const SITEMAP = [
    {
        title: "Company",
        links: ["About Us", "Careers", "Our Team", "Projects"],
    },
    {
        title: "Help Center",
        links: ["Contact Us"],
    },
    {
        title: "Our Branch",
        links: ["Blog", "Newsletter", "Free Products", "Affiliate Program"],
    },
];

const currentYear = new Date().getFullYear();

export default function Footer() {
    return (
        <>

            <SpeedDials />
            <footer className="relative w-full bg-blue-gray-500 mt-5">
                <div className="mx-auto w-full max-w-7xl px-8">
                    <div className="mx-auto flex flex-wrap justify-center md:justify-end py-12 lg:py-16">
                        {/* Logo */}
                        <div className="w-full md:w-1/4 md:text-right">
                            <img src={logo} alt="Logo" className="w-20 h-20 mb-4" />
                        </div>
                        {SITEMAP.map(({ title, links }, key) => (
                            <div key={key} className="w-full md:w-1/4">
                                <Typography
                                    variant="small"
                                    color="black"
                                    className="mb-4 font-bold uppercase opacity-50 text-center md:text-right"
                                >
                                    {title}
                                </Typography>
                                <ul className="space-y-1">
                                    {links.map((link, key) => (
                                        <Typography key={key} as="li" color="blue-gray" className="font-normal text-center md:text-right">
                                            <a
                                                href="#"
                                                className="inline-block py-1 pr-2 transition-transform hover:scale-105"
                                            >
                                                {link}
                                            </a>
                                        </Typography>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
                        <Typography
                            variant="small"
                            className="mb-4 text-center font-normal text-blue-gray-900 md:mb-0"
                        >
                            &copy; {currentYear} <a href="https://material-tailwind.com/">Material Tailwind</a>. All
                            Rights Reserved.
                        </Typography>
                        <div className="flex gap-4 text-blue-gray-900 sm:justify-center">
                            <Typography as="a" href="#" className="opacity-80 transition-opacity hover:opacity-100">
                                {/* SVG */}
                            </Typography>
                            <Typography as="a" href="#" className="opacity-80 transition-opacity hover:opacity-100">
                                {/* SVG */}
                            </Typography>
                            <Typography as="a" href="#" className="opacity-80 transition-opacity hover:opacity-100">
                                {/* SVG */}
                            </Typography>
                            <Typography as="a" href="#" className="opacity-80 transition-opacity hover:opacity-100">
                                {/* SVG */}
                            </Typography>
                        </div>
                    </div>
                </div>

            </footer>
        </>
    )
}
