# 📚 Aivle Library

> **React와 JSON Server를 활용한 웹 기반 도서 관리 서비스**

Aivle Library는 사용자가 도서 정보를 조회하고 등록·수정·삭제할 수 있는 웹 서비스입니다.

도서 검색 및 AI 기반 표지 이미지 생성 기능을 추가하여 편리한 도서 관리 환경을 제공하는 것을 목표로 합니다.

---

## 📌 1. 프로젝트 소개

### 주요 기능

| 구분 | 기능 | 설명 |
|:---:|---|---|
| 필수 | 도서 목록 조회 | 등록된 도서를 카드 형태로 조회 |
| 필수 | 도서 상세 조회 | 선택한 도서의 상세 정보 확인 |
| 필수 | 도서 등록 | 새로운 도서 정보를 서버에 저장 |
| 필수 | 도서 수정 | 기존 도서 정보 수정 |
| 필수 | 도서 삭제 | 등록된 도서 삭제 |
| 부가 | 도서 검색 | 제목을 기준으로 도서 검색 |
| 부가 | AI 표지 생성 | AI를 활용한 도서 표지 이미지 생성 및 선택 |

> **참고:** 위 표는 프로젝트의 개발 목표이며, 실제 구현 여부는 개발 진행 상황에 따라 달라질 수 있습니다.

---

## 🛠️ 2. 기술 스택

| 구분 | 사용 기술 | 역할 |
|---|---|---|
| Frontend | React, Vite | 사용자 화면 구성 및 개발 환경 |
| Routing | React Router | 페이지 이동 및 URL 관리 |
| Backend | JSON Server | REST API 서버 |
| Database | db.json | 도서 데이터 저장 |
| Version Control | Git, GitHub | 소스코드 관리 및 협업 |
| UI Design | Figma | 화면 디자인 및 설계 |

---

## 📂 3. 프로젝트 기본 구조

Library_Mini4/
│
├── DB_server/
│   └── db.json                 # 도서 데이터
│
├── library_mini4/
│   ├── components/             # 공통 및 재사용 컴포넌트
│   │   ├── Header.jsx
│   │   ├── Navigation.jsx
│   │   ├── BookList.jsx
│   │   ├── BookItem.jsx
│   │   ├── BookForm.jsx
│   │   └── BookContent.jsx
│   │
│   ├── src/
│   │   ├── App.jsx             # 라우팅 및 전체 화면 구성
│   │   ├── main.jsx            # React 앱 실행 진입점
│   │   │
│   │   ├── Home.jsx            # 도서 목록 페이지
│   │   ├── Create.jsx          # 도서 등록 페이지
│   │   ├── Detail.jsx          # 도서 상세 페이지
│   │   └── Edit.jsx            # 도서 수정 페이지
│   │
│   │   ├── App.css             # 컴포넌트 스타일
│   │   └── index.css           # 전역 스타일
│   │
│   ├── package.json           # 패키지 및 실행 명령어
│   └── package-lock.json       # 실제 설치할 패키지 버전 고정
│
└── README.md

> **참고:** 프로젝트 구조는 기본 구성 예시이며, 개발 진행에 따라 변경될 수 있습니다.

---

## 🚀 4. 프로젝트 실행 방법

### ① 프로젝트 다운로드

```bash
git clone https://github.com/Positive-Lee/Library_Mini4.git
```

### ② React 프로젝트 폴더 이동

```bash
cd Library_Mini4/library_mini4
```

### ③ 패키지 설치

```bash
npm install
```

### ④ JSON Server 실행

첫 번째 터미널에서 아래 명령어를 실행합니다.

```bash
npm run server
```

**JSON Server 기본 주소**

http://localhost:3000

**도서 목록 API**

http://localhost:3000/books

> `package.json`의 `server` 스크립트가 `../DB_server/db.json`을 참조하도록 설정되어 있어야 합니다.

### ⑤ React 개발 서버 실행

두 번째 터미널에서 아래 명령어를 실행합니다.

```bash
npm run dev
```

브라우저에서 터미널에 표시된 주소로 접속합니다.

**React 기본 접속 주소**

http://localhost:5173/

> 5173 포트가 이미 사용 중이라면 5174 등 다른 포트로 실행될 수 있습니다.

---

## 🔗 5. REST API 명세

**Base URL:** `http://localhost:3000`

| 구분 | 기능 | Method | Endpoint |
|:---:|---|:---:|---|
| 필수 | 도서 목록 조회 | GET | `/books` |
| 필수 | 도서 상세 조회 | GET | `/books/:id` |
| 필수 | 도서 등록 | POST | `/books` |
| 필수 | 도서 수정 | PATCH | `/books/:id` |
| 필수 | 도서 삭제 | DELETE | `/books/:id` |

---

## 📄 6. 주요 페이지 구성

| 페이지 | URL | 주요 기능 |
|---|---|---|
| 메인 페이지 | `/` | 도서 목록 및 검색 |
| 도서 등록 | `/books/new` | 도서 정보 입력 및 등록 |
| 도서 상세 | `/books/:id` | 도서 상세 정보 확인 |
| 도서 수정 | `/books/:id/edit` | 기존 도서 정보 수정 |

---

## 📋 7. 개발 진행 안내

본 프로젝트는 도서 관리의 핵심 CRUD 기능을 우선 구현하고, 이후 도서 검색 및 AI 표지 생성 기능을 확장하는 방향으로 개발합니다.

개발 과정에서 페이지 구성과 세부 기능은 팀 협의를 통해 변경될 수 있습니다.

---

**Aivle Library | Mini Project 4**