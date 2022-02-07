import { useSession } from "next-auth/react" // https://next-auth.js.org/
import NewShoppingForm from '../../components/NewShoppingForm';
import SigninForm from '../../components/SigninForm';
import Link from 'next/link';
import { useCountContext } from "../../components/DemoContext";

export default function ShoppingNew () {
    const { data: session } = useSession()
    const { demoMode } = useCountContext();
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
    if (demoMode) {
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