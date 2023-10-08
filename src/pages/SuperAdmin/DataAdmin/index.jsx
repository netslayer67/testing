import React, { useEffect } from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import getStatusColor from "../../../utils/getStatusColor";
import { useDispatch, useSelector } from "react-redux";
import { jokiMonitoringWork } from "../../../redux/reducers/jokiReducer";
import { CardBody, Spinner } from "@material-tailwind/react";
import { HeaderCardContainer, Table } from "../../../components";
import { HiMiniInformationCircle } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { DFLT_PAG_LIMIT, DFLT_PAG_PAGE } from "../../../utils/constant";
import { useState } from "react";
import { superAdminMonitoring } from "../../../redux/reducers/superAdminReducer";

const DataAdmin = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(DFLT_PAG_PAGE);
  const [searchValue, setSearchValue] = useState("");

  const { data: dataSuperAdmin } = useSelector((state) => state.superAdmin);

  const columns = [
    {
      Header: "Nama Nasabah",
      accessor: "user",
      Cell: ({ value }) => {
        return (
          <div className="font-medium text-white flex items-center gap-x-2 text-base">
            <BiSolidUserCircle className="text-2xl" />
            {value?.name ?? "-"}
          </div>
        );
      },
    },
    {
      Header: "Cabang",
      accessor: "branch",
      Cell: ({ value }) => {
        return (
          <div className="font-medium text-white flex items-center gap-x-2 text-base">
            {value?.name ?? '-'}
          </div>
        );
      },
    },
    {
      Header: "Detail",
      accessor: "_id",
      Cell: ({ value }) => {
        return (
          <div className="line-clamp-1 font-medium text-goldPrimary text-2xl cursor-pointer hover:text-white transition-all duration-200">
            <Link BiSolidUserCircle to={`/dashboard/super-admin/detail/${value}`}>
              <HiMiniInformationCircle />
            </Link>
          </div>
        );
      },
    },
  ];

  const handleChangePage = (pageInput) => {
    setPage(pageInput.selected + 1);
  };

  const handleSearchValue = (value) => {
    setSearchValue(value);
  };

  useEffect(() => {
    dispatch(
      superAdminMonitoring({
        page,
      })
    );
  }, [dispatch, page]);

  useEffect(() => {
    const timeout = setTimeout(() => {
        dispatch(
            superAdminMonitoring({
                page: 1,
                searchValue,
              })  
        )
    }, 500)

    return () => {
        clearTimeout(timeout);
    }
  }, [searchValue])

  return (
    <div className="p-3 w-full">
      <HeaderCardContainer
        title="Data Admin"
        handleSearch={handleSearchValue}
      />

      <CardBody className="overflow-scroll px-0">
        {dataSuperAdmin?.data ? (
          <Table
            columns={columns}
            data={dataSuperAdmin?.data ?? []}
            changePageHandler={(val) => handleChangePage(val)}
            totalPage={Math.ceil(dataSuperAdmin?.paginate_info?.totalPages ?? 0)}
            paginate
          />
        ) : (
          <div className="flex justify-center">
            <Spinner color="amber" />
          </div>
        )}
      </CardBody>
    </div>
  );
};

export default DataAdmin;
