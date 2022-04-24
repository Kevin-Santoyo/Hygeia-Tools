import { useEffect, useState } from 'react'
import _, { constant, has } from 'lodash'
import Header from '../../components/Header'
import Titles from '../../components/DynamicTitles'
import ParameterContainer from '../../components/ParameterContainer'
import Parameter, { FoodParameter, OriginParameter } from '../../components/Parameter'
import { fetchParamOptions, fetchRows, fetchFormData } from '../../lib/api'
import TableContainer from '../../components/TableContainer'
import Methods from '../../components/Methods'
import AggregateSamplesTable, { AltIndividualSamplesTable, IndividualSamplesTable } from '../../components/TablesIndividual'
import Jumps from '../../components/Jumps'
export default function IndividualSamplesScreen() {
  useEffect(() => {
    document.title = "Individual Samples | US-PDP"
  }, [])

  const [params, setParams] = useState([
    {
      field: 'commodity',
      label: 'Select Food:',
      options: ['Apples'],
      selected: 'Apples'
    },
    {
      field: 'origin',
      label: 'Select Origin:',
      options: ['All Samples'],
      selected: 'Combined Imports'
    },
    {
      field: 'market',
      label: 'Select Claim:',
      options: ['All Market Claims'],
      selected: 'All Market Claims'
    },
    {
      field: 'pdp_year',
      label: 'Select Year:',
      options: ['2016'],
      selected: 2020
    }
  ])

  const [params2, setParams2] = useState([
    {
      field: 'foc',
      label: 'Family of Chemistry',
      options: [''],
      selected: 'All'
    }
  ])

  const [rows, setRows] = useState([])

  const handleParamUpdate = async (field, selected) => {
    
    console.time('fetch params: ' + field)
    const newParams = _.cloneDeep(params)
    

    const idx = _.findIndex(newParams, (param) => param.field === field)

    if (idx !== -1) newParams[idx].selected = selected

    for (let i = idx + 1; i < newParams.length; i++) {
      const dependencies = _.fromPairs(_.slice(newParams, 0, i).map(dep => [dep.field, dep.selected]))
      const options = await fetchParamOptions({ field: newParams[i].field, dependencies, selected: newParams[i].selected, table: 'dri', form: 'Individual' })
      
      newParams[i].options = options
      if (newParams[i].options.indexOf(newParams[i].selected) === -1) newParams[i].selected = newParams[i].options[0]
    }
    
    setParams(newParams)
    console.timeEnd('fetch params: ' + field)
  }

  const getFormData = async () => {
    
    const foods = await fetchFormData({ table: 'dri', form: 'Individual' })
    console.log(foods, 'DATA')
    setParams([
      {
        field: 'commodity',
        label: 'Food',
        options: foods.data,
        selected: null
      },
      {
        field: 'origin',
        label: 'Origin',
        options: ['Combined Imports'],
        selected: null
      },
      {
        field: 'market',
        label: 'Claim',
        options: ['All Market Claims'],
        selected: null
      },
      {
        field: 'pdp_year',
        label: 'Year',
        options: ['2016'],
        selected: null
      }
    ])
    handleParamUpdate('Apples')
  }

  useEffect(() => {
    getFormData()
  }, [])

  const getFocData = async() => {
    const foc = ['One', 'Two', 'Three']
    setParams2([
      {
        field: 'foc',
        label: 'Family of Chemistry',
        options: foc,
        selected: 'All'
      }
    ])
  }
  useEffect(() => {
    getFocData()
  }, [])

  useEffect(() => {
    
    const query = _.fromPairs(params.map(({ field, selected }) => [field, selected]))
    var queryOverride = {
      pdp_year: query.pdp_year
    }
    let pairCommodity
    if (query.commodity == 'All Foods') {
      
    } else {
      pairCommodity = {
        commodity: query.commodity
      }
    }
    queryOverride = {...queryOverride, ...pairCommodity};
    let pairOrigin
    if (query.origin == 'All Samples' | query.origin == 'Combined Imports' | query.origin == 'Domestic Samples' | query.origin == 'Unknown') {
      if (query.origin == "Combined Imports") {
        pairOrigin = {
          origin: 2
        }
      } else if (query.origin == 'Domestic Samples') {
        pairOrigin = {
            origin: 1
        }
      } else if (query.origin == 'Unknown') {
        pairOrigin = {
            origin: 3
        }
      }
    } else {
      pairOrigin = {
        country_name: query.origin
      }
    }
    queryOverride = {...queryOverride, ...pairOrigin};
    let pairMarket
    if (query.market !== 'All Market Claims') {
      pairMarket = {
        claim: query.market
      }
      queryOverride = {...queryOverride, ...pairMarket};
    }
    if (query.commodity && query.origin && query.market && query.pdp_year) {
      fetchRows({ table: 'dri', params: queryOverride, form: 'Individual', tableNum: 1 }).then(val => {
        console.log('fetched rows: ', val)
        setRows(val)
      })
    } else {
      console.log('not fetching rows. ', query)
    }
    
  }, [params])

  return (
    <div>
      <Header title="DRI Analytical System" system="US-PDP DRI" />
      <Titles params={params} tableNum={0} />
      <ParameterContainer>
        {params.map((param) => {
           if (param.field == 'commodity') {
             return <FoodParameter {...param} handleSelect={handleParamUpdate} key={param.field} />
           } else if (param.field == 'origin') {
            return <OriginParameter {...param} handleSelect={handleParamUpdate} key={param.field} paramType="Default"/>
          } else return <Parameter {...param} handleSelect={handleParamUpdate} key={param.field} />
        })
        }
        {
          params2.map((param) => {
            return <Parameter {...param} handleSelect='' key={param.field} />
          })
        }
      </ParameterContainer>
      <Jumps num="3"/>
      <Methods />
      <TableContainer>
        <h4 className="title">Results</h4>
        <AggregateSamplesTable data={rows} params={params}/>
        <IndividualSamplesTable params={params}/>
        <AltIndividualSamplesTable params={params}/>
      </TableContainer>
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
