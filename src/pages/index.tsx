import { Product } from 'shopify-buy'
import { GetStaticProps, NextPage } from 'next'
import { getShopifyClient } from '~/utils/getShopifyClient'
import { ProductCard } from '~/components/index/ProductCard'
import Head from 'next/head'

type IndexProps = {
  products: Product[]
}

const IndexPage: NextPage<IndexProps> = ({ products }) => {
  return (
    <>
      <Head>
        <title>Shopify-buy Demo</title>
      </Head>
      <h1>Shopify-buy Demo</h1>
      <ul>
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </ul>
    </>
  )
}

export default IndexPage

export const getStaticProps: GetStaticProps = async () => {
  const client = getShopifyClient(
    process.env.SHOPIFY_DOMAIN,
    process.env.STORE_FRONT_ACCESS_TOKEN,
  )

  const products: Product[] = await client.product.fetchAll()

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  }
}
