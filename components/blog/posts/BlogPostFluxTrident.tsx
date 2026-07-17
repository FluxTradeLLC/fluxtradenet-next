import {
  BlogPostShell,
} from "@/components/blog/BlogPostShell";
import content from "@/content/blog/fluxTrident.json";

export function BlogPostFluxTrident() {
  const t = content;

  return (
    <BlogPostShell
      backToBlog={t.backToBlog}
      category={t.category}
      title={t.title}
      subtitle={t.subtitle}
      cta={{
        heading: t.cta.heading,
        description: t.cta.description,
        button: t.cta.button,
        href: "/backtests/explorer?strategy=fluxTrident",
      }}
    >
      <h2 className="mt-8 mb-4 text-xl font-bold text-white sm:text-2xl">
                    {t.sections.whatIsFluxTrident.heading}
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted">
                    {t.sections.whatIsFluxTrident.content}
                  </p>

                  <h2 className="mt-8 mb-4 text-xl font-bold text-white sm:text-2xl">
                    {t.sections.coreComponents.heading}
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted">
                    {t.sections.coreComponents.intro}
                  </p>
                  <ul className="mb-4 list-inside list-disc space-y-2 text-muted">
                    {t.sections.coreComponents.points.map((point, index) => (
                      <li key={index}>
                        <strong className="text-white">{point.label}</strong> {point.text}
                      </li>
                    ))}
                  </ul>

                  <h2 className="mt-8 mb-4 text-xl font-bold text-white sm:text-2xl">
                    {t.sections.whyItWorks.heading}
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted">
                    {t.sections.whyItWorks.content}
                  </p>

                  <h2 className="mt-8 mb-4 text-xl font-bold text-white sm:text-2xl">
                    {t.sections.keyAdvantages.heading}
                  </h2>
                  <ul className="mb-4 list-inside list-disc space-y-2 text-muted">
                    {t.sections.keyAdvantages.points.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
    </BlogPostShell>
  );
}
