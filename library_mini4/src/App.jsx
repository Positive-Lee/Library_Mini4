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
    navigate('/');
  };

  return (
    <>
      <Header onSearch={handleSearch} />

      <Routes>

        <Route
          path="/"
          element={
            <>
              <Navigation />
              <Home searchKeyword={searchKeyword} />
            </>
          }
        />

        <Route
          path="/books/new"
          element={<BookForm />}
        />

        <Route
          path="/books/:id"
          element={<BookContent />}
        />

        <Route
          path="/books/:id/edit"
          element={<BookEdit />}
        />

      </Routes>
    </>
  );
}

export default App;