import { useDispatch, useSelector } from 'react-redux';
import { ceoQuotes } from '../../../config/Images';
import { BsTrashFill } from 'react-icons/bs';
import { useEffect } from 'react';
import { Input } from '@material-tailwind/react';
import { getJokiInfo } from '../../../redux/reducers/jokiProfileReducer';
import getStatusColor from '../../../utils/getStatusColor';

const MainJoki = () => {
    const { user } = useSelector((state) => state.auth);
    const { data: joki } = useSelector((state) => state.jokiProfile);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getJokiInfo());
    }, []);

    return (
        <div className="p-3 overflow-x-hidden">
            <section className="flex items-center gap-x-5">
                <img
                    src={joki?.photo?.url}
                    className="h-20 w-20 rounded-full object-cover"
                />
                <main>
                    <div className="flex items-center gap-x-3">
                        <h1 className="py-[2px] px-[1.5px] bg-gray-900 font-semibold rounded-md text-white">
                            {joki?.name}
                        </h1>
                        <span
                            className={`${getStatusColor(
                                joki?.status
                            )} rounded-full px-6 text-sm text-white font-medium`}
                        >
                            {joki?.status}
                        </span>
                    </div>
                    <div>
                        <p className="text-lg mt-1 text-white">
                            {joki?.role?.name} Malahayati Cabang{' '}
                            {joki?.branch?.name}
                        </p>
                    </div>
                </main>
            </section>

            <section className="mt-14 flex justify-between gap-x-4">
                <div className="w-full">
                    <div>
                        <label className="font-semibold text-goldPrimary text-xl">
                            Email
                        </label>
                        <Input label="Disabled" disabled value={joki?.email} />
                    </div>
                    <div className="mt-4">
                        <label className="font-semibold text-goldPrimary text-xl">
                            Cabang
                        </label>
                        <Input
                            label="Disabled"
                            disabled
                            value={joki?.branch?.name}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MainJoki;
