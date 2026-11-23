const API_URL = "http://localhost:3000/books";

// 전체 도서 조회
export async function getBooks() {
    try{
        const response = await fetch(API_URL);
        return await response.json();
    } catch(error) {
        console.error("도서 조회 실패: ", error);
    }
}

// 특정 도서 조회
export async function getBook(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        return response.json();
    } catch(error) {
        console.error("도서 상세 조회 실패: ", error);
    }
}

// 도서 등록
export async function createBook(book) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(book)
        });

        return response.json();
    } catch (error) {
        console.log("도서 등록 실패: ", error);
    }
}

// 도서 수정
export async function updateBook(id, book) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(book)
        });

        return response.json();
    } catch(error) {
        console.log("도서 수정 실패: ", error);
    }
}

// 도서 삭제
export async function deleteBook(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });
    } catch(error) {
        console.log("도서 삭제 실패: ", error);
    }
}

// 도서 검색
export async function searchBooks(keyword) {
  const response = await fetch(
    `${API_URL}?title_like=${encodeURIComponent(keyword)}`
  );

  if (!response.ok) {
    throw new Error("도서 검색 실패");
  }

  return await response.json();
}