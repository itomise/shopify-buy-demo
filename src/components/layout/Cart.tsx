import { useContext, useEffect, useState } from 'react'
import { AppContext } from '~/store/appContext'
import { getShopifyClient } from '~/utils/getShopifyClient'
import style from '~/styles/components/layout/Cart.module.scss'

const Cart: React.FC = () => {
  const { appState } = useContext(AppContext)
  const { shopifyDomain, shopifyAccessToken, updateCheckout } = appState
  const [webUrl, setWebUrl] = useState('')

  const handleClick = (): void => {
    const client = getShopifyClient(shopifyDomain, shopifyAccessToken)
    client.checkout.create().then((checkout: any) => {
      client.checkout
        .addLineItems(checkout.id, appState.lineItemTmp)
        .then((checkout) => {
          console.log(checkout.lineItems)
          // console.log(checkout.webUrl)
          window.open(checkout.webUrl, '_blank')
        })
    })
  }

  return (
    <div className={style.wrap}>
      {shopifyDomain ? (
        <>
          <p>カートに入っている数 : {appState.lineItemTmp.length}</p>
          {!!appState.lineItemTmp.length && (
            <button type="submit" onClick={handleClick}>
              支払いに進む
            </button>
          )}
        </>
      ) : (
        <p>loading ...</p>
      )}
    </div>
  )
}

export { Cart }
