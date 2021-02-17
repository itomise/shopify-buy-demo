import { Product } from 'shopify-buy'
import { GetServerSideProps, GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { getShopifyClient } from '~/utils/getShopifyClient'
import { SetCheckoutId } from '~/components/layout/SetCheckoutId'
import { ProductCard } from '~/components/index/ProductCard'

type IndexProps = {
  products: Product[]
  shopifyDomain?: string
  shopifyAccessToken?: string
}

const IndexPage: NextPage<IndexProps> = ({
  products,
  shopifyDomain,
  shopifyAccessToken,
}) => {
  return (
    <>
      <SetCheckoutId domain={shopifyDomain} token={shopifyAccessToken} />
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

export const getServerSideProps: GetServerSideProps = async () => {
  const client = getShopifyClient(
    process.env.SHOPIFY_DOMAIN,
    process.env.STORE_FRONT_ACCESS_TOKEN,
  )

  const products: Product[] = await client.product.fetchAll()

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      shopifyDomain: process.env.SHOPIFY_DOMAIN,
      shopifyAccessToken: process.env.STORE_FRONT_ACCESS_TOKEN,
    },
  }
}
