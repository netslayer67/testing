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

const DataTugas = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(DFLT_PAG_PAGE);
  const [searchValue, setSearchValue] = useState("");

  const { data: dataJoki } = useSelector((state) => state.joki);

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
      Header: "Status",
      accessor: "status",
      Cell: ({ value }) => {
        const color = getStatusColor(value);
        return (
          <div className="font-medium text-white flex items-center gap-x-2 text-base">
            <div className={`${color} rounded-lg p-2 text-sm`}>
              {value ?? "-"}
            </div>
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
            <Link BiSolidUserCircle to={`/dashboard/joki/detail/${value}`}>
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
      jokiMonitoringWork({
        page,
        limit: DFLT_PAG_LIMIT,
      })
    );
  }, [dispatch, page]);

  useEffect(() => {
    const timeout = setTimeout(() => {
        dispatch(
            jokiMonitoringWork({
                page: 1,
                limit: DFLT_PAG_LIMIT,
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
        title="Data Tugas"
        handleSearch={handleSearchValue}
      />

      <CardBody className="overflow-scroll px-0">
        {dataJoki?.data ? (
          <Table
            columns={columns}
            data={dataJoki?.data ?? []}
            changePageHandler={(val) => handleChangePage(val)}
            totalPage={Math.ceil(dataJoki?.paginate_info?.totalPages ?? 0)}
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

export default DataTugas;
