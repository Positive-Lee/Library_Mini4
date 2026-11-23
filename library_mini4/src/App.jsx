import { useState } from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import BookForm from '../components/BookForm';
import BookItem from '../components/BookItem';
import BookList from '../components/BookList';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';



function App(){
  // const [page, setPage] = useState("list");

  

  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/books/new' element={<BookForm />} />
        {/* <Route path='/books/:id' element={<BookDetail />} /> */}
      </Routes>
    </>
  );
}

export default App;