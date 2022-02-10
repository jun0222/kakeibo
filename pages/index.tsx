import { useSession, signIn, signOut } from "next-auth/react" // https://next-auth.js.org/
import SigninForm from "../components/SigninForm";
import ShoppingIndex from './shopping';
import Link from 'next/link'
import { useCountContext } from '../components/DemoContext'

export default function PagesIndex () {
  const { data: session } = useSession()
  const { demoMode } = useCountContext();
  if (session) {
    return (
      <>
        <div className="mt-6 w-3/4 mx-auto">
          こんにちは！{session.user.email}さん！ <br />
          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded" onClick={() => signOut()}>ログアウト</button>
          <Link href="/shopping/new">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">入力画面へ</button>
          </Link>
          <ShoppingIndex />
        </div>
      </>
    )
  }
  if (demoMode) {
    return (
      <>
      <div className="mt-6 w-3/4 mx-auto">
        こんにちは！demo-userさん！<br />
        <ShoppingIndex />
        </div>
      </>
    )
  }
  return (
    <>
      <SigninForm />
    </>
  )
}