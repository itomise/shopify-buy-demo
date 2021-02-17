import Client from 'shopify-buy'

export const getShopifyClient = (
  domain: string,
  storefrontAccessToken: string,
): Client.Client => {
  return Client.buildClient({
    domain,
    storefrontAccessToken,
  })
}
