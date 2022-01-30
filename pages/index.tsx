import { useSession, signIn, signOut } from "next-auth/react" // https://next-auth.js.org/
import SigninForm from "../components/SigninForm";
import ShoppingIndex from './shopping';
import Link from 'next/link'

export default () => {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
        <Link href="/shopping/new">
            <a>入力画面へ</a>
        </Link>
        <ShoppingIndex />
      </>
    )
  }
  return (
    <>
      <SigninForm />
    </>
  )
}