import { SignIn } from "@clerk/clerk-react"

export default function Login() {
    return (
        <>
            <div className="h-screen w-screen flex justify-center items-center">
                <SignIn />
            </div>
        </>
    )
}