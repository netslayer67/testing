// import React from 'react';
import { useEffect } from 'react';
import ceoQuotes from '../../public/Boss.png'
import raffiQuote from '../../public/Raffi.png'
import mahfudQuote from '../../public/Mahfud.png'

import { Typography } from '@material-tailwind/react';
import Aos from 'aos';

export default function Ceo() {
    useEffect(() => {
        Aos.init();
    }, []);
    return (
        <>
            <div className="bg-blackPrimary mt-8 py-14 flex md:flex-row flex-col items-center gap-5 px-2">
                <div data-aos="fade-up" data-aos-duration="1000">
                    <img
                        src={ceoQuotes}
                        alt="CEO"
                        className="md:w-[200rem] w-full rounded-xl"
                    />
                </div>
                <div className="mt-3 py-2 text-justify md:px-10 px-3">
                    <Typography className="md:text-lg text-sm leading-relaxed text-primary">
                        "Banyak orang takut terkena blacklist oleh OJK karena
                        terjerat dalam pinjaman online dan Perbankan yang tidak
                        terbayar. Namun, Anda masih memiliki kesempatan untuk
                        memperbaiki keuangan Anda dan menghindari risiko
                        blacklist dengan melakukan restrukturisasi atau
                        negosiasi dengan pihak kreditur. Jangan biarkan masalah
                        keuangan Anda membebani hidup Anda, segera ambil
                        tindakan yang tepat dan dapatkan solusi terbaik untuk
                        masalah Anda."
                    </Typography>
                </div>
            </div>
            <div className="bg-blackPrimary mt-0 py-14 flex md:flex-row flex-col items-center gap-5 px-2">
                <div className="mt-3 py-2 text-justify md:px-10 px-3 md:order-1 order-2">
                    <Typography className="md:text-lg text-sm leading-relaxed text-primary">
                        "Banyak orang takut terkena blacklist oleh OJK karena
                        terjerat dalam pinjaman online dan Perbankan yang tidak
                        terbayar. Namun, Anda masih memiliki kesempatan untuk
                        memperbaiki keuangan Anda dan menghindari risiko
                        blacklist dengan melakukan restrukturisasi atau
                        negosiasi dengan pihak kreditur. Jangan biarkan masalah
                        keuangan Anda membebani hidup Anda, segera ambil
                        tindakan yang tepat dan dapatkan solusi terbaik untuk
                        masalah Anda."
                    </Typography>
                </div>
                <div
                    className="md:order-2 order-1"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                >
                    <img
                        src={raffiQuote}
                        alt="CEO"
                        className="md:w-[200rem] w-full rounded-xl"
                    />
                </div>
            </div>
            <div className="bg-blackPrimary mt-0 py-14 flex md:flex-row flex-col items-center gap-5 px-2">
                <div data-aos="fade-up" data-aos-duration="1000">
                    <img
                        src={mahfudQuote}
                        alt="CEO"
                        className="md:w-[200rem] w-full rounded-xl"
                    />
                </div>
                <div className="mt-3 py-2 text-justify md:px-10 px-3">
                    <Typography className="md:text-lg text-sm leading-relaxed text-primary">
                        "Dari sudut hukum pidana terkait ekses-ekses ikutan
                        seperti misalnya tindakan ancaman kekerasan, ancaman
                        penyebaran foto senonoh mulai ditingkatkan. Itu mulai
                        sekarang bandar-bandarnya dan stafnya mulai ditindak.
                        Tetapi yang ilegal ini yang kita tindak dengan ancaman
                        hukum pidana. Bareskirm Polri akan memassifikasi
                        tindakannya nanti diberbagai tempat kalau ada orang yang
                        tetap dipaksa bayar jangan bayar karena itu ilegal."
                    </Typography>
                </div>
            </div>
        </>
    );
}
