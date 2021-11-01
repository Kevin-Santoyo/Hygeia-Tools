import { useMemo } from 'react'
import Table from './Table'

export default function ResidueAndRiskIndicatorsTable ({ data }) {

  console.log("DATA IN RESIDUE TABLE")
  console.log(data)
  
  const columns = useMemo(() => [
    // const columns = [{
    {
      Header: '  ',
      emptyHeader: true,
      columns: [
        {
          Header: 'Analyte',
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
          accessor: d => parseFloat(d.pct_pos * 100).toFixed(1).concat('%'),
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
          accessor: d => d.mean_positives.substr(0, 5),
          borderLeft: true
        },
        {
          Header: 'cRfC (ppm)',
          accessor: d => parseFloat(d.crfc_kid).toFixed(3),
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
          accessor: d => parseFloat(d.dri_mean_kid).toFixed(5),
          borderLeft: true
        },
        {
          Header: 'FS-DRI',
          accessor: d => parseFloat(d.fs_dir_kid).toFixed(5),
        },
        {
          Header: 'Percent of Aggregate FS-DRI',
          accessor: d => parseFloat(d.per_agg_fsdri * 100).toFixed(2).concat('%'),
          borderRight: true
        }
      ]
    }
    // ])
  ], [])

  return (
    <>
      <Table data={data} columns={columns}/>
      <style jsx>{`
        .title {
          font-family: Arial, Helvetica, sans-serif;
        }
      `}</style>
    </>
  )
}
