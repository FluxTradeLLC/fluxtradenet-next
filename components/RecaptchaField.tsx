"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { isRecaptchaEnabled, RECAPTCHA_SITE_KEY } from "@/lib/recaptcha";

type RecaptchaFieldProps = {
  onChange: (token: string) => void;
  onExpired: () => void;
};

export type RecaptchaFieldHandle = {
  reset: () => void;
};

declare global {
  interface Window {
    grecaptcha?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback": () => void;
          "error-callback": () => void;
        },
      ) => number;
      reset: (widgetId?: number) => void;
    };
    onFluxTradeRecaptchaLoad?: () => void;
  }
}

const RECAPTCHA_SCRIPT_ID = "google-recaptcha-script";

let scriptLoadPromise: Promise<void> | null = null;

function loadRecaptchaScript(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (window.grecaptcha) {
    return Promise.resolve();
  }

  if (scriptLoadPromise) {
    return scriptLoadPromise;
  }

  scriptLoadPromise = new Promise((resolve) => {
    window.onFluxTradeRecaptchaLoad = () => {
      resolve();
    };

    if (!document.getElementById(RECAPTCHA_SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = RECAPTCHA_SCRIPT_ID;
      script.src =
        "https://www.google.com/recaptcha/api.js?onload=onFluxTradeRecaptchaLoad&render=explicit";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  });

  return scriptLoadPromise;
}

export const RecaptchaField = forwardRef<
  RecaptchaFieldHandle,
  RecaptchaFieldProps
>(function RecaptchaField({ onChange, onExpired }, ref) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const onChangeRef = useRef(onChange);
  const onExpiredRef = useRef(onExpired);

  onChangeRef.current = onChange;
  onExpiredRef.current = onExpired;

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (window.grecaptcha && widgetIdRef.current !== null) {
        window.grecaptcha.reset(widgetIdRef.current);
      }
    },
  }));

  useEffect(() => {
    if (!isRecaptchaEnabled) {
      return;
    }

    let cancelled = false;

    void loadRecaptchaScript().then(() => {
      if (
        cancelled ||
        !containerRef.current ||
        !window.grecaptcha ||
        widgetIdRef.current !== null
      ) {
        return;
      }

      widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
        sitekey: RECAPTCHA_SITE_KEY,
        callback: (token: string) => onChangeRef.current(token),
        "expired-callback": () => onExpiredRef.current(),
        "error-callback": () => onExpiredRef.current(),
      });
    });

    return () => {
      cancelled = true;
      widgetIdRef.current = null;
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  if (!isRecaptchaEnabled) {
    return null;
  }

  return <div ref={containerRef} className="flex justify-center" />;
});
