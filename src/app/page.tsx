import Image from "next/image";
import { BackgroundGlow } from "@/components/background-glow";
import { LucideIcon } from "@/components/lucide-icon";
import { MdxContent } from "@/components/mdx-content";
import {
  educationAndAwards,
  experiences,
  projects,
  socialLinks,
} from "@/data/portfolio";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <BackgroundGlow />

      {/* Hero Section */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6">
        <div className="flex flex-col items-center gap-8 text-center">
          {/* 프로필 이미지 */}
          <div className="relative h-40 w-40 overflow-hidden rounded-full border-2 border-white/10 shadow-2xl shadow-blue-500/10">
            <Image
              src="/profile.jpg"
              alt="ProfileImage"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* 이름 및 부제 */}
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              - 조서현 -
            </h1>
            <p className="text-lg text-foreground/60">
              시스템 밑바닥부터 웹 프론트까지
            </p>
          </div>

          {/* 자기소개 */}
          <div className="flex flex-col gap-3 max-w-3xl text-base leading-relaxed text-foreground/70 sm:text-lg">
            <p>
              저는 중학생 때 처음 파이썬을 접한 이후 지금까지, 세상의 문제를
              해결할 수 있는 프로그램을 개발해 왔습니다.
            </p>
            <p>
              제가 개발한 프로그램으로 사람들이 도움받을 때 느끼는 기쁨은 제가
              개발자로 사는 원동력입니다. 알고리즘 문제 해결과 웹 개발,
              소프트웨어 개발에 관심이 많습니다.
            </p>
          </div>

          {/* 외부 링크 */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                aria-label={link.label}
                className="group flex items-center gap-3"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all group-hover:border-white/25 group-hover:bg-white/10">
                  <LucideIcon
                    name={link.icon}
                    className="h-5 w-5 text-foreground/60 transition-colors group-hover:text-foreground"
                  />
                </div>
                <span className="text-sm text-foreground/60 transition-colors group-hover:text-foreground">
                  {link.label}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* 스크롤 인디케이터 */}
        <div className="absolute bottom-10 flex flex-col items-center gap-2 text-foreground/30">
          <LucideIcon name="ArrowDown" className="h-4 w-4 animate-bounce" />
        </div>
      </section>

      {/* 경험 섹션 */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 py-12">
        <h2 className="mb-8 text-2xl font-bold tracking-tight">경험</h2>
        <div className="space-y-10">
          {experiences.map((exp) => (
            <div
              key={exp.company}
              className="grid gap-1 sm:grid-cols-[180px_1fr]"
            >
              <span className="text-base text-foreground/40">{exp.period}</span>
              <div>
                <h3 className="text-lg font-semibold">{exp.company}</h3>
                <p className="text-base text-foreground/60">{exp.role}</p>
                <MdxContent source={exp.description} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 프로젝트 섹션 */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 py-12">
        <h2 className="mb-8 text-2xl font-bold tracking-tight">프로젝트</h2>
        <div className="space-y-10">
          {projects.map((proj) => (
            <div
              key={proj.title}
              className="grid gap-1 sm:grid-cols-[180px_1fr]"
            >
              <span className="text-base text-foreground/40">
                {proj.period}
              </span>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold">{proj.title}</h3>
                  {proj.links?.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={link.label}
                      className="text-foreground/40 transition-colors hover:text-foreground/70"
                    >
                      <LucideIcon name={link.icon} className="h-4 w-4" />
                    </a>
                  ))}
                </div>
                <div className="mt-1 flex items-center gap-3">
                  <span className="text-base text-foreground/40">
                    {proj.tech}
                  </span>
                  {proj.stats && (
                    <span className="flex items-center gap-1 text-base text-foreground/40">
                      <LucideIcon
                        name={proj.stats.type === "stars" ? "Star" : "Download"}
                        className="h-4 w-4"
                      />
                      {proj.stats.count.toLocaleString()}
                    </span>
                  )}
                </div>
                <MdxContent source={proj.description} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 학력 및 수상경력 섹션 */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 py-12">
        <h2 className="mb-8 text-2xl font-bold tracking-tight">
          학력 및 수상경력
        </h2>
        <div className="space-y-8">
          {educationAndAwards.map((item) => (
            <div
              key={item.title}
              className="grid gap-1 sm:grid-cols-[180px_1fr]"
            >
              <span className="text-base text-foreground/40">
                {item.period}
              </span>
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-base text-foreground/50">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
