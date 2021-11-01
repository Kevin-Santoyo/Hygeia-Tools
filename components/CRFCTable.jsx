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
      accessor: 'chronic_rfd_pad'
    },
    {
      Header: 'cRfC (ppm)',
      accessor: 'crfc_kid'
    }
  ], [])

  return (
    <>
      <h2 className="title">Table 2: Calculation of the Chronic Reference Concentration (cRfC) by Pesticide Active Ingredient</h2>
      <Table data={data} columns={columns} />
      <style jsx>{`
        .title {
          font-family: Helvetica, Arial, sans-serif;
        }
`}</style>
    </>
  )
}
