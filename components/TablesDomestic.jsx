import { useMemo, useState, useEffect } from "react";
import _ from "lodash";
import Table from "./Table";
import { fetchRows } from "../lib/api";
import KeyFindings from "./KeyFindings";
import Methods from "./Methods";
import NumberFormat from "react-number-format";
import GraphicsTabs from "./GraphicsTabs";

export default function DomesticTable1({ data, params }) {
  const columns = useMemo(
    () => [
      {
        Header: " ",
        emptyHeader: true,
        columns: [
          {
            Header: " ",
            accessor: "origin",
          },
          {
            Header: "Total Samples",
            accessor: "avg_total_samples",
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
            borderLeft: true,
          },
          {
            Header: "FS-DRI",
            accessor: "sum_dri_fs",
            Cell: ({ value }) => {
              return <NumberFormat value={value} displayType="text" decimalScale={4} />;
            },
          },
        ],
      },
    ],
    []
  );

  const selectedOrigin = [params[1].selected];
  data = data.filter((dat) => {
    if (dat.origin == "Domestic Samples") {
      return dat;
    } else if (dat.origin == selectedOrigin) {
      return dat;
    }
  });
  if (_.has(data, 1)) {
    if (data[0].origin != "Domestic Samples") {
      data.reverse();
    }
  }
  return (
    <>
      <Table data={data} columns={columns} params={params} summary="true" tableNum={1} />
      <Methods />
      <KeyFindings data={data} tableNum={1} params={params}/>
      <GraphicsTabs data={data} params={params}/>
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

    if (query.commodity && query.pdp_year) {
      fetchRows({ table: 'dri', params: query, form: 'Domestic', tableNum: 2 }).then(val => {
        console.log('fetched rows: ', val)
        setRows(val)
      })
    } else {
      console.log('not fetching rows. ', query)
      setRows([])
    }
    
  }, [params])

  const columns = useMemo(
    () => [
      {
        Header: " ",
        emptyHeader: true,
        columns: [
          {
            Header: "Analyte",
            accessor: "pesticide",
          },
          {
            Header: "Total Samples",
            accessor: "total_samples",
          },
          {
            Header: "Number of Positives",
            accessor: "number_positives",
          },
          {
            Header: "Percent Positive",
            accessor: "percent_positive",
            Cell: ({ value }) => {
              return <NumberFormat value={value * 100} displayType="text" decimalScale={1} fixedDecimalScale="true" suffix="%" />;
            },
          },
          {
            Header: "Mean of Positives (ppm)",
            accessor: "mean_positives",
            Cell: ({ value }) => {
              return <NumberFormat value={value} displayType="text" decimalScale={4} fixedDecimalScale="true" />;
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
            accessor: "dri_mean_kid",
            Cell: ({ value }) => {
              return <NumberFormat value={value} displayType="text" decimalScale={5} fixedDecimalScale="true"/>;
            },
            borderLeft: true,
          },
          {
            Header: "FS-DRI",
            accessor: "fs_dri_kid",
            Cell: ({ value }) => {
              return <NumberFormat value={value} displayType="text" decimalScale={6} fixedDecimalScale="true"/>;
            },
          },
          {
            Header: "% Aggregate FS-DRI",
            accessor: "per_agg_fsdri",
            Cell: ({ value }) => {
              return <NumberFormat value={value} displayType="text" decimalScale={3} fixedDecimalScale="true" suffix="%"/>;
            },
          }
        ],
      },
    ],
    []
  );

  let rowCount = rows.length
  return (
    <>
      <Table data={rows} columns={columns} params={params} summary="true" tableNum={2} />
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

    console.log(params, 'table3 params')
    var query = _.fromPairs(params.map(({ field, selected }) => [field, selected]))
    
    query = {
      "commodity" : query.commodity,
      "market" : query.market,
      "pdp_year" : query.pdp_year,
      "origin" : "Domestic Samples"
    }
    if (query.commodity && query.pdp_year) {
      fetchRows({ table: 'dri', params: query, form: 'Domestic', tableNum: 3 }).then(val => {
        console.log('fetched rows: ', val)
        setRows(val)
      })
    } else {
      console.log('not fetching rows. ', query)
      setRows([])
    }
    
  }, [params])

  const columns = useMemo(
    () => [
      {
        Header: " ",
        emptyHeader: true,
        columns: [
          {
            Header: "Analyte",
            accessor: "pesticide",
          },
          {
            Header: "Total Samples",
            accessor: "total_samples",
          },
          {
            Header: "Number of Positives",
            accessor: "number_positives",
          },
          {
            Header: "Percent Positive",
            accessor: "percent_positive",
            Cell: ({ value }) => {
              return <NumberFormat value={value * 100} displayType="text" decimalScale={1} fixedDecimalScale="true" suffix="%" />;
            },
          },
          {
            Header: "Mean of Positives (ppm)",
            accessor: "mean_positives",
            Cell: ({ value }) => {
              return <NumberFormat value={value} displayType="text" decimalScale={4} fixedDecimalScale="true" />;
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
            accessor: "dri_mean_kid",
            Cell: ({ value }) => {
              return <NumberFormat value={value} displayType="text" decimalScale={5} fixedDecimalScale="true"/>;
            },
            borderLeft: true,
          },
          {
            Header: "FS-DRI",
            accessor: "fs_dri_kid",
            Cell: ({ value }) => {
              return <NumberFormat value={value} displayType="text" decimalScale={6} fixedDecimalScale="true"/>;
            },
          },
          {
            Header: "% Aggregate FS-DRI",
            accessor: "per_agg_fsdri",
            Cell: ({ value }) => {
              return <NumberFormat value={value} displayType="text" decimalScale={3} fixedDecimalScale="true" suffix="%"/>;
            },
          }
        ],
      },
    ],
    []
  );

  let rowCount = rows.length
  return (
    <>
      <Table data={rows} columns={columns} params={params} summary="true" tableNum={3} />
      <KeyFindings tableNum={3} params={params} rowCount={rowCount}/>
      <style jsx>{`
        .title {
          font-family: Arial, Helvetica, sans-serif;
        }
      `}</style>
    </>
  );
}
