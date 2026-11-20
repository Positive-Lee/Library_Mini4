import { useState } from "react";


function BookForm({ onAddBook }) {

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");

    const handleClick = () => {

        if (!title.trim()) return;

        const newBook = {
            title,
            author,
            content,
            coverImageUrl: "",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        onAddBook(newBook);

        setTitle("");
        setAuthor("");
        setContent("");
    }

    return (
        <section className="book-form">
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력하세요" />

            <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="글쓴이" />

            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="요약 (도서 내용)"
                rows={6} />

            <button onClick={() => handleClick()}>
                등록</button>
        </section>
    );
}

export default BookForm;