import { useState } from "react"
import { UserButton } from "@clerk/clerk-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import supabase from "@/config/supabase"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Book } from "@/utils/types"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function Books() {
    const [newBook, setNewBook] = useState<Book>({
        cover: "",
        name: "",
        author: "",
        series: "",
        isbn: "",
        status: "",
        rating: 0,
        comment: ""
    })
    const [newBookDialog, setNewBookDialog] = useState(false)
    const client = useQueryClient()

    const books = useQuery({
        queryKey: ["books"],
        queryFn: async () => {
            return await supabase.from("books").select()
        },
        refetchOnWindowFocus: false
    })

    // Mutations

    const addBookMutation = useMutation({
        mutationFn: async (book: Book) => {
            return await supabase.from("books").insert(book)
        },
        onSuccess: () => {
            client.invalidateQueries({queryKey: ["books"]})
            newBookDialogStatus(false)
        }
    })

    const deleteBookMutation = useMutation({
        mutationFn: async (id: number) => {
            return await supabase.from("books").delete().eq("id", id)
        },
        onSuccess: () => {
            client.invalidateQueries({queryKey: ["books"]})
        }
    })

    function updateNewBook(e: React.ChangeEvent<HTMLInputElement>) {
        const {id, value} = e.target
        setNewBook({...newBook, [id]: value})
    }

    function addBook() {
        addBookMutation.mutate(newBook)
    }

    function newBookDialogStatus(e: boolean) {
        setNewBookDialog(e)
    }

    function deleteBook(id: number) {
        deleteBookMutation.mutate(id)
    }

    return (
        <>
            <div className="flex justify-between p-4 border-b">
                <p>Books</p>
                <UserButton />
            </div>

            <div className="px-4 pt-4">
                <Dialog open={newBookDialog} onOpenChange={newBookDialogStatus}>
                    <DialogTrigger asChild>
                        <Button variant="outline">Add book</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add new book</DialogTitle>
                        </DialogHeader>
                        <div className="max-h-[60vh] flex flex-col gap-2 py-4 px-2 overflow-y-auto">
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="cover">Book cover</Label>
                                <Input id="cover" value={newBook.cover} onChange={updateNewBook}/>
                            </div>
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="name">Book name</Label>
                                <Input id="name" value={newBook.name} onChange={updateNewBook}/>
                            </div>
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="author">Book author</Label>
                                <Input id="author" value={newBook.author} onChange={updateNewBook}/>
                            </div>
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="series">Series</Label>
                                <Input id="series" value={newBook.series} onChange={updateNewBook}/>
                            </div>
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="isbn">ISBN</Label>
                                <Input id="isbn" value={newBook.isbn} onChange={updateNewBook}/>
                            </div>
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="status">Status</Label>
                                <Input id="status" value={newBook.status} onChange={updateNewBook}/>
                            </div>
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="rating">Rating</Label>
                                <Input id="rating" value={newBook.rating} onChange={updateNewBook}/>
                            </div>
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="comment">Comment</Label>
                                <Input id="comment" value={newBook.comment} onChange={updateNewBook}/>
                            </div>
                            <Button onClick={addBook}>Add book</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex flex-col gap-2 p-4">
                {books.data?.data?.map((book, index) => {
                    return (
                        <Card key={index} className="flex justify-between items-center gap-4 p-4">
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
                            <Button variant="destructive" onClick={() => deleteBook(book.id)}>Delete</Button>
                        </Card>
                    )
                })}
            </div>
        </>
        
    )
}