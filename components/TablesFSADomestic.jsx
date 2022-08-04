import { useMemo, useState, useEffect } from "react";
import _ from "lodash";
import Table from "./Table";
import { fetchRows } from "../lib/api";
import KeyFindings from "./KeyFindings";
import Methods from "./Methods";
import NumberFormat from "react-number-format";
import GraphicsTabs from "./GraphicsTabs";
import decimalSort from './SortingMethods'

export default function DomesticTable1({ data, params }) {

  let newData = []
  data.forEach(dat => {
    let key = {
      avg_number_residues: dat.sum_number_positives/dat.avg_total_samples
    }
    if (dat.Country_Name) {
      let key2 = {
        Origin: dat.Country_Name
      }
      dat = {...dat, ...key2}
    }
    dat = {...dat,...key}
    newData.push(dat)
  });

  const columns = useMemo(
    () => [
      {
        Header: "Pesticide Residue Statistics",
        groupHeader: true,
        columns: [
          {
            Header: "Origin",
            accessor: "Origin",
            Cell: ({ value }) => {
              if (value == "UK") {
                return "Domestic Samples"
              } else if (value == "Imports") {
                return "Combined Imports"
              } else return value
            }
          },
          {
            Header: "Total Samples",
            accessor: "avg_total_samples",
            Cell: ({ value }) => {
              return <NumberFormat value={value} displayType="text" decimalScale={0} fixedDecimalScale="true" />;
            }
          },
          {
            Header: "Total Positives Found",
            accessor: "sum_number_positives",
          },
          {
            Header: "Average Number of Residues in each Sample",
            accessor: "avg_number_residues",
            Cell: ({ value }) => {
              return <NumberFormat value={value} displayType="text" decimalScale={2} fixedDecimalScale="true" />;
            },
            sortType: decimalSort
          },
          {
            Header: "% Samples with Zero Residue",
            accessor: "per_zero_residues",
            Cell: ({ value }) => {
              return <NumberFormat value={value * 100} displayType="text" decimalScale={1} fixedDecimalScale="true" suffix="%" />;
            },
          },
        ],
      },
      {
        Header: "Dietary Risk Indicators",
        groupHeader: true,
        columns: [
          {
            Header: "DRI-M",
            accessor: "sum_dri_mean",
            Cell: ({ value }) => {
              return <NumberFormat value={value} displayType="text" decimalScale={4} />;
            },
            sortType: decimalSort,
            borderLeft: true,
          },
          {
            Header: "FS-DRI",
            accessor: "sum_dri_fs",
            Cell: ({ value }) => {
              return <NumberFormat value={value} displayType="text" decimalScale={4} />;
            },
            sortType: decimalSort
          },
        ],
      },
    ],
    []
  );

  var selectedOrigin = [params[2].selected];

  newData = newData.filter((dat) => {
    if (dat.Origin == "UK") {
      return dat;
    } else if (dat.Origin == selectedOrigin) {
      return dat;
    }
  });

  if (_.has(newData, 1)) {
    if (newData[0].Origin != "UK") {
      newData.reverse();
    }
  }
  return (
    <>
      <Table data={newData} columns={columns} params={params} summary="true" tableNum={1} />
      <Methods />
      <KeyFindings data={newData} tableNum={1} params={params}/>
      <GraphicsTabs data={newData} params={params}/>
      <style jsx>{`
        .title {
          font-family: Arial, Helvetica, sans-serif;
        }
      `}</style>
    </>
  );
}

export function DomesticTable2({ params }) {


  const [rows, setRows] = useState([])
  useEffect(() => {

    const query = _.fromPairs(params.map(({ field, selected }) => [field, selected]))

    let queryOverride = queryParse2(query)
    if (query.Food && query.Sub_Food && query.Origin && query.Claim && query.FSA_Year) {
      fetchRows({ table: 'fsa', params: queryOverride, form: 'Domestic', tableNum: 2 }).then(val => {
        console.log('fetched rows: Table 2: ', val, ' with params ', queryOverride)
        setRows(val)
      })
    } else {
      console.log('not fetching rows.  Table 2: ', query)
      setRows([])
    }
    
  }, [params])

  var agg_dri = 0

  rows.forEach(function (row) {
      agg_dri = row.FS_DRI_Kid + agg_dri
  })

  let newData = []
  rows.forEach(dat => {
    let key = {
      Percent_FS_DRI_Kid: (dat.FS_DRI_Kid/agg_dri)*100
    }
    dat = {...dat,...key}
    newData.push(dat)
  });

  const columns = useMemo(
    () => [
      {
        Header: "Pesticide Residue Statistics",
        groupHeader: true,
        columns: [
          {
            Header: "Analyte",
            accessor: "Rpt_Pest_Name",
            Cell: row => <div style={{ textAlign: "left"}}>{row.value}</div>
          },
          {
            Header: "Total Samples",
            accessor: "Total_Samples",
          },
          {
            Header: "Number of Positives",
            accessor: "Number_Positives",
          },
          {
            Header: "Percent Positive",
            accessor: "%Pos",
            Cell: ({ value }) => {
              return <NumberFormat value={value * 100} displayType="text" decimalScale={1} fixedDecimalScale="true" suffix="%" />;
            },
            sortType: decimalSort
          },
          {
            Header: "Mean of Positives (ppm)",
            accessor: "Mean_Positives",
            Cell: ({ value }) => {
              return <NumberFormat value={value} displayType="text" decimalScale={4} fixedDecimalScale="true" />;
            },
            sortType: decimalSort
          },
        ],
      },
      {
        Header: "Dietary Risk Indicators",
        groupHeader: true,
        columns: [
          {
            Header: "DRI-M",
            accessor: "DRI_Mean_Kid",
            Cell: ({ value }) => {
              return <NumberFormat value={value} displayType="text" decimalScale={5} fixedDecimalScale="true"/>;
            },
            sortType: decimalSort,
            borderLeft: true,
          },
          {
            Header: "FS-DRI",
            accessor: "FS_DRI_Kid",
            Cell: ({ value }) => {
              return <NumberFormat value={value} displayType="text" decimalScale={6} fixedDecimalScale="true"/>;
            },
            sortType: decimalSort,
          },
          {
            Header: "% Aggregate FS-DRI",
            accessor: "Percent_FS_DRI_Kid",
            Cell: ({ value }) => {
              return <NumberFormat value={value} displayType="text" decimalScale={3} fixedDecimalScale="true" suffix="%"/>;
            },
            sortType: decimalSort
          }
        ],
      },
    ],
    []
  );

  let rowCount = rows.length
  return (
    <>
      <Table data={newData} columns={columns} params={params} summary="true" sortBy="Percent_FS_DRI_Kid" sortDirection="desc" tableNum={2} />
      <KeyFindings tableNum={2} params={params} rowCount={rowCount}/>
      <style jsx>{`
        .title {
          font-family: Arial, Helvetica, sans-serif;
        }
      `}</style>
    </>
  );
}

