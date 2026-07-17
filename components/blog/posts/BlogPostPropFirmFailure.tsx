import {
  BlogPostShell,
} from "@/components/blog/BlogPostShell";
import content from "@/content/blog/propFirmFailure.json";

export function BlogPostPropFirmFailure() {
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
        href: "/backtests/explorer",
      }}
    >
      <h2 className="mt-8 mb-4 text-xl font-bold text-white sm:text-2xl">
                    {t.sections.shockingFailureRate.heading}
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted">
                    {t.sections.shockingFailureRate.content}
                  </p>

                  <h2 className="mt-8 mb-4 text-xl font-bold text-white sm:text-2xl">
                    {t.sections.psychologicalTraps.heading}
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted">
                    {t.sections.psychologicalTraps.intro}
                  </p>
                  <ul className="mb-4 list-inside list-disc space-y-2 text-muted">
                    <li>
                      <strong className="text-white">
                        {t.sections.psychologicalTraps.points.timePressure.label}
                      </strong>{" "}
                      {t.sections.psychologicalTraps.points.timePressure.text}
                    </li>
                    <li>
                      <strong className="text-white">
                        {t.sections.psychologicalTraps.points.fearOfFailure.label}
                      </strong>{" "}
                      {t.sections.psychologicalTraps.points.fearOfFailure.text}
                    </li>
                    <li>
                      <strong className="text-white">
                        {t.sections.psychologicalTraps.points.overtrading.label}
                      </strong>{" "}
                      {t.sections.psychologicalTraps.points.overtrading.text}
                    </li>
                    <li>
                      <strong className="text-white">
                        {t.sections.psychologicalTraps.points.revengeTrading.label}
                      </strong>{" "}
                      {t.sections.psychologicalTraps.points.revengeTrading.text}
                    </li>
                  </ul>

                  <h2 className="mt-8 mb-4 text-xl font-bold text-white sm:text-2xl">
                    {t.sections.riskManagementMistakes.heading}
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted">
                    {t.sections.riskManagementMistakes.intro}
                  </p>
                  <ul className="mb-4 list-inside list-disc space-y-2 text-muted">
                    <li>
                      <strong className="text-white">
                        {
                          t.sections.riskManagementMistakes.points.dailyLossLimits
                            .label
                        }
                      </strong>{" "}
                      {t.sections.riskManagementMistakes.points.dailyLossLimits.text}
                    </li>
                    <li>
                      <strong className="text-white">
                        {
                          t.sections.riskManagementMistakes.points.trailingDrawdowns
                            .label
                        }
                      </strong>{" "}
                      {
                        t.sections.riskManagementMistakes.points.trailingDrawdowns
                          .text
                      }
                    </li>
                    <li>
                      <strong className="text-white">
                        {
                          t.sections.riskManagementMistakes.points
                            .profitTargetPressure.label
                        }
                      </strong>{" "}
                      {
                        t.sections.riskManagementMistakes.points.profitTargetPressure
                          .text
                      }
                    </li>
                    <li>
                      <strong className="text-white">
                        {t.sections.riskManagementMistakes.points.noFlexibility.label}
                      </strong>{" "}
                      {t.sections.riskManagementMistakes.points.noFlexibility.text}
                    </li>
                  </ul>

                  <h2 className="mt-8 mb-4 text-xl font-bold text-white sm:text-2xl">
                    {t.sections.strategyFlaws.heading}
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted">
                    {t.sections.strategyFlaws.intro}
                  </p>
                  <ul className="mb-4 list-inside list-disc space-y-2 text-muted">
                    <li>{t.sections.strategyFlaws.points.untestedMethods}</li>
                    <li>{t.sections.strategyFlaws.points.indicators}</li>
                    <li>{t.sections.strategyFlaws.points.conditionalStrategies}</li>
                    <li>{t.sections.strategyFlaws.points.noClearRules}</li>
                  </ul>

                  <h2 className="mt-8 mb-4 text-xl font-bold text-white sm:text-2xl">
                    {t.sections.howToAvoidFailure.heading}
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted">
                    {t.sections.howToAvoidFailure.intro}
                  </p>
                  <ul className="mb-4 list-inside list-disc space-y-2 text-muted">
                    <li>
                      {t.sections.howToAvoidFailure.points.realisticExpectations}
                    </li>
                    <li>{t.sections.howToAvoidFailure.points.clearCriteria}</li>
                    <li>
                      {t.sections.howToAvoidFailure.points.provenRiskManagement}
                    </li>
                    <li>{t.sections.howToAvoidFailure.points.confidence}</li>
                  </ul>

                  <h2 className="mt-8 mb-4 text-xl font-bold text-white sm:text-2xl">
                    {t.sections.backtestAdvantage.heading}
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted">
                    {t.sections.backtestAdvantage.content}
                  </p>
    </BlogPostShell>
  );
}
