import { Book } from "../../utils/types"

interface StatsProps {
    books: Book[]
}

export function BooksStats({books}: StatsProps) {

    const stats = {
        books: 0,
        read: 0,
        not_read: 0,
        wishlist: 0
    }

    for(const book of books) {
        if(book.status === "read") stats.read += 1
        if(book.status === "not read") stats.not_read += 1
        if(book.status === "wishlist") stats.wishlist += 1
    }

    return (
        <div className="flex gap-4 px-4 pt-4">
            <div className="min-w-32 p-4 border border-gray-200 rounded dark:bg-gray-800 dark:border-gray-700">
                <p className="font-bold text-gray-500 dark:text-gray-400">Books</p>
                <p className="text-gray-500 dark:text-gray-400">{books.length}</p>
            </div>
            <div className="min-w-32 p-4 border border-gray-200 rounded dark:bg-gray-800 dark:border-gray-700">
                <p className="font-bold text-green-500 dark:text-green-400">Read</p>
                <p className="text-gray-500 dark:text-gray-400">{stats.read}</p>
            </div>
            <div className="min-w-32 p-4 border border-gray-200 rounded dark:bg-gray-800 dark:border-gray-700">
                <p className="font-bold text-gray-500 dark:text-gray-400">Not read</p>
                <p className="text-gray-500 dark:text-gray-400">{stats.not_read}</p>
            </div>
            <div className="min-w-32 p-4 border border-gray-200 rounded dark:bg-gray-800 dark:border-gray-700">
                <p className="font-bold text-purple-500 dark:text-purple-400">Wishlist</p>
                <p className="text-gray-500 dark:text-gray-400">{stats.wishlist}</p>
            </div>
        </div>
    )
}