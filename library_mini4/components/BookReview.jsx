import {useState, useEffect} from "react";
import { getReviews, createReview } from "./review";

function BookReview({bookId}) {
    const [reviews, setReviews] = useState([]);
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");

    // 리뷰 조회
    useEffect(() => {
        async function fetchReviews() {
            try {
                const data = await getReviews(bookId);
                setReviews(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchReviews();
    }, [bookId]);

    //리뷰 등록
    async function handleSubmit(e) {
        e.preventDefault();

        if (!author.trim() || !content.trim()) {
            alert("작성자와 리뷰 내용을 입력해주세요.");
            return;
        }

        try {
            const newReview = await createReview({
                bookId: String(bookId),
                author: author.trim(),
                content: content.trim(),
                createdAt: new Date.toISOString()
            });

            setReviews(prev => [newReview, ...prev]);

            setAuthor("");
            setContent("");
        } catch (error) {
            alert("리뷰 등록 실패");
        }
    }

    return (
        <section className="book-review">
            <h2>리뷰 ({reviews.length})</h2>

            <form
            className="review-form"
            onSubmit={handleSubmit} >
                <input
                value={author}
                onChange={e => setAuthor(e.target.value)}
                placeholder="작성자"
                required />

                <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="리뷰를 작성해주세요."
                rows={4}
                required />

                <button type="submit">리뷰 등록</button>
            </form>

            <div className="review-list">
                {reviews.length === 0 && (
                    <p className="empty-review">아직 작성된 리뷰가 없습니다.</p>
                )}
                {reviews.map(review => (
                    <article
                    className="review-item"
                    key={review.id} >
                        <div className="review-header">
                            <strong>{review.author}</strong>

                            <span>
                                {new Date(
                                    review.createdAt
                                ).toLocaleDateString("ko-KR")}
                            </span>
                            </div>

                            <p>{review.content}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}

export default BookReview;