import { signIn } from "next-auth/react" // https://next-auth.js.org/

export default function SigninForm() {
    return(
        <div className="flex items-center min-h-screen">
            <div className="container mx-auto">
                <div className="text-center mb-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded" onClick={() => signIn()}>Sign in</button>
                </div>
                <div className="text-center">
                    <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded">demo</button>
                </div>
            </div>
        </div>
    )
}