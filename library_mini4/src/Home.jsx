
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBooks, searchBooks } from "../components/books";

function Home({ searchKeyword }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    let cancelled = false;

    async function fetchBooks() {
      try {
        const data = searchKeyword
          ? await searchBooks(searchKeyword)
          : await getBooks();

        if (!cancelled) {
          setBooks(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error(error);
        if (!cancelled) setBooks([]);
      }
    }

    fetchBooks();

    return () => {
      cancelled = true;
    };
  }, [searchKeyword]);

  // 추천 수가 높은 베스트 도서 TOP 3
  const bestBooks = [...books]
    .sort(
      (a, b) =>
        (Number(b.recommend) || 0) -
        (Number(a.recommend) || 0)
    )
    .slice(0, 3);

  // 최근 등록된 신간 도서 TOP 3
  const newBooks = [...books]
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0) -
        new Date(a.createdAt || 0)
    )
    .slice(0, 3);

  // 공통 도서 카드
  const renderBookCard = (book, index, type = "normal") => (
    <Link
      key={book.id}
      to={`/books/${book.id}`}
      className="book-card-link"
    >
      <article className="book-card">
        {type === "best" && (
          <span className="book-rank">
            TOP {index + 1}
          </span>
        )}

        {type === "new" && (
          <span className="book-rank new-badge">
            NEW
          </span>
        )}

        <div className="book-image">
          {book.coverImageUrl ? (
            <img
              src={book.coverImageUrl}
              alt={book.title}
            />
          ) : (
            <span>표지 이미지 없음</span>
          )}
        </div>

        <h3>{book.title}</h3>
        <p className="book-author">{book.author}</p>

        <div className="book-reactions">
          <span>👍 {book.recommend ?? 0}</span>
          <span>👎 {book.notRecommend ?? 0}</span>
        </div>
      </article>
    </Link>
  );

  return (
    <main className="home-page">

      {/* 베스트 도서 + 신간 도서 */}
      {!searchKeyword && books.length > 0 && (
        <div className="featured-sections">

          <section className="featured-section">
            <div className="section-heading">
              <div>
                <h2>🏆 베스트 도서</h2>
                <p>추천 수가 가장 높은 인기 도서 TOP 3</p>
              </div>
            </div>

            <div className="featured-books">
              {bestBooks.map((book, index) =>
                renderBookCard(book, index, "best")
              )}
            </div>
          </section>

          <section className="featured-section">
            <div className="section-heading">
              <div>
                <h2>✨ 신간 도서</h2>
                <p>최근 등록된 새로운 도서 TOP 3</p>
              </div>
            </div>

            <div className="featured-books">
              {newBooks.map((book, index) =>
                renderBookCard(book, index, "new")
              )}
            </div>
          </section>

        </div>
      )}

      {/* 전체 도서 목록 */}
      <section className="book-list-section">
        <div className="home-top">
          <div>
            <h2>
              {searchKeyword ? "검색 결과" : "도서 목록"}
            </h2>
            <p>
              {searchKeyword
                ? `"${searchKeyword}" 검색 결과 ${books.length}권`
                : "등록된 도서를 확인하고 상세 정보를 조회할 수 있습니다."}
            </p>
          </div>
        </div>

        {books.length > 0 ? (
          <div className="book-grid">
            {books.map((book, index) =>
              renderBookCard(book, index)
            )}
          </div>
        ) : (
          <p className="empty-books">
            {searchKeyword
              ? "검색 결과가 없습니다."
              : "등록된 도서가 없습니다."}
          </p>
        )}
      </section>

    </main>
  );
}

export default Home;

