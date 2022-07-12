import styles from "./DynamicTitles.module.css";
import { useRouter } from "next/router";
let pdpData = 'US-PDP'
let fsaData = 'UK-FSA'

export default function Titles({ params, tableNum }) {
  const pageName = useRouter().route;
  if (pageName == "/dri/by_commodity" || pageName == "/fsa/by_food") {
    params = paramsParse(params)
    switch (tableNum) {
      case 0:
        return CommodityPageTitle((params = { params }));
      case 1:
        return CommodityTitle1((params = { params }));
      case 2:
        return CommodityTitle2((params = { params }));
      default:
        return <div colSpan="9">No Title</div>;
    }
  } else if (pageName == "/dri/by_pesticide" || pageName == "/fsa/by_pesticide") {
    params = paramsParse(params)
    switch (tableNum) {
      case 0:
        return PesticidePageTitle((params = { params }));
      case 1:
        return PesticideTitle1((params = { params }));
      default:
        return <div colSpan="9">No Title</div>;
    }
  } else if (pageName == "/dri/conventional-vs-organic" || pageName == "/fsa/conventional_vs_organic") {
    params = paramsParse(params)
    switch (tableNum) {
      case 0:
        return ConOrgPageTitle((params = { params }));
      case 1:
        return ConOrgTitle1((params = { params }));
      case 2:
        return ConOrgTitle2((params = { params }));
      case 3:
        return ConOrgTitle3((params = { params }));
      case 4:
        return ConOrgTitle4((params = { params }));
      default:
        return <div colSpan="9">No Title</div>;
    }
  } else if (pageName == "/dri/domestic_vs_imported" || pageName == "/fsa/domestic_vs_imported") {
    params = paramsParse(params)
    switch (tableNum) {
      case 0:
        return DomesticPageTitle((params = { params }));
      case 1:
        return DomesticTitle1((params = { params }));
      case 2:
        return DomesticTitle2((params = { params }));
      case 3:
        return DomesticTitle3((params = { params }));
      default:
        return <div colSpan="9">No Title</div>;
    }
  } else if (pageName == "/dri/individual_samples" || pageName == "/fsa/individual_samples") {
    params = paramsParse(params)
    switch (tableNum) {
      case 0:
        return IndividualPageTitle((params = { params }));
      case 1:
        return IndividualTitle1((params = { params }));
      case 2:
        return IndividualTitle2((params = { params }));
      case 3:
        return IndividualTitle3((params = { params }));
      default:
        return null;
    }
  } else if (pageName == "/dri/reports_aggr") {
    switch (tableNum) {
      case 0:
        return ReportsAggrPageTitle((params = { params }));
      case 1:
        return ReportsAggrTitle1((params = { params }));
      case 2:
        return ReportsAggrTitle2((params = { params }));
      default:
        return null;
    }
  } else return null;
}

function CommodityPageTitle({ params }) {
  return (
    <div>
      <h2 className={styles.title}>
      Aggregate Dietary Risk Index of Across All Pesticides by Food
      </h2>
    </div>
  );
  // OLD TITLE: Dietary Risk by Commodity: {params.origin} of {params.food}, {params.claim}, {params.year}
}

function CommodityTitle1({ params }) {
  return (
    <div className={styles.TableTitle} colSpan="9">
      Table 1: Pesticide Residue and Risk Indicators in {params.food} Ranked by Percent of Aggregate FS-DRI: {params.claim}, {params.origin} Tested by {params.dataset} in {params.year}
    </div>
  );
}

function CommodityTitle2({ params }) {
  return (
    <div className={styles.TableTitle} colSpan="9">
      Table 2: Calculation of the Chronic Reference Concentration (cRfC) by Pesticide, Active Ingredient for {params.origin} {params.food}, {params.year}, Tested by {params.dataset}
    </div>
  );
}

function PesticidePageTitle({ params }) {
  return (
    <div>
      <h2 className={styles.title}>
      Aggregate Dietary Risk Index of Across All Foods by Pesticide
      </h2>
    </div>
  );
  // OLD TITLE: Dietary Risk by Pesticide: All Foods Tested by PDP, {params.claim}, {params.origin}, {params.year}
}

function PesticideTitle1({ params }) {
  return (
    <div className={styles.TableTitle} colSpan="9">
      Table 1: {params.pesticide} Pesticide Residue and Risk Indicators in {params.origin} of {params.claim} Samples Tested by the {params.dataset} in {params.year}: Ranked by Food Share of Aggregate FS-DRI
    </div>
  );
}

