# 💼 채용 서비스 백엔드 프로젝트

## 📌 프로젝트 목표

- Express.js와 MySQL을 활용해 나만의 채용 서비스 백엔드 서버 만들기
- 회원 인증과 이력서 관리 기능을 통해 백엔드의 기본 구조와 흐름을 익히는 것이 목표입니다.

---

## 📄 주요 기능

### 👤 사용자 기능 (Auth)

- 회원가입: 이름, 이메일, 비밀번호를 입력받아 유저 생성
- 로그인: 이메일과 비밀번호로 로그인, Access/Refresh Token 발급
- 사용자 정보 조회: 로그인된 유저의 정보 확인
- 로그아웃: Refresh Token 삭제

### 📑 이력서 관리 기능 (Resume)

- 이력서 생성: 제목, 자기소개 등을 입력하여 이력서 생성
- 이력서 목록 조회: 로그인된 유저의 이력서 전체 조회
- 이력서 상세 조회: 이력서 ID로 특정 이력서 정보 조회
- 이력서 수정: 제목, 자기소개 등 내용 수정 가능
- 이력서 삭제: 해당 이력서 삭제

→ 모든 이력서 API는 로그인한 유저의 토큰을 기준으로 접근 권한을 제한합니다 (JWT 인증)

---

## ⚙️ 환경 변수 설정

'.env.example' 파일의 이름을 '.env'로 변경한 후 아래 항목을 채워주세요

    DATABASE_URL=mysql://계정이름:비밀번호@주소:포트/DB명
    SERVER_PORT=서버 포트
    ACCESS_TOKEN_SECRET=JWT 생성을 위한 비밀키
    REFRESH_TOKEN_SECRET=JWT 생성을 위한 비밀키

---

## 🚀 프로젝트 실행 방법

1. 필요한 패키지 설치 `yarn`

2. 서버 실행

   - 배포용 `yarn start`

   - 개발용 `yarn dev`

---

## 📚 API 명세서

- [API 문서 (Notion)](https://melted-gram-487.notion.site/Node-js-API-aa954cc9fafe4d5cacfc837abb76279c)

---

## 🗂 ERD 설계

- [ERD (DrawSQL)](https://drawsql.app/teams/soobeen/diagrams/-2)
