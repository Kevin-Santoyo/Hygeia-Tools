import gql from 'graphql-tag'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { initializeApollo } from '../apollo/client'

const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      id
      name
      status
    }
  }
`

// const OriginsQuery = gql`
//   query OriginsQuery {
//     fsaOrigins {
//       origin
//     }
//   }
// `;

const Index = () => {
  // const {
  //   data: { fsaOrigins },
  // } = useQuery(OriginsQuery);

  return (
    <>
      <div>
        US-PDP: <br/>
        <ul>
          <li><Link href={"/dri/by_commodity"}>By Commodity</Link></li>
          <li><Link href={"/dri/by_pesticide"}>By Pesticide</Link></li>
          <li><Link href={"/dri/conventional-vs-organic"}>Conventional vs. Organic</Link></li>
          <li><Link href={"/dri/domestic_vs_imported"}>Domestic vs. Imported</Link></li>
          {/*<li><Link href={"/dri/fqpa_impacts"}>Overall Food Supply and DRI Trends</Link></li>*/}
          <li><Link href={"/dri/individual_samples"}>Individual Samples</Link></li>
          <li><Link href={"/dri/reports_aggr"}>Aggregate Sample DRI by Food & Pesticide</Link></li>
        </ul>
        UK-FSA <br/>
        <ul>
          <li><Link href={"/fsa/by_food"}>By Food</Link></li>
          <li><Link href={"/fsa/by_pesticide"}>By Pesticide</Link></li>
          <li><Link href={"/fsa/conventional_vs_organic"}>Conventional vs. Organic</Link></li>
          <li><Link href={"/fsa/domestic_vs_imported"}>Domestic vs. Imported</Link></li>
          <li><Link href={"/fsa/individual_samples"}>Individual Samples</Link></li>
        </ul>
      </div>
      <style jsx global>{`
        * {
          font-family: Helvetica, Arial, sans-serif;
        }
      `}</style>
    </>
  )
}

export async function getStaticProps () {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: ViewerQuery
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    }
  }
}

export default Index
