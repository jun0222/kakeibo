import { useSession } from "next-auth/react" // https://next-auth.js.org/
import NewShoppingForm from '../../components/NewShoppingForm';
import SigninForm from '../../components/SigninForm';

export default () => {
    const { data: session } = useSession()
    if (session) {
        return (
            <>
                <NewShoppingForm />
            </>
        )
    }
    return (
        <>
            <SigninForm />
        </>
    )
}