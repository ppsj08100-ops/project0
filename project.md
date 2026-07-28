# 프로젝트 기본 작업 지침

## 1. HTML 구조

- `index.html`은 시맨틱 태그를 사용한다.
- 반복 콘텐츠는 `ul`, `li`로 구성한다.
- 모든 버튼에 `button`을 지정한다.
- 아이콘만 있는 버튼에는 `aria-label`을 제공한다.
- 이미지에는 콘텐츠를 설명하는 `alt`를 작성한다.
- 클래스명은 BEM 형태를 유지한다.
    - 예: `.promotion-card__photo`
- 문서 인코딩은 UTF-8을 사용한다.

## 2. CSS 작성

- 디자인 기준 콘텐츠 너비는 `1400px`이다.
- 공통 색상과 너비는 `:root`의 CSS 변수로 관리한다.
- Figma의 크기, 여백, 글꼴, 색상을 우선 반영한다.
- `box-sizing: border-box`를 기준으로 크기를 계산한다.
- 이미지에는 `width`, `height`, `object-fit`을 명시한다.
- 반복되는 UI는 공통 클래스 규칙을 재사용한다.
- Tailwind를 설치하지 않고 기존 순수 CSS 방식을 유지한다.
- 데스크톱 구현 후 태블릿과 모바일 미디어 쿼리를 작성한다.

## 3. 이미지 관리

```text
images/

```

- 모든 이미지와 SVG는 `images` 폴더에서 관리한다.
- Figma 임시 URL을 HTML에 직접 사용하지 않는다.
- Figma 자산은 다운로드하여 프로젝트에 저장한다.
- SVG 아이콘을 임의로 다시 그리지 않는다.
- HTML에서는 상대 경로를 사용한다.

```html
<img src="images/promotion/card-holiday.jpg" alt="프로모션 모델" />
```

## 4. Figma 구현

- 반드시 전달받은 `node-id`를 기준으로 디자인을 확인한다.
- 전체 프레임과 개별 섹션의 좌표를 함께 비교한다.
- 실제 프로젝트의 HTML/CSS 구조와 규칙에 맞게 변환한다.
- 다음 디자인 속성을 세부적으로 확인한다.
    - 내부 콘텐츠 너비
    - 섹션 높이
    - 이미지 비율
    - 카드 간격
    - 버튼 위치
    - 세로 태그 위치
    - 타이포그래피
    - 구분선 위치

## 5. Pretendard 폰트 설정

- 기본 글꼴은 `Pretendard`를 사용한다.
- 웹폰트는 CSS 파일 최상단에서 불러온다.
- 웹폰트를 불러오지 못할 경우를 대비해 시스템 글꼴을 대체 글꼴로 지정한다.

```css
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

body {
    font-family: 'Pretendard', sans-serif;
}
```

## 6. 검수 기준

- 브라우저에서 실제 렌더링하여 Figma와 비교한다.
- 이미지 경로와 누락된 자산을 검사한다.
- 좌우 화살표의 방향을 확인한다.
- 카드 개수와 표시 순서를 확인한다.
- CSS 중괄호와 HTML 닫는 태그를 검사한다.
- UTF-8 한글 깨짐 여부를 확인한다.
- 데스크톱과 반응형 화면에서 가로 스크롤 여부를 확인한다.

## 7. 본문 바로가기

- 키보드 사용자가 반복되는 헤더를 건너뛸 수 있도록 `body` 시작 부분에 본문 바로가기 링크를 제공한다.
- 링크의 `href`와 본문 영역의 `id`가 일치해야 한다.
- 평상시에는 화면 밖에 배치하고 키보드 포커스를 받으면 화면 상단에 표시한다.

```html
<body>
    <p id="skipNav"><a href="#content">본문 바로가기</a></p>

    <div id="wrap"></div>
</body>
```

## 8. 파비콘

- 파비콘 파일은 `images` 폴더 안에서 관리한다.
- `head` 안에서 `link[rel="icon"]`으로 연결한다.
- SVG를 사용할 때는 `type="image/svg+xml"`을 명시한다.
- 파비콘 경로가 실제 파일 위치와 일치하는지 검사한다.

```html
<link rel="icon" href="images/header/logo.svg" type="image/svg+xml" />
```
