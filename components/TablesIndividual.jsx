import { useMemo, useState, useEffect } from 'react'
import _, { ceil } from 'lodash'
import Table from './Table'
import NumberFormat from 'react-number-format'
import { fetchRows } from '../lib/api'
import moment from 'moment'

export default function AggregateSamplesTable ({ data, params }) {

  let rows = data
  
  var columns = [
      {
          Header: 'Sample ID',
          accessor: 'sample_id',
          borderLeft: true
        },
        {
          Header: 'Claim',
          accessor: 'claim'
        },
        {
          Header: 'Origin',
          accessor: 'origin_desc'
        },
        {
          Header: 'Country/State',
          accessor: 'state_country'
        },
        {
          Header: 'Number of Residues',
          accessor: 'num_res'
        },
        {
          Header: 'Aggregate Sample DRI',
          accessor: 'aggr_sample_dri',
          Cell: ({ value }) => {
            return <NumberFormat value={value} displayType="text" decimalScale={5} fixedDecimalScale="true"/>;
          },
          borderRight: true
        }
  ]
  return (
    <>
      <Table data={rows} columns={columns} params={params} paging="true" tableNum={1}/>
      <style jsx>{`
        .title {
          font-family: Arial, Helvetica, sans-serif;
        }
`}</style>
    </>
  )
}

export function IndividualSamplesTable ({ params }) {

  var query = {
    pdp_year: params[3].selected
  }
  let pairCommodity
  if (params[0].selected == 'All Foods') {
    
  } else {
    pairCommodity = {
      commodity: params[0].selected
    }
  }
  query = {...query, ...pairCommodity};
  let pairOrigin
  if (params[1].selected == 'All Samples' | params[1].selected == 'Combined Imports' | params[1].selected == 'Domestic Samples' | params[1].selected == 'Unknown') {
    if (params[1].selected == "Combined Imports") {
      pairOrigin = {
        origin: 2
      }
    } else if (params[1].selected == 'Domestic Samples') {
      pairOrigin = {
          origin: 1
      }
    } else if (params[1].selected == 'Unknown') {
      pairOrigin = {
          origin: 3
      }
    }
  } else {
    pairOrigin = {
      country_name: params[1].selected
    }
  }
  query = {...query, ...pairOrigin};
  let pairMarket
  if (params[2].selected !== 'All Market Claims') {
    pairMarket = {
      claim: params[2].selected
    }
    query = {...query, ...pairMarket};
  }

  const [rows, setRows] = useState([])
  useEffect(() => {

    if (query.pdp_year) {
      fetchRows({ table: 'dri', params: query, form: 'Individual', tableNum: 2 }).then(val => {
        console.log('fetched rows: ', val)
        setRows(val)
      })
    } else {
      console.log('not fetching rows. ', query)
      setRows([])
    }
    
  }, [params])

  var columns = [
      {
          Header: 'Sample ID',
          accessor: 'sample_id',
          borderLeft: true
        },
        {
          Header: 'Analyte',
          accessor: 'rpt_pest_name',
          Cell: row => <div style={{ textAlign: "left"}}>{row.value}</div>
        },
        {
          Header: 'Residue Level (ppm)',
          accessor: 'residue_ppm',
          Cell: ({ value }) => {
            return <NumberFormat value={value} displayType="text" decimalScale={5} fixedDecimalScale="true"/>;
          },
        },
        {
          Header: 'DRI',
          accessor: 'dri',
          Cell: ({ value }) => {
            return <NumberFormat value={value} displayType="text" decimalScale={5} fixedDecimalScale="true"/>;
          }
        },
        {
          Header: 'Tolerance Level (ppm)',
          accessor: 'tolerance'
        },
        {
          Header: 'Residue as a % of Tolerance',
          accessor: d => d.residue_ppm / d.tolerance * 100,
          Cell: ({ value }) => {
            return <NumberFormat value={value} displayType="text" decimalScale={2} fixedDecimalScale="true" suffix="%"/>
          }
        },
        {
          Header: 'Type of Tolerance',
          accessor: 'notes',
          Cell: ({ value }) => {
            if (value == 'PP') {
              return 'PH'
            } else return value
          }
        },
        {
          Header: 'AI Type',
          accessor: 'ai_type'
        },
        {
          Header: ' Claim',
          accessor: 'claim'
        },
        {
          Header: 'Sample Date',
          accessor: 'sample_date',
          Cell: ({ value }) => {
            return moment(value).format('MM/DD/YYYY');
          }
        },
        {
          Header: 'Origin',
          accessor: 'origin_desc'
        },
        {
          Header: 'Country/State',
          accessor: 'state_country',
          borderRight: true
        }
  ]
  return (
    <>
      <Table
        data={rows}
        columns={columns}
        params={params}
        getCellProps={cellInfo => ({
          style: {
            color: cellInfo.column.Header == 'Residue as a % of Tolerance' && cellInfo.value >= 100 ? 'red' : null
          }
        })}
        summary="true"
        paging="true"
        tableNum={2}
      />
      <style jsx>{`
        .title {
          font-family: Arial, Helvetica, sans-serif;
        }
`}</style>
    </>
  )
}

