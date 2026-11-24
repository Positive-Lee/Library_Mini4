
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBooks, searchBooks } from "../components/books";
import BookItem from "../components/BookItem";

function Home({ searchKeyword }) {
    const [books, setBooks] = useState([]);
    const bestBooks = [...books].sort((a, b) => (b.recommend ?? 0) - (a.recommend ?? 0)).slice(0, 3);

    useEffect(() => {
      let cancelled = false;

      async function fetchBooks() {
        try {
          const data = searchKeyword
            ? await searchBooks(searchKeyword)
            : await getBooks();

          if (!cancelled) {
            setBooks(data);
          }
        } catch (error) {
          console.error(error);
        }
      }

      fetchBooks();

      return () => {
        cancelled = true;
      };
    }, [searchKeyword]);

    return (
        <main className="home-page">
            {/* 베스트 도서 영역 */}
            {!searchKeyword && bestBooks.length > 0 && (
            <section className="best-books-section">
                <h1>🏆 베스트 도서</h1>
                <p>추천수가 가장 높은 인기 도서 TOP 3</p>

                <div className="book-grid">
                {bestBooks.map((book, index) => (
                    <div key={book.id} className="best-book-item">

                    <div className="best-book-rank">
                        TOP {index + 1}
                    </div>

                    {/* <BookItem book={book} /> */}
                    <Link
                        key={book.id}
                        to={`/books/${book.id}`}
                        className="book-card-link"
                    >
                        <div className="book-card">
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
                            <p>{book.author}</p>

                            <div
                                style={{
                                    display: "flex",
                                    gap: "12px",
                                    fontSize: "12px",
                                    color: "#666",
                                    marginTop: "6px",
                                }}
                            >
                                <span>👍 {book.recommend ?? 0}</span>
                                <span>👎 {book.notRecommend ?? 0}</span>
                            </div>


                            
                        </div>
                    </Link>

                    </div>
                ))}
                </div>
            </section>
            )}
            <div className="home-top">
                <div>
                    <h1>도서 목록</h1>
                    <p>등록된 도서를 확인하고 상세 정보를 조회할 수 있습니다.</p>
                </div>

                <Link to="/books/new">
                    <button type="button" className="add-book-btn">
                        도서 등록
                    </button>
                </Link>
            </div>

            <div className="book-grid">
                {books.map((book) => (
                    <Link
                        key={book.id}
                        to={`/books/${book.id}`}
                        className="book-card-link"
                    >
                        <div className="book-card">
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
                            <p>{book.author}</p>

                            <div
                                style={{
                                    display: "flex",
                                    gap: "12px",
                                    fontSize: "12px",
                                    color: "#666",
                                    marginTop: "6px",
                                }}
                            >
                                <span>👍 {book.recommend ?? 0}</span>
                                <span>👎 {book.notRecommend ?? 0}</span>
                            </div>


                            
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}

export default Home;
