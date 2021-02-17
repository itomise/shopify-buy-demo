import { Product } from 'shopify-buy'
import Link from 'next/link'
import style from '~/styles/components/index/ProductCard.module.scss'
import { getShopifyClient } from '~/utils/getShopifyClient'
import { useContext } from 'react'
import { AppContext } from '~/store/appContext'

type Props = {
  product: Product
}

const ProductCard: React.FC<Props> = ({ product }) => {
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
    <li className={style.wrap}>
      <h2>{product.title}</h2>
      <div>
        <img src={product.images[0].src} />
      </div>
      <button type="button" onClick={handleClick}>
        カートに入れる
      </button>
      {/* <Link href="/[id]" as={`/${product.id}`}>
        <a>
          {product.title}
          <img src={product.images[0].src} height={80} />
        </a>
      </Link> */}
    </li>
  )
}

export { ProductCard }
