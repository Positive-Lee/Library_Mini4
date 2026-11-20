import { useState } from "react";

function BookForm({ onAddBook, onDeleteBook }) {

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");
   
    const [lastBookId, setLastBookId] = useState(null);

    const handleClick = () => {

        if (!title.trim()) return;

        const newBook = {
            id: Date.now(),                          
            title,
            author,
            content,
            coverImageUrl: "",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        onAddBook(newBook);
        setLastBookId(newBook.id);                   

        setTitle("");
        setAuthor("");
        setContent("");
    }

    
    const handleDelete = () => {
        if (lastBookId === null) return;             

        onDeleteBook(lastBookId);                    
        setLastBookId(null);                         
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

            <button onClick={() => handleDelete()}>
                삭제</button>

            <button>
                표지 생성</button>
        </section>
    );
}

export default BookForm;