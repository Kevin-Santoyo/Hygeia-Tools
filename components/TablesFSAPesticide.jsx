import { useMemo, useState } from 'react'
import _ from 'lodash'
import Table from './Table'
import NumberFormat from 'react-number-format'

export default function FSAPesticideResidueAndRiskIndicatorsTable ({ data, params }) {

  var agg_dri = 0

  data.forEach(function (row) {
    agg_dri = row.FS_DRI_Kid + agg_dri
  })

  var columns = [
    {
      Header: ' ',
      emptyHeader: true,
      columns: [
        {
          Header: 'Food',
          accessor: 'Food',
          Cell: row => <div style={{ textAlign: "left"}}>{row.value}</div>
        },
        {
          Header: 'Sub-Food',
          accessor: 'Sub_Food',
          Cell: row => <div style={{ textAlign: "left"}}>{row.value}</div>
        }
      ]
    },
    {
      Header: 'Number of Samples',
      groupHeader: true,
      columns: [
        {
          Header: 'Total',
          accessor: 'Total_Samples',
          borderLeft: true
        },
        {
          Header: 'Number of Positives',
          accessor: 'Number_Positives'
        },
        {
          Header: 'Percent Positive',
          accessor: 'percent_positive',
          Cell: ({ value }) => {
            return <NumberFormat value={value*100} displayType="text"  decimalScale={1} fixedDecimalScale="true" suffix="%"/>
          },
          borderRight: true
        }
      ]
    },
    {
      Header: '  ',
      emptyHeader: true,
      columns: [
        {
          Header: 'Mean Residue (ppm)',
          accessor: 'Mean_Positives',
          Cell: ({ value }) => {
            return <NumberFormat value={value} displayType="text"  decimalScale={3} fixedDecimalScale="true"/>
          },
        },
        {
          Header: 'cRfC (ppm)',
          accessor: 'cRfC_Kid',
          Cell: ({ value }) => {
            return <NumberFormat value={value} displayType="text"  decimalScale={3} fixedDecimalScale="true"/>
          }
        }
      ]
    },
    {
      Header: 'Dietary Risk Indicators',
      groupHeader: true,
      columns: [
        {
          Header: 'DRI-M',
          accessor: 'DRI_Mean_Kid',
          Cell: ({ value }) => {
            return <NumberFormat value={value} displayType="text"  decimalScale={5} fixedDecimalScale="true"/>
          },
          borderLeft: true
        },
        {
          Header: 'FS-DRI',
          accessor: d => d.FS_DRI_Kid,
          Cell: ({ value }) => {
            return <NumberFormat value={value} displayType="text" decimalScale={5} />
          }
        },
        {
          // TODO: Calc these in DB?
          Header: 'Percent of Aggregate FS-DRI',
          accessor: 'FS_DRI_Kid',
          Cell: ({ value }) => {
            return <NumberFormat value={(value / agg_dri)*100} displayType="text" decimalScale={2} suffix="%"/>
          }
        }
      ]
    }
  ]
  return (
    <>
      <Table data={data} columns={columns} params={params} summary="true" tableNum={1}/>
      <style jsx>{`
        .title {
          font-family: Arial, Helvetica, sans-serif;
        }
`}</style>
    </>
  )
}
