import { useContext, useEffect, useState } from 'react'
import { AppContext } from '~/store/appContext'
import style from '~/styles/components/layout/Cart.module.scss'
import axios, { AxiosResponse } from 'axios'
import Link from 'next/link'

const Cart: React.FC = () => {
  const { appState, appDispatch } = useContext(AppContext)
  const [webUrl, setWebUrl] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleClick = async (): Promise<void> => {
    appDispatch({ type: 'RESET_LINE_ITEM' })
  }

  useEffect(() => {
    const init = async (): Promise<void> => {
      try {
        const res = await axios.post<any, AxiosResponse<{ webUrl: string }>>(
          '/api/checkout',
          appState.lineItemTmp,
        )
        setLoading(false)
        setWebUrl(res.data.webUrl)
      } catch (err) {
        setLoading(false)
        console.error(err)
      }
    }
    if (appState.lineItemTmp.length) {
      setLoading(true)
      if (webUrl) {
        setWebUrl(null)
      }
      init()
    }
  }, [appState.lineItemTmp])

  return (
    <div className={style.wrap}>
      <>
        <p>カートに入っている数 : {appState.lineItemTmp.length}</p>
        {webUrl && (
          <Link href={webUrl}>
            <a target="_blank">
              <button type="submit" onClick={handleClick}>
                支払いに進む
              </button>
            </a>
          </Link>
        )}
        {loading && <span>Loading ...</span>}
      </>
    </div>
  )
}

export { Cart }
