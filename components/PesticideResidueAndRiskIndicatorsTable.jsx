import { useMemo } from 'react'
import Table from './Table'

export default function PesticideResidueAndRiskIndicatorsTable ({ data }) {

  console.log("DATA IN COMMODITY TABLE")
  console.log(data)

  const columns = useMemo(() => [
    {
      Header: ' ',
      emptyHeader: true,
      columns: [
        {
          Header: 'Food',
          accessor: 'commodity_name'
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
          accessor: 'number_positives'
        },
        {
          Header: 'Percent Positive',
          accesser: 'pct_pos',
          borderRight: true
        }
      ]
    },
    {
      Header: '  ',
      emptyHeader: true,
      columns: [
        {
          Header: 'Mean Residue (ppm)',
          accessor: 'mean_positives'
        },
        {
          Header: 'cRfC (ppm)',
          accessor: 'crfc_kid'
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
          accessor: 'fs_dri_kid'
        },
        {
          // TODO: Calc these in DB?
          Header: 'Percent of Aggregate FS-DRI',
          accessor: 'per_agg_fsdri'
        }
      ]
    }
  ], [])
  return (
    <>
      <h2 className="title">Table 1.</h2>
      <Table data={data} columns={columns}/>
      <style jsx>{`
        .title {
          font-family: Arial, Helvetica, sans-serif;
        }
`}</style>
    </>
  )
}
