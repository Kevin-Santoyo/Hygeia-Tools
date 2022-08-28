import _ from "lodash";
import PropTypes from "prop-types";
import { useRef, useMemo } from "react";
import { CSVLink } from "react-csv";
import { useTable, useSortBy, usePagination, useFlexLayout } from "react-table";
import Titles from "./DynamicTitles";
import Summary from "./Summary";
import styles from "./Table.module.css";

const defaultPropGetter = () => ({})

export default function Table({ columns, data, params, summary, paging, type, tableNum, sortBy, sortDirection, getCellProps = defaultPropGetter }) {
  let tableClass =  type + tableNum
  console.log(tableClass)
  if (sortDirection !== null) {
    if (sortDirection === "desc") {
      sortDirection = true
    } else sortDirection = false
  } else sortDirection = null

  let initialState
  
  if (sortDirection !== null) {
    initialState = {
      sortBy: [
        {
          id: sortBy,
          desc: sortDirection
        }
      ]
    }
  }
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    pageOptions,
    page,
    state: { pageIndex, pageSize },
    gotoPage,
    previousPage,
    nextPage,
    setPageSize,
    canPreviousPage,
    canNextPage } = useTable(
    {
      useControlledState: (state) => {
        return useMemo(
          () => ({
            ...state,
            pageSize: 250,
            columns: columns,
          }),
          [state, columns]
        );
      },
      columns,
      data,
      initialState
    },
    useSortBy, usePagination
  );

  const defaultColumn = (
    () => ({
      minWidth: 30,
      width: 150,
      maxWidth: 200,
    }),
    []
  )

  let csvData = data.map((dat) => {
    var obj = {};
    let i = 0;
    while (i < columns.length) {
      if (columns[i].emptyHeader || columns[i].groupHeader) {
        let j = 0;
        while (j < columns[i].columns.length) {
          var header = columns[i].columns[j].Header;
          var key = columns[i].columns[j].accessor;
          obj[header] = dat[key];
          j++;
        }
        i++;
      } else {
        var header = columns[i].Header;
        var key = columns[i].accessor;
        obj[header] = dat[key];
        i++;
      }
    }
    return obj;
  });
  const tableTitle = useRef(null)

  let id = `table${tableNum}`;
  let rowData
  if (paging) { rowData = page } else rowData = rows

  return (
    <>
    { paging && pagingOptions(pageIndex, pageOptions, nextPage, previousPage, canPreviousPage, canNextPage) }
      <div id={id} class={`${tableClass}`} {...getTableProps()} className={styles.table}>
        <div className={styles.tableHead}>
          <div>
          <div ref={tableTitle}>
            <Titles params={params} tableNum={tableNum} />
          </div>
          </div>
          {headerGroups.map((headerGroup) => (
            <div className={styles.parentRow}{...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                const className = column.emptyHeader ? styles.columnHeaderEmpty : column.groupHeader ? styles.groupHeader : column.borderLeft ? styles.columnHeaderLeft : column.borderRight ? styles.columnHeaderRight : styles.columnHeader;
                return (
                  <div className={className} {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span>{column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div {...getTableBodyProps()}>
          {rowData.map((row, i) => {
            prepareRow(row);
            return (
              <div className={i % 2 === 0 ? styles.row : styles.rowOdd} {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  //console.log('cell props: ', cell)
                  return (
                    <div className={styles.cell} {...cell.getCellProps([
                      getCellProps(cell)
                    ])}>
                      {cell.render("Cell")}
                    </div>
                  );
                })}
              </div>
            );
          })}
          {summary == "true" && data.length > 0 && <Summary data={data} tableNum={tableNum} />}
        </div>
      </div>
      { paging && pagingOptions(pageIndex, pageOptions, nextPage, previousPage, canPreviousPage, canNextPage) }
      <span className={styles.outputs}>
        Output Options:&nbsp;
          <CSVLink data={csvData} className={styles.download} filename={getCSVFileName(tableTitle)}>
            csv
          </CSVLink>
      </span>
    </>
  );
}

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};

function pagingOptions(pageIndex, pageOptions, nextPage, previousPage, canPreviousPage, canNextPage) {
  return (
    <>
      <div className={styles.pages}>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <span>
          Page{' '}
          <em>
            {pageIndex + 1} of {pageOptions.length}
          </em>{' '}
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
        <a href="#"><button>Back to Top</button></a>
      </div>
    </>
  )
}


function getCSVFileName( tableTitle ) {
  let title
  if (tableTitle.current == null) {
    return null
  } else {
    title = tableTitle.current.innerText
  }
  title += ".csv"
  return title
}

function bwpGridHeaders() {

}