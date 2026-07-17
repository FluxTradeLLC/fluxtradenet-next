import {
  BlogPostShell,
} from "@/components/blog/BlogPostShell";
import content from "@/content/blog/propFirmDrawdown.json";

export function BlogPostPropFirmDrawdown() {
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
                    {t.sections.drawdownIllusion.heading}
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted">
                    {t.sections.drawdownIllusion.content}
                  </p>

                  <h2 className="mt-8 mb-4 text-xl font-bold text-white sm:text-2xl">
                    {t.sections.dailyDrawdownLimits.heading}
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted">
                    {t.sections.dailyDrawdownLimits.content}
                  </p>

                  <h2 className="mt-8 mb-4 text-xl font-bold text-white sm:text-2xl">
                    {t.sections.trailingDrawdowns.heading}
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted">
                    {t.sections.trailingDrawdowns.content}
                  </p>

                  <h2 className="mt-8 mb-4 text-xl font-bold text-white sm:text-2xl">
                    {t.sections.hiddenRules.heading}
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted">
                    {t.sections.hiddenRules.intro}
                  </p>
                  <ul className="mb-4 list-inside list-disc space-y-2 text-muted">
                    <li>
                      <strong className="text-white">
                        {t.sections.hiddenRules.points.openingBalance.label}
                      </strong>{" "}
                      {t.sections.hiddenRules.points.openingBalance.text}
                    </li>
                    <li>
                      <strong className="text-white">
                        {t.sections.hiddenRules.points.equityVsBalance.label}
                      </strong>{" "}
                      {t.sections.hiddenRules.points.equityVsBalance.text}
                    </li>
                    <li>
                      <strong className="text-white">
                        {t.sections.hiddenRules.points.weekendGaps.label}
                      </strong>{" "}
                      {t.sections.hiddenRules.points.weekendGaps.text}
                    </li>
                    <li>
                      <strong className="text-white">
                        {t.sections.hiddenRules.points.multipleAccounts.label}
                      </strong>{" "}
                      {t.sections.hiddenRules.points.multipleAccounts.text}
                    </li>
                  </ul>

                  <h2 className="mt-8 mb-4 text-xl font-bold text-white sm:text-2xl">
                    {t.sections.whyDesignExists.heading}
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted">
                    {t.sections.whyDesignExists.content}
                  </p>

                  <h2 className="mt-8 mb-4 text-xl font-bold text-white sm:text-2xl">
                    {t.sections.realWorldExample.heading}
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted">
                    {t.sections.realWorldExample.content}
                  </p>

                  <h2 className="mt-8 mb-4 text-xl font-bold text-white sm:text-2xl">
                    {t.sections.howToProtect.heading}
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted">
                    {t.sections.howToProtect.content}
                  </p>
    </BlogPostShell>
  );
}
