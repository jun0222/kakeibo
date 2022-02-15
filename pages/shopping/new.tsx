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
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">家計簿画面へ</button>
                </Link>
                <NewShoppingForm />
            </>
        )
    }
    if (demoMode) {
        return (
            <>
                <Link href="/">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">家計簿画面へ</button>
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