import { useEffect, useState } from 'react'
import _, { constant, has } from 'lodash'
import Header from '../../components/Header'
import Titles from '../../components/DynamicTitles'
import ParameterContainer from '../../components/ParameterContainer'
import Parameter, { FoodParameter, OriginParameter } from '../../components/Parameter'
import { fetchParamOptions, fetchRows, fetchFormData } from '../../lib/api'
import TableContainer from '../../components/TableContainer'
import Methods from '../../components/Methods'
import AggregateSamplesTable, { AltIndividualSamplesTable, IndividualSamplesTable } from '../../components/TablesFSAIndividual'
import Jumps from '../../components/Jumps'
export default function IndividualSamplesScreen() {

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
      options: ['UK'],
      selected: 'UK'
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
      options: ['2021'],
      selected: '2021'
    }
  ])

  const [rows, setRows] = useState([])

  const handleParamUpdate = async (field, selected) => {
    // console.log('update fields after ', field)
    console.time('fetch params: ' + field)
    const newParams = _.cloneDeep(params)

    //console.log(newParams)

    const idx = _.findIndex(newParams, (param) => param.field === field)

    if (idx !== -1) newParams[idx].selected = selected

    for (let i = idx + 1; i < newParams.length; i++) {
      const dependencies = _.fromPairs(_.slice(newParams, 0, i).map(dep => [dep.field, dep.selected]))
      const options = await fetchParamOptions({ field: newParams[i].field, dependencies, selected: newParams[i].selected, table: 'fsa', form: 'Food' })
      //console.log('options')
      //console.log(options)
      newParams[i].options = options
      if (newParams[i].options.indexOf(newParams[i].selected) === -1) newParams[i].selected = newParams[i].options[0]
    }

    //console.log('new params: ', newParams)
    setParams(newParams)
    console.timeEnd('fetch params: ' + field)
  }

  const getFormData = async () => {
    //console.log('getFormData')
    const foods = await fetchFormData({ table: 'fsa', form: 'Food' })
    //console.log(foods)

    //console.log(foods.data)

    //console.log(params)
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
        options: ['UK'],
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
        options: ['2021'],
        selected: null
      }
    ])
    handleParamUpdate('Apples')
  }

  useEffect(() => {
    getFormData()
  }, [])

  useEffect(() => {
    
    var query = _.fromPairs(params.map(({ field, selected }) => [field, selected]))
    
    query = queryParseIndividualFSA(query)
    if (query.Food && query.Sub_Food && query.Year) {
      fetchRows({ table: 'fsa', params: query, form: 'Individual', tableNum: 1 }).then(val => {
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
      <Header title="DRI Analytical System" system="UK-FSA DRI" />
      <Titles params={params} tableNum={0} />
      <ParameterContainer>
        {params.map((param) => {
           if (param.field == 'commodity') {
             return <FoodParameter {...param} handleSelect={handleParamUpdate} key={param.field} />
           } else if (param.field == 'origin') {
            return <OriginParameter {...param} handleSelect={handleParamUpdate} key={param.field} paramType="Default"/>
          } else return <Parameter {...param} handleSelect={handleParamUpdate} key={param.field} />
        }
        )}
      </ParameterContainer>
      <Jumps num="3"/>
      <Methods />
      <TableContainer>
        <h4 className="title">Results</h4>
        <AggregateSamplesTable data={rows} params={params}/>
        <IndividualSamplesTable params={params}/>
        {//<AltIndividualSamplesTable params={params}/>
           }     </TableContainer>
      <style jsx>{`
        .title {
          font-family: Arial, Helvetica, sans-serif;
          font-size: 2em;
          margin: 0
        }
      `}
      </style>
    </div>
  )
}

export function queryParseIndividualFSA(query) {
  let newQuery = {
    Food: query.Food,
    Sub_Food: query.Sub_Food,
    Year: query.FSA_Year
  }
  let pairClaim
  if (query.Claim == "All Market Claims") {} 
  else {
    pairClaim = {
      Market_Claim: query.Claim
    }
    newQuery = {...newQuery, ...pairClaim}
  }
  let pairOrigin
  if (query.Origin == "Imports" || query.Origin == "UK" || query.Origin == "EC" || query.Origin == "Non-EC") {
    if (query.Origin == "UK") {
      pairOrigin = {
        Origin: "UK Domestic"
      }
      newQuery = {...newQuery, ...pairOrigin}
    } else {
      pairOrigin = {
        Origin: query.Origin
      }
      newQuery = {...newQuery, ...pairOrigin}
    }
  } else if (query.Origin == "All Samples") {}
    else {
    pairOrigin = {
      Country: query.Origin
    }
    newQuery = {...newQuery, ...pairOrigin}
  }

  return newQuery
}