import { useEffect, useState } from 'react'
import _, { constant, has } from 'lodash'
import Header from '../../components/Header'
import PageTitle from '../../components/DynamicTitles'
import ParameterContainer from '../../components/ParameterContainer'
import Parameter, { OriginParameter } from '../../components/Parameter'
import { fetchParamOptions, fetchRows, fetchFormData } from '../../lib/api'
import TableContainer from '../../components/TableContainer'
import ResidueAndRiskIndicatorsTable from '../../components/ResidueAndRiskIndicatorsTable'
import Methods from '../../components/Methods'
import KeyFindings from '../../components/KeyFindings'
import TableLinks from '../../components/TableLinks'
import CRFCTable from '../../components/CRFCTable'
export default function ByCommodityScreen() {

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
      options: ['Combined Imports'],
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
      selected: 2016
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
    //handleParamUpdate('Apple')
    getFormData()
  }, [])

  useEffect(() => {
    //console.log('useEffect - params - fetch rows')
    const query = _.fromPairs(params.map(({ field, selected }) => [field, selected]))

    //console.log(query)
    if (query.commodity && query.origin && query.market && query.pdp_year) {
      fetchRows({ table: 'dri', params: query, form: 'Commodity', tableNum: 1 }).then(val => {
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
      <Header title="DRI Analytical System" />
      <PageTitle params={params} analyte='Commodity' />
      <ParameterContainer>
        {params.map((param) => {
          if (param.field == 'origin') {
            return <OriginParameter {...param} handleSelect={handleParamUpdate} key={param.field} />
          } else return <Parameter {...param} handleSelect={handleParamUpdate} key={param.field} />
        }
        )}
      </ParameterContainer>
      <TableContainer>
        <h4 className="title">Results</h4>
        <ResidueAndRiskIndicatorsTable data={rows} params={params} />
        <Methods />
        <KeyFindings data={rows} />
        <TableLinks />
        <CRFCTable data={_.sortBy(rows, 'pesticide')} params={params} />
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
