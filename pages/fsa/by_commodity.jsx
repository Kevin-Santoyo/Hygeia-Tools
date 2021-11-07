import { useEffect, useState } from 'react'
import _ from 'lodash'
import Header from '../../components/Header'
import ParameterContainer from '../../components/ParameterContainer'
import Parameter                           from '../../components/Parameter'
import { fetchParamOptions, fetchFSARows } from '../../lib/api'
import TableContainer                      from '../../components/TableContainer'
import ResidueAndRiskIndicatorsTable from '../../components/ResidueAndRiskIndicatorsTable'
import CRFCTable from '../../components/CRFCTable'
export default function ByCommodityScreen () {
  const [params, setParams] = useState([
    {
      field: 'food',
      label: 'Food',
      options: ['Apples', 'Watermelon'],
      selected: null
    },
    {
      field: 'sub_food',
      label: 'Sub-Food',
      options: [],
      selected: null
    },
    {
      field: 'origin',
      label: 'Origin',
      options: [],
      selected: null
    },
    {
      field: 'country_name',
      label: 'Country',
      options: [],
      selected: null
    },
    {
      field: 'claim',
      label: 'Claim',
      options: [],
      selected: null
    },
    {
      field: 'fsa_year',
      label: 'Year',
      options: [],
      selected: null
    }
  ])

  // TODO: DRY
  const [rows, setRows] = useState([])

  const handleParamUpdate = async (field, selected) => {
    // console.log('update fields after ', field)
    console.time('fetch params' + field)
    const newParams = _.cloneDeep(params)

    const idx = _.findIndex(newParams, (param) => param.field === field)

    if (idx !== -1) newParams[idx].selected = selected

    for (let i = idx + 1; i < newParams.length; i++) {
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
    if (query.food && query.sub_food && query.origin && query.claim && query.fsa_year) {
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
      <Header title="By Commodity"/>
      <ParameterContainer>
        {params.map(param => <Parameter {...param} handleSelect={handleParamUpdate} key={param.field} />)}
      </ParameterContainer>
      <TableContainer>
        <h1 className="title">Results</h1>
        <ResidueAndRiskIndicatorsTable data={rows} params={params}/>
        <CRFCTable data={rows} params={params}/>
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
