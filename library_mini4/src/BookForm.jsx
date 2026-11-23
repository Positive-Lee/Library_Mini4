import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBook } from '../components/books';

const IMAGE_API_URL = "https://api.openai.com/v1/images/generations";

const makePrompt = (title, author, content) =>
    `세로 2:3 비율의 예술적인 책 표지 일러스트를 만들어 주세요.
책 제목: "${title}"
저자: ${author || "미상"}
줄거리: ${content}
이야기의 분위기와 핵심 주제를 하나의 인상적인 이미지로 표현해 주세요.
이미지 안에 글자, 문자, 워터마크는 넣지 마세요.`;

function BookForm() {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");

    const [apiKey, setApiKey] = useState("");
    const [quality, setQuality] = useState("low");
    const [coverImageUrl, setCoverImageUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGenerate = async () => {
        if (!title.trim() || !content.trim()) {
            setError("제목과 요약을 먼저 입력하세요.");
            return;
        }
        if (!apiKey.trim()) {
            setError("OpenAI API Key를 입력하세요.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await fetch(IMAGE_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey.trim()}`,
                },
                body: JSON.stringify({
                    model: "gpt-image-2",
                    prompt: makePrompt(title, author, content),
                    n: 1,
                    size: "1024x1536",
                    quality,
                    output_format: "png",
                }),
            });

            const data = await res.json();
            const b64 = data.data?.[0]?.b64_json;
            if (!b64) throw new Error("응답에서 이미지를 찾지 못했어요.");

            setCoverImageUrl(`data:image/png;base64,${b64}`);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleClick = async () => {

        if (!title.trim()) return;

        const newBook = {
            title,
            author,
            content,
            coverImageUrl,
            likes: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        try {
            const saved = await createBook(newBook);
            if (!saved || !saved.id) throw new Error("등록 실패");

            setTitle("");
            setAuthor("");
            setContent("");
            setCoverImageUrl("");
            setError("");
        } catch (err) {
            console.error(err);
        }
    }

    const handleCancel = () => {
        navigate("/");
    }

    return (
        <section className="book-form">
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력하세요" />

            <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="글쓴이" />

            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="요약 (도서 내용)"
                rows={6} />

            <div className="ai-cover">
                <h3>AI 표지 생성</h3>

                <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="OpenAI API Key (sk-...)" />


                <select value={quality} onChange={(e) => setQuality(e.target.value)}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                
                <button onClick={() => handleGenerate()} disabled={loading}>
                    표지생성</button>
                {error && <p style={{ color: "red" }}>{error}</p>}

                {coverImageUrl && <img src={coverImageUrl} style={{ width: 200 }} />}
            </div>

            <button onClick={() => handleClick()} disabled={loading}>
                등록</button>

            <button onClick={() => handleCancel()}>
                취소</button>
        </section>
    );
}

export default BookForm;