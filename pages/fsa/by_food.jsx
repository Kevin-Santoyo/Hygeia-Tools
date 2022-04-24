import { useEffect, useState } from 'react'
import _ from 'lodash'
import Header from '../../components/Header'
import Titles from '../../components/DynamicTitles'
import ParameterContainer from '../../components/ParameterContainer'
import Parameter from '../../components/Parameter'
import { fetchParamOptions, fetchRows, fetchFormData } from '../../lib/api'
import TableContainer                      from '../../components/TableContainer'
import ResidueAndRiskIndicatorsTable1, { CRFCTable1 } from '../../components/TablesFSAFood'
export default function FSAFoodScreen () {
  useEffect(() => {
    document.title = "By Food | UK-FSA"
  }, [])

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
      field: 'Origin',
      label: 'Origin',
      options: ['All Samples'],
      selected: 'All Samples'
    },
    {
      field: 'Claim',
      label: 'Claim',
      options: ['All Market Claims'],
      selected: 'All Market Claims'
    },
    {
      field: 'FSA_Year',
      label: 'Year',
      options: ['2021 Q1-Q2'],
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
        field: 'Origin',
        label: 'Origin',
        options: ['All Samples'],
        selected: null
      },
      {
        field: 'Claim',
        label: 'Claim',
        options: ['All Market Claims'],
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
    console.log(params, 'Params')
    const query = _.fromPairs(params.map(({ field, selected }) => [field, selected]))
    let queryOverride = queryParseFood(query)
    if (query.Food && query.Sub_Food && query.Claim && query.FSA_Year) {
      fetchRows({table: 'fsa', params: queryOverride, form: 'Food', tableNum: 1} ).then(val => {
        console.log('fetched rows: ', val)
        setRows(val)
      })
    } else {
      console.log('not fetching rows. ', queryOverride)
    }
    // fetch()
  }, [params])

  return (
    <div>
      <Header title="DRI Analytical System" system="UK-FSA DRI"/>
      <Titles params={params} tableNum={0} />
      <ParameterContainer>
        {params.map(param => <Parameter {...param} handleSelect={handleParamUpdate} key={param.field} />)}
      </ParameterContainer>
      <TableContainer>
        <h1 className="title">Results</h1>
        <ResidueAndRiskIndicatorsTable1 data={rows} params={params} />
        <CRFCTable1 params={params} />
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

export function queryParseFood( query ) {
  let newQuery = {
    Food: query.Food,
    Sub_Food: query.Sub_Food,
    FSA_Year: query.FSA_Year
  }
  let pairClaim
  if (query.Claim == "All Market Claims") {
    pairClaim = {
      Claim: "All"
    }
  } else {
    pairClaim = {
      Claim: query.Claim
    }
  }
  let pairOrigin
  if (query.Origin == "All Samples") {
    pairOrigin = {
      Origin: "All"
    }
  } else if (query.Origin == "Non-EC" || query.Origin == "Imports" || query.Origin == "UK" || query.Origin == "EC") {
    pairOrigin = {
      Origin: query.Origin
    }
  } else {
    pairOrigin = {
      Country_Name: query.Origin
    }
  }
  newQuery = {...newQuery, ...pairClaim}
  newQuery = {...newQuery, ...pairOrigin}

  return newQuery
}