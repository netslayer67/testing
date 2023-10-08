import { MultipartAPI } from "../../config/API";


const addMemberAdmin = async (data) => {
    const response = await MultipartAPI.post(
        `/admin/create-joki`,
        data
    );
    return response;
};

const tambahAnggotaAdminService = {
    addMemberAdmin,
};

export default tambahAnggotaAdminService;