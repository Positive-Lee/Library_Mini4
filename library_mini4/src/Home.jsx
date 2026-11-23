import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBooks } from '../components/books';
import BookList from '../components/BookList';



function Home() {
    const [books, setBooks] = useState([]);
    useEffect(() => {
      const loadBooks = async () => {
        try {
            const data = await getBooks();
            setBooks(data);
        } catch (error) {
            console.error(error);
        }
      };

      loadBooks();
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


      <BookList books={books} />
    </main>
  );
}

export default Home;