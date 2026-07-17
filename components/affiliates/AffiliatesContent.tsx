import { ContentPageLayout } from "@/components/layout/ContentPageLayout";
import {
  contentBodyClass,
  contentCardClass,
  contentInputClass,
  contentLinkClass,
  contentListClass,
  contentSectionHeading,
  contentSubheading,
} from "@/lib/content-ui";
import { s } from "@/lib/strings";

const featureCards = [
  { title: s("affiliates.commission"), description: s("affiliates.commissionDesc"), highlight: true },
  { title: s("affiliates.payouts"), description: s("affiliates.payoutsDesc") },
  { title: s("affiliates.useAssets"), description: s("affiliates.useAssetsDesc") },
  { title: s("affiliates.freeTrial"), description: s("affiliates.freeTrialDesc") },
  { title: s("affiliates.powerfulTools"), description: s("affiliates.powerfulToolsDesc") },
  { title: s("affiliates.growingCommunity"), description: s("affiliates.growingCommunityDesc") },
];

export function AffiliatesContent() {
  return (
    <ContentPageLayout
      label="Affiliates"
      title={s("affiliates.title")}
      description={s("affiliates.subtitle")}
      maxWidth="max-w-5xl"
      centered={false}
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {featureCards.map((card) => (
          <div key={card.title} className={contentCardClass}>
            <p
              className={`mb-2 font-bold ${
                card.highlight
                  ? "text-3xl font-extrabold text-flux-green sm:text-4xl"
                  : "text-xl text-white"
              }`}
            >
              {card.title}
            </p>
            <p className={contentBodyClass}>{card.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <a
          href="https://fluxtrade.promotekit.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary px-8 py-3 text-sm"
        >
          {s("affiliates.joinProgram")}
        </a>
      </div>

      <div className={`${contentCardClass} mt-10 space-y-4`}>
        <h2 className="text-2xl font-bold text-white">
          {s("affiliates.programDetails")}
        </h2>
        <ul className="list-inside list-disc space-y-2 text-muted">
          <li>
            {s("affiliates.commissionLabel")}{" "}
            <span className="font-semibold text-white">
              {s("affiliates.commissionValue")}
            </span>{" "}
            {s("affiliates.commissionFull")}
          </li>
          <li>
            {s("affiliates.payoutTerms")}{" "}
            <span className="font-semibold text-white">
              {s("affiliates.payoutValue")}
            </span>{" "}
            {s("affiliates.payoutMethod")}
          </li>
          <li>{s("affiliates.attribution")}</li>
          <li>
            {s("affiliates.marketingAssets")}
            <a
              className={`ml-1 ${contentLinkClass}`}
              href="https://www.youtube.com/@FluxTradeLLC"
              target="_blank"
              rel="noopener noreferrer"
            >
              @FluxTradeLLC
            </a>
            . {s("affiliates.marketingMaterialsDesc")}{" "}
            <a
              href="https://drive.google.com/drive/folders/1uWxQeNQLEhiq8swh375AQVEkOc_mEn8Z?usp=sharing"
              className={contentLinkClass}
            >
              {s("affiliates.marketingMaterials")}
            </a>{" "}
            {s("affiliates.marketingMaterialsDesc")}
          </li>
          <li>
            {s("affiliates.getStarted")}
            <a
              className={`ml-1 ${contentLinkClass}`}
              href="https://fluxtrade.promotekit.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              fluxtrade.promotekit.com
            </a>
            .
          </li>
          <li>
            {s("affiliates.questions")}{" "}
            <a className={contentLinkClass} href="mailto:grant@fluxtrade.net">
              grant@fluxtrade.net
            </a>
          </li>
        </ul>
      </div>
    </ContentPageLayout>
  );
}
