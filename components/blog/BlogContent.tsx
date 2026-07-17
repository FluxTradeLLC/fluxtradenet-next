import Link from "next/link";
import { ContentPageLayout } from "@/components/layout/ContentPageLayout";
import { contentCardClass } from "@/lib/content-ui";
import { s } from "@/lib/strings";

const articles = [
  {
    id: 1,
    title: s("blog.articles.fluxTrident.title"),
    category: s("blog.categories.strategyIntro"),
    excerpt: s("blog.articles.fluxTrident.excerpt"),
    link: "/blog/flux-trident-strategy",
  },
  {
    id: 2,
    title: s("blog.articles.fluxSignal.title"),
    category: s("blog.categories.strategyIntro"),
    excerpt: s("blog.articles.fluxSignal.excerpt"),
    link: "/blog/flux-signal-strategy",
  },
  {
    id: 3,
    title: s("blog.articles.fluxPivot.title"),
    category: s("blog.categories.strategyIntro"),
    excerpt: s("blog.articles.fluxPivot.excerpt"),
    link: "/blog/flux-pivot-strategy",
  },
  {
    id: 4,
    title: s("blog.articles.propFirmHiddenCosts.title"),
    category: s("blog.categories.propFirmPitfalls"),
    excerpt: s("blog.articles.propFirmHiddenCosts.excerpt"),
    link: "/blog/prop-firm-hidden-costs",
  },
  {
    id: 5,
    title: s("blog.articles.propFirmFailure.title"),
    category: s("blog.categories.propFirmPitfalls"),
    excerpt: s("blog.articles.propFirmFailure.excerpt"),
    link: "/blog/prop-firm-failure",
  },
  {
    id: 6,
    title: s("blog.articles.cointegratedPairs.title"),
    category: s("blog.categories.strategyIntro"),
    excerpt: s("blog.articles.cointegratedPairs.excerpt"),
    link: "/blog/cointegrated-pairs-trading",
  },
  {
    id: 7,
    title: s("blog.articles.propFirmDrawdown.title"),
    category: s("blog.categories.propFirmPitfalls"),
    excerpt: s("blog.articles.propFirmDrawdown.excerpt"),
    link: "/blog/prop-firm-drawdown-trap",
  },
  {
    id: 8,
    title: s("blog.articles.orb.title"),
    category: s("blog.categories.strategyIntro"),
    excerpt: s("blog.articles.orb.excerpt"),
    link: "/blog/orb-strategy",
  },
];

export function BlogContent() {
  return (
    <ContentPageLayout
      label="Blog"
      title={s("blog.title")}
      description={s("blog.subtitle")}
      maxWidth="max-w-6xl"
      centered={false}
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {articles.map((article) => (
          <article
            key={article.id}
            className={`${contentCardClass} transition-colors hover:border-flux-green/30`}
          >
            <span className="chip">{article.category}</span>
            <h2 className="mt-4 text-2xl font-bold text-white">
              {article.title}
            </h2>
            <p className="mt-3 leading-relaxed text-muted">{article.excerpt}</p>
            <Link
              href={article.link}
              className="group mt-5 inline-flex items-center font-semibold text-flux-green transition-colors hover:text-flux-green-dim"
            >
              <span>{s("blog.readFullArticle")}</span>
              <svg
                className="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-flux-green/30 bg-flux-green/5 p-8 text-center">
        <h2 className="text-2xl font-bold italic text-white sm:text-3xl">
          {s("blog.readyToStart")}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted">{s("blog.readyDesc")}</p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/backtests/explorer" className="btn-primary px-6 py-3 text-sm">
            {s("blog.viewStrategies")}
          </Link>
          <Link href="/pricing" className="btn-secondary px-6 py-3 text-sm">
            {s("blog.seePricing")}
          </Link>
        </div>
      </div>
    </ContentPageLayout>
  );
}
