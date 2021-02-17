import * as React from 'react'
import { AppProps } from 'next/app'

import 'sanitize.css'
import '../styles/default/global.scss'

import { Layout } from '~/components/layout/Layout'
import { Cart } from '~/components/layout/Cart'

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <Layout>
      <Component {...pageProps} />
      <Cart />
    </Layout>
  )
}

export default MyApp
