import { useMemo } from 'react'
import Table from './Table'
import NumberFormat from 'react-number-format'

export default function ResidueAndRiskIndicatorsTable ({ data, params }) {

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
      groupHeader: true,
      columns: [
        {
          Header: 'Analyte',
          accessor: 'Rpt_Pest_Name',
          width: 5
          //Cell: row => <div style={{ textAlign: "left"}}>{row.value}</div>
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
          accessor: 'Percent_Positive',
          Cell: ({ value }) => {
            return <NumberFormat value={value * 100} displayType="text" decimalScale={1} fixedDecimalScale={true} suffix="%"/>
          },
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
          borderLeft: true
        },
        {
          Header: 'cRfC (ppm)',
          accessor: 'cRfC_Kid',
          Cell: ({ value }) => {
            return <NumberFormat value={value} displayType="text" decimalScale={3} fixedDecimalScale={true}/>
          },
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
          borderLeft: true
        },
        {
          Header: 'FS-DRI',
          accessor: 'FS_DRI_Kid',
          Cell: ({ value }) => {
            return <NumberFormat value={value} displayType="text" decimalScale={5} fixedDecimalScale={true}/>
          }
        },
        {
          Header: 'Percent of Aggregate FS-DRI',
          accessor: 'Percent_FS_DRI_Kid',
          Cell: ({ value }) => {
            return <NumberFormat value={value} displayType="text" decimalScale={2} suffix="%"/>
          },
          borderRight: true
        }
      ]
    }
  ]

  return (
    <>
      <Table data={newData} columns={columns} params={params} summary="true" tableNum={1}/>
      <style jsx>{`
        .title {
          font-family: Arial, Helvetica, sans-serif;
        }
      `}</style>
    </>
  )
}

export function CRFCTable ({ data, params }) {

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
      accessor: 'chronic_rfd_pad',
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