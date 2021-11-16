import React from "react";
import { useTable, useFilters, useGlobalFilter, usePagination } from 'react-table'
import Styles from "./Styles";

/**
 * Defines and configures the table, setting up all the options to be used (such as pagination, filtering, etc.) 
 * 
 * @param columns Headers configuration and column behavior
 * @param data Actual data to be displayed by the table
 * 
 * @returns A table that can be drawn by React
 */
function Table({ columns, data }) {

    // Table configuration
    const {
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        state: { pageIndex }
    } = useTable(
        {
            columns,
            data,
            initialState: { pageSize: 100 }
        },
        useFilters,
        useGlobalFilter,
        usePagination
    );

    // Table structure (headers / rows / pagination section)
    return (
        <>
            <Styles>
                <table className="tableWrap">
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps({
                                        className: '',
                                    })}>
                                        {column.render('Header')}

                                        <div>{column.render('Filter')}</div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row, i) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return (
                                            <td {...cell.getCellProps({
                                                className: cell.column.collapse ? 'collapse' : '',
                                            })} >
                                                {cell.render('Cell')}
                                            </td>)
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <br />
                <div className="pagination">
                    <center>
                        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                            {'<<'}
                        </button>{' '}
                        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                            {'<'}
                        </button>{' '}
                        <button onClick={() => nextPage()} disabled={!canNextPage}>
                            {'>'}
                        </button>{' '}
                        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                            {'>>'}
                        </button>{' '}
                        <span>
                            Page{' '}
                            <strong>
                                {pageNumber(pageIndex, pageOptions.length)} of {pageOptions.length}
                            </strong>{' '}
                        </span>
                        <span>
                            | Go to page:{' '}
                            <input
                                type="number"
                                defaultValue={pageIndex}
                                onChange={e => {
                                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                                    gotoPage(page)
                                }}
                                style={{ width: '100px' }}
                            />
                        </span>{' '}
                    </center>
                </div>
            </Styles>
        </>
    )
}

/**
 * Small utility method to correct the case where we have 0 total pages (no elements found),
 * and therefore should be on page 0 of 0.
 */
function pageNumber(pageIndex, totalPages) {
    const extraIndex = totalPages > 0 ? 1 : 0
    return pageIndex + extraIndex;
}

export default Table;