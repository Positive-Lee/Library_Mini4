import BookItem from "./BookItem";

function BookList({books}) {
    return (
        <div
            style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: '24px',
            marginTop: '30px',
            }}
        >

            <ul className="book-list">
                {books.map((b) => 
                <BookItem key={b.id} id={b.id} title={b.title} author={b.author} content={b.content}
                likes={b.likes} coverImageUrl={b.coverImageUrl} />
                )}
            </ul>
        </div>
    );
}

export default BookList;