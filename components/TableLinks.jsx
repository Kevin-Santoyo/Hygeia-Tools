import styles from './KeyFindings.module.css'

export default function TableLinks () {
    return (
        <div className={styles.container}>
            <p>For tables comparing residues and risk in conventional versus organic samples of a given commodity, see <a href="/pages/dri/conventional-vs-organic/">Residues and Relative Risks in Organic and Conventional Food.</a></p>
            <p>For tables comparing residues and risks in domestically grown commodities versus imports of a given commodity, see <a href="/pages/dri/domestic-vs-imported/">Residues and Relative Risks in Domestically Grown versus Imported Commodities.</a></p>
            <p>For tables tracking changes in residues and risk since passage of the FQPA in 1996, see <a href="/pages/dri/fqpa-impacts/">Impacts of the 1996 Food Quality Protection Act (FQPA) on Relative Risks.</a></p>
        </div>
    )
}