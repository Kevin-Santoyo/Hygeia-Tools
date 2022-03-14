import styles from './Methods.module.css'

let methodsArray = [
    {
        "title": "Acronyms and Glossary",
        "link": "http://hygeia-analytics.com/program-areas/bcs/research-areas/pesticide-dietary-risks/pesticide-dietary-risk-analytical-system//about/acronyms-and-glossary/"
    },
    {
        "title": "The DRI Analytical System",
        "link": "http://hygeia-analytics.com/program-areas/bcs/research-areas/pesticide-dietary-risks/pesticide-dietary-risk-analytical-system//pesticides/dietary-risks/dietary-risk-index/#analytical"
    },
    {
        "title": "Levels of Aggregation",
        "link": "http://hygeia-analytics.com/program-areas/bcs/research-areas/pesticide-dietary-risks/pesticide-dietary-risk-analytical-system//pesticides/dietary-risks/dietary-risk-index/#aggregation"
    },
    {
        "title": "Methodology and Data Sources",
        "link": "http://hygeia-analytics.com/program-areas/bcs/research-areas/pesticide-dietary-risks/pesticide-dietary-risk-analytical-system//pesticides/dietary-risks/dietary-risk-index/#methodology"
    },
    {
        "title": "Technical Issues and Challenges",
        "link": "http://hygeia-analytics.com/program-areas/bcs/research-areas/pesticide-dietary-risks/pesticide-dietary-risk-analytical-system//pesticides/dietary-risks/dietary-risk-index/#issues"
    }
]
export default function Methods ({}) {
  return (
    <div className={styles.box}>
        <p className={styles.title}>Method Details:</p>
        <ul className={styles.list}>
            {
                methodsArray.map((method) =>
                    <li key={method.title}><a href={method.link} className={styles.link} target="_blank">{method.title}</a></li>
                )
            }
        </ul>
    </div>
  )
}
