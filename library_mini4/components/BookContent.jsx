function BookContent({id, title, author, content, coverImageUrl, likes, onLike, onDelete, onEdit, onBack}) {
    return (
        < section className="book-content">
            <div className="book-detail">
        {coverImageUrl && (
          <img
            src={coverImageUrl}
            alt={`${title} 표지`}
            className="book-cover"
          />
        )}

        <h3>{title}</h3>
        <p>저자: {author}</p>

        <div className="book-description">
          <h4>도서 소개</h4>
          <p>{content}</p>
        </div>

        <button onClick={() => onLike(id)}>
          👍 {likes}
        </button>

        <div className="book-actions">
          <button onClick={() => onEdit(id)}>수정</button>
          <button onClick={() => onDelete(id)}>삭제</button>
          <button onClick={onBack}>목록으로</button>
        </div>
      </div>
        </section>
    );
}

export default BookContent;