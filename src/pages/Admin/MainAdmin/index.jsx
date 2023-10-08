import { useDispatch, useSelector } from 'react-redux';
import { ceoQuotes } from '../../../config/Images';
import { BsTrashFill } from 'react-icons/bs';
import { useEffect } from 'react';
import { getAdminInfo } from '../../../redux/reducers/adminReducer';
import { Input } from '@material-tailwind/react';

const MainAdmin = () => {
    const { user } = useSelector((state) => state.auth);
    const { data: admin } = useSelector((state) => state.admin);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAdminInfo());
    }, []);

    return (
        <div className="p-3 overflow-x-hidden">
            <section className="flex items-center gap-x-5">
                <img
                    src={admin?.photo?.url}
                    className="h-20 w-20 rounded-full object-cover"
                />
                <main>
                    <div className="flex items-center gap-x-3">
                        <h1 className="py-[2px] px-[1.5px] bg-gray-900 font-semibold rounded-md text-white">
                            {admin?.name}
                        </h1>
                        <span
                            className={`${
                                admin?.status?.includes('AKTIF')
                                    ? 'bg-[#7AC943]'
                                    : 'bg-gray-400'
                            } rounded-full px-6 text-sm text-white font-medium`}
                        >
                            {admin?.status}
                        </span>
                    </div>
                    <div>
                        <p className="text-lg mt-1 text-white">
                            {admin?.role?.name} Malahayati Cabang{' '}
                            {admin?.branch?.name}
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
                        <Input label="Disabled" disabled value={admin?.email} />
                    </div>
                    <div className="mt-4">
                        <label className="font-semibold text-goldPrimary text-xl">
                            Cabang
                        </label>
                        <Input
                            label="Disabled"
                            disabled
                            value={admin?.branch?.name}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MainAdmin;
