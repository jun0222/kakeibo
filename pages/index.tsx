import { useSession, signIn, signOut } from "next-auth/react" // https://next-auth.js.org/
import SigninForm from "../components/SigninForm";
import ShoppingIndex from './shopping';

export default () => {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
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