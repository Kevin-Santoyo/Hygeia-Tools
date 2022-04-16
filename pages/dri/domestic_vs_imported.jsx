import { useEffect, useState } from "react";
import _, { forEach } from "lodash";
import Header from "../../components/Header";
import ParameterContainer from "../../components/ParameterContainer";
import Parameter, { OriginParameter } from "../../components/Parameter";
import Methods from "../../components/Methods";
import { fetchParamOptions, fetchRows, fetchFormData } from "../../lib/api";
import TableContainer from "../../components/TableContainer";
import PageTitle from "../../components/DynamicTitles";
import DomesticTable1, { DomesticTable2, DomesticTable3 } from "../../components/TablesDomestic";
export default function DomesticImportedScreen() {
  const [params, setParams] = useState([
    {
      field: "Commodity_Name",
      label: "Select Food:",
      options: ["Apples"],
      selected: "Apples",
    },
    {
      field: "Origin",
      label: "Select Origin:",
      options: ["Combined Imports"],
      selected: "Combined Imports",
    },
    {
      field: "Claim",
      label: "Select Claim:",
      options: ["All Market Claims"],
      selected: "All Market Claims",
    },
    {
      field: "PDP_Year",
      label: "Select Year:",
      options: ["2016"],
      selected: 2016,
    },
  ]);

  const [rows, setRows] = useState([]);

  const handleParamUpdate = async (field, selected) => {
    // console.log('update fields after ', field)
    console.time("fetch params: " + field);
    const newParams = _.cloneDeep(params);

    //console.log(newParams)

    const idx = _.findIndex(newParams, (param) => param.field === field);

    if (idx !== -1) newParams[idx].selected = selected;

    for (let i = idx + 1; i < newParams.length; i++) {
      const dependencies = _.fromPairs(_.slice(newParams, 0, i).map((dep) => [dep.field, dep.selected]));
      const options = await fetchParamOptions({ field: newParams[i].field, dependencies, selected: newParams[i].selected, table: "dri", form: "Domestic" });
      //console.log('options')
      //console.log(options)
      newParams[i].options = options;
      if (newParams[i].options.indexOf(newParams[i].selected) === -1) newParams[i].selected = newParams[i].options[0];
    }

    //console.log('new params: ', newParams)
    setParams(newParams);
    console.timeEnd("fetch params: " + field);
  };

  const getFormData = async () => {
    //console.log('getFormData')
    const foods = await fetchFormData({ table: "dri", form: "Commodity" });
    //console.log(foods)

    //console.log(foods.data)

    //console.log(params)
    setParams([
        {
            field: 'Commodity_Name',
            label: 'Food',
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
            options: ['2016'],
            selected: null
          }
    ]);
    handleParamUpdate("Apple");
  };

  useEffect(() => {
    getFormData();
  }, []);

  useEffect(() => {
    const query = _.fromPairs(params.map(({ field, selected }) => [field, selected]));

    let queryOverride = queryParse(query)
    if (query.Commodity_Name && query.Origin && query.Claim && query.PDP_Year) {
      fetchRows({ table: "dri", params: queryOverride, form: "Domestic", tableNum: 1 }).then((val) => {
        console.log("fetched rows: ", val);
        setRows(val);
      });
    } else {
      console.log("not fetching rows. ", query);
      setRows([]);
    }
    // fetch()
  }, [params]);

  console.log(rows);

  return (
    <div className="div">
    <Header title="DRI Analytical System" system="US-PDP DRI" />
      <PageTitle params={params} tableNum={0} />
      <ParameterContainer>
        {params.map((param) => {
          if (param.field == "Origin") {
            return <OriginParameter {...param} handleSelect={handleParamUpdate} key={param.field} paramType="Domestic"/>;
          } else return <Parameter {...param} handleSelect={handleParamUpdate} key={param.field} />;
        })}
      </ParameterContainer>
      <Methods />
      <TableContainer>
        <h1 className="title">Results</h1>
        <DomesticTable1 data={rows} params={params}/>
        <DomesticTable2 params={params} />
        <DomesticTable3 params={params} />
      </TableContainer>
      <style jsx>
        {`
          .title {
            font-family: Helvetica, Arial, sans-serif;
          }
        `}
      </style>
    </div>
  );
}

function queryParse( query ) {
  let newQuery = {
    Commodity_Name: query.Commodity_Name,
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
  newQuery = {...newQuery, ...pairClaim}

  return newQuery
}