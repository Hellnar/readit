import { ThemeProvider } from "@/components/theme-provider"
import { SignedIn, SignedOut } from "@clerk/clerk-react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./pages/Login"
import Books from "./pages/Books"

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/", element: <Books /> },
])

export default function App() {
    return (
        <>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
 
                <SignedOut>
                    <Login />
                </SignedOut>
                <SignedIn>
                    <RouterProvider router={router} />
                </SignedIn>

            </ThemeProvider>
        </>
    )
}

