import { useMemo, useState } from 'react'
import _ from 'lodash'
import Table from './Table'

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
            return (value * 100).toFixed(1).concat('%')
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
            return value.toFixed(3)
          },
        },
        {
          Header: 'cRfC (ppm)',
          accessor: 'crfc_kid',
          Cell: ({ value }) => {
            return value.toFixed(3)
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
            return value.toFixed(5)
          },
          borderLeft: true
        },
        {
          Header: 'FS-DRI',
          accessor: d => parseFloat(d.fs_dri_kid).toFixed(5)
        },
        {
          // TODO: Calc these in DB?
          Header: 'Percent of Aggregate FS-DRI',
          accessor: 'fs_dri_kid',
          Cell: ({ value }) => {
            return ((value / agg_dri) * 100).toFixed(2).concat('%')
          }
        }
      ]
    }
  ]
  return (
    <>
      <Table data={data} columns={columns} params={params} type="residue" summary="true" form="pesticide"/>
      <style jsx>{`
        .title {
          font-family: Arial, Helvetica, sans-serif;
        }
`}</style>
    </>
  )
}
