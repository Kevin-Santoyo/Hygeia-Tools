import { useMemo } from 'react'
import { DRITitleTable1 } from './DynamicTitles'
import Table from './Table'

export default function PesticideResidueAndRiskIndicatorsTable ({ data, params }) {

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
          accessor: d => parseFloat(d.pct_pos * 100).toFixed(1).concat('%'),
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
          accessor: d => parseFloat(d.mean_positives).toFixed(3)
        },
        {
          Header: 'cRfC (ppm)',
          accessor: d => parseFloat(d.crfc_kid).toFixed(3)
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
          accessor: d => parseFloat(d.fs_dir_kid).toFixed(5)
        },
        {
          // TODO: Calc these in DB?
          Header: 'Percent of Aggregate FS-DRI',
          accessor: d => parseFloat(d.per_agg_fsdri * 100).toFixed(2).concat('%'),
        }
      ]
    }
  ], [])
  return (
    <>
      <DRITitleTable1 params={params} />
      <Table data={data} columns={columns} params={params} />
      <style jsx>{`
        .title {
          font-family: Arial, Helvetica, sans-serif;
        }
`}</style>
    </>
  )
}
