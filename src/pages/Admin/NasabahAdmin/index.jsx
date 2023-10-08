import { HiMiniInformationCircle } from "react-icons/hi2";
import { CardBody, Input, Spinner } from "@material-tailwind/react";
import { HeaderCardContainer, Table } from "../../../components";
import moment from "moment/moment";
import { BiSolidUserCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";
import { getNasabahAdmin } from "../../../redux/reducers/nasabahAdminReducer";
import { Link } from "react-router-dom";
import getStatusColor from "../../../utils/getStatusColor";
import {
  DFLT_PAG_LIMIT,
  DFLT_PAG_PAGE,
  DFLT_PAG_SORT_BY,
  DFLT_PAG_SORT_DIR,
  STATUS_CODE,
} from "../../../utils/constant";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

const NasabahAdmin = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(DFLT_PAG_PAGE);
  const [searchValue, setSearchValue] = useState("");
  const [sort, setSort] = useState({
    by: DFLT_PAG_SORT_BY,
    dir: DFLT_PAG_SORT_DIR,
  });

  const { data: dataNasabah, status: statusRedux } = useSelector(
    (state) => state.nasabahAdmin
  );

  const handleChangePage = (pageInput) => {
    setPage(pageInput.selected + 1);
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

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
      Header: "Status Validasi",
      accessor: "status",
      Cell: ({ value }) => {
        const color = getStatusColor(value);
        return (
          <div className="line-clamp-1 font-medium text-white flex justify-start">
            <div className={`rounded-lg py-1 px-2 text-center ${color}`}>
              {value ?? "-"}
            </div>
          </div>
        );
      },
    },
    {
      Header: "Tanggal Data Masuk",
      accessor: "createdAt",
      Cell: ({ value }) => {
        return (
          <div className="line-clamp-1 font-medium text-white">
            {value ? moment(value).format("DD/MM/YYYY") : "-"}
          </div>
        );
      },
    },
    {
      Header: "Action",
      accessor: "_id",
      Cell: ({ value }) => {
        return (
          <div className="line-clamp-1 font-medium text-goldPrimary text-2xl cursor-pointer hover:text-white transition-all duration-200">
            <Link to={`/dashboard/admin/detail-fap/${value}`}>
              <HiMiniInformationCircle />
            </Link>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(
      getNasabahAdmin({
        limit: DFLT_PAG_LIMIT,
        page,
      })
    );
  }, [dispatch, page, sort]);

  useEffect(() => {
      const timeout = setTimeout(() => {
        dispatch(
            getNasabahAdmin({
              limit: DFLT_PAG_LIMIT,
              page: 1,
              searchValue,
            })
        )
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchValue]);

  return (
    <div className="p-3">
      <HeaderCardContainer 
       handleSearch={handleSearch}
       title="Data Nasabah"
      />

      <main className="mt-6 ">
        {dataNasabah?.data ? (
          <Table
            columns={columns}
            data={dataNasabah?.data ?? []}
            changePageHandler={(val) => handleChangePage(val)}
            totalPage={Math.ceil(dataNasabah?.paginate_info?.totalPages ?? 0)}
            paginate
            loading={statusRedux === STATUS_CODE.LOADING}
          />
        ) : (
          <div className="flex justify-center">
            <Spinner color="amber" />
          </div>
        )}
      </main>
    </div>
  );
};

export default NasabahAdmin;
