import { useEffect, useState } from 'react'
import _ from 'lodash'
import Header from '../../components/Header'
import ParameterContainer from '../../components/ParameterContainer'
import Parameter                           from '../../components/Parameter'
import { fetchParamOptions, fetchRows, fetchFormData } from '../../lib/api'
import TableContainer                      from '../../components/TableContainer'
import ResidueAndRiskIndicatorsTable from '../../components/PesticideResidueAndRiskIndicatorsTable'
import Methods from '../../components/Methods'
import KeyFindings from '../../components/KeyFindings'
import TableLinks from '../../components/TableLinks'
import PageTitle, { DRITitleTable1 } from '../../components/DynamicTitles'
export default function ByPesticideScreen () {
  
  const [params, setParams] = useState([
    {
      field: 'rpt_pest_name',
      label: 'Analyte',
      options: ['Chlorpyrifos'],
      selected: null
    },
    {
      field: 'origin',
      label: 'Origin',
      options: ['Combined Imports'],
      selected: null
    },
    {
      field: 'claim',
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
  
  // TODO: DRY
  const [rows, setRows] = useState([])
  
  const handleParamUpdate = async (field, selected) => {
    // console.log('update fields after ', field)
    console.time('fetch params' + field)
    const newParams = _.cloneDeep(params)
    
    //console.log(newParams)

    const idx = _.findIndex(newParams, (param) => param.field === field)
    
    if (idx !== -1) newParams[idx].selected = selected
    
    for (let i = idx + 1; i < newParams.length; i++) {
      const dependencies = _.fromPairs(_.slice(newParams, 0, i).map(dep => [dep.field, dep.selected]))
      const options = await fetchParamOptions({ field: newParams[i].field, dependencies, selected: newParams[i].selected, table: 'dri' })
      //console.log('options')
      //console.log(options)
      newParams[i].options = options
      if (newParams[i].options.indexOf(newParams[i].selected) === -1) newParams[i].selected = newParams[i].options[0]
    }
    
    //console.log('new params: ', newParams)
    setParams(newParams)
    console.timeEnd('fetch params' + field)
  }

  const getFormData = async () => {
    //console.log('getFormData')
    const foods = await fetchFormData({ table: 'dri' })
    //console.log(foods)

    //console.log(foods.data)

    //console.log(params)
    setParams([
      {
        field: 'rpt_pest_name',
        label: 'Analyte',
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
        field: 'claim',
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
    handleParamUpdate('Chlorpyrifos')
  }
  
  useEffect(() => {
    //handleParamUpdate('Apple')
    getFormData()
  }, [])
  
  useEffect(() => {
    //console.log('useEffect - params - fetch rows')
    const query = _.fromPairs(params.map(({ field, selected }) => [field, selected]))
    //console.log(query)
    if (query.rpt_pest_name && query.origin && query.claim && query.pdp_year) {
      fetchRows({ table: 'dri', params: query }).then(val => {
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
      <Header title="DRI Analytical System"/>
      <PageTitle params={params} />
      <ParameterContainer>
        {params.map(param => <Parameter {...param} handleSelect={handleParamUpdate} key={param.field} />)}
      </ParameterContainer>
      <TableContainer>
        <h1 className="title">Results</h1>
        <ResidueAndRiskIndicatorsTable data={rows} params={params}/>
        <Methods />
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
