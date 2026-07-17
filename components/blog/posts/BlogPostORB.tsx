import {
  BlogPostShell,
} from "@/components/blog/BlogPostShell";
import content from "@/content/blog/orb.json";

export function BlogPostORB() {
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
        href: "/backtests/explorer?strategy=orb",
      }}
    >
      <h2 className="mt-8 mb-4 text-xl font-bold text-white sm:text-2xl">
                    {t.sections.whatIsOpeningRange.heading}
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted">
                    {t.sections.whatIsOpeningRange.content}
                  </p>

                  <h2 className="mt-8 mb-4 text-xl font-bold text-white sm:text-2xl">
                    {t.sections.whyMatters.heading}
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted">
                    {t.sections.whyMatters.intro}
                  </p>
                  <ul className="mb-4 list-inside list-disc space-y-2 text-muted">
                    <li>
                      <strong className="text-white">
                        {t.sections.whyMatters.points.highVolatility.label}
                      </strong>{" "}
                      {t.sections.whyMatters.points.highVolatility.text}
                    </li>
                    <li>
                      <strong className="text-white">
                        {t.sections.whyMatters.points.institutionalActivity.label}
                      </strong>{" "}
                      {t.sections.whyMatters.points.institutionalActivity.text}
                    </li>
                    <li>
                      <strong className="text-white">
                        {t.sections.whyMatters.points.priceDiscovery.label}
                      </strong>{" "}
                      {t.sections.whyMatters.points.priceDiscovery.text}
                    </li>
                    <li>
                      <strong className="text-white">{t.sections.whyMatters.points.momentum.label}</strong>{" "}
                      {t.sections.whyMatters.points.momentum.text}
                    </li>
                  </ul>

                  <h2 className="mt-8 mb-4 text-xl font-bold text-white sm:text-2xl">
                    {t.sections.howItWorks.heading}
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted">
                    {t.sections.howItWorks.intro}
                  </p>
                  <ol className="mb-4 list-inside list-decimal space-y-2 text-muted">
                    {t.sections.howItWorks.points.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ol>

                  <h2 className="mt-8 mb-4 text-xl font-bold text-white sm:text-2xl">
                    {t.sections.successFactors.heading}
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted">
                    {t.sections.successFactors.intro}
                  </p>
                  <ul className="mb-4 list-inside list-disc space-y-2 text-muted">
                    <li>
                      <strong className="text-white">
                        {t.sections.successFactors.points.volumeConfirmation.label}
                      </strong>{" "}
                      {t.sections.successFactors.points.volumeConfirmation.text}
                    </li>
                    <li>
                      <strong className="text-white">
                        {t.sections.successFactors.points.clearDirection.label}
                      </strong>{" "}
                      {t.sections.successFactors.points.clearDirection.text}
                    </li>
                    <li>
                      <strong className="text-white">
                        {t.sections.successFactors.points.marketContext.label}
                      </strong>{" "}
                      {t.sections.successFactors.points.marketContext.text}
                    </li>
                    <li>
                      <strong className="text-white">
                        {t.sections.successFactors.points.timeOfBreakout.label}
                      </strong>{" "}
                      {t.sections.successFactors.points.timeOfBreakout.text}
                    </li>
                  </ul>

                  <h2 className="mt-8 mb-4 text-xl font-bold text-white sm:text-2xl">
                    {t.sections.riskManagement.heading}
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted">
                    {t.sections.riskManagement.content}
                  </p>

                  <h2 className="mt-8 mb-4 text-xl font-bold text-white sm:text-2xl">
                    {t.sections.commonMistakes.heading}
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted">
                    {t.sections.commonMistakes.intro}
                  </p>
                  <ul className="mb-4 list-inside list-disc space-y-2 text-muted">
                    {t.sections.commonMistakes.points.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>

                  <h2 className="mt-8 mb-4 text-xl font-bold text-white sm:text-2xl">
                    {t.sections.adaptingToConditions.heading}
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted">
                    {t.sections.adaptingToConditions.content}
                  </p>
    </BlogPostShell>
  );
}
