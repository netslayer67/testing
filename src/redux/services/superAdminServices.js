import { API } from '../../config/API';

const superAdminMonitoring = async ({ limit, page, searchValue }) => {
    const response = await API.get(
        `/superadmin/monit-usr?use_paginate=true&sort_by=createdAt&sort_dir=desc&limit=10&page=${page}`
    );

    return response;
};

const getDetailSuperAdminFap = async (id) => {
    const response = await API.get(`/superadmin/${id}/det-usr`);
    return response;
};


const superAdminServices = {
    superAdminMonitoring,
    getDetailSuperAdminFap,
};

export default superAdminServices;
