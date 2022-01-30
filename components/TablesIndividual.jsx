import { useMemo, useState } from 'react'
import _ from 'lodash'
import Table from './Table'
import NumberFormat from 'react-number-format'

export default function IndividualSamplesTable ({ data, params }) {

  var agg_dri = 0

  data.forEach(function (row) {
    agg_dri = row.fs_dri_kid + agg_dri
  })

  var columns = [
      {
          Header: 'Sample ID',
          accessor: 'sample_id'
        },
        {
          Header: 'Analyte',
          accessor: 'rpt_pest_name',
          borderLeft: true
        },
        {
          Header: 'Concentration (ppm)',
          accessor: 'residue_ppm'
        },
        {
          Header: 'DRI',
          accessor: 'residue_dri',
          borderRight: true
        },
        {
          Header: 'Market Claim',
          accessor: 'claim'
        },
        {
          Header: 'Origin',
          accessor: 'country_name'
        },
        {
          Header: 'State',
          accessor: 'dri_mean_kid',
          borderLeft: true
        },
        {
          Header: 'Post-Harvest',
          accessor: 'ph_fungicide',
          Cell: ({ value }) => {
            if (value) {
              return 'Yes'
            } else return 'No'
          }
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
