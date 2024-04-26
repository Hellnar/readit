import { UserButton } from "@clerk/clerk-react"
import { useQuery } from "@tanstack/react-query"
import supabase from "@/config/supabase"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

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
            <div className="flex justify-between p-4 border-b">
                <p>Books</p>
                <UserButton />
            </div>

            <div className="px-4 pt-4">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">Add book</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add new book</DialogTitle>
                        </DialogHeader>
                        <div className="max-h-[60vh] flex flex-col gap-2 py-4 px-2 overflow-y-auto">
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="name">Book name</Label>
                                <Input id="name" defaultValue=""/>
                            </div>
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="author">Book author</Label>
                                <Input id="author" defaultValue=""/>
                            </div>
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="series">Series</Label>
                                <Input id="series" defaultValue=""/>
                            </div>
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="isbn">ISBN</Label>
                                <Input id="isbn" defaultValue=""/>
                            </div>
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="status">Status</Label>
                                <Input id="status" defaultValue=""/>
                            </div>
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="rating">Rating</Label>
                                <Input id="rating" defaultValue=""/>
                            </div>
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="comment">Comment</Label>
                                <Input id="comment" defaultValue=""/>
                            </div>
                            <Button>Add book</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="p-4">
                {books.data?.data?.map((book, index) => {
                    return (
                        <Card key={index} className="flex items-center gap-4 p-4">
                            <div className="w-16 h-16 rounded-lg">
                                <img src={book.cover} className="object-cover h-16 w-16 rounded-lg" />
                            </div>
                            <p>{book.name}</p>
                            <p>{book.author}</p>
                            <p>{book.series}</p>
                            <p>{book.isbn}</p>
                            <p>{book.status}</p>
                            <p>{book.rating}</p>
                            <p>{book.comment}</p>
                        </Card>
                    )
                })}
            </div>
        </>
        
    )
}