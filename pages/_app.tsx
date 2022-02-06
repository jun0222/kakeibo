import '../styles/globals.css'
import 'tailwindcss/tailwind.css';
import { SessionProvider } from "next-auth/react"
import { CountProvider } from '../components/DemoContext';

export default function MyApp({
  Component, pageProps: { session, ...pageProps }
}) {
  return (
    <SessionProvider session={session}>
      <CountProvider>
        <Component {...pageProps}/>
      </CountProvider>
    </SessionProvider>
  )
}