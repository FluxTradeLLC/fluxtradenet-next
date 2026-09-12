import Image from "next/image";
import { CopyableBlurb } from "@/components/affiliates/CopyableBlurb";
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

const brandLogos = [
  {
    file: "/icons/fluxtrade_dark_transparent.png",
    name: s("affiliates.logoDarkTransparentName"),
    description: s("affiliates.logoDarkTransparentDesc"),
    previewClass: "bg-black",
  },
  {
    file: "/icons/fluxtrade_light_transparent.png",
    name: s("affiliates.logoLightTransparentName"),
    description: s("affiliates.logoLightTransparentDesc"),
    previewClass: "bg-white",
  },
  {
    file: "/icons/fluxtrade_dark_bg.png",
    name: s("affiliates.logoDarkBgName"),
    description: s("affiliates.logoDarkBgDesc"),
    previewClass: "bg-black",
  },
  {
    file: "/icons/fluxtrade_light_bg.png",
    name: s("affiliates.logoLightBgName"),
    description: s("affiliates.logoLightBgDesc"),
    previewClass: "bg-white",
  },
];

const featureCards = [
  { title: s("affiliates.commission"), description: s("affiliates.commissionDesc"), highlight: true },
  { title: s("affiliates.payouts"), description: s("affiliates.payoutsDesc") },
  { title: s("affiliates.useAssets"), description: s("affiliates.useAssetsDesc") },
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

      <div className={`${contentCardClass} mt-10 space-y-4`}>
        <h2 className="text-2xl font-bold text-white">
          {s("affiliates.copyBlurbHeading")}
        </h2>
        <p className={contentBodyClass}>{s("affiliates.copyBlurbIntro")}</p>
        <CopyableBlurb
          label={s("affiliates.copyBlurbShortLabel")}
          text={s("affiliates.copyBlurbShort")}
        />
        <CopyableBlurb
          label={s("affiliates.copyBlurbLongLabel")}
          text={s("affiliates.copyBlurbLong")}
        />
      </div>

      <div className={`${contentCardClass} mt-10 space-y-4`}>
        <h2 className="text-2xl font-bold text-white">
          {s("affiliates.brandAssetsHeading")}
        </h2>
        <p className={contentBodyClass}>{s("affiliates.brandAssetsIntro")}</p>
        <div className="grid grid-cols-1 gap-6 pt-2 sm:grid-cols-2 lg:grid-cols-4">
          {brandLogos.map((logo) => (
            <div
              key={logo.file}
              className="flex flex-col rounded-xl border border-border bg-surface p-4 text-center"
            >
              <div
                className={`flex h-28 items-center justify-center rounded-lg ${logo.previewClass}`}
              >
                <Image
                  src={logo.file}
                  alt={`FluxTrade logo — ${logo.name}`}
                  width={160}
                  height={160}
                  className="h-20 w-20 object-contain"
                />
              </div>
              <p className="mt-3 text-sm font-semibold text-white">{logo.name}</p>
              <p className="mt-1 mb-4 text-xs text-muted">{logo.description}</p>
              <a
                href={logo.file}
                download
                className="btn-secondary mt-auto w-full py-2 text-xs"
              >
                {s("affiliates.brandAssetsDownload")}
              </a>
            </div>
          ))}
        </div>
      </div>
    </ContentPageLayout>
  );
}
