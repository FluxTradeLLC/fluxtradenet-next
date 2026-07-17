import {
  BlogPostShell,
} from "@/components/blog/BlogPostShell";
import content from "@/content/blog/propFirmHiddenCosts.json";

export function BlogPostPropFirmHiddenCosts() {
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
        href: "/pricing",
      }}
    >
      <h2 className="mt-8 mb-4 text-xl font-bold text-white sm:text-2xl">
                    {t.sections.challengeFeeTrap.heading}
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted">
                    {t.sections.challengeFeeTrap.content}
                  </p>

                  <h2 className="mt-8 mb-4 text-xl font-bold text-white sm:text-2xl">
                    {t.sections.hiddenFees.heading}
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted">
                    {t.sections.hiddenFees.intro}
                  </p>
                  <ul className="mb-4 list-inside list-disc space-y-2 text-muted">
                    <li>
                      <strong className="text-white">
                        {t.sections.hiddenFees.points.platformFees.label}
                      </strong>{" "}
                      {t.sections.hiddenFees.points.platformFees.text}
                    </li>
                    <li>
                      <strong className="text-white">{t.sections.hiddenFees.points.dataFees.label}</strong>{" "}
                      {t.sections.hiddenFees.points.dataFees.text}
                    </li>
                    <li>
                      <strong className="text-white">
                        {t.sections.hiddenFees.points.withdrawalFees.label}
                      </strong>{" "}
                      {t.sections.hiddenFees.points.withdrawalFees.text}
                    </li>
                    <li>
                      <strong className="text-white">
                        {t.sections.hiddenFees.points.inactivityFees.label}
                      </strong>{" "}
                      {t.sections.hiddenFees.points.inactivityFees.text}
                    </li>
                    <li>
                      <strong className="text-white">
                        {t.sections.hiddenFees.points.accountMaintenance.label}
                      </strong>{" "}
                      {t.sections.hiddenFees.points.accountMaintenance.text}
                    </li>
                  </ul>

                  <h2 className="mt-8 mb-4 text-xl font-bold text-white sm:text-2xl">
                    {t.sections.profitSplitReality.heading}
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted">
                    {t.sections.profitSplitReality.content}
                  </p>

                  <h2 className="mt-8 mb-4 text-xl font-bold text-white sm:text-2xl">
                    {t.sections.unrealisticProfitTargets.heading}
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted">
                    {t.sections.unrealisticProfitTargets.content}
                  </p>

                  <h2 className="mt-8 mb-4 text-xl font-bold text-white sm:text-2xl">
                    {t.sections.trueCostCalculation.heading}
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted">
                    {t.sections.trueCostCalculation.content}
                  </p>

                  <h2 className="mt-8 mb-4 text-xl font-bold text-white sm:text-2xl">
                    {t.sections.betterAlternatives.heading}
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted">
                    {t.sections.betterAlternatives.content}
                  </p>
    </BlogPostShell>
  );
}
