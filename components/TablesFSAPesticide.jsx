import { useMemo, useState } from 'react'
import _ from 'lodash'
import Table from './Table'
import NumberFormat from 'react-number-format'
import decimalSort from './SortingMethods'

export default function FSAPesticideResidueAndRiskIndicatorsTable ({ data, params }) {

  var agg_dri = 0

  data.forEach(function (row) {
    agg_dri = row.FS_DRI_Kid + agg_dri
  })

  let newData = []
  data.forEach(dat => {
    let key = {
      percent_positive: (dat.Number_Positives/dat.Total_Samples)*100
    }
    dat = {...dat,...key}
    newData.push(dat)
  });

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
            return <NumberFormat value={value} displayType="text"  decimalScale={1} fixedDecimalScale="true" suffix="%"/>
          },
          sortType: decimalSort,
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
          sortType: decimalSort
        },
        {
          Header: 'cRfC (ppm)',
          accessor: 'cRfC_Kid',
          Cell: ({ value }) => {
            return <NumberFormat value={value} displayType="text"  decimalScale={3} fixedDecimalScale="true"/>
          },
          sortType: decimalSort
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
          sortType: decimalSort,
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
          },
          sortType: decimalSort
        }
      ]
    }
  ]
  return (
    <>
      <Table data={newData} columns={columns} params={params} summary="true" sortBy="FS_DRI_Kid" sortDirection="desc" tableNum={1}/>
      <style jsx>{`
        .title {
          font-family: Arial, Helvetica, sans-serif;
        }
`}</style>
    </>
  )
}
