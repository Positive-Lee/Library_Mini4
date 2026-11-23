import BookItem from "./BookItem";

function BookList({books}) {
    return (
        <ul className="book-list">
            {books.map((b) => 
            <BookItem key={b.id} id={b.id} title={b.title} author={b.author} content={b.content}
            likes={b.likes} coverImageUrl={b.coverImageUrl} />
            )}
        </ul>
    );
}

export default BookList;