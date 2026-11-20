import { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';

function App(){
  const [page, setPage] = useState("list");

  return (
    <Header />
  )
}