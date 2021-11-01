import { useMemo } from 'react'
import Table from './Table'

export default function ResidueAndRiskIndicatorsTable ({ data }) {

  console.log("DATA IN RESIDUE TABLE")
  console.log(data)
  if (data.length !== 0) {
    console.log(data[0]['risk_group'])
    console.log(data[0]['fs_dir_kid'])
  }
  const columns = useMemo(() => [
    // const columns = [{
    {
      Header: '  ',
      emptyHeader: true,
      columns: [
        {
          Header: 'Pesticide',
          accessor: 'rpt_pest_name',
          width: 5
        }
      ]
    },

    {
      Header: 'Number of Samples',
      groupHeader: true,
      columns: [
        {
          Header: 'Total',
          accessor: 'total_samples',
          borderLeft: true
        },
        {
          Header: 'Number of Positives',
          accessor: 'number_positives',
          borderLeft: true
        },
        {
          Header: 'Percent Positive',
          accessor: 'pct_pos',
          borderLeft: true
        }
      ]
    },
    {
      Header: ' ',
      emptyHeader: true,
      columns: [
        {
          Header: 'Mean Residue (ppm)',
          accessor: 'mean_positives',
          borderLeft: true
        },
        {
          Header: 'cRfC (ppm)',
          accessor: 'crfc_kid',
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
          accessor: 'dri_mean_kid',
          borderLeft: true
        },
        {
          Header: 'FS-DRI',
          accessor: 'fs_dir_kid',
        },
        {
          Header: 'Percent of Aggregate FS-DRI',
          accessor: 'per_agg_fsdri',
          borderRight: true
          //accessor: (row) => row.per_agg_fsdri
        }
      ]
    }
    // ])
  ], [])

  return (
    <>
      <h2 className="title">Table 1: Pesticide Residue and Risk Indicators</h2>
      <Table data={data} columns={columns}/>
      <style jsx>{`
        .title {
          font-family: Helvetica, Arial, sans-serif;
        }
      `}</style>
    </>
  )
}