export function DomesticTable3({ params }) {

  const [rows, setRows] = useState([])
  useEffect(() => {

    var query = _.fromPairs(params.map(({ field, selected }) => [field, selected]))

    query = queryParse3(query)
    if (query.Food && query.Sub_Food && query.Origin && query.Claim && query.FSA_Year) {
      fetchRows({ table: 'fsa', params: query, form: 'Domestic', tableNum: 3 }).then(val => {
        console.log('fetched rows: Table 3: ', val)
        setRows(val)
      })
    } else {
      console.log('not fetching rows. Table 3: ', query)
      setRows([])
    }
    
  }, [params])

  var agg_dri = 0

  rows.forEach(function (row) {
    agg_dri = row.FS_DRI_Kid + agg_dri
  })

  let newData = []
  rows.forEach(dat => {
    let key = {
      Percent_FS_DRI_Kid: (dat.FS_DRI_Kid/agg_dri)*100
    }
    dat = {...dat,...key}
    newData.push(dat)
  });

  const columns = useMemo(
    () => [
      {
        Header: "Pesticide Residue Statistics",
        groupHeader: true,
        columns: [
          {
            Header: "Analyte",
            accessor: "Rpt_Pest_Name",
            Cell: row => <div style={{ textAlign: "left"}}>{row.value}</div>
          },
          {
            Header: "Total Samples",
            accessor: "Total_Samples",
          },
          {
            Header: "Number of Positives",
            accessor: "Number_Positives",
          },
          {
            Header: "Percent Positive",
            accessor: "%Pos",
            Cell: ({ value }) => {
              return <NumberFormat value={value * 100} displayType="text" decimalScale={1} fixedDecimalScale="true" suffix="%" />;
            },
            sortType: decimalSort
          },
          {
            Header: "Mean of Positives (ppm)",
            accessor: "Mean_Positives",
            Cell: ({ value }) => {
              return <NumberFormat value={value} displayType="text" decimalScale={4} fixedDecimalScale="true" />;
            },
            sortType: decimalSort
          },
        ],
      },
      {
        Header: "Dietary Risk Indicators",
        groupHeader: true,
        columns: [
          {
            Header: "DRI-M",
            accessor: "DRI_Mean_Kid",
            Cell: ({ value }) => {
              return <NumberFormat value={value} displayType="text" decimalScale={5} fixedDecimalScale="true"/>;
            },
            sortType: decimalSort,
            borderLeft: true,
          },
          {
            Header: "FS-DRI",
            accessor: "FS_DRI_Kid",
            Cell: ({ value }) => {
              return <NumberFormat value={value} displayType="text" decimalScale={6} fixedDecimalScale="true"/>;
            },
            sortType: decimalSort
          },
          {
            Header: "% Aggregate FS-DRI",
            accessor: "Percent_FS_DRI_Kid",
            Cell: ({ value }) => {
              return <NumberFormat value={value} displayType="text" decimalScale={3} fixedDecimalScale="true" suffix="%"/>;
            },
            sortType: decimalSort
          }
        ],
      },
    ],
    []
  );

  let rowCount = newData.length
  return (
    <>
      <Table data={newData} columns={columns} params={params} summary="true" sortBy="Percent_FS_DRI_Kid" sortDirection="desc" tableNum={3} />
      <KeyFindings tableNum={3} params={params} rowCount={rowCount}/>
      <style jsx>{`
        .title {
          font-family: Arial, Helvetica, sans-serif;
        }
      `}</style>
    </>
  );
}

function queryParse2( query ) {
  let newQuery = {
    Food: query.Food,
    Sub_Food: query.Sub_Food,
    FSA_Year: query.FSA_Year
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
  if (query.Origin == "Imports" || query.Origin == "UK" || query.Origin == "EC" || query.Origin == "Non-EC") {
    pairOrigin = {
      Origin: query.Origin
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

function queryParse3( query ) {
  let newQuery = {
    Food: query.Food,
    Sub_Food: query.Sub_Food,
    FSA_Year: query.FSA_Year
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
  let pairOrigin = {
    Origin: "UK"
  }
  newQuery = {...newQuery, ...pairClaim}
  newQuery = {...newQuery, ...pairOrigin}

  return newQuery
}