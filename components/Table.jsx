import _ from 'lodash'
import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { useTable, useSortBy } from 'react-table'
import Titles from './DynamicTitles'
import Summary from './Summary'
import styles from './Table.module.css'

export default function Table ({ columns, data, params, type, summary, tableNum }) {

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow
  } = useTable({ 
    useControlledState: state => {
      return useMemo(() => ({
        ...state,
        columns: columns
      }),
      [state, columns]
      )
    },
    columns,
    data
  }, useSortBy )

  return (
    <table {...getTableProps()} className={styles.table}>
      <thead className={styles.tableHead}>
            <tr>
              <Titles params={params} tableNum={tableNum} />
            </tr>
        {
          headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => {
                const className =
                  column.emptyHeader
                    ? styles.columnHeaderEmpty
                    : column.groupHeader
                      ? styles.groupHeader
                      : column.borderLeft
                        ? styles.columnHeaderLeft
                        : column.borderRight
                          ? styles.columnHeaderRight
                          : styles.columnHeader
                return <th
                  className={className} {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                    </th>
              })}
            </tr>
          ))
        }
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr className={i % 2 === 0 ? styles.row : styles.rowOdd} {...row.getRowProps()}>
              {row.cells.map(cell => {
                //console.log('cell props: ', cell)
                return <td className={styles.cell} {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
        {summary == "true" && (data.length > 0) &&
          <Summary data={data} tableNum={tableNum}/>
        }

      </tbody>
      
    </table>
  )
}

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired
}
