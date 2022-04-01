import { useEffect, useState, useMemo } from 'react'
import Table from './Table'
import NumberFormat from 'react-number-format'
import { fetchRows } from '../lib/api'
import KeyFindings from './KeyFindings'
import GraphicsTabs from './GraphicsTabs'

export default function FSAConventionalTable1 ({ data, params }) {
  
  console.log('Fetched rows table 1: ', data)

  const columns = useMemo(() => [
    {
      Header: ' ',
      emptyHeader: true,
      columns: [
        {
          Header: ' ',
          accessor: 'Claim'
        },
        {
          Header: 'Total Samples',
          accessor: 'avg_total_samples'
        },
        {
            Header: 'Number of Residues Found',
            accessor: 'sum_number_positives'
        },
        {
            Header: 'Average Number of Residues per Sample',
            accessor: 'avg_number_residues',
            Cell: ({ value }) => {
              return <NumberFormat value={value} displayType="text"  decimalScale={2} fixedDecimalScale="true"/>
            },
        },
        {
            Header: '% Samples with Zero Residue',
            accessor:'per_zero_residues',
            Cell: ({ value }) => {
              return <NumberFormat value={value*100} displayType="text"  decimalScale={1} fixedDecimalScale="true" suffix="%"/>
            },
        }
      ]
    },
    {
      Header: 'Dietary Risk Indicators',
      groupHeader: true,
      columns: [
        {
          Header: 'DRI-M',
          accessor: 'sum_dri_mean',
          Cell: ({ value }) => {
            return <NumberFormat value={value} displayType="text"  decimalScale={4} />
          },
          borderLeft: true
        },
        {
          Header: 'FS-DRI',
          accessor: 'sum_dri_fs',
          Cell: ({ value }) => {
            return <NumberFormat value={value} displayType="text" decimalScale={4}/>
          },
        }
      ]
    }
  ], [])
  

  return (
    <>
      <Table data={data} columns={columns} params={params} summary="true" tableNum={1} />
      <KeyFindings data={data} tableNum={1}/>
      {/*<GraphicsTabs data={data} params={params}/>*/}
      <style jsx>{`
        .title {
          font-family: Arial, Helvetica, sans-serif;
        }
      `}</style>
    </>
  )
}

