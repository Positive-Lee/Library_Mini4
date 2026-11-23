import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getBooks } from '../components/books';
import BookList from '../components/BookList';

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
    setBooks(getBooks);
    
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

        <BookList books={books} />
      </div>
    </main>
  );
}

export default Home;