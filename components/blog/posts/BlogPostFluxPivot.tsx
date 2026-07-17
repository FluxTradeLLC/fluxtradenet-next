import {
  BlogPostShell,
} from "@/components/blog/BlogPostShell";
import content from "@/content/blog/fluxPivot.json";

export function BlogPostFluxPivot() {
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
        href: "/backtests/explorer?strategy=fluxPivotStrat",
      }}
    >
      <h2 className="mt-8 mb-4 text-xl font-bold text-white sm:text-2xl">
                    {t.sections.understandingPivots.heading}
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted">
                    {t.sections.understandingPivots.content}
                  </p>

                  <h2 className="mt-8 mb-4 text-xl font-bold text-white sm:text-2xl">
                    {t.sections.howItWorks.heading}
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted">
                    {t.sections.howItWorks.intro}
                  </p>
                  <ul className="mb-4 list-inside list-disc space-y-2 text-muted">
                    <li>
                      <strong className="text-white">
                        {t.sections.howItWorks.points.dynamicLevel.label}
                      </strong>{" "}
                      {t.sections.howItWorks.points.dynamicLevel.text}
                    </li>
                    <li>
                      <strong className="text-white">
                        {t.sections.howItWorks.points.priceAction.label}
                      </strong>{" "}
                      {t.sections.howItWorks.points.priceAction.text}
                    </li>
                    <li>
                      <strong className="text-white">
                        {t.sections.howItWorks.points.volumeAnalysis.label}
                      </strong>{" "}
                      {t.sections.howItWorks.points.volumeAnalysis.text}
                    </li>
                    <li>
                      <strong className="text-white">
                        {t.sections.howItWorks.points.riskManagement.label}
                      </strong>{" "}
                      {t.sections.howItWorks.points.riskManagement.text}
                    </li>
                  </ul>

                  <h2 className="mt-8 mb-4 text-xl font-bold text-white sm:text-2xl">
                    {t.sections.supportResistance.heading}
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted">
                    {t.sections.supportResistance.content}
                  </p>

                  <h2 className="mt-8 mb-4 text-xl font-bold text-white sm:text-2xl">
                    {t.sections.keyAdvantages.heading}
                  </h2>
                  <ul className="mb-4 list-inside list-disc space-y-2 text-muted">
                    {t.sections.keyAdvantages.points.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>

                  <h2 className="mt-8 mb-4 text-xl font-bold text-white sm:text-2xl">
                    {t.sections.commonMistakes.heading}
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted">
                    {t.sections.commonMistakes.content}
                  </p>
    </BlogPostShell>
  );
}
