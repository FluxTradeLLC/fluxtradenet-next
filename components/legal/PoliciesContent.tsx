import Link from "next/link";
import { ContentPageLayout } from "@/components/layout/ContentPageLayout";
import {
  contentBodyClass,
  contentLinkClass,
  contentSectionHeading,
} from "@/lib/content-ui";
import { s } from "@/lib/strings";

export function PoliciesContent() {
  return (
    <ContentPageLayout
      label="Legal"
      title={s("policy.title")}
      centered={false}
    >
      <section>
        <h2 className={contentSectionHeading}>{s("policy.refundPolicy")}</h2>
        <p className={`${contentBodyClass} mt-4 mb-6`}>
          {s("policy.refundDescription")}
        </p>
        <div className="space-y-4">
          <p className={contentBodyClass}>- {s("policy.refundPoint1")}</p>
          <p className={contentBodyClass}>- {s("policy.refundPoint2")}</p>
          <p className={contentBodyClass}>
            - {s("policy.refundPoint3")}{" "}
            <a href="mailto:grant@fluxtrade.net" className={contentLinkClass}>
              {s("policy.refundPoint3Support")}
            </a>{" "}
            {s("policy.refundPoint3Details")}
          </p>
          <p className={contentBodyClass}>- {s("policy.refundPoint4")}</p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className={contentSectionHeading}>
          {s("policy.cancellationPolicy")}
        </h2>
        <div className="mt-4 space-y-4">
          <p className={contentBodyClass}>{s("policy.cancellationDescription")}</p>
          <ol className="ml-4 list-inside list-decimal space-y-3 text-muted">
            <li>
              <Link href="/account" className={contentLinkClass}>
                {s("policy.cancelStep1")}
              </Link>
            </li>
            <li>
              {s("policy.cancelStep2")}{" "}
              <strong className="text-white">{s("policy.cancelStep2Bold")}</strong>{" "}
              {s("policy.cancelStep2End")}
            </li>
            <li>{s("policy.cancelStep3")}</li>
            <li>{s("policy.cancelStep4")}</li>
          </ol>
          <p className={contentBodyClass}>{s("policy.cancellationNote")}</p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className={contentSectionHeading}>{s("policy.needHelp")}</h2>
        <div className="mt-4 space-y-4">
          <p className={contentBodyClass}>{s("policy.helpDescription")}</p>
          <p className={contentBodyClass}>
            {s("policy.visitSupport")}{" "}
            <Link href="/support" className={contentLinkClass}>
              {s("policy.supportPage")}
            </Link>{" "}
            {s("policy.supportPageEnd")}
          </p>
        </div>
      </section>

      <p className="mt-10 text-sm text-muted/70">{s("policy.lastUpdated")}</p>
    </ContentPageLayout>
  );
}
