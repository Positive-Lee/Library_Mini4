import './BookContent.css';
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBook, deleteBook } from "../components/books";


function BookContent() {
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

    async function handleVote(type) {
      if (!book) return;

      try {
        const res = await fetch(`http://localhost:3000/books/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            [type]: (book[type] ?? 0) + 1,
          }),
        });

        if (!res.ok) {
          const message = await res.text();
          console.error("PATCH 실패:", res.status, message);
          throw new Error("추천·비추천 저장 실패");
        }

        const updatedBook = await res.json();
        setBook(updatedBook);
      } catch (error) {
        console.error(error);
        alert("추천·비추천 저장에 실패했습니다.");
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

        <div className="book-votes">
          <button onClick={() => handleVote("recommend")}>
            👍 추천 {book.recommend ?? 0}
          </button>

          <button onClick={() => handleVote("notRecommend")}>
            👎 비추천 {book.notRecommend ?? 0}
          </button>
        </div>

        <div className="book-actions">
          <button onClick={() => navigate(`/books/${id}/edit`)}>수정</button>
          <button onClick={handleDelete}>삭제</button>
        </div>
      </div>
        </section>
    );
}

export default BookContent;