import { useMemo } from 'react'
import Table from './Table'

export default function ResidueAndRiskIndicatorsTable ({ data, params }) {
  
  const columns = useMemo(() => [
    // const columns = [{
    {
      Header: '  ',
      emptyHeader: true,
      columns: [
        {
          Header: 'Analyte',
          accessor: 'pesticide',
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
        },
        {
          Header: 'Percent Positive',
          accessor: d => parseFloat(d.percent_positive * 100).toFixed(1).concat('%'),
          borderRight: true
        }
      ]
    },
    {
      Header: ' ',
      emptyHeader: true,
      columns: [
        {
          Header: 'Mean Residue (ppm)',
          accessor: d => parseFloat(d.mean_positives).toFixed(3),
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
          accessor: d => parseFloat(d.fs_dri_kid).toFixed(5),
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
      <Table data={data} columns={columns} params={params} summary="true" tableNum={1}/>
      <style jsx>{`
        .title {
          font-family: Arial, Helvetica, sans-serif;
        }
      `}</style>
    </>
  )
}

export function CRFCTable ({ data, params }) {

  const columns = useMemo(() => [
    {
        Header: 'Analyte',
        accessor: 'pesticide'
    },
    {
      Header: 'NOAEL (mg/kg/day)',
      accessor: 'chronic_noael',
      //accessor: () => '-'
    },
    {
      Header: 'Standard Safety Factor',
      accessor: 'chronic_sf'
      //accessor: () => '100'
    },
    {
      Header: 'FQPA Safety Factor',
      //accessor: () => '1'
      accessor: 'chronic_fqpa_sf'
    },
    {
      Header: 'cRfD or cPAD (mg/kg/day)',
      accessor: d => parseFloat(d.chronic_rfd_pad).toFixed(4)
    },
    {
      Header: 'cRfC (ppm)',
      accessor: d => parseFloat(d.crfc_kid).toFixed(3)
    }
  ], [])

  return (
    <>
      <Table data={data} columns={columns} params={params} tableNum={2} />
      <style jsx>{`
        .title {
          font-family: Helvetica, Arial, sans-serif;
        }
`}</style>
    </>
  )
}