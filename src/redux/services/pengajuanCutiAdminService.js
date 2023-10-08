import { API } from "../../config/API";


const leaveApplicationAdmin = async (data) => {
    const response = await API.post(
        `/employee/create-leave-req`,
        data
    );
    return response;
};

const pengajuanCutiAdminService = {
    leaveApplicationAdmin,
};

export default pengajuanCutiAdminService;