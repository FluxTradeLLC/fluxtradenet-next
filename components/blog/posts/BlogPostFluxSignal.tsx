import {
  BlogPostShell,
} from "@/components/blog/BlogPostShell";
import content from "@/content/blog/fluxSignal.json";

export function BlogPostFluxSignal() {
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
        href: "/backtests/explorer?strategy=fluxSignalStrat",
      }}
    >
      <h2 className="mt-8 mb-4 text-xl font-bold text-white sm:text-2xl">
                    {t.sections.foundation.heading}
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted">
                    {t.sections.foundation.content}
                  </p>

                  <h2 className="mt-8 mb-4 text-xl font-bold text-white sm:text-2xl">
                    {t.sections.howItIdentifies.heading}
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted">
                    {t.sections.howItIdentifies.intro}
                  </p>
                  <ul className="mb-4 list-inside list-disc space-y-2 text-muted">
                    <li>
                      <strong className="text-white">
                        {t.sections.howItIdentifies.points.earlyReversal.label}
                      </strong>{" "}
                      {t.sections.howItIdentifies.points.earlyReversal.text}
                    </li>
                    <li>
                      <strong className="text-white">
                        {t.sections.howItIdentifies.points.continuation.label}
                      </strong>{" "}
                      {t.sections.howItIdentifies.points.continuation.text}
                    </li>
                    <li>
                      <strong className="text-white">
                        {t.sections.howItIdentifies.points.momentum.label}
                      </strong>{" "}
                      {t.sections.howItIdentifies.points.momentum.text}
                    </li>
                    <li>
                      <strong className="text-white">
                        {t.sections.howItIdentifies.points.volume.label}
                      </strong>{" "}
                      {t.sections.howItIdentifies.points.volume.text}
                    </li>
                  </ul>

                  <h2 className="mt-8 mb-4 text-xl font-bold text-white sm:text-2xl">
                    {t.sections.entryCriteria.heading}
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted">
                    {t.sections.entryCriteria.intro}
                  </p>
                  <ul className="mb-4 list-inside list-disc space-y-2 text-muted">
                    {t.sections.entryCriteria.points.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>

                  <h2 className="mt-8 mb-4 text-xl font-bold text-white sm:text-2xl">
                    {t.sections.earlyDetection.heading}
                  </h2>
                  <p className="mb-4 leading-relaxed text-muted">
                    {t.sections.earlyDetection.content}
                  </p>
    </BlogPostShell>
  );
}
