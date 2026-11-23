import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBook, deleteBook } from "../components/books";

function BookContent({onLike}) {
  const {id} = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function handleDelete() {
      if (!window.confirm("정말 삭제하시겠습니다?")) return;

      try {
        await deleteBook(id);
        navigate("/");
      } catch(error) {
        console.error(error);
        alert("삭제에 실패했습니다.");
      }
    }
    
  useEffect(() => {
    async function fetchBook() {
      try {
        setLoading(true);
        setError(null);

        const data = await getBook(id);
        setBook(data);
      } catch(error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBook();
  }, [id]);

  if (loading) return <p>도서 정보를 불러오는 중</p>
  if (error) return <p>오류: {error}</p>
  if (!book) return <p>도서를 찾을 수 없습니다.</p>;

    return (
        <section className="book-content">
            <div className="book-detail">
        {book.coverImageUrl && (
          <img
            src={book.coverImageUrl}
            alt={`${book.title} 표지`}
            className="book-cover"
          />
        )}

        <h3>{book.title}</h3>
        <p>저자: {book.author}</p>

        <div className="book-description">
          <h4>도서 소개</h4>
          <p>{book.content}</p>
        </div>

        <button onClick={() => onLike(id)}>
          👍 {book.likes}
        </button>

        <div className="book-actions">
          <button onClick={() => navigate(`books/${id}/edit`)}>수정</button>
          <button onClick={handleDelete}>삭제</button>
          <button onClick={() => navigate("/")}>목록으로</button>
        </div>
      </div>
        </section>
    );
}

export default BookContent;