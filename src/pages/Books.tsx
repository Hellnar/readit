import { UserButton } from "@clerk/clerk-react"
import { useQuery } from "@tanstack/react-query"
import supabase from "@/config/supabase"

export default function Books() {

    const books = useQuery({
        queryKey: ["books"],
        queryFn: async () => {
            return await supabase.from("books").select()
        } 
    })

    if(books.status === "success") {
        console.log(books.data)
    }

    return (
        <>
            <p>Books page</p>
            <UserButton />

            <div>
                {books.data?.data?.map(book => {
                    return (
                        <div className="flex gap-4">
                            <p>{book.name}</p>
                            <p>{book.author}</p>
                        </div>
                    )
                })}
            </div>
        </>
        
    )
}