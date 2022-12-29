import '../styles/globals.css'
import Layout from '../components/Layout'
import { SessionProvider } from "next-auth/react"
import { persistor, store } from '../lib/store'
import { PersistGate } from 'redux-persist/integration/react'
import { wrapper } from '../lib/store'
import withRedux from 'next-redux-wrapper'
function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Layout>
    </SessionProvider>
  )
}
const makeStore = () => store
export default withRedux(makeStore)(App)