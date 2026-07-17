"use client";

import { useEffect, useRef } from "react";

type TwitchEmbedProps = {
  channel: string;
};

export function TwitchEmbed({ channel }: TwitchEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!channel || !container) return;

    container.innerHTML = "";

    const iframe = document.createElement("iframe");
    iframe.src = `https://player.twitch.tv/?channel=${channel}&parent=${window.location.hostname}&muted=false`;
    iframe.allowFullscreen = true;
    iframe.width = "960";
    iframe.height = "540";
    iframe.frameBorder = "0";
    iframe.scrolling = "no";
    iframe.allow = "autoplay; fullscreen";

    container.appendChild(iframe);

    return () => {
      container.innerHTML = "";
    };
  }, [channel]);

  return (
    <div
      ref={containerRef}
      className="mx-auto w-full max-w-[960px] overflow-hidden rounded-lg"
      style={{ aspectRatio: "16 / 9" }}
    />
  );
}
