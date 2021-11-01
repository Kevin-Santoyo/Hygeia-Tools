import { useMemo } from 'react'
import Table from './Table'
export default function CRFCTable ({ data }) {
  // TODO: Figure out where to get data for these columns

  const columns = useMemo(() => [
    {
      Header: 'Pesticide',
      accessor: 'rpt_pest_name'
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
      <Table data={data} columns={columns} />
      <style jsx>{`
        .title {
          font-family: Helvetica, Arial, sans-serif;
        }
`}</style>
    </>
  )
}
