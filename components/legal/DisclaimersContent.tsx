import { ContentPageLayout } from "@/components/layout/ContentPageLayout";
import { contentBodyClass, contentSectionHeading } from "@/lib/content-ui";
import { s } from "@/lib/strings";

export function DisclaimersContent() {
  return (
    <ContentPageLayout
      label="Legal"
      title={s("footer.disclaimers")}
      centered={false}
    >
      <section>
        <h2 className={contentSectionHeading}>{s("footer.disclaimers")}</h2>
        <div className="mt-4 space-y-6">
          <p className={contentBodyClass}>{s("footer.disclaimer1")}</p>
          <p className={contentBodyClass}>{s("footer.disclaimer2")}</p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className={contentSectionHeading}>
          {s("footer.testimonialDisclosure")}
        </h2>
        <p className={`${contentBodyClass} mt-4`}>{s("landing.winsDisclaimer")}</p>
      </section>

      <section className="mt-10">
        <h2 className={contentSectionHeading}>
          {s("footer.liveTradingRoomDisclosure")}
        </h2>
        <p className={`${contentBodyClass} mt-4`}>{s("streaming.disclaimer")}</p>
      </section>
    </ContentPageLayout>
  );
}
