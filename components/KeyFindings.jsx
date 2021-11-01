import styles from './KeyFindings.module.css'

export default function KeyFindings ({ data }) {
    return (
        <div>
            <h4>Key Findings</h4>
            <ul>
                <li>{data} accounts for {data} of total FS-DRI risk across all pesticides detected.</li>
                <li>The top three active ingredients accounts for {data} of total, aggregate FS-DRI risk.</li>
                <li>Residues of {data} pesticides account for less than 1% of total, aggregate FS-DRI risk.</li>
                <li>The highest mean residue level reported was {data} ppm of {data}. Residues of {data} were found in {data} of samples tested.</li>
            </ul>
        </div>
    )
}