
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBooks, searchBooks } from "../components/books";

function Home({ searchKeyword }) {
  const [books, setBooks] = useState([]);
  const [sortBy, setSortBy] = useState("latest");
  const [reviewCounts, setReviewCounts] = useState({});
  const [reviewsLoading, setReviewsLoading] = useState(true);

  // =========================
  // 도서 데이터 불러오기
  // =========================

  useEffect(() => {
    let cancelled = false;

    async function fetchBooks() {
      try {
        const data = searchKeyword
          ? await searchBooks(searchKeyword)
          : await getBooks();

        if (!cancelled) {
          setBooks(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error("도서 조회 오류:", error);
        if (!cancelled) setBooks([]);
      }
    }

    fetchBooks();

    // 3초마다 도서 데이터 갱신
    const interval = setInterval(fetchBooks, 3000);


    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [searchKeyword]);

  // =========================
  // 도서별 리뷰 개수 불러오기
  // =========================

  useEffect(() => {
    let cancelled = false;
    setReviewsLoading(true);

    async function fetchReviews() {
      try {

        const response = await fetch(
          "http://localhost:3000/reviews"
        );

        if (!response.ok) {
          throw new Error("리뷰 데이터 불러오기 실패");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("리뷰 데이터 형식이 올바르지 않습니다.");
        }

        const counts = {};

        data.forEach((review) => {
          const bookId = String(review.bookId);

          counts[bookId] = (counts[bookId] || 0) + 1;
        });

        if (!cancelled) {
          setReviewCounts(counts);
        }
      } catch (error) {
        console.error("리뷰 조회 오류:", error);
      } finally {
        if (!cancelled) {
          setReviewsLoading(false);
        }
      }
    }

    fetchReviews();

    // 3초마다 리뷰 데이터 갱신
    const interval = setInterval(fetchReviews, 3000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  // =========================
  // 베스트 도서 TOP 3
  // =========================

  const bestBooks = [...books]
    .sort(
      (a, b) =>
        (Number(b.recommend) || 0) -
        (Number(a.recommend) || 0)
    )
    .slice(0, 3);

  // =========================
  // 신간 도서 TOP 3
  // =========================

  const newBooks = [...books]
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0) -
        new Date(a.createdAt || 0)
    )
    .slice(0, 3);

  // =========================
  // 전체 도서 목록 정렬
  // =========================

  const sortedBooks = [...books].sort((a, b) => {
    switch (sortBy) {
      // 추천순
      case "popular":
        return (
          (Number(b.recommend) || 0) -
          (Number(a.recommend) || 0)
        );

      // 리뷰 많은 순
      case "reviews":
        return (
          (reviewCounts[String(b.id)] || 0) -
          (reviewCounts[String(a.id)] || 0)
        );

      // 최신순
      case "latest":
        return (
          new Date(b.createdAt || 0) -
          new Date(a.createdAt || 0)
        );

      // 오래된순
      case "oldest":
        return (
          new Date(a.createdAt || 0) -
          new Date(b.createdAt || 0)
        );

      // 가나다순
      case "title":
        return (a.title || "").localeCompare(
          b.title || "",
          "ko"
        );

      default:
        return 0;
    }
  });

  // =========================
  // 공통 도서 카드
  // =========================

  const renderBookCard = (book, index, type = "normal") => (
    <Link
      key={book.id}
      to={`/books/${book.id}`}
      className="book-card-link"
    >
      <article className="book-card">

        {/* 베스트 도서 순위 */}
        {type === "best" && (
          <span className="book-rank">
            TOP {index + 1}
          </span>
        )}

        {/* 신간 도서 표시 */}
        {type === "new" && (
          <span className="book-rank new-badge">
            NEW
          </span>
        )}

        {/* 도서 표지 */}
        <div className="book-image">
          {book.coverImageUrl ? (
            <img
              src={book.coverImageUrl}
              alt={book.title}
            />
          ) : (
            <span>표지 이미지 없음</span>
          )}
        </div>

        {/* 도서 제목 */}
        <h3>{book.title}</h3>

        {/* 저자 */}
        <p className="book-author">
          {book.author}
        </p>

        {/* 추천 / 비추천 / 리뷰 수 */}
        <div className="book-reactions">
          <span>👍 {book.recommend ?? 0}</span>
          <span>👎 {book.notRecommend ?? 0}</span>
          <span>
            💬 {reviewCounts[String(book.id)] ?? 0}
          </span>
        </div>

      </article>
    </Link>
  );

  return (
    <main className="home-page">

      {/* =========================
          베스트 도서 + 신간 도서
      ========================= */}

      {!searchKeyword && books.length > 0 && (
        <div className="featured-sections">

          {/* 베스트 도서 */}
          <section className="featured-section">
            <div className="section-heading">
              <div>
                <h2>🏆 베스트 도서</h2>
                <p>
                  추천 수가 가장 높은 인기 도서 TOP 3
                </p>
              </div>
            </div>

            <div className="featured-books">
              {bestBooks.map((book, index) =>
                renderBookCard(book, index, "best")
              )}
            </div>
          </section>

          {/* 신간 도서 */}
          <section className="featured-section">
            <div className="section-heading">
              <div>
                <h2>✨ 신간 도서</h2>
                <p>
                  최근 등록된 새로운 도서 TOP 3
                </p>
              </div>
            </div>

            <div className="featured-books">
              {newBooks.map((book, index) =>
                renderBookCard(book, index, "new")
              )}
            </div>
          </section>

        </div>
      )}

      {/* =========================
          전체 도서 목록
      ========================= */}

      <section className="book-list-section">

        {/* 도서 목록 제목 + 정렬 필터 */}
        <div className="home-top">

          <div>
            <h2>
              {searchKeyword
                ? "검색 결과"
                : "도서 목록"}
            </h2>

            <p>
              {searchKeyword
                ? `"${searchKeyword}" 검색 결과 ${books.length}권`
                : "등록된 도서를 확인하고 상세 정보를 조회할 수 있습니다."}
            </p>
          </div>

          {/* 정렬 필터 */}
          <div className="sort-container">
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
              aria-label="도서 정렬 기준"
            >
              <option value="latest">
                최신순
              </option>

              <option value="oldest">
                오래된순
              </option>

              <option value="popular">
                추천순
              </option>

              <option value="reviews">
                리뷰 많은 순
              </option>

              <option value="title">
                가나다순
              </option>
            </select>
          </div>

        </div>

        {/* 정렬된 도서 목록 */}
        {sortBy === "reviews" && reviewsLoading ? (
          <p className="empty-books">
            리뷰 정보를 불러오는 중입니다.
          </p>
        ) : sortedBooks.length > 0 ? (
          <div className="book-grid">
            {sortedBooks.map((book, index) =>
              renderBookCard(book, index)
            )}
          </div>
        ) : (
          <p className="empty-books">
            {searchKeyword
              ? "검색 결과가 없습니다."
              : "등록된 도서가 없습니다."}
          </p>
        )}

      </section>

    </main>
  );
}

export default Home;

