import _ from 'lodash'
import Table from './Table'
import NumberFormat from 'react-number-format'
import { fetchRows } from '../lib/api'
import { useEffect, useState } from 'react'

export default function Table5 ({ data, params }) {

    var totalDRI = 0
    var totalFS = 0
    data.forEach(function (row) {
        totalDRI = row.SumOfDRI_Mean_Kid + totalDRI
        totalFS = row.SumOfFS_DRI_Kid + totalFS
    })

    var columns = [
        {
            Header: 'Food',
            accessor: 'commodity',
            Cell: row => <div style={{ textAlign: "left"}}>{row.value}</div>,
            borderLeft: true
        },
        {
            Header: 'PDP Year',
            accessor: 'pdp_year'
        },
        {
            Header: 'Average Number of Samples per Pesticide',
            accessor: 'AvgOfTotal_Samples',
            Cell: ({ value }) => {
                return <NumberFormat value={value} displayType="text" decimalScale={0} fixedDecimalScale="true"/>;
            }
        },
        {
            Header: 'Number of Positives',
            accessor: 'SumOfNumber_Positives'
        },
        {
            Header: 'Average Number of Residues per Sample',
            accessor: d => d.SumOfNumber_Positives/d.AvgOfTotal_Samples,
            Cell: ({ value }) => {
                return <NumberFormat value={value} displayType="text" decimalScale={2} fixedDecimalScale="true"/>;
            }
        },
        {
            Header: 'Positive Sample DRI',
            accessor: 'SumOfDRI_Mean_Kid',
            Cell: ({ value }) => {
                return <NumberFormat value={value} displayType="text" decimalScale={4} fixedDecimalScale="true"/>;
            }
        },
        {
            Header: 'Percent of Total DRI-M',
            accessor: d => d.SumOfDRI_Mean_Kid,
            Cell: ({ value }) => {
                return <NumberFormat value={value/totalDRI * 100} displayType="text" decimalScale={1} fixedDecimalScale="true" suffix="%"/>
            }
        },
        {
            Header: 'Total FS-DRI',
            accessor: 'SumOfFS_DRI_Kid',
            Cell: ({ value }) => {
                return <NumberFormat value={value} displayType="text" decimalScale={5} fixedDecimalScale="true"/>;
            }
        },
        {
            Header: 'Percent of Total FS-DRI',
            accessor: d => d.SumOfFS_DRI_Kid,
            Cell: ({ value }) => {
                return <NumberFormat value={value/totalFS * 100} displayType="text" decimalScale={2} fixedDecimalScale="true" suffix="%"/>
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
  
export function Table6 ({ params }) {

    var query = {
        pdp_year: params[2].selected
      }
    let pairOrigin
    if (params[0].selected == 'All Samples') {
        pairOrigin = {
            origin: "All"
        }
    } else if (params[0].selected == 'Combined Imports') {
        pairOrigin = {
            origin: "Imported"
        }
    } else if (params[0].selected == 'Domestic Samples') {
        pairOrigin = {
            origin: "Domestic"
        }
    } else {
        pairOrigin = {
            country_name: params[0].selected
        }
    }
    let pairMarket
    if (params[1].selected == 'All Market Claims') {
        pairMarket = {
            claim: "All"
        }
    } else {
        pairMarket = {
            claim: params[1].selected
        }
    }
    query = {...query, ...pairMarket};
    query = {...query, ...pairOrigin};
    
    const [rows, setRows] = useState([])
    useEffect(() => {
        if (query) {
            fetchRows({ table: 'dri', params: query, form: '56', tableNum: 2 }).then(val => {
              console.log('fetched rows: ', val)
              setRows(val)
            })
          } else {
            console.log('not fetching rows. ', query)
            setRows([])
          }
    }, [params])

    var totalDRI = 0
    var totalFS = 0
    var totalPos = 0
    rows.forEach(function (row) {
        totalDRI = row.SumOfDRI_Mean_Kid + totalDRI
        totalFS = row.SumOfFS_DRI_Kid + totalFS
        totalPos = row.SumOfNumber_Positives + totalPos
    })

    var columns = [
        {
            Header: 'Analyte',
            accessor: 'pesticide',
            Cell: row => <div style={{ textAlign: "left"}}>{row.value}</div>,
            borderLeft: true
        },
        {
            Header: 'Family of Chemistry',
            accessor: 'foc',
            Cell: row => <div style={{ textAlign: "left"}}>{row.value}</div>,
        },
        {
            Header: 'PDP Year',
            accessor: 'pdp_year'
        },
        {
            Header: 'Total Samples Across All Foods',
            accessor: 'SumOfTotal_Samples'
        },
        {
            Header: 'Number of Positives',
            accessor: 'SumOfNumber_Positives'
        },
        {
            Header: 'Percent Total Samples Positive',
            accessor: d => d.SumOfNumber_Positives,
            Cell: ({ value }) => {
                return <NumberFormat value={value/totalPos * 100} displayType="text" decimalScale={2} fixedDecimalScale="true" suffix="%"/>
            }
        },
        {
            Header: 'Positive Sample DRI-M',
            accessor: 'SumOfDRI_Mean_Kid',
            Cell: ({ value }) => {
                return <NumberFormat value={value} displayType="text" decimalScale={4} fixedDecimalScale="true"/>
            }
        },
        {
            Header: 'Percent of Total DRI-M',
            accessor: d => d.SumOfDRI_Mean_Kid,
            Cell: ({ value }) => {
                return <NumberFormat value={value/totalDRI * 100} displayType="text" decimalScale={2} fixedDecimalScale="true" suffix="%"/>
            }
        },
        {
            Header: 'Total FS-DRI',
            accessor: 'SumOfFS_DRI_Kid',
            Cell: ({ value }) => {
                return <NumberFormat value={value} displayType="text" decimalScale={5} fixedDecimalScale="true"/>
            }
        },
        {
            Header: 'Percent of Total FS-DRI',
            accessor: d => d.SumOfFS_DRI_Kid,
            Cell: ({ value }) => {
                return <NumberFormat value={value/totalFS * 100} displayType="text" decimalScale={2} fixedDecimalScale="true" suffix="%"/>
            }
        }
    ]
    
    return (
      <>
        <Table data={rows} columns={columns} params={params} tableNum={2} />
        <style jsx>{`
          .title {
            font-family: Helvetica, Arial, sans-serif;
          }
  `}</style>
      </>
    )
}