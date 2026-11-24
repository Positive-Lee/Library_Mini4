import './App.css';
import { useState } from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import BookForm from './BookForm';
import BookItem from '../components/BookItem';
import BookList from '../components/BookList';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Home';
import BookContent from './BookContent';
import BookEdit from './BookEdit';

function App() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword.trim());
    navigate('/search');
  };

  return (
    <>
      <Header onSearch={handleSearch} />

      <Navigation />

      <Routes>
  {/* 홈페이지 - 전체 도서 목록 */}
  <Route
    path="/"
    element={<Home searchKeyword="" />}
  />

  {/* 검색 결과 페이지 */}
  <Route
    path="/search"
    element={<Home searchKeyword={searchKeyword} />}
  />

  {/* 도서 등록 */}
  <Route path="/books/new" element={<BookForm />} />

  {/* 도서 상세 */}
  <Route path="/books/:id" element={<BookContent />} />

  {/* 도서 수정 */}
  <Route path="/books/:id/edit" element={<BookEdit />} />
</Routes>
    </>
  );
}

export default App;