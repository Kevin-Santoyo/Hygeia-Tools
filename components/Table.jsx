import PropTypes from 'prop-types'
import { useTable } from 'react-table'
import styles from './Table.module.css'

export default function Table ({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data })

  console.log(headerGroups)

  return (
    <table {...getTableProps()} className={styles.table}>
      <thead className={styles.tableHead}>
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
                  className={className} {...column.getHeaderProps()}>{column.render('Header')}</th>
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
                // console.log('cell props: ', cell)
                return <td className={styles.cell} {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}

      </tbody>
    </table>
  )
}

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired
}
