import BookItem from "./BookItem";

function BookList({books, onDelete}) {
    return (
        <ul className="book-list">
            {books.map((b) => 
            <BookItem key={b.id} id={b.id} title={b.title} author={b.author}
            content={b.content} coverImageUrl={b.coverImageUrl} onDelete={onDelete}/>
            )}
        </ul>
    );
}

export default BookList;