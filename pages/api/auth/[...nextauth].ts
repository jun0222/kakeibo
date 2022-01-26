// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth"
import AppleProvider from "next-auth/providers/apple"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"

export default NextAuth({
    secret: process.env.SECRET,
    providers: [
        // OAuth authentication providers
        // AppleProvider({
        // clientId: process.env.APPLE_ID,
        // clientSecret: process.env.APPLE_SECRET,
        // }),
        // GoogleProvider({
        // clientId: process.env.GOOGLE_ID,
        // clientSecret: process.env.GOOGLE_SECRET,
        // }),
        // Sign in with passwordless email link
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                user: process.env.EMAIL_SERVER_USER,
                pass: process.env.EMAIL_SERVER_PASSWORD
            }
            },
            from: process.env.EMAIL_FROM
        }),
    ],
})