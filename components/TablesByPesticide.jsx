import { useMemo, useState } from 'react'
import _ from 'lodash'
import Table from './Table'
import NumberFormat from 'react-number-format'

export default function PesticideResidueAndRiskIndicatorsTable ({ data, params }) {

  var agg_dri = 0

  data.forEach(function (row) {
    agg_dri = row.fs_dri_kid + agg_dri
  })

  var columns = [
    {
      Header: ' ',
      emptyHeader: true,
      columns: [
        {
          Header: 'Food',
          accessor: 'commodity'
        }
      ]
    },
    {
      Header: 'Number of Samples',
      groupHeader: true,
      columns: [
        {
          Header: 'Total',
          accessor: 'total_samples',
          borderLeft: true
        },
        {
          Header: 'Number of Positives',
          accessor: 'number_positives'
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
          accessor: 'mean_positives',
          Cell: ({ value }) => {
            return <NumberFormat value={value} displayType="text"  decimalScale={3} fixedDecimalScale="true"/>
          },
        },
        {
          Header: 'cRfC (ppm)',
          accessor: 'crfc_kid',
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
          accessor: 'dri_mean_kid',
          Cell: ({ value }) => {
            return <NumberFormat value={value} displayType="text"  decimalScale={5} fixedDecimalScale="true"/>
          },
          borderLeft: true
        },
        {
          Header: 'FS-DRI',
          accessor: d => d.fs_dri_kid,
          Cell: ({ value }) => {
            return <NumberFormat value={value} displayType="text" decimalScale={5} />
          }
        },
        {
          // TODO: Calc these in DB?
          Header: 'Percent of Aggregate FS-DRI',
          accessor: 'fs_dri_kid',
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
