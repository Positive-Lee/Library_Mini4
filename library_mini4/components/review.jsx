const API_URL = "http://localhost:3000/reviews";

// 리뷰 조회
export async function getReviews(bookId) {
    const response = await fetch(
        `${API_URL}?bookId=${encodeURIComponent(bookId)}`
    );

    if (!response.ok) throw new Error("리뷰 조회 실패");

    return await response.json();
}

// 리뷰 등록
export async function createReview(review) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(review)
    });

    if (!response.ok) throw new Error("리뷰 등록 실패");

    return await response.json();
}

// 리뷰 삭제
export async function deleteReview(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) throw new Error("리뷰 삭제 실패");
}