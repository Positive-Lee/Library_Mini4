import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Header({ onSearch }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  
  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    if (onSearch) {
      onSearch(search);
    }

    setSearch("");
  };

  const handleHome = () => {
    setSearch("");
    onSearch?.("");
    navigate("/");
  }

  return (
    <header className="library-header">
      {/* 서비스 제목 */}
      <h1 className="library-title">도서 관리</h1>

      {/* 검색창과 검색 버튼 */}
      <form className="search-form" onSubmit={handleSearch}>
        <input
          className="search-input"
          type="text"
          placeholder="책 제목을 검색하세요"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="search-button" type="submit">
          검색
        </button>
        <button type="button" onClick={handleHome}>목록</button>
      </form>
    </header>
  );
}

export default Header;