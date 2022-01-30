import { signIn } from "next-auth/react" // https://next-auth.js.org/

export default function SigninForm() {
    return(
        <div className="flex items-center min-h-screen">
            <div className="container mx-auto">
                <div className="text-center">
                    Not signed in <br />
                    <button onClick={() => signIn()}>Sign in</button>
                </div>
            </div>
        </div>
    )
}