import type { ReactNode } from "react";

export function PageHero({
  tag,
  title,
  accent,
  description,
  children,
}: {
  tag: string;
  title: string;
  accent: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="max-w-[720px]">
        <div className="section-tag">{tag}</div>
        <h1 className="section-title">
          {title}
          <br />
          <span className="serif-italic text-[var(--theme-accent)]">{accent}</span>
        </h1>
        <p className="section-desc">{description}</p>
        {children}
      </div>
    </section>
  );
}

export function SectionIntro({
  tag,
  title,
  accent,
  description,
}: {
  tag: string;
  title: string;
  accent: string;
  description?: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-[680px] text-center">
      <div className="section-tag mx-auto">{tag}</div>
      <h2 className="section-title">
        {title}
        <br />
        <span className="serif-italic text-[var(--theme-accent)]">{accent}</span>
      </h2>
      {description ? <p className="section-desc mx-auto">{description}</p> : null}
    </div>
  );
}
