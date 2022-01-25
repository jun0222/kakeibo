import { useSession, signIn, signOut } from "next-auth/react" // https://next-auth.js.org/
import ShoppingIndex from './shopping';

export default () => {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
      <ShoppingIndex />
    </>
  )
}