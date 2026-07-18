"use client";

import Link from "next/link";
import { useState } from "react";
import { ContentPageLayout } from "@/components/layout/ContentPageLayout";
import { ApiError, apiFetch } from "@/lib/api";
import {
  contentBodyClass,
  contentCardClass,
  contentInputClass,
  contentLinkClass,
  contentListClass,
  contentSectionHeading,
} from "@/lib/content-ui";
import { s } from "@/lib/strings";

export function SupportContent() {
  const [supportName, setSupportName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [supportSubject, setSupportSubject] = useState("");
  const [supportMessage, setSupportMessage] = useState("");
  const [supportError, setSupportError] = useState("");
  const [supportSuccess, setSupportSuccess] = useState(false);
  const [supportLoading, setSupportLoading] = useState(false);

  const handleSupportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSupportError("");
    setSupportSuccess(false);
    setSupportLoading(true);

    try {
      await apiFetch("/support/send-support-email", {
        method: "POST",
        body: JSON.stringify({
          name: supportName,
          email: supportEmail,
          subject: supportSubject,
          message: supportMessage,
        }),
      });
      setSupportSuccess(true);
      setSupportName("");
      setSupportEmail("");
      setSupportSubject("");
      setSupportMessage("");
      setTimeout(() => setSupportSuccess(false), 5000);
    } catch (err) {
      setSupportError(
        err instanceof ApiError ? err.message : s("support.error"),
      );
    } finally {
      setSupportLoading(false);
    }
  };

  return (
    <ContentPageLayout
      label="Support"
      title={s("support.title")}
      centered={false}
    >
      <p className={contentBodyClass}>
        {s("support.description")}{" "}
        <a href="mailto:grant@fluxtrade.net" className={contentLinkClass}>
          grant@fluxtrade.net
        </a>
        &nbsp;{s("support.orSendMessage")}
      </p>

      <p className={`${contentBodyClass} mt-4 flex flex-wrap items-center gap-3`}>
        {s("support.discordHelp")}
        <a
          href="https://discord.gg/239t9xcrxV"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary px-4 py-2 text-sm"
        >
          <svg className="h-4 w-4 text-flux-green-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
          </svg>
          {s("header.freeDiscord")}
        </a>
      </p>

      <div className={`${contentCardClass} mt-8`}>
        <h2 className={contentSectionHeading}>
          {s("support.additionalResources")}
        </h2>
        <div className="mt-4 space-y-3">
          <p className={contentBodyClass}>{s("support.resourcesDescription")}</p>
          <ul className={contentListClass}>
            <li>
              {s("support.refundInfo")}{" "}
              <Link href="/policies" className={contentLinkClass}>
                {s("footer.refundPolicies")}
              </Link>
            </li>
            <li>
              {s("support.termsInfo")}{" "}
              <Link href="/terms" className={contentLinkClass}>
                {s("footer.terms")}
              </Link>
            </li>
          </ul>
          <p className={`${contentBodyClass} mt-4`}>
            {s("support.stillNeedHelp")}{" "}
            <a href="mailto:grant@fluxtrade.net" className={contentLinkClass}>
              {s("support.emailDirectly")}
            </a>
            .
          </p>
        </div>
      </div>

      <div className={`${contentCardClass} mt-8`}>
        <h2 className={`${contentSectionHeading} text-center`}>
          {s("support.sendMessage")}
        </h2>
        <form onSubmit={handleSupportSubmit} className="mt-6 space-y-4">
          {supportError ? (
            <p className="text-center text-sm text-red-400">{supportError}</p>
          ) : null}
          {supportSuccess ? (
            <p className="text-center text-sm text-flux-green">
              {s("support.success")}
            </p>
          ) : null}
          <input
            type="text"
            placeholder={s("support.yourName")}
            className={contentInputClass}
            value={supportName}
            onChange={(e) => setSupportName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder={s("support.yourEmail")}
            className={contentInputClass}
            value={supportEmail}
            onChange={(e) => setSupportEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder={s("support.subject")}
            className={contentInputClass}
            value={supportSubject}
            onChange={(e) => setSupportSubject(e.target.value)}
            required
          />
          <textarea
            placeholder={s("support.message")}
            rows={6}
            className={`${contentInputClass} resize-none`}
            value={supportMessage}
            onChange={(e) => setSupportMessage(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={supportLoading}
            className="btn-primary w-full py-3 text-sm disabled:cursor-not-allowed disabled:opacity-50"
          >
            {supportLoading ? s("support.sending") : s("support.sendEmail")}
          </button>
        </form>
      </div>
    </ContentPageLayout>
  );
}
