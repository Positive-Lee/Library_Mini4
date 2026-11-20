function BookForm() {
    return (
        <section className="book-form">
            <h2>도서 등록</h2>

            <input placeholder="제목을 입력하세요" />

            <input placeholder="글쓴이" />

            <textarea placeholder="요약 (도서 내용)" rows={6} />

            <button>등록</button>
        </section>
    );
}

export default BookForm;