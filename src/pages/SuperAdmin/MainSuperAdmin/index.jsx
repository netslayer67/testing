import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Input } from '@material-tailwind/react';
import { getSuperAdminInfo } from '../../../redux/reducers/superAdminProfileReducer';

const MainSuperAdmin = () => {
    const { data: superAdmin } = useSelector((state) => state.superAdminProfile);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSuperAdminInfo());
    }, []);

    return (
        <div className="p-3 overflow-x-hidden">
            <section className="flex items-center gap-x-5">
                <img
                    src={superAdmin?.photo?.url}
                    className="h-20 w-20 rounded-full object-cover"
                />
                <main>
                    <div className="flex items-center gap-x-3">
                        <h1 className="py-[2px] px-[1.5px] bg-gray-900 font-semibold rounded-md text-white">
                            {superAdmin?.name}
                        </h1>
                        <span
                            className={`${
                                superAdmin?.status?.includes('AKTIF')
                                    ? 'bg-[#7AC943]'
                                    : 'bg-gray-400'
                            } rounded-full px-6 text-sm text-white font-medium`}
                        >
                            {superAdmin?.status}
                        </span>
                    </div>
                    <div>
                        <p className="text-lg mt-1 text-white">
                            {superAdmin?.role?.name} Malahayati Cabang{' '}
                            {superAdmin?.branch?.name}
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
                        <Input label="Disabled" disabled value={superAdmin?.email} />
                    </div>
                    <div className="mt-4">
                        <label className="font-semibold text-goldPrimary text-xl">
                            Cabang
                        </label>
                        <Input
                            label="Disabled"
                            disabled
                            value={superAdmin?.branch?.name}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MainSuperAdmin;
