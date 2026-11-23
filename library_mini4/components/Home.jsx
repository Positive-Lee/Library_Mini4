import { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {getBooks} from "../books";
const sampleBooks = [
  {
    id: 1,
    title: '별빛 아래의 서점',
    author: '홍길동',
    coverImageUrl: '',
  },
  {
    id: 2,
    title: '리액트 입문',
    author: '김개발',
    coverImageUrl: '',
  },
];

function Home() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        async function fetchBooks(){
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
    <main style={{ maxWidth: '900px', margin: '40px auto' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <h1>도서 목록</h1>
          <p>등록된 도서를 확인하고 상세 정보를 조회할 수 있습니다.</p>
        </div>

        <Link to="/books/new">
          <button type="button">도서 등록</button>
        </Link>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: '24px',
          marginTop: '30px',
        }}
      >
        {sampleBooks.map((book) => (
          <Link
            key={book.id}
            to={`/books/${book.id}`}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            <div
              style={{
                aspectRatio: '3 / 4',
                background: '#eeeeee',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {book.coverImageUrl ? (
                <img
                  src={book.coverImageUrl}
                  alt={book.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <span>표지 이미지 없음</span>
              )}
            </div>

            <h3>{book.title}</h3>
            <p>{book.author}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default Home;