function ConOrgPageTitle({ params }) {
  return (
    <div>
      <h2 className={styles.title}>
      Comparison of U.S. Domestic Conventional vs. Organic Dietary Risk Indicators
      </h2>
    </div>
  );
  // OLD TITLE: Dietary Risk in Conventional and Organic Foods: {params.dataset} Samples of {params.food} in Domestically Grown Crops, {params.year}
}

function ConOrgTitle1({ params }) {
  return (
    <div className={styles.TableTitle} colSpan="7">
      Table 1: Pesticide Residues and Risk Indicators in Domestically Grown Samples of {params.food}, {params.year}
    </div>
  );
}

function ConOrgTitle2({ params }) {
  return (
    <div className={styles.TableTitle} colSpan="7">
      Table 2: Pesticide Residues Detected in Organically Grown {params.food}, {params.year}
    </div>
  );
}

function ConOrgTitle3({ params }) {
  return (
    <div className={styles.TableTitle} colSpan="10">
      Table 3: Residues Detected in Organic Samples: Compliance With National Organic Program Rule Provisions Governing Pesticide Residues in {params.food}, {params.year}
    </div>
  );
}

function ConOrgTitle4({ params }) {
  return (
    <div className={styles.TableTitle} colSpan="6">
      Table 4: Pesticide Residues Detected in Domestic Samples {params.food} Conventionally Grown {params.year}
    </div>
  );
}

function DomesticPageTitle({ params }) {
  return (
    <div>
      <h2 className={styles.title}>
      Comparison of Domestic vs. Imported Dietary Risk Indicators
      </h2>
    </div>
  );
  // OLD TITLE: Dietary Risk Indicators for Domestically Grown and {params.origin} of {params.food}: {params.claim} Samples of {params.food}, {params.year}
}

function DomesticTitle1({ params }) {
  return (
    <div className={styles.TableTitle} colSpan="7">
      Table 1: Pesticide Residue and Risk Indicators in Domestic Samples and {params.origin} of {params.claim} {params.food}, {params.year}
    </div>
  );
}

function DomesticTitle2({ params }) {
  return (
    <div className={styles.TableTitle} colSpan="7">
      Table 2: Pesticide Residues Detected in {params.origin} of {params.claim} {params.food}, {params.year}
    </div>
  );
}

function DomesticTitle3({ params }) {
  return (
    <div className={styles.TableTitle} colSpan="7">
      Table 3: Pesticide Residues Detected in Domestic Samples of {params.claim} {params.food}, {params.year}: Ranked by Share of Aggregate FS-DRI
    </div>
  );
}

function IndividualPageTitle({ params }) {
  return (
    <div>
      <h2 className={`${styles.title}`}>
        Individual Positive Samples of {params.food} Tested by the {params.dataset} in {params.year}
      </h2>
    </div>
  );
}

function IndividualTitle1 ({ params }) {
  let results = commodityClaimParse(params.food, params.claim)
  let claim = results[0]
  let commodity = results[1]

  return (
    <div className={styles.TableTitle} colSpan="7">
      Table 1. Summary Statistics on Aggregate Sample DRI and Number of Residues in Individual Samples of {claim} {commodity} in {params.year}, {params.origin}
    </div>
  );
}

function IndividualTitle2 ({ params }) {
  let results = commodityClaimParse(params.food, params.claim)
  let claim = results[0]
  let commodity = results[1]

  return (
    <div className={styles.TableTitle} colSpan="11">
      Table 2: All Analytes Found in Individual Samples of {claim} {commodity} in {params.year}: Number of Residues Detected and DRI Values, {params.origin}
    </div>
  );
}

function IndividualTitle3 ({ params }) {
  let results = commodityClaimParse(params.food, params.claim)
  let claim = results[0]
  let commodity = results[1]

  return (
    <div className={styles.TableTitle} colSpan="11">
      Table 3: All Analytes Found in Individual Samples of {claim} {commodity} in {params.year}: Number of Residues Detected and DRI Values Ranked by DRI, {params.origin}
    </div>
  );
}

function ReportsAggrPageTitle({ params }) {
  
  return (
    <div>
      <h2 className={`${styles.title}`}>
      Aggregate Sample DRI by Food & Pesticide 
      </h2>
    </div>
  );
}

