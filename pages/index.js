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
        {/*UK-FSA: <br/>*/}
        {/*<ul>*/}
        {/*  <li>*/}
        {/*    <Link href="/fsa/by_commodity">By Commodity</Link>*/}
        {/*  </li>*/}
        {/*  <li>*/}
        {/*    <Link href="/fsa/by_pesticide">By Pesticide</Link>*/}
        {/*  </li>*/}
        {/*</ul>*/}
        DRI: <br/>
        <ul>
          <li><Link href={"/dri/by_commodity"}>By Commodity</Link></li>
          <li><Link href={"/dri/by_pesticide"}>By Pesticide</Link></li>
          <li><Link href={"/dri/conventional-vs-organic"}>Conventional VS Organic</Link></li>
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
