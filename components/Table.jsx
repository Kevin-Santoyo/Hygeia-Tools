import _ from 'lodash'
import PropTypes from 'prop-types'
import { useTable } from 'react-table'
import { TableTitle } from './DynamicTitles'
import styles from './Table.module.css'

export default function Table ({ columns, data, params, type, totalReq }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data })

  
  if (totalReq == "true") {
  var arrayLength = data.length
  var i = 0
  var averageSamples = 0
  var total_num_pos = 0
  var total_drim = 0
  var total_fsdri = 0
  var total_percent = 0
  var averageResidues = 0
  var totalDetections = arrayLength
    while (i < arrayLength) {
      averageSamples = averageSamples + data[i].total_samples
      total_num_pos = total_num_pos + data[i].number_positives
      total_drim = total_drim + data[i].dri_mean_kid
      total_fsdri = total_fsdri + data[i].fs_dir_kid
      total_percent = total_percent + (data[i].per_agg_fsdri * 100)
      i++
    }
    averageSamples = averageSamples/arrayLength;
    averageResidues = (total_num_pos / averageSamples).toFixed(2);
  }


  return (
    <table {...getTableProps()} className={styles.table}>
      <thead className={styles.tableHead}>
            <tr>
              <TableTitle params={params} type={type} />
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
        {totalReq == "true" &&
          <><tr className={styles.totalRow}>
            <td className={styles.cell}>Average Number of Samples</td>
            <td className={styles.cell}>{averageSamples.toFixed(0)}</td>
            <td className={styles.cell}></td>
            <td className={styles.cell}></td>
            <td className={styles.cell}></td>
            <td className={styles.cell}></td>
            <td className={styles.cell}></td>
            <td className={styles.cell}></td>
            <td className={styles.cell}></td>
          </tr><tr className={styles.totalRow}>
            <td className={styles.cell}>Total Positives and Aggregate DRI</td>
            <td className={styles.cell}></td>
            <td className={styles.cell}>{total_num_pos}</td>
            <td className={styles.cell}></td>
            <td className={styles.cell}></td>
            <td className={styles.cell}></td>
            <td className={styles.cell}>{total_drim.toFixed(5)}</td>
            <td className={styles.cell}>{total_fsdri.toFixed(5)}</td>
            <td className={styles.cell}>{total_percent.toFixed(2).concat('%')}</td>
          </tr>
            <tr className={styles.totalRow}>
            <td className={styles.cell}>Average Residues Detected per Sample</td>
            <td className={styles.cell}></td>
            <td className={styles.cell}>{averageResidues}</td>
            <td className={styles.cell}></td>
            <td className={styles.cell}></td>
            <td className={styles.cell}></td>
            <td className={styles.cell}></td>
            <td className={styles.cell}></td>
            <td className={styles.cell}></td>
          </tr>
          <tr className={styles.totalRow}>
            <td className={styles.cell}>Number of Analytes Detected</td>
            <td className={styles.cell}>{totalDetections}</td>
            <td className={styles.cell}></td>
            <td className={styles.cell}></td>
            <td className={styles.cell}></td>
            <td className={styles.cell}></td>
            <td className={styles.cell}></td>
            <td className={styles.cell}></td>
            <td className={styles.cell}></td>
          </tr></>
        }

      </tbody>
    </table>
  )
}

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired
}
