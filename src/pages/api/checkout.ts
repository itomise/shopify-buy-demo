import { NextApiHandler } from 'next'
import { getShopifyClient } from '~/utils/getShopifyClient'

const Checkout: NextApiHandler = async (req, res) => {
  if (!req.body.length) {
    return res.status(401).json({ message: `Invalid query.` })
  }
  const item: ShopifyBuy.LineItemToAdd[] = req.body

  // console.log(item)

  const client = getShopifyClient(
    process.env.SHOPIFY_DOMAIN,
    process.env.STORE_FRONT_ACCESS_TOKEN,
  )
  const create = await client.checkout.create()

  const checkout = await client.checkout.addLineItems(create.id, item)

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore-block
  res.status(200).json({ webUrl: checkout.webUrl })

  res.end()
}

export default Checkout
