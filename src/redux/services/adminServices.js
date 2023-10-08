import { API } from '../../config/API';

const getAdminInfo = async () => {
    const response = await API.get('/admin/adm-info');
    return response.data;
};

const AdminServices = {
    getAdminInfo,
};

export default AdminServices;
