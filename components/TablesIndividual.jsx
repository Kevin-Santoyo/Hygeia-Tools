import { useMemo, useState } from 'react'
import _ from 'lodash'
import Table from './Table'
import NumberFormat from 'react-number-format'
import moment from 'moment'

export default function IndividualSamplesTable ({ data, params }) {

  var agg_dri = 0

  var columns = [
      {
          Header: 'Sample ID',
          accessor: 'sample_id'
        },
        {
          Header: 'Sample Date',
          accessor: 'sample_date',
          Cell: ({ value }) => {
            return moment(value).format('MM/DD/YYYY');
          }
        },
        {
          Header: 'Analyte',
          accessor: 'rpt_pest_name',
          borderLeft: true
        },
        {
          Header: 'Concentration (ppm)',
          accessor: 'residue_ppm',
          Cell: ({ value }) => {
            return <NumberFormat value={value} displayType="text" decimalScale={4} fixedDecimalScale="true"/>;
          },
        },
        {
          Header: 'DRI',
          accessor: 'dri',
          Cell: ({ value }) => {
            return <NumberFormat value={value} displayType="text" decimalScale={6} fixedDecimalScale="true"/>;
          },
          borderRight: true
        },
        {
          Header: 'Market Claim',
          accessor: 'claim'
        },
        {
          Header: 'Origin',
          accessor: 'origin_desc'
        },
        {
          Header: 'State',
          accessor: 'state',
          borderLeft: true
        },
        {
          Header: 'Post-Harvest',
          accessor: 'post_harvest_code',
          Cell: ({ value }) => {
            if (value == 'PH') {
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
