import { useEffect, useState } from 'react'
import _, { constant, has } from 'lodash'
import Header from '../../components/Header'
import Titles from '../../components/DynamicTitles'
import ParameterContainer from '../../components/ParameterContainer'
import Parameter, { OriginParameter } from '../../components/Parameter'
import { fetchParamOptions, fetchRows, fetchFormData } from '../../lib/api'
import TableContainer from '../../components/TableContainer'
import Methods from '../../components/Methods'
import Jumps from '../../components/Jumps'
import Table5, { Table6 } from '../../components/TablesReportsAggr'
import Navbar from '../../components/NavBar'
export default function Tables56Screen() {

  const [params, setParams] = useState([
    {
        field: 'origin',
        label: 'Origin',
        options: ['All Samples'],
        selected: 'All Samples'
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
        options: ['2020'],
        selected: null
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
      const options = await fetchParamOptions({ field: newParams[i].field, dependencies, selected: newParams[i].selected, table: 'dri', form: 'Commodity' })
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
    const foods = await fetchFormData({ table: 'dri', form: 'Commodity' })
    //console.log(foods)

    //console.log(foods.data)

    //console.log(params)
    setParams([
        {
            field: 'origin',
            label: 'Origin',
            options: ['All Samples'],
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
            options: ['2020'],
            selected: null
        }
    ])
    handleParamUpdate('Apples')
  }

  useEffect(() => {
    getFormData()
  }, [])
  
  useEffect(() => {
    //console.log('useEffect - params - fetch rows')
    const query = _.fromPairs(params.map(({ field, selected }) => [field, selected]))
    var queryOverride = {
        pdp_year: query.pdp_year
      }
    let pairOrigin
    if (query.origin == 'All Samples') {
        pairOrigin = {
            origin: "All"
        }
    } else if (query.origin == 'Combined Imports') {
        pairOrigin = {
            origin: "Imported"
        }
    } else if (query.origin == 'Domestic Samples') {
        pairOrigin = {
            origin: "Domestic"
        }
    } else {
        pairOrigin = {
            country_name: query.origin
        }
    }
    let pairMarket
    if (query.market == 'All Market Claims') {
        pairMarket = {
            claim: "All"
        }
    } else {
        pairMarket = {
            claim: query.market
        }
    }
    queryOverride = {...queryOverride, ...pairMarket};
    queryOverride = {...queryOverride, ...pairOrigin};
    if (query.origin && query.market && query.pdp_year) {
      fetchRows({ table: 'dri', params: queryOverride, form: 'ReportsAggr', tableNum: 1 }).then(val => {
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
    <Header title="DRI Analytical System" system="US-PDP DRI" />
      <Titles params={params} tableNum={0} />
      <ParameterContainer>
        {params.map((param) => {
          if (param.field == 'origin') {
            return <OriginParameter {...param} handleSelect={handleParamUpdate} key={param.field} paramType="Default"/>
          } else return <Parameter {...param} handleSelect={handleParamUpdate} key={param.field} />
        }
        )}
      </ParameterContainer>
      <Jumps num="2"/>
      <Methods />
      <TableContainer>
        <h4 className="title">Results</h4>
        <Table5 data={rows} params={params} />
        <Table6 params={params} />
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