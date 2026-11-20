import BookItem from "./BookItem";

function BookList({books, onDelete}) {
    return (
        <ul className="book-list">
            {books.map((b) => 
            <PostItem key={b.id} id={b.id} title={b.title} author={b.author} contect={b.content}
            coverImageUrl={b.coverImageUrl} likes={b.likes} onLike={onLike} onDelete={onDelete}/>
            )}
        </ul>
    );
}

export default BookList;s