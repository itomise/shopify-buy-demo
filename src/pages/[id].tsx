import { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import { Product } from 'shopify-buy'
import React, { useContext } from 'react'
import Link from 'next/link'
import { getShopifyClient } from '~/utils/getShopifyClient'
import Head from 'next/head'
import { AppContext } from '~/store/appContext'

type DetailProps = {
  product?: Product
  errors?: string
}

const DetailPage: NextPage<DetailProps> = ({ product, errors }) => {
  if (errors) {
    return <p>Error: {errors}</p>
  }
  if (!product) {
    return <p>Error: Product not found</p>
  }

  const { appState, appDispatch } = useContext(AppContext)

  const handleClick = (): void => {
    console.log(product.variants[0].id)
    appDispatch({
      type: 'ADD_LINE_ITEM',
      value: { variantId: product.variants[0].id, quantity: 1 },
    })
    setTimeout(() => {
      console.log(appState.lineItemTmp)
    }, 1000)
  }

  return (
    <>
      <Head>
        <title>{product.title}</title>
      </Head>
      <div>
        <p>{product.title}</p>
        <img src={product.images[0].src} height={200} />
      </div>
      <button type="button" onClick={handleClick}>
        カートに入れる
      </button>
      <Link href="/">
        <a>
          <button>トップへ</button>
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
      },
    }
  } catch (err) {
    return { props: { errors: 'unexpected error' } }
  }
}