export function AltIndividualSamplesTable({ params }) {

  var query = {
    pdp_year: params[3].selected
  }
  let pairCommodity
  if (params[0].selected == 'All Foods') {
    
  } else {
    pairCommodity = {
      commodity: params[0].selected
    }
  }
  query = {...query, ...pairCommodity};
  let pairOrigin
  if (params[1].selected == 'All Samples' | params[1].selected == 'Combined Imports' | params[1].selected == 'Domestic Samples' | params[1].selected == 'Unknown') {
    if (params[1].selected == "Combined Imports") {
      pairOrigin = {
        origin: 2
      }
    } else if (params[1].selected == 'Domestic Samples') {
      pairOrigin = {
          origin: 1
      }
    } else if (params[1].selected == 'Unknown') {
      pairOrigin = {
          origin: 3
      }
    }
  } else {
    pairOrigin = {
      country_name: params[1].selected
    }
  }
  query = {...query, ...pairOrigin};
  let pairMarket
  if (params[2].selected !== 'All Market Claims') {
    pairMarket = {
      claim: params[2].selected
    }
    query = {...query, ...pairMarket};
  }

  const [rows, setRows] = useState([])
  useEffect(() => {

    if (query.pdp_year) {
      fetchRows({ table: 'dri', params: query, form: 'Individual', tableNum: 3 }).then(val => {
        console.log('fetched rows: ', val)
        setRows(val)
      })
    } else {
      console.log('not fetching rows. ', query)
      setRows([])
    }
    
  }, [params])

  var columns = [
    {
      Header: 'Sample ID',
      accessor: 'sample_id',
      borderLeft: true
    },
    {
      Header: 'Analyte',
      accessor: 'rpt_pest_name',
      Cell: row => <div style={{ textAlign: "left"}}>{row.value}</div>
    },
    {
      Header: 'Residue Level (ppm)',
      accessor: 'residue_ppm',
      Cell: ({ value }) => {
        return <NumberFormat value={value} displayType="text" decimalScale={5} fixedDecimalScale="true"/>;
      },
    },
    {
      Header: 'DRI',
      accessor: 'dri',
      Cell: ({ value }) => {
        return <NumberFormat value={value} displayType="text" decimalScale={5} fixedDecimalScale="true"/>;
      }
    },
    {
      Header: 'Tolerance Level (ppm)',
      accessor: 'tolerance'
    },
    {
      Header: 'Residue as a % of Tolerance',
      accessor: d => d.residue_ppm / d.tolerance * 100,
      Cell: ({ value }) => {
        return <NumberFormat value={value} displayType="text" decimalScale={2} fixedDecimalScale="true" suffix="%"/>
      }
    },
    {
      Header: 'Type of Tolerance',
      accessor: 'notes',
      Cell: ({ value }) => {
        if (value == 'PP') {
          return 'PH'
        } else return value
      }
    },
    {
      Header: 'AI Type',
      accessor: 'ai_type'
    },
    {
      Header: ' Claim',
      accessor: 'claim'
    },
    {
      Header: 'Sample Date',
      accessor: 'sample_date',
      Cell: ({ value }) => {
        return moment(value).format('MM/DD/YYYY');
      }
    },
    {
      Header: 'Origin',
      accessor: 'origin_desc'
    },
    {
      Header: 'Country/State',
      accessor: 'state_country',
      borderRight: true
    }
  ]

  return (
    <>
      <Table
        data={rows}
        columns={columns}
        params={params}
        getCellProps={cellInfo => ({
          style: {
            color: cellInfo.column.Header == 'Residue as a % of Tolerance' && cellInfo.value >= 100 ? 'red' : null
          }
        })}
        summary="true"
        paging="true"
        tableNum={3}
      />
      <style jsx>{`
        .title {
          font-family: Arial, Helvetica, sans-serif;
        }
  `}</style>
    </>
  )
}