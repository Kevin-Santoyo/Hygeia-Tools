import { useMemo, useState, useEffect } from 'react'
import _, { ceil } from 'lodash'
import Table from './Table'
import NumberFormat from 'react-number-format'
import { fetchRows } from '../lib/api'
import moment from 'moment'
import { queryParseIndividualFSA } from '../pages/fsa/individual_samples'
import decimalSort from './SortingMethods'

export default function AggregateSamplesTable ({ data, params }) {
  
  var columns = [
      {
          Header: 'Sample ID',
          accessor: 'Sample_Id',
          borderLeft: true
        },
        {
          Header: 'Claim',
          accessor: 'Market_Claim'
        },
        {
          Header: 'Origin',
          accessor: 'Origin'
        },
        {
          Header: 'Country/State',
          accessor: 'Country'
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
          sortType: decimalSort,
          borderRight: true
        }
  ]
  return (
    <>
      <Table data={data} columns={columns} params={params} paging="true"sortBy="aggr_sample_dri" sortDirection="desc" type="fsaindividual" tableNum={1}/>
      <style jsx>{`
        .title {
          font-family: Arial, Helvetica, sans-serif;
        }
`}</style>
    </>
  )
}

export function IndividualSamplesTable ({ params }) {

  const [rows, setRows] = useState([])
  useEffect(() => {
    var query = _.fromPairs(params.map(({ field, selected }) => [field, selected]))
    
    query = queryParseIndividualFSA(query)
    if (query.Food && query.Sub_Food) {
      fetchRows({ table: 'fsa', params: query, form: 'Individual', tableNum: 2 }).then(val => {
        console.log('fetched rows: ', val)
        setRows(val)
      })
    } else {
      console.log('not fetching rows. ', query)
      setRows([])
    }
    
  }, [params])

  let newData = []
  rows.forEach(row => {
    let key = {
      MRLPercentage: (row.Concentration / row.MRL) * 100
    }
    row = {...row,...key}
    newData.push(row)
  });

  var columns = [
      {
          Header: 'Sample ID',
          accessor: 'Sample_Id',
          borderLeft: true
        },
        {
          Header: 'Analyte',
          accessor: 'Rpt_Pest_Name',
          Cell: row => <div style={{ textAlign: "left"}}>{row.value}</div>
        },
        {
          Header: 'Residue Level (ppm)',
          accessor: 'Concentration',
          Cell: ({ value }) => {
            return <NumberFormat value={value} displayType="text" decimalScale={5} fixedDecimalScale="true"/>;
          },
          sortType: decimalSort
        },
        {
          Header: 'DRI',
          accessor: 'DRI',
          Cell: ({ value }) => {
            return <NumberFormat value={value} displayType="text" decimalScale={5} fixedDecimalScale="true"/>;
          },
          sortType: decimalSort
        },
        {
          Header: 'MRL Level (ppm)',
          accessor: 'MRL',
          sortType: decimalSort
        },
        {
          Header: 'Residue as a % of MRL',
          accessor: 'MRLPercentage',
          Cell: ({ value }) => {
            return <NumberFormat value={value} displayType="text" decimalScale={2} fixedDecimalScale="true" suffix="%"/>
          },
          sortType: decimalSort
        },
        {
          Header: 'AI Type',
          accessor: 'AI_Type'
        },
        {
          Header: 'Claim',
          accessor: 'Market_Claim'
        },
        {
          Header: 'Sample Date',
          accessor: 'sample_date',
        //  Cell: ({ value }) => {
          //  return moment(value).format('MM/DD/YYYY');
          //}
        },
        {
          Header: 'Origin',
          accessor: 'Origin'
        },
        {
          Header: 'Country/State',
          accessor: 'Country',
          borderRight: true
        }
  ]
  return (
    <>
      <Table
        data={newData}
        columns={columns}
        params={params}
        getCellProps={cellInfo => ({
          style: {
            color: cellInfo.column.Header == 'Residue as a % of Tolerance' && cellInfo.value >= 100 ? 'red' : null
          }
        })}
        summary="true"
        paging="true"
        type="fsaindividual"
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

  const [rows, setRows] = useState([])
  useEffect(() => {
    var query = _.fromPairs(params.map(({ field, selected }) => [field, selected]))
    
    if (query.FSA_Year) {
      fetchRows({ table: 'fsa', params: query, form: 'Individual', tableNum: 3 }).then(val => {
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
      Header: 'Claim',
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
        type="fsaindividual"
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