export function FSAConventionalTable2 ({ params }){

  const [rows, setRows] = useState([])

  useEffect(() => {

    const query = _.fromPairs(params.map(({ field, selected }) => [field, selected]))

    if (query.Food && query.Sub_Food && query.FSA_Year) {
      fetchRows({ table: 'fsa', params: query, form: 'Conventional', tableNum: 2 }).then(val => {
        console.log('fetched rows table 2: ', val)
        setRows(val)
      })
    } else {
      console.log('not fetching rows. ', query)
      setRows([])
    }
    
  }, [params])


  const columns = [
    {
      Header: ' ',
      emptyHeader: true,
      columns: [
        {
          Header: 'Analyte',
          accessor: 'Rpt_Pest_Name',
          Cell: row => <div style={{ textAlign: "left"}}>{row.value}</div>
        },
        {
          Header: 'Total Samples',
          accessor: 'Total_Samples'
        },
        {
          Header: 'Number of Positives',
          accessor: 'Number_Positives'
        },
        {
          Header: 'Percent Positive',
          accessor: 'percent_positive',
          Cell: ({ value }) => {
            return <NumberFormat value={value*100} displayType="text" decimalScale={1} fixedDecimalScale="true" suffix="%" />
          }
        },
        {
          Header: 'Mean of Positives (ppm)',
          accessor: 'Mean_Positives',
          Cell: ({ value }) => {
            return <NumberFormat value={value} displayType="text" decimalScale={4} fixedDecimalScale="true" />
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
          accessor: 'DRI_Mean_Kid',
          Cell: ({ value }) => {
            return <NumberFormat value={value} displayType="text" decimalScale={5} fixedDecimalScale="true" />
          }
        },
        {
          Header: 'FS-DRI',
          accessor: 'FS_DRI_Kid',
          Cell: ({ value }) => {
            return <NumberFormat value={value} displayType="text" decimalScale={5} fixedDecimalScale="true" />
          }
        }
      ]
    }
  ]
  
  return (
    <>
      <Table data={rows} columns={columns} params={params} summary="true" tableNum={2} />
      <KeyFindings data={rows} tableNum={2} food={params[0].selected}/>
      <style jsx>{`
        .title {
          font-family: Arial, Helvetica, sans-serif;
        }
      `}</style>
    </>
  )
}

export function FSAConventionalTable3 ({ params }){

  const [rows, setRows] = useState([])

  useEffect(() => {

    const query = _.fromPairs(params.map(({ field, selected }) => [field, selected]))

    if (query.Food && query.Sub_Food && query.FSA_Year) {
      fetchRows({ table: 'fsa', params: query, form: 'Conventional', tableNum: 3 }).then(val => {
        console.log('fetched rows table 3: ', val)
        setRows(val)
      })
    } else {
      console.log('not fetching rows. ', query)
      setRows([])
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
          Header: 'Post-Harvest Fungicide',
          accessor: 'PH_Fungicide',
          Cell: ({ value }) => {
            if (value) {
              return 'Yes'
            } else return 'No'
          }
        },
        {
          Header: 'Number of Positives',
          accessor: 'Number_Positives'
        },
        {
          Header: 'Organic Mean of Positives (ppm',
          accessor: 'Mean_Positives',
          Cell: ({ value }) => {
            return <NumberFormat value={value} displayType="text" decimalScale={4} fixedDecimalScale="true" />
          }
        },
        {
          Header: 'Tolerance or Action Level (ppm)',
          accessor: 'tolerance',
          Cell: ({ value }) => {
            return <NumberFormat value={value} displayType="text" decimalScale={2} fixedDecimalScale="true" />
          }
        },
        {
          Header: 'Action Threshold (AT) (5% of Tolerance)',
          accessor: 'action_threshold',
          Cell: ({ value }) => {
            return <NumberFormat value={value} displayType="text" decimalScale={3} fixedDecimalScale="true" />
          }
        },
        {
          Header: 'Residues Over Action Threshold',
          accessor: 'number_residues_exceed_at',
          Cell: ({ value }) => {
            return <NumberFormat value={value} displayType="text" />
          }
        },
        {
          Header: 'Conventional Mean of Positives (ppm)',
          accessor: 'conventional_mean_residue',
          Cell: ({ value }) => {
            return <NumberFormat value={value} displayType="text" decimalScale={4} fixedDecimalScale="true" defaultValue={0} />
          }
        },
        {
          Header: 'Number of Inadvertent Residues',
          accessor: 'number_inadvertent_residues',
          Cell: ({ value }) => {
            return <NumberFormat value={value} displayType="text"/>
          }
        },
        {
          Header: 'DRI-M',
          accessor: 'DRI_Mean_Kid',
          Cell: ({ value }) => {
            return <NumberFormat value={value} displayType="text" decimalScale={5} fixedDecimalScale="true" />
          }
        }
  ]
  
  return (
    <>
      <Table data={rows} columns={columns} params={params} summary="true" tableNum={3}/>
      <KeyFindings data={rows} tableNum={3}/>
      <style jsx>{`
        .title {
          font-family: Arial, Helvetica, sans-serif;
        }
      `}</style>
    </>
  )
}

export function FSAConventionalTable4 ({ params }){

  const [rows, setRows] = useState([])

  useEffect(() => {

    const query = _.fromPairs(params.map(({ field, selected }) => [field, selected]))

    if (query.Food && query.Sub_Food && query.FSA_Year) {
      fetchRows({ table: 'fsa', params: query, form: 'Conventional', tableNum: 4 }).then(val => {
        console.log('fetched rows table 4: ', val)
        setRows(val)
      })
    } else {
      console.log('not fetching rows. ', query)
      setRows([])
    }
    // fetch()
  }, [params])

  const columns = [
    {
      Header: ' ',
      emptyHeader: true,
      columns: [
        {
          Header: 'Analyte',
          accessor: 'Rpt_Pest_Name',
          Cell: row => <div style={{ textAlign: "left"}}>{row.value}</div>
        },
        {
          Header: 'Total Samples',
          accessor: 'Total_Samples'
        },
        {
          Header: 'Percent Positive',
          accessor: 'percent_positive',
          Cell: ({ value }) => {
            return <NumberFormat value={value*100} displayType="text" decimalScale={1} fixedDecimalScale="true" suffix="%"/>
          }
        },
        {
          Header: 'Mean of Positives (ppm)',
          accessor: 'Mean_Positives',
          Cell: ({ value }) => {
            return <NumberFormat value={value} displayType="text" decimalScale={4} fixedDecimalScale="true" />
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
          accessor: 'DRI_Mean_Kid',
          Cell: ({ value }) => {
            return <NumberFormat value={value} displayType="text" decimalScale={5} fixedDecimalScale="true" />
          }
        },
        {
          Header: 'FS-DRI',
          accessor: 'FS_DRI_Kid',
          Cell: ({ value }) => {
            return <NumberFormat value={value} displayType="text" decimalScale={6} fixedDecimalScale="true" />
          }
        }
      ]
    }
  ]
  
  return (
    <>
      <Table data={rows} columns={columns} params={params} summary="true" tableNum={4}/>
      <KeyFindings data={rows} tableNum={4}/>
      <style jsx>{`
        .title {
          font-family: Arial, Helvetica, sans-serif;
        }
      `}</style>
    </>
  )
}