import './App.css';
import { useState } from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import BookForm from './BookForm';
import BookItem from '../components/BookItem';
import BookList from '../components/BookList';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import BookContent from './BookContent';
import BookEdit from './BookEdit';

function App() {
  return (
    <>
      <Header />

      <Routes>

        <Route
          path="/"
          element={
            <>
              <Navigation />
              <Home />
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