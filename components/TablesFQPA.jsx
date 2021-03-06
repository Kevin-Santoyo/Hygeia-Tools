import { useMemo } from "react";
import NumberFormat from "react-number-format";
import Table from "./Table";

export default function FQPATable1a({ data, params }) {
  
  const columns = useMemo(
    () => [
      // const columns = [{
      {
        Header: " ",
        accessor: "summary",
      },

      {
        Header: "Pre-FQPA Baseline",
        accessor: "fsdri_baseline",
        Cell: ({ value }) => {
          return <NumberFormat value={value} displayType="text" decimalScale={5} fixedDecimalScale="true"/>;
        }
      },
      {
        Header: "2000",
        accessor: "fsdri_2000",
        Cell: ({ value }) => {
          return <NumberFormat value={value} displayType="text" decimalScale={5} fixedDecimalScale="true"/>;
        }
      },
      {
        Header: "2004",
        accessor: "fsdri_2004",
        Cell: ({ value }) => {
          return <NumberFormat value={value} displayType="text" decimalScale={5} fixedDecimalScale="true"/>;
        }
      },
      {
        Header: "2011",
        accessor: "fsdri_2011",
        Cell: ({ value }) => {
          return <NumberFormat value={value} displayType="text" decimalScale={5} fixedDecimalScale="true"/>;
        }
      },
      {
        Header: "Percent Change Pre-FQPA Baseline to 2011",
        accessor: "per_chg_base_2011",
      },
      // ])
    ],
    []
  );

  
  return (
    <>
      <Table data={data} columns={columns} params={params} summary="true" tableNum={1} />
      <style jsx>{`
        .title {
          font-family: Arial, Helvetica, sans-serif;
        }
      `}</style>
    </>
  );
}
