import { useEffect, useState } from 'react'
import _, { forEach } from 'lodash'
import Header from '../../components/Header'
import Titles from '../../components/DynamicTitles'
import ParameterContainer from '../../components/ParameterContainer'
import Parameter, { OriginParameter } from '../../components/Parameter'
import { fetchParamOptions, fetchRows, fetchFormData } from '../../lib/api'
import TableContainer from '../../components/TableContainer'
import PesticideResidueAndRiskIndicatorsTable from '../../components/TablesByPesticide'
import Methods from '../../components/Methods'
import KeyFindings from '../../components/KeyFindings'
import TableLinks from '../../components/TableLinks'
export default function ByPesticideScreen() {
  useEffect(() => {
    document.title = "By Pesticide | US-PDP"
  }, [])

  const [params, setParams] = useState([
    {
      field: 'Rpt_Pest_Name',
      label: 'Analyte',
      options: ['Chlorpyrifos'],
      selected: 'Chlorpyrifos'
    },
    {
      field: 'Origin',
      label: 'Origin',
      options: ['Combined Imports'],
      selected: 'Combined Imports'
    },
    {
      field: 'Claim',
      label: 'Claim',
      options: ['All Market Claims'],
      selected: 'All Market Claims'
    },
    {
      field: 'PDP_Year',
      label: 'Year',
      options: ['2018'],
      selected: 2018
    }
  ])
  // TODO: DRY
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
      const options = await fetchParamOptions({ field: newParams[i].field, dependencies, selected: newParams[i].selected, table: 'dri', form: 'Pesticide' })
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
    const foods = await fetchFormData({ table: 'dri', form: 'Pesticide' })
    //console.log(foods)

    //console.log(foods.data)

    //console.log(params)
    setParams([
      {
        field: 'Rpt_Pest_Name',
        label: 'Analyte',
        options: foods.data,
        selected: null
      },
      {
        field: 'Origin',
        label: 'Origin',
        options: ['Combined Imports'],
        selected: null
      },
      {
        field: 'Claim',
        label: 'Claim',
        options: ['All Market Claims'],
        selected: null
      },
      {
        field: 'PDP_Year',
        label: 'Year',
        options: [2016],
        selected: null
      }
    ])
    handleParamUpdate('Chlorpyrifos')
  }

  useEffect(() => {
    getFormData()
  }, [])

  useEffect(() => {
    //console.log('useEffect - params - fetch rows')
    const query = _.fromPairs(params.map(({ field, selected }) => [field, selected]))
    //console.log(query)
    let queryOverride = queryParse(query)
    if (query.Rpt_Pest_Name && query.Origin && query.Claim && query.PDP_Year) {
      console.log(query, 'query - by_pesticide')
      fetchRows({ table: 'dri', params: queryOverride, form: 'Pesticide', tableNum: 1 }).then(val => {
        console.log('fetched rows: ', val)
        setRows(val)
      })
    } else {
      console.log('not fetching rows. ', query)
    }
    // fetch()
  }, [params])

  return (
    <div className='div'>
    <Header title="DRI Analytical System" system="US-PDP DRI" />
      <Titles params={params} tableNum={0} />
      <ParameterContainer>
        {params.map((param) => {
          if (param.field == 'Origin') {
            return <OriginParameter {...param} handleSelect={handleParamUpdate} key={param.field} paramType="Default"/>
          } else return <Parameter {...param} handleSelect={handleParamUpdate} key={param.field} />
        }
        )}
      </ParameterContainer>
      <Methods />
      <TableContainer>
        <h1 className="title">Results</h1>
        <PesticideResidueAndRiskIndicatorsTable data={rows} params={params} />
        <KeyFindings data={rows} />
        <TableLinks />
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

function queryParse( query ) {
  let newQuery = {
    Rpt_Pest_Name: query.Rpt_Pest_Name,
    PDP_Year: query.PDP_Year
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
  } else if (query.Origin == "Domestic Samples") {
    pairOrigin = {
      Origin: "Domestic"
    }
  } else if (query.Origin == "Combined Imports") {
    pairOrigin = {
      Origin: "Imported"
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