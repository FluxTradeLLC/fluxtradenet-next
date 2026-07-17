import {
  BlogPostShell,
} from "@/components/blog/BlogPostShell";
import content from "@/content/blog/cointegratedPairs.json";

export function BlogPostCointegratedPairs() {
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
        href: "/backtests/explorer?strategy=cointegratedPairs",
      }}
    >
      <h2 className="mt-8 mb-4 text-xl font-bold text-white sm:text-2xl">
                    {t.sections.whatIsPairsTrading.heading}
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted">
                    {t.sections.whatIsPairsTrading.content}
                  </p>

                  <h2 className="mt-8 mb-4 text-xl font-bold text-white sm:text-2xl">
                    {t.sections.understandingCointegration.heading}
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted">
                    {t.sections.understandingCointegration.content}
                  </p>

                  <h2 className="mt-8 mb-4 text-xl font-bold text-white sm:text-2xl">
                    {t.sections.whyLessRisky.heading}
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted">
                    {t.sections.whyLessRisky.intro}
                  </p>
                  <ul className="mb-4 list-inside list-disc space-y-2 text-muted">
                    <li>
                      <strong className="text-white">
                        {t.sections.whyLessRisky.points.marketNeutral.label}
                      </strong>{" "}
                      {t.sections.whyLessRisky.points.marketNeutral.text}
                    </li>
                    <li>
                      <strong className="text-white">
                        {t.sections.whyLessRisky.points.reducedVolatility.label}
                      </strong>{" "}
                      {t.sections.whyLessRisky.points.reducedVolatility.text}
                    </li>
                    <li>
                      <strong className="text-white">
                        {t.sections.whyLessRisky.points.lowerCorrelation.label}
                      </strong>{" "}
                      {t.sections.whyLessRisky.points.lowerCorrelation.text}
                    </li>
                    <li>
                      <strong className="text-white">
                        {t.sections.whyLessRisky.points.statisticalEdge.label}
                      </strong>{" "}
                      {t.sections.whyLessRisky.points.statisticalEdge.text}
                    </li>
                  </ul>

                  <h2 className="mt-8 mb-4 text-xl font-bold text-white sm:text-2xl">
                    {t.sections.howToIdentifyPairs.heading}
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted">
                    {t.sections.howToIdentifyPairs.intro}
                  </p>
                  <ul className="mb-4 list-inside list-disc space-y-2 text-muted">
                    {t.sections.howToIdentifyPairs.points.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>

                  <h2 className="mt-8 mb-4 text-xl font-bold text-white sm:text-2xl">
                    {t.sections.tradingProcess.heading}
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted">
                    {t.sections.tradingProcess.intro}
                  </p>
                  <ol className="mb-4 list-inside list-decimal space-y-2 text-muted">
                    {t.sections.tradingProcess.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>

                  <h2 className="mt-8 mb-4 text-xl font-bold text-white sm:text-2xl">
                    {t.sections.commonPairs.heading}
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted">
                    {t.sections.commonPairs.intro}
                  </p>
                  <ul className="mb-4 list-inside list-disc space-y-2 text-muted">
                    {t.sections.commonPairs.pairs.map((pair, index) => (
                      <li key={index}>{pair}</li>
                    ))}
                  </ul>

                  <h2 className="mt-8 mb-4 text-xl font-bold text-white sm:text-2xl">
                    {t.sections.riskManagement.heading}
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted">
                    {t.sections.riskManagement.content}
                  </p>
    </BlogPostShell>
  );
}
