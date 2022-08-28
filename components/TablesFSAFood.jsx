import { useState, useEffect } from 'react'
import { fetchRows } from '../lib/api'
import _ from 'lodash'
import Table from './Table'
import NumberFormat from 'react-number-format'
import { queryParseFood } from '../pages/fsa/by_food'
import decimalSort from './SortingMethods'

export default function ResidueAndRiskIndicatorsTable1 ({ data, params }) {

  var agg_dri = 0

  data.forEach(function (row) {
      agg_dri = row.FS_DRI_Kid + agg_dri
  })
  
  let newData = []
  data.forEach(dat => {
    let key = {
      Percent_FS_DRI_Kid: (dat.FS_DRI_Kid/agg_dri)*100
    }
    dat = {...dat,...key}
    newData.push(dat)
  });
  
  const columns = [
    {
      Header: ' ',
      emptyHeader: true,
      columns: [
        {
          Header: 'Analyte',
          accessor: 'Rpt_Pest_Name',
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
          accessor: 'Number_Positives',
        },
        {
          Header: 'Percent Positive',
          accessor: '%Pos',
          Cell: ({ value }) => {
            return <NumberFormat value={value * 100} displayType="text" decimalScale={1} fixedDecimalScale={true} suffix="%" />
          },
          sortType: decimalSort,
          borderRight: true
        }
      ]
    },
    {
      Header: ' ',
      emptyHeader: true,
      columns: [
        {
          Header: 'Mean Residue (ppm)',
          accessor: 'Mean_Positives',
          Cell: ({ value }) => {
            return <NumberFormat value={value} displayType="text" decimalScale={3} fixedDecimalScale={true}/>
          },
          sortType: decimalSort,
          borderLeft: true
        },
        {
          Header: 'cRfC (ppm)',
          accessor: 'cRfC_Kid',
          Cell: ({ value }) => {
            return <NumberFormat value={value} displayType="text" decimalScale={3} fixedDecimalScale={true}/>
          },
          sortType: decimalSort,
          borderRight: true
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
            return <NumberFormat value={value} displayType="text" decimalScale={5} fixedDecimalScale={true}/>
          },
          sortType: decimalSort,
          borderLeft: true
        },
        {
          Header: 'FS-DRI',
          accessor: 'FS_DRI_Kid',
          Cell: ({ value }) => {
            return <NumberFormat value={value} displayType="text" decimalScale={5} fixedDecimalScale={true}/>
          },
          sortType: decimalSort
        },
        {
          Header: 'Percent of Aggregate FS-DRI',
          accessor: 'Percent_FS_DRI_Kid',
          Cell: ({ value }) => {
            return <NumberFormat value={value} displayType="text" decimalScale={2} suffix="%"/>
          },
          sortType: decimalSort,
          borderRight: true
        }
      ]
    }
  ]

  return (
    <>
      <Table data={newData} columns={columns} params={params} tableNum={1} summary="true" sortBy="Percent_FS_DRI_Kid" type="fsafood" sortDirection="desc"/>
      <style jsx>{`
        .title {
          font-family: Arial, Helvetica, sans-serif;
        }
      `}</style>
    </>
  )
}

export function CRFCTable1 ({ data, params }) {
  
  const [rows, setRows] = useState([])
  
  useEffect(() => {
    // console.log('useEffect - params - fetch rows')
    const query = _.fromPairs(params.map(({ field, selected }) => [field, selected]))
    let queryOverride = queryParseFood(query)
    if (query.Food && query.Sub_Food && query.Claim && query.FSA_Year) {
      fetchRows({table: 'fsa', params: queryOverride, form: 'Food', tableNum: 2} ).then(val => {
        console.log('fetched rows: ', val)
        setRows(val)
      })
    } else {
      console.log('not fetching rows. ', queryOverride)
    }
    // fetch()
  }, [params])

  const columns = [
    {
        Header: 'Analyte',
        accessor: 'Rpt_Pest_Name',
        Cell: row => <div style={{ textAlign: "left"}}>{row.value}</div>
    },
    {
      Header: 'NOAEL (mg/kg/day)',
      accessor: 'Chronic_NOAEL_LOAEL_BMDL',
      sortType: decimalSort
    },
    {
      Header: 'Standard Safety Factor',
      accessor: 'Chronic_SF'
    },
    {
      Header: 'FQPA Safety Factor',
      accessor: 'Chronic_FQPA_SF'
    },
    {
      Header: 'cRfD or cPAD (mg/kg/day)',
      accessor: 'Chronic_RfD_PAD',
      Cell: ({ value }) => {
        return <NumberFormat value={value} displayType="text" decimalScale={4} fixedDecimalScale="true"/>;
      },
      sortType: decimalSort
    },
    {
      Header: 'cRfC (ppm)',
      accessor: 'cRfC_Kid',
      Cell: ({ value }) => {
        return <NumberFormat value={value} displayType="text" decimalScale={3} fixedDecimalScale="true"/>;
      },
      sortType: decimalSort
    }
  ]

  return (
    <>
      <Table data={rows} columns={columns} params={params} sortBy="Rpt_Pest_Name" sortDirection="asc" type="fsafood" tableNum={2} />
      <style jsx>{`
        .title {
          font-family: Helvetica, Arial, sans-serif;
        }
`}</style>
    </>
  )
}

