
function Header() {
  return (
    <header>
      {/* 사이트 이름 */}
      <h1>도서 관리</h1>

      {/* 검색 영역 */}
      <div>
        {/* 검색어 입력창 */}
        <input
          type="text"
          placeholder="도서 검색"
        />

        {/* 검색 버튼 */}
        <button>검색</button>
      </div>
    </header>
  );
}

export default Header;
