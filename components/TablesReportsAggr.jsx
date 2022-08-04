import _ from 'lodash'
import Table from './Table'
import NumberFormat from 'react-number-format'
import { fetchRows } from '../lib/api'
import { useEffect, useState } from 'react'
import decimalSort from './SortingMethods'

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
            accessor: 'Commodity_Name',
            Cell: row => <div style={{ textAlign: "left"}}>{row.value}</div>,
            borderLeft: true
        },
        {
            Header: 'PDP Year',
            accessor: 'PDP_Year'
        },
        {
            Header: 'Average Number of Samples per Pesticide',
            accessor: 'AvgOfTotal_Samples',
            Cell: ({ value }) => {
                return <NumberFormat value={value} displayType="text" decimalScale={0} thousandSeparator={true} fixedDecimalScale="true"/>;
            }
        },
        {
            Header: 'Number of Positives',
            accessor: 'SumOfNumber_Positives',
            Cell: ({ value }) => {
                return <NumberFormat value={value} displayType="text" thousandSeparator={true}/>;
            },
            sortType: decimalSort
        },
        {
            Header: 'Average Number of Residues per Sample',
            accessor: d => d.SumOfNumber_Positives/d.AvgOfTotal_Samples,
            Cell: ({ value }) => {
                return <NumberFormat value={value} displayType="text" decimalScale={2} fixedDecimalScale="true"/>;
            },
            sortType: decimalSort
        },
        {
            Header: 'Positive Sample DRI-M',
            accessor: 'SumOfDRI_Mean_Kid',
            Cell: ({ value }) => {
                return <NumberFormat value={value} displayType="text" decimalScale={4} fixedDecimalScale="true"/>;
            },
            sortType: decimalSort
        },
        {
            Header: 'Percent of Total DRI-M',
            accessor: d => d.SumOfDRI_Mean_Kid,
            Cell: ({ value }) => {
                return <NumberFormat value={value/totalDRI * 100} displayType="text" decimalScale={1} fixedDecimalScale="true" suffix="%"/>
            },
            sortType: decimalSort
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
            },
            sortType: decimalSort
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

    var query = _.fromPairs(params.map(({ field, selected }) => [field, selected]))
    
    query = queryParse(query)
    const [rows, setRows] = useState([])
    useEffect(() => {
        if (query) {
            fetchRows({ table: 'dri', params: query, form: 'ReportsAggr', tableNum: 2 }).then(val => {
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
            accessor: 'Rpt_Pest_Name',
            Cell: row => <div style={{ textAlign: "left"}}>{row.value}</div>,
            borderLeft: true
        },
        {
            Header: 'Family of Chemistry',
            accessor: 'FOC_Name_Website',
            Cell: row => <div style={{ textAlign: "left"}}>{row.value}</div>,
        },
        {
            Header: 'PDP Year',
            accessor: 'PDP_Year'
        },
        {
            Header: 'Total Samples Across All Foods',
            accessor: 'SumOfTotal_Samples',
            Cell: ({ value }) => {
                return <NumberFormat value={value} displayType="text" thousandSeparator={true}/>;
            }
        },
        {
            Header: 'Number of Positives',
            accessor: 'SumOfNumber_Positives',
            Cell: ({ value }) => {
                return <NumberFormat value={value} displayType="text" thousandSeparator={true}/>;
            }
        },
        {
            Header: 'Percent Total Samples Positive',
            accessor: d => d.SumOfNumber_Positives,
            Cell: ({ value }) => {
                return <NumberFormat value={value/totalPos * 100} displayType="text" decimalScale={2} fixedDecimalScale="true" suffix="%"/>
            },
            sortType: decimalSort
        },
        {
            Header: 'Positive Sample DRI-M',
            accessor: 'SumOfDRI_Mean_Kid',
            Cell: ({ value }) => {
                return <NumberFormat value={value} displayType="text" decimalScale={4} fixedDecimalScale="true"/>
            },
            sortType: decimalSort
        },
        {
            Header: 'Percent of Total DRI-M',
            accessor: d => d.SumOfDRI_Mean_Kid,
            Cell: ({ value }) => {
                return <NumberFormat value={value/totalDRI * 100} displayType="text" decimalScale={2} fixedDecimalScale="true" suffix="%"/>
            },
            sortType: decimalSort
        },
        {
            Header: 'Total FS-DRI',
            accessor: 'SumOfFS_DRI_Kid',
            Cell: ({ value }) => {
                return <NumberFormat value={value} displayType="text" decimalScale={5} fixedDecimalScale="true"/>
            },
            sortType: decimalSort
        },
        {
            Header: 'Percent of Total FS-DRI',
            accessor: d => d.SumOfFS_DRI_Kid,
            Cell: ({ value }) => {
                return <NumberFormat value={value/totalFS * 100} displayType="text" decimalScale={2} fixedDecimalScale="true" suffix="%"/>
            },
            sortType: decimalSort
        }
    ]
    
    return (
      <>
        <Table data={rows} columns={columns} params={params} tableNum={2} summary="true"/>
        <style jsx>{`
          .title {
            font-family: Helvetica, Arial, sans-serif;
          }
  `}</style>
      </>
    )
}

function queryParse( query ) {
    let newQuery = {
      PDP_Year: query.PDP_Year
    }
    let pairClaim
    if (query.Claim == "All Market Claims") {
      pairClaim = {
        Claim: "All"
      }
    } else {
      pairClaim = {
        Claim: query.Claim
      }
    }
    let pairOrigin
    if (query.Origin == "All Samples") {
      pairOrigin = {
        Origin: "All"
      }
    } else if (query.Origin == "Domestic Samples") {
      pairOrigin = {
        Origin: "Domestic"
      }
    } else if (query.Origin == "Combined Imports") {
      pairOrigin = {
        Origin: "Imported"
      }
    } else {
      pairOrigin = {
        Country_Name: query.Origin
      }
    }
    newQuery = {...newQuery, ...pairClaim}
    newQuery = {...newQuery, ...pairOrigin}
  
    return newQuery
  }