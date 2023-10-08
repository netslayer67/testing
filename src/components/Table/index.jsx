import { usePagination, useTable, useSortBy } from 'react-table';
import cx from 'classnames';
import ReactPaginate from 'react-paginate';
import { Spinner } from '@material-tailwind/react';

const Table = ({
    columns,
    data,
    loading,
    remoteLoading,
    changePageHandler,
    changeSizeHandler,
    totalPage,
    limit,
    forcePage,
    stepPage = 1,
    initialState = {},
    tableContainerClass,
    paginate,
}) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state,
    } = useTable(
        {
            columns,
            data,
            initialState: {
                pageSize: limit ?? 10,
                ...initialState,
            },
            page: forcePage,
        },
        usePagination
    );
    // console.log(getTableBodyProps)
    return data ? (
        <div className="relative">
            <div
                className={`w-full ${
                    paginate ? 'min-h-[500px]' : 'min-h-full'
                } overflow-x-auto ${tableContainerClass || ''}`}
            >
                {loading ? (
                    <div className="flex justify-center">
                        <Spinner color="amber" />
                    </div>
                ) : (
                    <table
                        {...getTableProps()}
                        id="tabel"
                        className={`w-full ${paginate ? 'mb-4' : 'mb-3'}`}
                    >
                        <thead className="w-full sticky top-0 z-10 bg-goldPrimary">
                            {headerGroups?.map((headerGroup, i) => (
                                <tr
                                    key={i}
                                    {...headerGroup.getHeaderGroupProps()}
                                >
                                    {headerGroup.headers.map((column, j) => (
                                        <th
                                            key={j}
                                            {...column.getHeaderProps()}
                                            className={`text-left text-sm font-medium ${
                                                column?.Header !== 'Action' &&
                                                column?.Header !== '' &&
                                                column?.Header !== 'No' &&
                                                !column?.minW
                                                    ? 'min-w-[160px] max-w[175px]'
                                                    : 'min-w-[24px]'
                                            } px-4`}
                                        >
                                            <div
                                                className={`text-white text-sm font-medium my-4`}
                                            >
                                                {column.render('Header')}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody
                            className={cx(
                                remoteLoading ? 'pointer-events-none' : ''
                            )}
                            {...getTableBodyProps()}
                        >
                            {page.map((row, i) => {
                                prepareRow(row);
                                return (
                                    <tr
                                        key={i}
                                        {...row.getRowProps()}
                                        className="border-b"
                                    >
                                        {row.cells.map((cell, j) => {
                                            return (
                                                <td
                                                    key={j}
                                                    {...cell.getCellProps()}
                                                    className="px-4 py-2 font-medium text-left text-sm"
                                                >
                                                    {cell.render('Cell')}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>

            {paginate && (
                <div className="p-5 flex justify-end">
                    <div>
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel=">"
                            onPageChange={changePageHandler}
                            pageRangeDisplayed={3}
                            pageCount={totalPage}
                            forcePage={forcePage}
                            previousLabel="<"
                            renderOnZeroPageCount={null}
                            className="flex list-none gap-2"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            activeClassName="active-page"
                        />
                    </div>
                </div>
            )}
        </div>
    ) : null;
};

export default Table;
