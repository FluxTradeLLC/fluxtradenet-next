import Link from "next/link";
import { ContentPageLayout } from "@/components/layout/ContentPageLayout";
import {
  contentBodyClass,
  contentLinkClass,
  contentListClass,
  contentSectionHeading,
} from "@/lib/content-ui";
import { s } from "@/lib/strings";

export function TermsContent() {
  return (
    <ContentPageLayout
      label="Legal"
      title={s("terms.title")}
      centered={false}
    >
      <div className="space-y-10">
        <p className={`${contentBodyClass} text-lg`}>{s("terms.welcome")}</p>

        <section>
          <h2 className={contentSectionHeading}>{s("terms.refundRequests")}</h2>
          <div className="mt-4 space-y-4">
            <p className={contentBodyClass}>{s("terms.refundDescription")}</p>
            <ul className={contentListClass}>
              <li>
                {s("terms.refundPoint1")}{" "}
                <a href="mailto:grant@fluxtrade.net" className={contentLinkClass}>
                  grant@fluxtrade.net
                </a>
              </li>
              <li>{s("terms.refundPoint2")}</li>
              <li>
                {s("terms.refundPoint3")}{" "}
                <Link href="/policies" className={contentLinkClass}>
                  {s("terms.refundPolicies")}
                </Link>
              </li>
              <li>{s("terms.refundPoint4")}</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className={contentSectionHeading}>
            {s("terms.subscriptionCancellation")}
          </h2>
          <div className="mt-4 space-y-4">
            <p className={contentBodyClass}>{s("terms.cancellationDescription")}</p>
            <p className={contentBodyClass}>{s("terms.cancelDescription")}</p>
            <ol className="ml-4 list-inside list-decimal space-y-2 text-muted">
              <li>
                <Link href="/account" className={contentLinkClass}>
                  {s("terms.cancelStep1")}
                </Link>
              </li>
              <li>
                {s("terms.cancelStep2")}{" "}
                <strong className="text-white">{s("terms.cancelStep2Bold")}</strong>{" "}
                {s("terms.cancelStep2End")}
              </li>
              <li>{s("terms.cancelStep3")}</li>
              <li>{s("terms.cancelStep4")}</li>
            </ol>
            <p className={contentBodyClass}>{s("terms.cancellationNote1")}</p>
            <p className={contentBodyClass}>
              <strong className="text-white">
                {s("terms.cancellationImportant")}
              </strong>{" "}
              {s("terms.cancellationNote2")}
            </p>
          </div>
        </section>

        <section>
          <h2 className={contentSectionHeading}>{s("terms.generalTerms")}</h2>
          <div className="mt-4 space-y-4">
            <p className={contentBodyClass}>{s("terms.generalTermsDescription")}</p>
            <ul className={contentListClass}>
              <li>{s("terms.generalPoint1")}</li>
              <li>{s("terms.generalPoint2")}</li>
              <li>{s("terms.generalPoint3")}</li>
              <li>{s("terms.generalPoint4")}</li>
              <li>{s("terms.generalPoint5")}</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className={contentSectionHeading}>
            {s("terms.serviceAvailability")}
          </h2>
          <p className={`${contentBodyClass} mt-4`}>
            {s("terms.serviceAvailabilityDescription")}
          </p>
        </section>

        <section>
          <h2 className={contentSectionHeading}>
            {s("terms.limitationOfLiability")}
          </h2>
          <p className={`${contentBodyClass} mt-4`}>
            {s("terms.limitationDescription")}
          </p>
        </section>

        <section>
          <h2 className={contentSectionHeading}>{s("terms.changesToTerms")}</h2>
          <p className={`${contentBodyClass} mt-4`}>
            {s("terms.changesDescription")}
          </p>
        </section>

        <section>
          <h2 className={contentSectionHeading}>{s("terms.contactUs")}</h2>
          <p className={`${contentBodyClass} mt-4`}>
            {s("terms.contactDescription")}{" "}
            <a href="mailto:grant@fluxtrade.net" className={contentLinkClass}>
              grant@fluxtrade.net
            </a>
          </p>
        </section>

        <section>
          <h2 className={contentSectionHeading}>{s("terms.needHelp")}</h2>
          <div className="mt-4 space-y-4">
            <p className={contentBodyClass}>{s("terms.helpDescription")}</p>
            <p className={contentBodyClass}>
              {s("terms.visitSupport")}{" "}
              <Link href="/support" className={contentLinkClass}>
                {s("terms.supportPage")}
              </Link>{" "}
              {s("terms.supportPageEnd")}
            </p>
          </div>
        </section>

        <p className="text-sm text-muted/70">{s("terms.lastUpdated")}</p>
      </div>
    </ContentPageLayout>
  );
}
