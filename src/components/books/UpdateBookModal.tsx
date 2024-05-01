import { useState } from "react"
import { Modal, Label, Button, TextInput } from "flowbite-react"
import { Book } from "../../utils/types"

interface BookModal {
    currentBook: Book | null,
    isUpdateBookModal: boolean,
    setIsUpdateBookModal: React.Dispatch<boolean>,
    updateBookMutation: any
}

export function UpdateBookModal({currentBook, isUpdateBookModal, setIsUpdateBookModal, updateBookMutation}: BookModal) {
    const [updatedBook, setUpdatedBook] = useState<Book | null>(currentBook)
    console.log(currentBook)
    
    function changeUpdatedBook(e: React.ChangeEvent<HTMLInputElement>) {
        const {id, value} = e.target
        setUpdatedBook({...updatedBook, [id]: value} as Book)
    }

    if(updatedBook === null) return (<p>Book is null</p>)

    return (
        <Modal show={isUpdateBookModal} onClose={() => setIsUpdateBookModal(false)}>
            <Modal.Header>Add new book</Modal.Header>
            <Modal.Body>
            <div className="max-h-[60vh] flex flex-col gap-2 py-4 px-2 overflow-y-auto">
                <div className="grid flex-1 gap-2">
                    <Label htmlFor="id">Book id</Label>
                    <TextInput id="id" value={updatedBook.id} disabled/>
                </div>
                <div className="grid flex-1 gap-2">
                    <Label htmlFor="cover">Book cover</Label>
                    <TextInput id="cover" value={updatedBook.cover} onChange={changeUpdatedBook}/>
                </div>
                <div className="grid flex-1 gap-2">
                    <Label htmlFor="name">Book name</Label>
                    <TextInput id="name" value={updatedBook.name} onChange={changeUpdatedBook}/>
                </div>
                <div className="grid flex-1 gap-2">
                    <Label htmlFor="author">Book author</Label>
                    <TextInput id="author" value={updatedBook.author} onChange={changeUpdatedBook}/>
                </div>
                <div className="grid flex-1 gap-2">
                    <Label htmlFor="series">Series</Label>
                    <TextInput id="series" value={updatedBook.series} onChange={changeUpdatedBook}/>
                </div>
                <div className="grid flex-1 gap-2">
                    <Label htmlFor="isbn">ISBN</Label>
                    <TextInput id="isbn" value={updatedBook.isbn} onChange={changeUpdatedBook}/>
                </div>
                <div className="grid flex-1 gap-2">
                    <Label htmlFor="status">Status</Label>
                    <TextInput id="status" value={updatedBook.status} onChange={changeUpdatedBook}/>
                </div>
                <div className="grid flex-1 gap-2">
                    <Label htmlFor="rating">Rating</Label>
                    <TextInput id="rating" value={updatedBook.rating} onChange={changeUpdatedBook}/>
                </div>
                <div className="grid flex-1 gap-2">
                    <Label htmlFor="comment">Comment</Label>
                    <TextInput id="comment" value={updatedBook.comment} onChange={changeUpdatedBook}/>
                </div>
                <Button onClick={() => updateBookMutation.mutate(updatedBook)}>Update book</Button>
                </div>
            </Modal.Body>
        </Modal>
    )
}