import './BookEdit.css';
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBook, updateBook} from "../components/books";

function BookEdit() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 기존 도서 정보 조회
    useEffect(() => {
        async function fetchBook() {
            try {
                setLoading(true);
                setError(null);
                
                const data = await getBook(id);
                
                if (!data) throw new Error("도서를 찾을 수 없습니다.");
                setBook(data);
            } catch(error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchBook();
    }, [id]);

    // 수정
    function handleChange(e) {
        const {name, value} = e.target;

        setBook((prev) => ({...prev, [name]: value}));
    }

    // 수정 완료
    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await updateBook(id, {
                title: book.title,
                author: book.author,
                content: book.content,
                coverImageUrl: book.coverImageUrl,
                updatedAt: new Date().toISOString()
            });

            navigate(`/books/${id}`);
        } catch(error) {
            console.error(error);
            alert("수정 실패");
        }
    }

    if (loading) return <p>도서 정보를 불러오는 중</p>;
    if (error) return <p>오류: {error}</p>;
    if (!book) return <p>도서를 찾을 수 없습니다.</p>;

    return (
        <section className="book-edit">
            <h2>도서 수정</h2>

            <form onSubmit={handleSubmit}>
                <input
                name="title"
                value={book.title ?? ""}
                onChange={handleChange}
                placeholder="도서 제목"
                required/>

                <input
                name="author"
                value={book.author ?? ""}
                onChange={handleChange}
                placeholder="저자"
                required
                />

                <textarea
                name="content"
                value={book.content ?? ""}
                onChange={handleChange}
                placeholder="줄거리"
                rows={6}/>

                <div className="cover-preview">
                    {book.coverImageUrl && (
                        <img 
                        src={book.coverImageUrl}
                        alt="책 표지 미리보기"
                        className=""/>
                    )}

                    <input
                    name="coverImageUrl"
                    value={book.coverImageUrl ?? ""}
                    onChange={handleChange}
                    placeholder="표지 이미지"/>
                </div>
                <button type="submit">수정 완료</button>
                <button type="button" onClick={() => navigate(`/books/${id}`)}>취소</button>
            </form>
        </section>
    );
}

export default BookEdit;