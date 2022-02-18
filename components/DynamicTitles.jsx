import styles from "./DynamicTitles.module.css";
import { useRouter } from "next/router";

export default function Titles({ params, tableNum }) {
  const pageName = useRouter().route;
  if (pageName == "/dri/by_commodity") {
    switch (tableNum) {
      case 0:
        return CommodityPageTitle((params = { params }));
      case 1:
        return CommodityTitle1((params = { params }));
      case 2:
        return CommodityTitle2((params = { params }));
      default:
        return <th colSpan="9">No Title</th>;
    }
  } else if (pageName == "/dri/by_pesticide") {
    switch (tableNum) {
      case 0:
        return PesticidePageTitle((params = { params }));
      case 1:
        return PesticideTitle1((params = { params }));
      default:
        return <th colSpan="9">No Title</th>;
    }
  } else if (pageName == "/dri/conventional-vs-organic") {
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
        return <th colSpan="9">No Title</th>;
    }
  } else if (pageName == "/dri/domestic_vs_imported") {
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
        return <th colSpan="9">No Title</th>;
    }
  } else if (pageName == "/dri/fqpa_impacts") {
    switch (tableNum) {
      case 0:
        return fqpaPageTitle((params = { params }));
      default:
        return <th colSpan="9">No Title</th>;
    }
  } else if (pageName == "/dri/individual_samples") {
    switch (tableNum) {
      case 0:
        return IndividualPageTitle((params = { params }));
      case 1:
        return IndividualTitle1((params = { params }));
      case 2:
        return IndividualTitle2((params = { params }));
      default:
        return null;
    }
  } else return null;
}

function CommodityPageTitle({ params }) {
  return (
    <div>
      <h2 className={styles.title}>
        Dietary Risk by Commodity: PDP Samples of {params[0].selected}, {params[2].selected}, {params[1].selected}, {params[3].selected}
      </h2>
    </div>
  );
}

function CommodityTitle1({ params }) {
  return (
    <th className={styles.TableTitle} colSpan="9">
      Table 1: Pesticide Residue and Risk Indicators in {params[0].selected} Ranked by Percent of Aggregate FS-DRI: {params[2].selected}, {params[1].selected} Tested by PDP in {params[3].selected}
    </th>
  );
}

function CommodityTitle2({ params }) {
  return (
    <th className={styles.TableTitle} colSpan="9">
      Table 2: Calculation of the Chronic Reference Concentration (cRfC) by Pesticide Active Ingredient for {params[1].selected} {params[0].selected}, {params[3].selected}
    </th>
  );
}

function PesticidePageTitle({ params }) {
  return (
    <div>
      <h2 className={styles.title}>
        Dietary Risk by Pesticide: All Foods Tested by PDP, {params[2].selected}, {params[1].selected}, {params[3].selected}
      </h2>
    </div>
  );
}

function PesticideTitle1({ params }) {
  return (
    <th className={styles.TableTitle} colSpan="9">
      Table 1: {params[0].selected} Pesticide Residue and Risk Indicators in {params[1].selected} of {params[2].selected} Samples Tested by the PDP in {params[3].selected}: Ranked by Food Share of Aggregate FS-DRI
    </th>
  );
}

function ConOrgPageTitle({ params }) {
  return (
    <div>
      <h2 className={styles.title}>
        {" "}
        Dietary Risk in Conventional and Organic Foods: PDP Samples of {params[0].selected} in Domestically Grown Crops, {params[1].selected}{" "}
      </h2>
    </div>
  );
}

function ConOrgTitle1({ params }) {
  return (
    <th className={styles.TableTitle} colSpan="7">
      Table 1: Pesticide Residues and Risk Indicators in Domestically Grown Samples of {params[0].selected}, {params[1].selected}
    </th>
  );
}

function ConOrgTitle2({ params }) {
  return (
    <th className={styles.TableTitle} colSpan="7">
      Table 2: Pesticide Residues Detected in Organically Grown {params[0].selected}, {params[1].selected}
    </th>
  );
}

function ConOrgTitle3({ params }) {
  return (
    <th className={styles.TableTitle} colSpan="10">
      Table 3: Residues Detected in Organic Samples: Compliance With National Organic Program Rule Provisions Governing Pesticide Residues in {params[0].selected} {params[1].selected}
    </th>
  );
}

function ConOrgTitle4({ params }) {
  return (
    <th className={styles.TableTitle} colSpan="6">
      Table 4: Pesticide Residues Detected in Domestic Samples {params[0].selected} Conventionally Grown {params[1].selected}
    </th>
  );
}

function DomesticPageTitle({ params }) {
  return (
    <div>
      <h2 className={styles.title}>
        Dietary Risk Indicators for Domestically Grown and {params[1].selected} of {params[0].selected}: {params[2].selected} Samples of {params[0].selected}, {params[3].selected}
      </h2>
    </div>
  );
}

function DomesticTitle1({ params }) {
  return (
    <th className={styles.TableTitle} colSpan="7">
      Table 1: Pesticide Residue and Risk Indicators in Domestic Samples and {params[1].selected} of {params[2].selected} {params[0].selected}, {params[3].selected}{" "}
    </th>
  );
}

function DomesticTitle2({ params }) {
  return (
    <th className={styles.TableTitle} colSpan="7">
      Table 2: Pesticide Residues Detected in {params[1].selected} of {params[2].selected} {params[0].selected}, {params[3].selected}
    </th>
  );
}

function DomesticTitle3({ params }) {
  return (
    <th className={styles.TableTitle} colSpan="7">
      Table 3: Pesticide Residues Detected in Domestic Samples of {params[2].selected} {params[0].selected}, {params[3].selected}: Ranked by Share of Aggregate FS-DRI
    </th>
  );
}

function fqpaPageTitle({ params }) {
  return (
    <div>
      <h2 className={`${styles.title}`}>FQPA Impacts</h2>
    </div>
  );
}

function IndividualPageTitle({ params }) {
  return (
    <div>
      <h2 className={`${styles.title}`}>
        Individual Positive Samples of {params[0].selected} Tested in {params[3].selected}
      </h2>
    </div>
  );
}

function IndividualTitle1 ({ params }) {

  let claim = params[2].selected

  if (claim == "All Market Claims") {
    claim = "All"
  }

  return (
    <th className={styles.TableTitle} colSpan="7">
      Table 1. Summary Statistics on Aggregate Sample DRI and Number of Residues in Individual Samples of {claim} {params[0].selected} in {params[3].selected}
    </th>
  );
}

function IndividualTitle2 ({ params }) {
  let claim = params[2].selected

  if (claim == "All Market Claims") {
    claim = "All"
  }

  return (
    <th className={styles.TableTitle} colSpan="11">
      Table 2: All Analytes Found in Individual Samples of {claim} {params[0].selected} in {params[3].selected}: Number of Residues Detected and DRI Values
    </th>
  );
}