import { API } from "../../config/API";

const getNasabahAdmin = async ({ limit, page, searchValue }) => {
    const userName = 'user.name'
  const response = await API.get(
    `/admin/monit-fap?use_paginate=true&page=${page}&limit=${limit}&sort_by=&sort_dir=asc&search_by=${userName}&search_val=${searchValue}`
  );
  return response;
};

const getDetailFap = async (id) => {
  const response = await API.get(`/admin/${id}/det-fap`);
  return response;
};

const respondFap = async (payload) => {
  const data = { ...payload };
  const response = await API.patch(
    `/admin/${payload.id}/adm-respond-fap`,
    data
  );
  return response;
};

const getDestBranches = async () => {
  const response = await API.get("/admin/get-dest-branches");
  return response;
};

const getJoki = async () => {
  const response = await API.get("/admin/adm-get-joki");
  return response;
};

const nasabahAdminService = {
  getNasabahAdmin,
  getDetailFap,
  respondFap,
  getDestBranches,
  getJoki,
};

export default nasabahAdminService;
