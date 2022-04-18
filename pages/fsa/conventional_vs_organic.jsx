import { useEffect, useState } from 'react'
import _ from 'lodash'
import Header from '../../components/Header'
import ParameterContainer from '../../components/ParameterContainer'
import Parameter from '../../components/Parameter'
import { fetchParamOptions, fetchRows, fetchFormData } from '../../lib/api'
import TableContainer                      from '../../components/TableContainer'
import FSAConventionalTable1, { FSAConventionalTable2, FSAConventionalTable3, FSAConventionalTable4 } from '../../components/TablesFSAConventional'
export default function FSAConventionalOrganicScreen () {

  const [params, setParams] = useState([
    {
      field: 'Food',
      label: 'Food',
      options: ['Apples'],
      selected: 'Apples'
    },
    {
      field: 'Sub_Food',
      label: 'Sub-Food',
      options: ['Cooking'],
      selected: 'Cooking'
    },
    {
      field: 'FSA_Year',
      label: 'Year',
      options: ['2021'],
      selected: '2019'
    }
  ])

  // TODO: DRY
  const [rows, setRows] = useState([])

  const handleParamUpdate = async (field, selected) => {
    
    console.time('fetch params: ' + field)
    const newParams = _.cloneDeep(params)

    

    const idx = _.findIndex(newParams, (param) => param.field === field)

    if (idx !== -1) newParams[idx].selected = selected

    for (let i = idx + 1; i < newParams.length; i++) {
      const dependencies = _.fromPairs(_.slice(newParams, 0, i).map(dep => [dep.field, dep.selected]))
      const options = await fetchParamOptions({ field: newParams[i].field, dependencies, selected: newParams[i].selected, table: 'fsa', form: 'Food' })

      newParams[i].options = options
      if (newParams[i].options.indexOf(newParams[i].selected) === -1) newParams[i].selected = newParams[i].options[0]
    }

    setParams(newParams)
    console.timeEnd('fetch params: ' + field)
  }

  const getFormData = async () => {
    
    const foods = await fetchFormData({ table: 'fsa', form: 'Food' })

    setParams([
      {
        field: 'Food',
        label: 'Food',
        options: foods.data,
        selected: null
      },
      {
        field: 'Sub_Food',
        label: 'Sub-Food',
        options: ['Cooking'],
        selected: null
      },
      {
        field: 'FSA_Year',
        label: 'Year',
        options: ['2019'],
        selected: null
      }
    ])
    handleParamUpdate('Apples')
  }

  useEffect(() => {
    getFormData()
  }, [])

  useEffect(() => {
    // console.log('useEffect - params - fetch rows')
    const query = _.fromPairs(params.map(({ field, selected }) => [field, selected]))
    
    if (query.Food && query.Sub_Food && query.FSA_Year) {
      fetchRows({table: 'fsa', params: query, form: 'Conventional', tableNum: 1} ).then(val => {
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
      <Header title="DRI Analytical System" system="UK-FSA DRI"/>
      <ParameterContainer>
        {params.map(param => <Parameter {...param} handleSelect={handleParamUpdate} key={param.field} />)}
      </ParameterContainer>
      <TableContainer>
        <h1 className="title">Results</h1>
        <FSAConventionalTable1 data={rows} params={params} />
        <FSAConventionalTable2 params={params} />
        <FSAConventionalTable3 params={params} />
        <FSAConventionalTable4 params={params} />
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