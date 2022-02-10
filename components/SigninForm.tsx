// @ts-nocheck // 一旦デプロイのためエラー無視。後で直す。

import { signIn } from "next-auth/react" // https://next-auth.js.org/
import ShoppingIndex from "../pages/shopping";
import { useCountContext } from "./DemoContext"

export default function SigninForm() {
    const { demoMode, setDemoMode } = useCountContext();
    if(!demoMode){
        return(
            <div className="flex items-center min-h-screen">
                <div className="container mx-auto">
                    <div className="text-center mb-2">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded" onClick={() => signIn()}>ログイン</button>
                    </div>
                    <div className="text-center">
                        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded" onClick={() => setDemoMode(true)}>Demo</button>
                    </div>
                </div>
            </div>
        )
    } else {
        return(
            <ShoppingIndex />
        )
    }
}