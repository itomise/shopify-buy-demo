import { Product } from 'shopify-buy'
import Link from 'next/link'
import style from '~/styles/components/index/ProductCard.module.scss'
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
      <div className={style.img}>
        <img src={product.images[0].src} />
      </div>
      <div className={style.detail}>
        <h2 className={style.title}>{product.title}</h2>
        <button type="button" onClick={handleClick}>
          カートに入れる
        </button>
        <div className={style.link}>
          <Link href="/[id]" as={`/${product.id}`}>
            <a>
              <span>商品詳細へ</span>
            </a>
          </Link>
        </div>
      </div>
    </li>
  )
}

export { ProductCard }
