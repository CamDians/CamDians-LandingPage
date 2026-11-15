# CamDiansRX — landing page

프놈펜 영세 약국용 의약품 재고관리 POS, **CamDiansRX**의 새 랜딩 페이지입니다.
한 파일에 전부 넣던 기존 방식 대신, 역할별로 파일을 나눴습니다.

## 파일 구조

```
.
├── index.html                 페이지 한 장
├── assets/
│   ├── css/
│   │   ├── tokens.css         색·글자·여백·모서리·그림자 값 (여기만 고치면 전체가 바뀜)
│   │   ├── base.css           기본 요소와 공통 컨테이너
│   │   ├── components.css     버튼·카드·입력창 (토큰만 사용)
│   │   ├── layout.css         상단바·첫 화면·섹션 배치
│   │   ├── khmer.css          크메르어 글꼴과 줄간격
│   │   └── motion.css         움직임 5개 + prefers-reduced-motion 차단
│   ├── js/
│   │   ├── dict.js            한국어·영어·크메르어 번역 (검수자에게 이 파일만 주면 됩니다)
│   │   ├── i18n.js            언어 전환
│   │   ├── motion.js          스크롤 등장, 숫자 카운트
│   │   ├── video.js           영상 (누를 때만 받음)
│   │   └── map.js             파트너 약국 지도
│   ├── fonts/                 크메르어 글꼴 2개
│   ├── img/                   사진·로고
│   └── video/                 사용법 영상 645KB
├── README.md
└── DESIGN-NOTES.md
```

## GitHub에 올리는 법

### 방법 A — 웹브라우저만으로 (설치할 것 없음)

1. **github.com** 접속 → 오른쪽 위 `+` → **New repository**
2. `Repository name`에 저장소 이름을 적고, **Public**으로 둡니다
   (Private은 유료 요금제가 아니면 Pages가 안 됩니다)
3. `Create repository`
4. 다음 화면에서 **uploading an existing file** 링크를 누릅니다
5. 압축을 푼 폴더 **안의 내용물**을 통째로 끌어다 놓습니다
   - `index.html`, `assets` 폴더, `og.jpg`, `.nojekyll`
   - **폴더 자체가 아니라 폴더 안의 것들**을 올려야 합니다.
     `index.html`이 저장소 맨 위에 보여야 맞습니다
6. 아래 `Commit changes` 누르기
7. 저장소 위쪽 **Settings** → 왼쪽 메뉴 **Pages**
8. `Source`를 **Deploy from a branch**, 브랜치는 `main`, 폴더는 `/ (root)` → `Save`
9. 1~3분 뒤 같은 화면 위에 주소가 뜹니다

### 방법 B — 이미 저장소가 있다면 (명령어)

```bash
# 압축 푼 폴더 안에서
git init
git add .
git commit -m "CamDiansRX landing page"
git branch -M main
git remote add origin https://github.com/<계정>/<저장소>.git
git push -u origin main
```

그 다음 위의 7~9번(Settings → Pages)은 똑같이 하시면 됩니다.

### 올린 뒤 꼭 확인할 것

| 확인 | 틀렸을 때 보이는 모습 |
|---|---|
| 글자체가 적용됐는지 | 네모 상자나 기본 글꼴로 보임 |
| 사진이 보이는지 | 깨진 이미지 아이콘 |
| KR·EN·KH 버튼이 바뀌는지 | 눌러도 한국어 그대로 |
| 지도가 뜨는지 | 핀 모양 아이콘과 주소만 보임 (이건 정상 대체 화면입니다) |
| 영상 재생 버튼 | 눌렀을 때 영상이 나오는지 |

### 주소가 camdians.com이 아닌 경우

`index.html` 맨 위에 **주소가 `https://www.camdians.com/`으로 적힌 줄이 6개** 있습니다.
(`canonical`, `hreflang` 4개, `og:image`)

GitHub 기본 주소(`<계정>.github.io/<저장소>`)로 먼저 올리실 거면, 그 6줄의 주소를 바꾸거나
**일단 그냥 두셔도 화면은 정상으로 보입니다.** 검색엔진과 카카오톡·페이스북 미리보기에만 영향이 있습니다.

나중에 `camdians.com`을 연결하실 때는 Settings → Pages 아래쪽 `Custom domain`에 적으면 됩니다.

## 고칠 때

| 하고 싶은 일 | 고칠 파일 |
|---|---|
| 색·글자 크기·여백을 한꺼번에 바꾸기 | `assets/css/tokens.css` |
| 버튼·카드·입력창 모양 바꾸기 | `assets/css/components.css` |
| 섹션 순서·배치 바꾸기 | `assets/css/layout.css`, `index.html` |
| 움직임 끄기 | `assets/css/motion.css`에서 해당 규칙만 지우면 됩니다 |
| 글 내용 바꾸기 | `index.html` |

`components.css`에는 색상 코드나 px 숫자를 직접 쓰지 않았습니다.
전부 `tokens.css`의 변수입니다. 새 컴포넌트를 만들 때도 같은 규칙을 지켜주세요.

## 언어

한국어·영어·크메르어 3개 언어입니다. 글은 전부 `assets/js/dict.js` 한 파일에 있습니다.
**크메르어 검수를 받으실 때는 이 파일만 전달하면 됩니다.**

HTML에 적힌 글은 한국어입니다. JavaScript가 막혀도 한국어 페이지는 온전히 보입니다.

## 무게

| 처음 화면을 열 때 받는 것 | 크기 |
|---|---|
| HTML + CSS + JS | 약 60KB |
| 첫 화면 사진 | 53KB |
| 영상 미리보기 이미지 | 17KB |
| **영상 본편** | **누르기 전에는 안 받음** (645KB) |
| **지도** | **화면에 들어오기 전에는 안 받음** |
| **크메르어 글꼴** | **크메르어 글자가 나오기 전에는 안 받음** (44KB) |

## 아직 안 된 것

- **og.jpg**: 공유 미리보기 이미지가 아직 없습니다. 기존 사이트의 것을 루트에 넣고 `index.html`의 `og:image`를 바꾸면 됩니다.
- **크메르어 검수**: 새로 쓴 문장이 많습니다. `dict.js`의 `km` 항목을 검수받아야 합니다.

## 접근성

- 본문 바로가기 링크가 맨 앞에 있습니다.
- 키보드로 이동할 때 파란 테두리가 보입니다.
- 움직임을 끈 사용자에게는 모든 애니메이션이 꺼집니다.
- `--muted`는 흰 배경에서 대비가 2.56:1이라 글자에 쓰지 않습니다. 작은 글자는 `--text-muted`(5.50:1)를 씁니다.
