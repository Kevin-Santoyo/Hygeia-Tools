import { useEffect, useState, useMemo } from 'react'
import Table from './Table'
import NumberFormat from 'react-number-format'
import { fetchRows } from '../lib/api'
import KeyFindings from './KeyFindings'
import Methods from './Methods'

export default function ConventialOrganicTable1 ({ data, params }) {
  
  const columns = useMemo(() => [
    {
      Header: ' ',
      emptyHeader: true,
      columns: [
        {
          Header: ' ',
          accessor: 'market'
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
      <Methods />
      <KeyFindings data={data} tableNum={1}/>
      <style jsx>{`
        .title {
          font-family: Arial, Helvetica, sans-serif;
        }
      `}</style>
    </>
  )
}

export function ConventialOrganicTable2 ({ params }){

  const [rows, setRows] = useState([])

  useEffect(() => {

    const query = _.fromPairs(params.map(({ field, selected }) => [field, selected]))

    if (query.commodity && query.pdp_year) {
      fetchRows({ table: 'dri', params: query, form: 'Conventional', tableNum: 2 }).then(val => {
        console.log('fetched rows: ', val)
        setRows(val)
      })
    } else {
      console.log('not fetching rows. ', query)
      setRows([])
    }
    
  }, [params])


  const columns = useMemo(() => [
    {
      Header: ' ',
      emptyHeader: true,
      columns: [
        {
          Header: 'Analyte',
          accessor: 'pesticide'
        },
        {
          Header: 'Total Samples',
          accessor: 'total_samples'
        },
        {
          Header: 'Number of Positives',
          accessor: 'number_positives'
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
          accessor: 'mean_positives',
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
          accessor: 'dri_mean_kid',
          Cell: ({ value }) => {
            return <NumberFormat value={value} displayType="text" decimalScale={5} fixedDecimalScale="true" />
          }
        },
        {
          Header: 'FS-DRI',
          accessor: 'fs_dri_kid',
          Cell: ({ value }) => {
            return <NumberFormat value={value} displayType="text" decimalScale={5} fixedDecimalScale="true" />
          }
        }
      ]
    }
  ])
  
  return (
    <>
      <Table data={rows} columns={columns} params={params} summary="true" tableNum={2} />
      <KeyFindings data={rows} tableNum={2}/>
      <style jsx>{`
        .title {
          font-family: Arial, Helvetica, sans-serif;
        }
      `}</style>
    </>
  )
}

export function ConventialOrganicTable3 ({ params }){

  const [rows, setRows] = useState([])

  useEffect(() => {

    const query = _.fromPairs(params.map(({ field, selected }) => [field, selected]))

    if (query.commodity && query.pdp_year) {
      fetchRows({ table: 'dri', params: query, form: 'Conventional', tableNum: 3 }).then(val => {
        console.log('fetched rows: ', val)
        setRows(val)
      })
    } else {
      console.log('not fetching rows. ', query)
      setRows([])
    }
    // fetch()
  }, [params])

  const columns = useMemo(() => [
    {
      Header: ' ',
      emptyHeader: true,
      columns: [
        {
          Header: 'Analyte',
          accessor: 'pesticide'
        },
        {
          Header: 'Post-Harvest Fungicide',
          accessor: 'ph_fungicide',
          Cell: ({ value }) => {
            if (value) {
              return 'Yes'
            } else return 'No'
          }
        },
        {
          Header: 'Number of Positives',
          accessor: 'number_positives'
        },
        {
          Header: 'Organic Mean of Positives (ppm',
          accessor: 'mean_positives',
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
          accessor: 'dri_mean_kid',
          Cell: ({ value }) => {
            return <NumberFormat value={value} displayType="text" decimalScale={5} fixedDecimalScale="true" />
          }
        }
      ]
    }
  ])
  
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

export function ConventialOrganicTable4 ({ params }){

  const [rows, setRows] = useState([])

  useEffect(() => {

    const query = _.fromPairs(params.map(({ field, selected }) => [field, selected]))

    if (query.commodity && query.pdp_year) {
      fetchRows({ table: 'dri', params: query, form: 'Conventional', tableNum: 4 }).then(val => {
        console.log('fetched rows: ', val)
        setRows(val)
      })
    } else {
      console.log('not fetching rows. ', query)
      setRows([])
    }
    // fetch()
  }, [params])

  const columns = useMemo(() => [
    {
      Header: ' ',
      emptyHeader: true,
      columns: [
        {
          Header: 'Analyte',
          accessor: 'pesticide'
        },
        {
          Header: 'Total Samples',
          accessor: 'total_samples'
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
          accessor: 'mean_positives',
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
          accessor: 'dri_mean_kid',
          Cell: ({ value }) => {
            return <NumberFormat value={value} displayType="text" decimalScale={5} fixedDecimalScale="true" />
          }
        },
        {
          Header: 'FS-DRI',
          accessor: 'fs_dri_kid',
          Cell: ({ value }) => {
            return <NumberFormat value={value} displayType="text" decimalScale={6} fixedDecimalScale="true" />
          }
        }
      ]
    }
  ])
  
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