import { useMemo } from 'react'
import _ from 'lodash'
import Table from './Table'
import NumberFormat from 'react-number-format'
import { queryParse } from '../pages/fsa/by_food'

export default function ResidueAndRiskIndicatorsTable1 ({ data, params }) {
  
  const columns = useMemo(() => [
    {
      Header: '  ',
      emptyHeader: true,
      columns: [
        {
          Header: 'Analyte',
          accessor: 'Rpt_Pest_Name',
          width: 5,
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
          accessor: d => parseFloat(d.percent_positive * 100).toFixed(1).concat('%'),
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
          accessor: d => parseFloat(d.Mean_Positives).toFixed(3),
          borderLeft: true
        },
        {
          Header: 'cRfC (ppm)',
          accessor: d => parseFloat(d.cRfC_Kid).toFixed(3),
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
          accessor: d => parseFloat(d.DRI_Mean_Kid).toFixed(5),
          borderLeft: true
        },
        {
          Header: 'FS-DRI',
          accessor: d => parseFloat(d.FS_DRI_Kid).toFixed(5),
        },
        {
          Header: 'Percent of Aggregate FS-DRI',
          accessor: d => parseFloat(d.per_agg_fsdri * 100).toFixed(2).concat('%'),
          borderRight: true
        }
      ]
    }
  ], [])

  return (
    <>
      <Table data={data} columns={columns} params={params} tableNum={1}/>
      <style jsx>{`
        .title {
          font-family: Arial, Helvetica, sans-serif;
        }
      `}</style>
    </>
  )
}

export function CRFCTable1 ({ data, params }) {
    const query = _.fromPairs(params.map(({ field, selected }) => [field, selected]))
    let queryOverride = queryParse(query)

  const columns = useMemo(() => [
    {
        Header: 'Analyte',
        accessor: 'Rpt_Pest_Name',
        Cell: row => <div style={{ textAlign: "left"}}>{row.value}</div>
    },
    {
      Header: 'NOAEL (mg/kg/day)',
      accessor: 'chronic_noael'
    },
    {
      Header: 'Standard Safety Factor',
      accessor: 'chronic_sf'
    },
    {
      Header: 'FQPA Safety Factor',
      accessor: 'chronic_fqpa_sf'
    },
    {
      Header: 'cRfD or cPAD (mg/kg/day)',
      accessor: 'Chronic_RfD_PAD',
      Cell: ({ value }) => {
        return <NumberFormat value={value} displayType="text" decimalScale={4} fixedDecimalScale="true"/>;
      },
    },
    {
      Header: 'cRfC (ppm)',
      accessor: 'cRfC_Kid',
      Cell: ({ value }) => {
        return <NumberFormat value={value} displayType="text" decimalScale={3} fixedDecimalScale="true"/>;
      },
    }
  ], [])

  return (
    <>
      <Table data={data} columns={columns} params={params} tableNum={2} />
      <style jsx>{`
        .title {
          font-family: Helvetica, Arial, sans-serif;
        }
`}</style>
    </>
  )
}