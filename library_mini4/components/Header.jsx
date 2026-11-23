
import {useState} from "react";

function Header({onSearch}) {
    const [search, setSearch] = useState("");
    const handleSearch = (e) => {
        e.preventDefault();

        if (onSearch) {
            onSearch(search);
        }
    }
    return (
        <header>
            {/*서비스 제목*/}
            <h1>도서 관리</h1>
    
            {/*검색창과 검색 버튼*/}
            <form onSubmit = {handleSearch}>
                <input
                type="text"
                placeholder="책 제목을 검색하세요"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
    
                <button type="submit">
    
                </button>
            </form>
        </header>
    );
};



 export default Header;