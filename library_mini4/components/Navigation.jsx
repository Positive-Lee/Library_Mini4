
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="navigation">

      <NavLink to="/">
        도서 목록
      </NavLink>

      <NavLink to="/books/new">
        도서 등록
      </NavLink>

    </nav>
  );
}

export default Navigation;