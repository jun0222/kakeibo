import { useSession } from "next-auth/react" // https://next-auth.js.org/
import NewShoppingForm from '../../components/NewShoppingForm';
import SigninForm from '../../components/SigninForm';
import Link from 'next/link';

export default () => {
    const { data: session } = useSession()
    if (session) {
        return (
            <>
                <Link href="/">
                    <a>家計簿画面へ</a>
                </Link>
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