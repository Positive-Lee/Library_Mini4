function BookItem({id, title, author, content, coverImageUrl, onDelete}) {
    return (
        <li className="book-card">
            <h3>{title}</h3>
            <img src={coverImageUrl} />
            <p>글쓴이: {author}</p>
            <p>요약: {content}</p>

            <button onClick={() => onDelete(id)}>삭제</button>
        </li>
    );
}

export default BookItem;