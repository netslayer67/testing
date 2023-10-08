import { API } from '../../config/API';

const getSuperAdminInfo = async () => {
    const response = await API.get('/superadmin/get-profile');
    return response.data;
};

const superAdminProfileServices = {
    getSuperAdminInfo,
};

export default superAdminProfileServices;
