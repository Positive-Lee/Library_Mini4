import './BookForm.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createBook } from "../components/books";

const IMAGE_API_URL = "https://api.openai.com/v1/images/generations";

const COVER_COUNT = 3;

const makePrompt = (title, author, content) =>
    `세로 2:3 비율의 책 표지 일러스트를 만들어 주세요.
책 제목: "${title}"
저자: ${author || "미상"}
줄거리: ${content}
이야기의 분위기와 핵심 주제를 하나의 인상적인 이미지로 표현해 주세요.
매번 구도, 색감, 화풍을 다르게 해서 서로 다른 느낌의 표지가 나오게 해 주세요.
한 장의 이미지에는 표지 하나만 그려 주세요.
이미지 안에 글자, 문자, 워터마크는 넣지 마세요.`;

async function requestCovers(apiKey, prompt, quality) {
    const res = await fetch(IMAGE_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: "gpt-image-2",
            prompt,
            n: COVER_COUNT,
            size: "1024x1536",
            quality,
            output_format: "png",
        }),
    });

    if (res.status === 401) throw new Error("API Key가 올바르지 않아요.");
    if (res.status === 429) throw new Error("요청이 많거나 사용 한도를 넘었어요. 잠시 후 다시 시도하세요.");
    if (!res.ok) throw new Error(`표지 생성 실패 (${res.status})`);

    const data = await res.json();
    const images = data.data || [];
    if (images.length === 0) throw new Error("응답에서 이미지를 찾지 못했어요.");

    return images.map((img) => `data:image/png;base64,${img.b64_json}`);
}

function BookForm() {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");

    const [apiKey, setApiKey] = useState("");
    const [quality, setQuality] = useState("low");

    const [candidates, setCandidates] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const coverImageUrl = selectedIndex !== null ? candidates[selectedIndex] : "";

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
        setCandidates([]);
        setSelectedIndex(null);

        try {
            const urls = await requestCovers(apiKey.trim(), makePrompt(title, author, content), quality);
            setCandidates(urls);
        } catch (err) {
            setError(err.message);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSelect = (i) => {
        setSelectedIndex(i);
        setError("");
    };

    const handleClick = async () => {

        if (!title.trim()) return;

        if (!coverImageUrl) {
            setError(candidates.length > 0 ? "표지 후보 중 하나를 선택하세요." : "표지를 먼저 생성하세요.");
            return;
        }

        const newBook = {
            title,
            author,
            content,
            coverImageUrl,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            recommend: 0,
            notRecommend: 0
        };

        try {
            const saved = await createBook(newBook);
            if (!saved || !saved.id) throw new Error("등록 실패");

            navigate("/");
        } catch (err) {
            alert("등록에 실패했어요.");
            console.error(err);
        }
    }

    const handleCancel = () => {
        navigate("/");
    }

    return (
        <section className="book-form" style={{ textAlign: "center" }}>

            <div>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="제목을 입력하세요" />
            </div>

            <div>
                <input
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="글쓴이" />
            </div>

            <div>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="요약 (도서 내용)"
                    rows={6} />
            </div>

            <div className="ai-cover">
                <h3>AI 표지 생성</h3>

                <div>
                    <input
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="OpenAI API Key (sk-...)" />
                </div>

                <div>
                    <select value={quality} onChange={(e) => setQuality(e.target.value)}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <div>
                    <button onClick={() => handleGenerate()} disabled={loading}>
                        {loading ? "생성 중..." : candidates.length > 0 ? "다시 생성" : "표지생성"}</button>
                </div>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                    {candidates.map((url, i) => (
                        <div key={i} onClick={() => handleSelect(i)} style={{ cursor: "pointer", textAlign: "center" }}>
                            <img
                                src={url}
                                alt={`후보 ${i + 1}`}
                                style={{
                                    width: 150,
                                    border: selectedIndex === i ? "4px solid #ff1fae" : "4px solid transparent",
                                    borderRadius: 6,
                                }} />
                            <p>후보 {i + 1}{selectedIndex === i ? " ✔" : ""}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <button onClick={() => handleClick()} disabled={loading}>
                    등록</button>

                <button onClick={() => handleCancel()}>
                    취소</button>
            </div>
        </section>
    );
}

export default BookForm;