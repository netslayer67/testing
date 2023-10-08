import { useCallback, useState } from 'react';
// import { raffiQuote } from '../../config/Images';
import raffiQuote from '../../assets/img/Raffi.png'
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi';
import { dataEmployee } from './constant';

const CardPerson = ({ name, role, img }) => {
    return (
        <div className="bg-white rounded-3xl border border-blackPrimary px-2 py-2 w-[10rem] h-[11.5rem] flex flex-col items-center ">
            <img src={img} className="w-20 h-20 rounded-full" />
            <div className="bg-blackPrimary rounded-full w-full text-white font-medium px-1 text-center mt-4 mb-3">
                {name}
            </div>
            <code className="font-light text-[#7D7D7D]">as {role}</code>
        </div>
    );
};

const OurTeam = () => {
    const [numberCarousell, setNumberCarousell] = useState(0);

    const mappingCard = useCallback(() => {
        if (numberCarousell === 0) {
            return dataEmployee[numberCarousell]?.map((item, idx) => {
                return (
                    <CardPerson
                        key={idx}
                        name={item.name}
                        role={item.role}
                        img={item.img}
                    />
                );
            });
        } else if (numberCarousell === 1) {
            return dataEmployee[numberCarousell]?.map((item, idx) => {
                return (
                    <CardPerson
                        key={idx}
                        name={item.name}
                        role={item.role}
                        img={item.img}
                    />
                );
            });
        }
    }, [numberCarousell]);

    return (
        <div className="mt-28" id="ourTeam">
            <h1 className="md:text-5xl text-2xl font-semibold text-center mb-6">
                <span className="text-goldPrimary">OUR TEAM</span> - MALAHAYATI
                CONSULTANT
            </h1>
            <div className="flex flex-col items-center">
                <CardPerson name="Ahmad Maulana" img={raffiQuote} role="CEO" />
                <div className="flex items-center justify-around md:gap-x-10">
                    <BiSolidLeftArrow
                        size={40}
                        className={`mt-14 ${numberCarousell === 0
                            ? 'text-gray-500 cursor-default'
                            : 'cursor-pointer'
                            }`}
                        onClick={() => setNumberCarousell(0)}
                    />
                    <div className="grid md:grid-cols-4 grid-cols-2 gap-x-9 gap-y-4 mt-16">
                        {mappingCard()}
                    </div>
                    <BiSolidRightArrow
                        size={40}
                        className={`mt-14 ${numberCarousell === dataEmployee.length - 1
                            ? 'text-gray-500 cursor-default'
                            : 'cursor-pointer'
                            }`}
                        onClick={() => setNumberCarousell(1)}
                    />
                </div>
            </div>
        </div>
    );
};

export default OurTeam;
