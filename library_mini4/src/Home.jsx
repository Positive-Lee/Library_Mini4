
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBooks } from "../components/books";

function Home() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        async function fetchBooks() {
            try {
                const data = await getBooks();
                setBooks(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchBooks();
    }, []);

    return (
        <main className="home-page">
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
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}

export default Home;
