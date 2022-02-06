import { useEffect, useState } from 'react'
import _, { forEach } from 'lodash'
import Header from '../../components/Header'
import ParameterContainer from '../../components/ParameterContainer'
import Parameter, { OriginParameter } from '../../components/Parameter'
import { fetchParamOptions, fetchRows, fetchFormData } from '../../lib/api'
import TableContainer from '../../components/TableContainer'
import Methods from '../../components/Methods'
import KeyFindings from '../../components/KeyFindings'
import TableLinks from '../../components/TableLinks'
import PageTitle from '../../components/DynamicTitles'
import FQPATable1a from '../../components/TablesFQPA'
export default function conventionalVSOrganicScreen() {

    const [params, setParams] = useState([
        {
          field: 'commodity_category',
          label: 'Food Category:',
          options: ['Fresh Fruit'],
          selected: 'Fresh Fruit'
        },
        {
          field: 'pesticide_group',
          label: 'Pesticide Group',
          options: ['All Pesticides'],
          selected: 'All Pesticides'
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
          const options = await fetchParamOptions({ field: newParams[i].field, dependencies, selected: newParams[i].selected, table: 'dri', form: 'FQPA' })
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
        const foods = await fetchFormData({ table: 'dri', form: 'FQPA' })
        //console.log(foods)
    
        //console.log(foods.data)
    
        //console.log(params)
        setParams([
          {
            field: 'commodity_category',
            label: 'Food Category',
            options: foods.data,
            selected: null
          },
          {
            field: 'pesticide_group',
            label: 'Pesticide Group',
            options: ['All Pesticides'],
            selected: null
          }
        ])
        handleParamUpdate('Apple')
      }

      useEffect(() => {
        getFormData()
      }, [])

      useEffect(() => {
        console.log(params, 'fqpa params') 
        const query = { "pesticide_group": params[1].selected }
        console.log(query, 'fqpa query')
        
        if (query.pesticide_group) {
          fetchRows({ table: 'dri', params: query, form: 'FQPA', tableNum: 1 }).then(val => {
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
        <Header title="DRI Analytical System" system="US-PDP DRI" />
          <PageTitle params={params} tableNum={0} />
          <ParameterContainer>
          {params.map(param => <Parameter {...param} handleSelect={handleParamUpdate} key={param.field} />)}
          </ParameterContainer>
          <TableContainer>
            <h1 className="title">Results</h1>
            <FQPATable1a data={rows} params={params}/>
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