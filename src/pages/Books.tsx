import { useState } from "react"
import { UserButton } from "@clerk/clerk-react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import supabase from "../config/supabase"
import { Book } from "../utils/types"
import { Button, Modal, Label, TextInput, Badge, DarkThemeToggle } from "flowbite-react"
import { UpdateBookModal } from "../components/books/updateBookModal"

interface badgeColorsInterface {
    [key: string]: string
}

const badgeColors: badgeColorsInterface = {
    "not read": "gray",
    "in process": "blue",
    "done": "green",
    "want": "purple"
}

interface ratingColorInterface {[key: string]: string}

const ratingColor: ratingColorInterface = {
    1: "red",
    2: "orange",
    3: "yellow",
    4: "cyan",
    5: "green"
}

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
    const [isNewBookModal, setIsNewBookModal] = useState(false)
    const [isUpdateBookModal, setIsUpdateBookModal] = useState(false)
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

    const updateBookMutation = useMutation({
        mutationFn: async (book: Book) => {
            return await supabase.from("books").update(book).eq("id", book.id)
        },
        onSuccess: () => {
            setIsUpdateBookModal(false)
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
        setIsNewBookModal(e)
    }

    function deleteBook(id: number) {
        deleteBookMutation.mutate(id)
    }

    function updateBook() {
        console.log(`updateBook`)
        setIsUpdateBookModal(true)
    }

    return (
        <div className="w-screen h-screen bg-white dark:bg-gray-800">
            <div className="flex justify-between p-4 border-b">
                <p className="text-xl font-bold text-gray-500 dark:text-gray-400">ReadIt</p>
                <div className="flex gap-2 items-center">
                    <DarkThemeToggle />
                    <UserButton />
                </div>
            </div>

            <div className="px-4 pt-4">
                <Button color="blue" onClick={() => setIsNewBookModal(true)}>Add book</Button>
                <Modal show={isNewBookModal} onClose={() => setIsNewBookModal(false)}>
                    <Modal.Header>Add new book</Modal.Header>
                    <Modal.Body>
                    <div className="max-h-[60vh] flex flex-col gap-2 py-4 px-2 overflow-y-auto">
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="cover">Book cover</Label>
                            <TextInput id="cover" value={newBook.cover} onChange={updateNewBook}/>
                        </div>
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="name">Book name</Label>
                            <TextInput id="name" value={newBook.name} onChange={updateNewBook}/>
                        </div>
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="author">Book author</Label>
                            <TextInput id="author" value={newBook.author} onChange={updateNewBook}/>
                        </div>
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="series">Series</Label>
                            <TextInput id="series" value={newBook.series} onChange={updateNewBook}/>
                        </div>
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="isbn">ISBN</Label>
                            <TextInput id="isbn" value={newBook.isbn} onChange={updateNewBook}/>
                        </div>
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="status">Status</Label>
                            <TextInput id="status" value={newBook.status} onChange={updateNewBook}/>
                        </div>
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="rating">Rating</Label>
                            <TextInput id="rating" value={newBook.rating} onChange={updateNewBook}/>
                        </div>
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="comment">Comment</Label>
                            <TextInput id="comment" value={newBook.comment} onChange={updateNewBook}/>
                        </div>
                        <Button onClick={addBook}>Add book</Button>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>

            <div className="flex flex-col gap-2 p-4">
                {books.data?.data?.map((book: Book, index) => {
                    return (
                        <div key={index} className="grid grid-cols-10 items-center gap-4 p-4 border border-gray-200 rounded dark:bg-gray-800 dark:border-gray-700">
                            <div className="w-16 h-16 rounded-lg">
                                <img src={book.cover} className="object-cover h-16 w-16 rounded-lg" />
                            </div>
                            <p className="text-gray-500 dark:text-gray-400">{book.name}</p>
                            <p className="text-gray-500 dark:text-gray-400">{book.author}</p>
                            <p className="text-gray-500 dark:text-gray-400">{book.series}</p>
                            <p className="text-gray-500 dark:text-gray-400">{book.isbn}</p>
                            <div className="w-fit flex justify-center"><Badge color={badgeColors[book.status]}>{book.status}</Badge></div>
                            <div className="w-fit flex justify-center"><Badge color={ratingColor[book.rating]}>{book.rating}</Badge></div>
                            <p className="text-gray-500 dark:text-gray-400">{book.comment}</p>
                            <div><Button color="blue" onClick={updateBook}>Update</Button></div>
                            <div><Button color="red" onClick={() => deleteBook(book.id as number)}>Delete</Button></div>

                            <UpdateBookModal 
                                currentBook={book} 
                                isUpdateBookModal={isUpdateBookModal} 
                                setIsUpdateBookModal={setIsUpdateBookModal} 
                                updateBookMutation={updateBookMutation} 
                            />
                        </div>
                    )
                })}
            </div>
        </div>
        
    )
}