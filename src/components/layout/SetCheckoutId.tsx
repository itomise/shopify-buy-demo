import { type } from 'os'
import { useContext } from 'react'
import { useEffectOnce } from '~/hooks/useEffectOnce'
import { AppContext } from '~/store/appContext'
import { getShopifyClient } from '~/utils/getShopifyClient'

type Props = {
  domain: string
  token: string
}

const SetCheckoutId: React.FC<Props> = ({ domain, token }) => {
  const { appState, appDispatch } = useContext(AppContext)
  useEffectOnce(() => {
    // if (appState.checkoutId) return
    // const client = getShopifyClient(domain, token)
    appDispatch({ type: 'SET_SHOPIFY_TOKEN', domain, token })
    // client.checkout.create().then((checkout) => {
    //   appDispatch({ type: 'SET_CHECKOUT_ID', value: checkout.id })
    // })
  })

  return <></>
}

export { SetCheckoutId }
