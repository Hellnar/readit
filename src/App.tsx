import { SignedIn, SignedOut } from "@clerk/clerk-react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./pages/Login"
import Books from "./pages/Books"
import { Flowbite } from "flowbite-react";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/", element: <Books /> },
])

export default function App() {
    return (
        <>
        <Flowbite>
            <SignedOut>
                <Login />
            </SignedOut>
            <SignedIn>
                <RouterProvider router={router} />
            </SignedIn>
        </Flowbite>
        </>
    )
}

