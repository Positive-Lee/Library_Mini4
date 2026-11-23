import { Link } from 'react-router-dom';

function BookItem({id, title, author, content, coverImageUrl, likes}) {
    return (
        <li className="book-card">
          <Link
            key={id}
            to={`/books/${id}`}
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            <div
              style={{
                aspectRatio: '3 / 4',
                background: '#eeeeee',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {coverImageUrl ? (
                <img
                  src={coverImageUrl}
                  alt={title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <span>표지 이미지 없음</span>
              )}
            </div>

            <h3>{title}</h3>
            <p>{author}</p>
          </Link>
        </li>
    );
}

export default BookItem;