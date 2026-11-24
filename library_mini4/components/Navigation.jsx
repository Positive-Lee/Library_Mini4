import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav className="navigation">
      {/* 홈페이지(도서 목록)로 이동 */}
      <NavLink to="/">
        도서 목록
      </NavLink>

      {/* 도서 등록 페이지로 이동 */}
      <NavLink to="/books/new">
        도서 등록
      </NavLink>
    </nav>
  );
}

export default Navigation;