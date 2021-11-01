import { useEffect, useState } from 'react'
import _ from 'lodash'
import Header from '../../components/Header'
import ParameterContainer from '../../components/ParameterContainer'
import Parameter                           from '../../components/Parameter'
import { fetchParamOptions, fetchFSARows } from '../../lib/api'
import TableContainer                      from '../../components/TableContainer'
import ResidueAndRiskIndicatorsTable from '../../components/ResidueAndRiskIndicatorsTable'
import CRFCTable from '../../components/CRFCTable'
import PesticideResidueAndRiskIndicatorsTable from '../../components/PesticideResidueAndRiskIndicatorsTable'

export default function ByPesticideScreen () {
  const [params, setParams] = useState([
    {
      field: 'rpt_pest_name',
      label: 'Analyte',
      options: ['2,4-D'],
      selected: '2,4-D'
    },
    {
      field: 'origin',
      label: 'Origin',
      options: [],
      selected: ''
    },
    {
      field: 'country_name',
      label: 'Country',
      options: [],
      selected: ''
    },
    {
      field: 'claim',
      label: 'Claim',
      options: [],
      selected: ''
    },
    {
      field: 'fsa_year',
      label: 'Year',
      options: [],
      selected: ''
    }
  ])

  // TODO: DRY
  const [rows, setRows] = useState([])

  const handleParamUpdate = async (field, selected) => {
    console.log('====\nHANDLE PARAM UPDATE')
    console.log('update fields after ', field, selected)
    console.time('fetch params' + field)
    const newParams = _.cloneDeep(params)

    const idx = _.findIndex(newParams, (param) => param.field === field)

    if (idx !== -1) newParams[idx].selected = selected

    console.log('updated param: ', selected, idx)

    for (let i = idx + 1; i < newParams.length; i++) {
      console.log('iterating: ', i, newParams[i])
      const dependencies = _.fromPairs(_.slice(newParams, 0, i).map(dep => [dep.field, dep.selected]))
      const options = await fetchParamOptions({ field: newParams[i].field, dependencies, selected: newParams[i].selected })
      newParams[i].options = options
      if (newParams[i].options.indexOf(newParams[i].selected) === -1) newParams[i].selected = newParams[i].options[0]
    }

    console.log('new params: ', newParams)
    setParams(newParams)
    console.timeEnd('fetch params' + field)
  }

  useEffect(() => {
    handleParamUpdate('foo')
  }, [])

  useEffect(() => {
    console.log('useEffect - params - fetch rows')
    const query = _.fromPairs(params.map(({ field, selected }) => [field, selected]))
    console.log(query)
    if (query.origin && query.claim && query.fsa_year) {
      fetchFSARows(query).then(val => {
        console.log('fetched rows: ', val)
        setRows(val)
      })
    } else {
      console.log('not fetching rows. ', query)
    }
    // fetch()
  }, [params])

  return (
    <div>
      <Header title="By Pesticide"/>
      <ParameterContainer>
        {params.map(param => <Parameter {...param} handleSelect={handleParamUpdate} key={param.field} />)}
      </ParameterContainer>
      <TableContainer>
        <h1 className="title">Results</h1>
        <PesticideResidueAndRiskIndicatorsTable data={rows} />
      </TableContainer>
      <style jsx>{`
        .title {
          font-family: Helvetica, Arial, sans-serif;
        }
      `}
      </style>
    </div>
  )
}
