import { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import { Product } from 'shopify-buy'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { getShopifyClient } from '~/utils/getShopifyClient'
import { SetCheckoutId } from '~/components/layout/SetCheckoutId'

type DetailProps = {
  product?: Product
  errors?: string
  shopifyDomain?: string
  shopifyAccessToken?: string
}

const DetailPage: NextPage<DetailProps> = ({
  product,
  errors,
  shopifyDomain,
  shopifyAccessToken,
}) => {
  const [checkoutLink, setCheckoutLink] = useState('')

  if (errors) {
    return <p>Error: {errors}</p>
  }
  if (!product) {
    return <p>Error: Product not found</p>
  }

  useEffect(() => {
    const client = getShopifyClient(shopifyDomain, shopifyAccessToken)
    client.checkout.create().then((checkout: any) => {
      const variantsId = product.variants[0].id
      client.checkout
        .addLineItems(checkout.id, [{ variantId: variantsId, quantity: 1 }])
        .then((checkout) => {
          console.log(checkout.lineItems)
          setCheckoutLink(checkout.webUrl)
        })
    })
  }, [])

  return (
    <>
      <SetCheckoutId domain={shopifyDomain} token={shopifyAccessToken} />

      <div>
        <p>{product.title}</p>
        <img src={product.images[0].src} height={200} />
      </div>
      <Link href={checkoutLink}>
        <a target="_blank">
          <button>購入する</button>
        </a>
      </Link>
    </>
  )
}

export default DetailPage

export const getStaticPaths: GetStaticPaths = async () => {
  const client = getShopifyClient(
    process.env.SHOPIFY_DOMAIN,
    process.env.STORE_FRONT_ACCESS_TOKEN,
  )
  const products: Product[] = await client.product.fetchAll()
  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<DetailProps> = async ({
  params,
}) => {
  try {
    const client = getShopifyClient(
      process.env.SHOPIFY_DOMAIN,
      process.env.STORE_FRONT_ACCESS_TOKEN,
    )

    const id = params?.id
    if (!id) {
      return { props: { errors: 'not found' } }
    }
    const productRes = await client.product.fetch(id as string)
    const product = JSON.parse(JSON.stringify(productRes))
    return {
      props: {
        product: product,
        shopifyDomain: process.env.SHOPIFY_DOMAIN,
        shopifyAccessToken: process.env.STORE_FRONT_ACCESS_TOKEN,
      },
    }
  } catch (err) {
    return { props: { errors: 'unexpected error' } }
  }
}