function ReportsAggrTitle1({ params }) {

  return (
    <div className={styles.TableTitle} colSpan="11">
      {params[0].selected}, {params[1].selected} Samples: Aggregate Food DRI Values in {params[2].selected}, Ranked by FS-DRI (Highest to Lowest) Across Pesticides.
    </div>
  );
}

function ReportsAggrTitle2({ params }) {
  return (
    <div className={styles.TableTitle} colSpan="11">
      {params[0].selected}, {params[1].selected} Samples: Aggregate Food DRI Values in {params[2].selected}, Ranked by FS-DRI (Highest to Lowest) Across Foods.
    </div>
  );
}

function commodityClaimParse(commodity, claim) {
  if (commodity == "All Foods" && claim == "All Market Claims") {
    claim = "All"
    commodity = "Foods"
  } else if (claim == "All Market Claims") {
    claim = "All"
    commodity = commodity
  } else {
    claim = claim
    commodity = commodity
  }
  return [claim, commodity]
}

function originClaimParse(origin, claim) {
  if (origin == "All Samples" && claim == "All Market Claims") {
    claim = "All Market Claims"
  } else if (claim == "All Market Claims" && origin == "Domestic Samples") {
    claim = "All Domestic"
  } else if (origin == "All Samples") {
    claim = claim
    origin = "All"
  } else if (origin == "Domestic Samples") {
    claim = "Domestic " + claim
  }
  return [origin, claim]
}

function paramsParse(params) {
  let pageName = useRouter().route
  let trueParams = []
  if (pageName == "/dri/by_commodity" || pageName == "/fsa/by_food") {
    trueParams = {
        dataset: (pageName == "/dri/by_commodity" ? pdpData : fsaData),
        food: (pageName == "/dri/by_commodity" ? params[0].selected : params[0].selected + ', ' + params[1].selected),
        origin: (pageName == "/dri/by_commodity" ? params[1].selected : params[2].selected),
        claim: (pageName == "/dri/by_commodity" ? params[2].selected: params[3].selected),
        year: (pageName == "/dri/by_commodity" ? params[3].selected : params[4].selected)
        
      }
    return trueParams
  } else if (pageName == "/dri/domestic_vs_imported" || pageName == "/fsa/domestic_vs_imported") {
    trueParams = {
        dataset: (pageName == "/dri/domestic_vs_imported" ? pdpData : fsaData),
        food: (pageName == "/dri/domestic_vs_imported" ? params[0].selected : params[0].selected + ', ' + params[1].selected),
        origin: (pageName == "/dri/domestic_vs_imported" ? params[1].selected : params[2].selected),
        claim: (pageName == "/dri/domestic_vs_imported" ? params[2].selected: params[3].selected),
        year: (pageName == "/dri/domestic_vs_imported" ? params[3].selected : params[4].selected)
        
      }
    return trueParams
  } else if (pageName == "/dri/individual_samples" || pageName == "/fsa/individual_samples") {
    trueParams = {
        dataset: (pageName == "/dri/individual_samples" ? pdpData : fsaData),
        food: (pageName == "/dri/individual_samples" ? params[0].selected : params[0].selected + ', ' + params[1].selected),
        origin: (pageName == "/dri/individual_samples" ? params[1].selected : params[2].selected),
        claim: (pageName == "/dri/individual_samples" ? params[2].selected: params[3].selected),
        year: (pageName == "/dri/individual_samples" ? params[3].selected : params[4].selected)
        
      }
    return trueParams
  } else if (pageName == "/dri/by_pesticide" || pageName == "/fsa/by_pesticide") {
    trueParams = {
      dataset: (pageName == "/dri/by_pesticide" ? pdpData : fsaData),
      pesticide: params[0].selected,
      origin: params[1].selected,
      claim: params[2].selected,
      year: params[3].selected
    }
    return trueParams
  } else if (pageName == "/dri/conventional-vs-organic" || pageName == "/fsa/conventional_vs_organic") {
    trueParams = {
      dataset: (pageName == "/dri/conventional-vs-organic" ? pdpData : fsaData),
      food: (pageName == "/dri/conventional-vs-organic" ? params[0].selected : params[0].selected + ', ' + params[1].selected),
      year: (pageName == "/dri/conventional-vs-organic" ? params[1].selected : params[2].selected)
    }
    return trueParams
  }
}