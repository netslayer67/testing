import { API } from '../../config/API';

const jokiMonitoringWork = async ({ limit, page, searchValue }) => {
    const response = await API.get(
        `/joki/joki-monit-fap?use_paginate=true&page=${page}&limit=${limit}&sort_by=createdAt&sort_dir=desc`
    );

    return response;
};

const getDetailJokiFap = async (id) => {
    const response = await API.get(`/joki/${id}/det-fap`);
    return response;
};


const jokiService = {
    jokiMonitoringWork,
    getDetailJokiFap,
};

export default jokiService;
