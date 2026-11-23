import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBook } from "./books";

const BOOKS_URL = "http://localhost:3000/books";

function BookForm() {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");

    const handleClick = async () => {

        if (!title.trim()) return;

        const newBook = {
            title,
            author,
            content,
            coverImageUrl: "",
            likes: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        try {
            const saved = await createBook(newBook);

            setTitle("");
            setAuthor("");
            setContent("");
        } catch (err) {
            console.error(err);
        }
    }


    const handleCancel = () => {
        navigate("/");
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

            <button onClick={() => handleCancel()}>
                취소</button>

            <button>
                표지 생성</button>
        </section>
    );
}

export default BookForm;