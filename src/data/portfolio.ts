export const socialLinks = [
  {
    href: "mailto:csh1668@gmail.com",
    icon: "Mail",
    label: "Email",
  },
  {
    href: "https://github.com/csh1668",
    icon: "Github",
    label: "GitHub",
  },
  {
    href: "https://linkedin.com/in/seohyeon-cho",
    icon: "Linkedin",
    label: "LinkedIn",
  },
  {
    href: "https://velog.io/@tjgus1668/posts",
    icon: "Newspaper",
    label: "Velog",
  },
  // TODO: Resume 업로드하기
  // {
  //   href: "/resume.pdf",
  //   icon: "FileText",
  //   label: "Resume",
  // },
] as const;

export const experiences = [
  {
    period: "2025.06 — 현재",
    company: "그린다에이아이",
    role: "풀스택 개발자",
    description: `
- Next.js, Vite, Elysia.js 기반 웹 어플리케이션 개발
- 개발 초기 기술 선택부터 배포까지 모든 과정 경험
- 6개월 이상 개발되던 핵심 비지니스 기능이 만족스럽지 못했던 이유를 찾고, 문제점과 해결방법을 찾아서 COO와 상의 후 기능 개발.
    `,
  },
];

export const projects = [
  {
    period: "2024.06 — 유지보수 중",
    title: "자동 번역 모드 (AutoTranslation)",
    tech: "C# / Unity",
    description: `
- 게임 '림월드'의 미번역 컨텐츠를 자동으로 추출하여 번역기를 이용하여 사용자 언어로 번역하는 모드
  - 구글 번역이나 DeepL 등의 전통 번역기 지원
  - ChatGPT, Gemini, Claude 뿐만 아니라 로컬 LLM 엔드포인트도 지원
- 사용자는 번역이 완료되는 것을 기다릴 필요 없이, 게임을 플레이하며 실시간으로 번역이 적용되는 과정을 경험할 수 있음
- 모드 설정 내 번역 편집기를 이용하여 번역 텍스트를 직접 수정할 수 있음
    `,
    stats: { type: "downloads" as "stars" | "downloads", count: 56000 },
    links: [
      {
        href: "https://github.com/csh1668/AutoTranslation",
        icon: "Github" as const,
        label: "GitHub",
      },
      {
        href: "https://steamcommunity.com/sharedfiles/filedetails/?l=koreana&id=3278005460",
        icon: "Globe" as const,
        label: "Demo",
      },
    ],
  },
];

export const educationAndAwards = [
  {
    period: "2021.03 — 2027.02 (예정)",
    title: "충남대학교 컴퓨터융합학부",
    detail: "학점 4.13 / 4.5",
  },
  {
    period: "2025.11",
    title: "ICPC Seoul Regional",
    detail: "본선 진출 (61등)",
  },
  {
    period: "202X.06, 202X.11",
    title: "충남대학교 알고리즘 경진대회 - DevDay",
    detail: "매 학기 열리는 교내 프로그래밍 대회. 대상 2번 수상",
  },
];
