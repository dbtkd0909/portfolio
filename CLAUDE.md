# VFX Artist Portfolio — Project Plan

## Overview
Next.js 14 (App Router) 기반의 VFX 아티스트 포트폴리오. 어두운 톤의 전문적인 다크 테마를 사용하며, Hero 비디오, CG 작업 그리드, Nuke Python Plugins 코드 카드, 푸터 영역으로 구성된다.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: lucide-react
- **Fonts**: next/font (Inter, JetBrains Mono for code)

## File Structure
```
.
├── app/
│   ├── layout.tsx          # Root layout (다크 테마 적용)
│   ├── page.tsx            # 메인 페이지 (섹션 조합)
│   └── globals.css         # Tailwind base + 전역 스타일
├── components/
│   ├── Hero.tsx            # 배경 영상 + 타이틀
│   ├── PortfolioGrid.tsx   # Life CG 영상 그리드
│   ├── NukePlugins.tsx     # Nuke Python 코드 스니펫 카드
│   └── Footer.tsx          # 이메일/SNS 링크
├── public/
│   ├── videos/             # 비디오 에셋 위치
│   └── thumbnails/         # 썸네일 이미지
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── CLAUDE.md
```

## Design System

### 컬러 팔레트
| 용도 | 토큰 | Hex |
| --- | --- | --- |
| 배경 (Primary) | `bg-neutral-950` | `#0a0a0a` |
| 배경 (Secondary) | `bg-neutral-900` | `#171717` |
| 카드 표면 | `bg-neutral-800/50` | `#262626` (반투명) |
| 텍스트 (Primary) | `text-neutral-100` | `#f5f5f5` |
| 텍스트 (Muted) | `text-neutral-400` | `#a3a3a3` |
| Accent | `text-emerald-400` | `#34d399` |
| Border | `border-neutral-800` | `#262626` |

### Typography
- **Heading**: Inter, font-bold, tracking-tight
- **Body**: Inter, font-normal
- **Code**: JetBrains Mono (Nuke Python 스니펫 전용)

## Page Structure (`app/page.tsx`)

```
┌─────────────────────────────────────┐
│  Hero (100vh)                       │  ← 배경 영상 + 타이틀 오버레이
├─────────────────────────────────────┤
│  Life CG Portfolio (Grid)           │  ← 10초 내외 영상 컷
├─────────────────────────────────────┤
│  Nuke Python Plugins (Code Cards)   │  ← 코드 스니펫 카드
├─────────────────────────────────────┤
│  Footer                             │  ← 이메일, LinkedIn, SNS
└─────────────────────────────────────┘
```

## Section Specs

### 1. Hero (`components/Hero.tsx`)
- `<video>` 태그에 `autoPlay muted loop playsInline` 속성 필수
- `object-cover` + `absolute inset-0` 으로 풀스크린
- 배경 위 어두운 그라디언트 오버레이 (`bg-gradient-to-b from-black/40 to-black/80`)
- 중앙 정렬된 타이틀 + 서브타이틀 + 스크롤 인디케이터(ChevronDown)

### 2. Life CG Portfolio (`components/PortfolioGrid.tsx`)
- 섹션 타이틀: "Life CG Portfolio"
- 카드: 16:9 비율의 비디오 썸네일 + 호버 시 영상 자동재생
- 카드별 메타데이터: 작품명, 사용 툴 태그
- **Grid Breakpoints** (핵심 요구사항):
  - Mobile (`< 768px`): `grid-cols-1`
  - Tablet (`md: 768px+`): `grid-cols-2`
  - Desktop (`lg: 1024px+`): `grid-cols-3`
  - Tailwind 클래스: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`

### 3. Nuke Python Plugins (`components/NukePlugins.tsx`)
- 섹션 타이틀: "Nuke Python Plugins"
- 카드 레이아웃: 좌측 설명 + 우측 코드 스니펫 (`<pre><code>`)
- 코드 카드: `bg-neutral-900` + `border-neutral-800` + `rounded-lg`
- 헤더에 파일명(예: `auto_rotopaint.py`) + 복사 버튼(lucide `Copy` 아이콘)
- **Grid**: Mobile 1열, Desktop 2열 (`grid-cols-1 lg:grid-cols-2`)

### 4. Footer (`components/Footer.tsx`)
- 좌측: 이름/저작권
- 우측: 아이콘 링크 (lucide-react)
  - `Mail` → `mailto:`
  - `Linkedin` → LinkedIn 프로필
  - `Instagram` → Instagram
  - `Youtube` → 쇼릴 채널
- 호버 시 emerald-400 컬러 전환

## Responsive Strategy

| Breakpoint | Width | 그리드 동작 |
| --- | --- | --- |
| Default | `< 768px` | 1열 (`grid-cols-1`) |
| `md` | `≥ 768px` | 2열 (`md:grid-cols-2`) |
| `lg` | `≥ 1024px` | 3열 (`lg:grid-cols-3`) |

> **예외 — Nuke Python Plugins 섹션**: 좌측 설명 + 우측 코드 스니펫 구조의 가독성을 위해 데스크톱에서도 최대 2열(`grid-cols-1 lg:grid-cols-2`)을 유지한다. 위 3열 규칙은 Life CG Portfolio 그리드 등 카드형 미디어 섹션에 한정 적용한다.

- 컨테이너 패딩: `px-4 md:px-8 lg:px-16`
- 섹션 수직 여백: `py-16 md:py-24`
- Hero 타이틀: `text-4xl md:text-6xl lg:text-7xl`
- 모바일에서 영상 자동재생은 데이터 사용을 고려하여 호버 대신 탭 트리거로 전환 검토

## Setup Commands
```bash
npm install
npm run dev          # http://localhost:3000
```

## Next Steps (확장 시)
- [ ] 실제 비디오 에셋 `public/videos/` 추가
- [ ] 작품 데이터를 별도 `data/portfolio.ts` 로 분리
- [ ] 페이지 전환 애니메이션 (Framer Motion)
- [ ] 코드 스니펫 신택스 하이라이팅 (shiki / prism)
- [ ] OG 이미지 및 메타데이터 보강
- [ ] 다국어(KO/EN) 라우팅
