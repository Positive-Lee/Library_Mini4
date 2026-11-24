import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import logo from "./Genie_Library_Logo.png";


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
      {/* 서비스 제목 로고 , 클릭 링크 */}
      <NavLink to="/">
        <img
          src={logo}
          alt="Genie Library 홈으로 이동"
          className="Genie_Library_Logo"
        />
      </NavLink> 

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
        
      </form>
    </header>
  );
}

export default Header;