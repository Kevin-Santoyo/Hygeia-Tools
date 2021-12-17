import { useEffect, useState } from 'react'
import _, { forEach } from 'lodash'
import Header from '../../components/Header'
import ParameterContainer from '../../components/ParameterContainer'
import Parameter, { OriginParameter } from '../../components/Parameter'
import { fetchParamOptions, fetchRows, fetchFormData } from '../../lib/api'
import TableContainer from '../../components/TableContainer'
import ConventialOrganicTable1, { ConventialOrganicTable2, ConventialOrganicTable3, ConventialOrganicTable4 }from '../../components/TablesConventionalVSOrganic'
import Methods from '../../components/Methods'
import KeyFindings from '../../components/KeyFindings'
import TableLinks from '../../components/TableLinks'
import PageTitle, { DRITitleTable1 } from '../../components/DynamicTitles'
export default function conventionalVSOrganicScreen() {

    const [params, setParams] = useState([
        {
          field: 'commodity',
          label: 'Food',
          options: ['Apples'],
          selected: 'Apples'
        },
        {
          field: 'pdp_year',
          label: 'Year',
          options: ['2016'],
          selected: 2016
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
          const options = await fetchParamOptions({ field: newParams[i].field, dependencies, selected: newParams[i].selected, table: 'dri', form: 'Conventional' })
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
            field: 'pdp_year',
            label: 'Origin',
            options: [2016],
            selected: null
          }
        ])
        handleParamUpdate('Apple')
      }

      useEffect(() => {
        getFormData()
      }, [])

      useEffect(() => {
        
        const query = _.fromPairs(params.map(({ field, selected }) => [field, selected]))
        
        if (query.commodity && query.pdp_year) {
          fetchRows({ table: 'dri', params: query, form: 'Conventional', tableNum: 1 }).then(val => {
            console.log('fetched rows: ', val)
            setRows(val)
          })
        } else {
          console.log('not fetching rows. ', query)
          setRows([])
        }
        // fetch()
      }, [params])

      console.log(rows)
      
      return (
        <div className='div'>
          <Header title="DRI Analytical System" />
          <PageTitle params={params} analyte='Pesticide' />
          <ParameterContainer>
            {params.map((param) => {
              if (param.field == 'origin') {
                return <OriginParameter {...param} handleSelect={handleParamUpdate} key={param.field} />
              } else return <Parameter {...param} handleSelect={handleParamUpdate} key={param.field} />
            }
            )}
          </ParameterContainer>
          <TableContainer>
            <h1 className="title">Results</h1>
            <ConventialOrganicTable1 data={rows} params={params}/>
            <Methods />
            <KeyFindings data={rows} />
            <ConventialOrganicTable2 params={params} />
            <ConventialOrganicTable3 params={params} />
            <ConventialOrganicTable4 params={params} />
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