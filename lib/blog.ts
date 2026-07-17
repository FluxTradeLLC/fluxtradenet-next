import type { ComponentType } from "react";
import { BlogPostCointegratedPairs } from "@/components/blog/posts/BlogPostCointegratedPairs";
import { BlogPostFluxPivot } from "@/components/blog/posts/BlogPostFluxPivot";
import { BlogPostFluxSignal } from "@/components/blog/posts/BlogPostFluxSignal";
import { BlogPostFluxTrident } from "@/components/blog/posts/BlogPostFluxTrident";
import { BlogPostORB } from "@/components/blog/posts/BlogPostORB";
import { BlogPostPropFirmDrawdown } from "@/components/blog/posts/BlogPostPropFirmDrawdown";
import { BlogPostPropFirmFailure } from "@/components/blog/posts/BlogPostPropFirmFailure";
import { BlogPostPropFirmHiddenCosts } from "@/components/blog/posts/BlogPostPropFirmHiddenCosts";
import cointegratedPairs from "@/content/blog/cointegratedPairs.json";
import fluxPivot from "@/content/blog/fluxPivot.json";
import fluxSignal from "@/content/blog/fluxSignal.json";
import fluxTrident from "@/content/blog/fluxTrident.json";
import orb from "@/content/blog/orb.json";
import propFirmDrawdown from "@/content/blog/propFirmDrawdown.json";
import propFirmFailure from "@/content/blog/propFirmFailure.json";
import propFirmHiddenCosts from "@/content/blog/propFirmHiddenCosts.json";

type BlogSeo = {
  title: string;
  description: string;
  keywords: string;
};

export type BlogPostEntry = {
  slug: string;
  seo: BlogSeo;
  component: ComponentType;
};

export const blogPosts: BlogPostEntry[] = [
  {
    slug: "flux-trident-strategy",
    seo: fluxTrident.seo,
    component: BlogPostFluxTrident,
  },
  {
    slug: "flux-signal-strategy",
    seo: fluxSignal.seo,
    component: BlogPostFluxSignal,
  },
  {
    slug: "flux-pivot-strategy",
    seo: fluxPivot.seo,
    component: BlogPostFluxPivot,
  },
  {
    slug: "prop-firm-hidden-costs",
    seo: propFirmHiddenCosts.seo,
    component: BlogPostPropFirmHiddenCosts,
  },
  {
    slug: "prop-firm-failure",
    seo: propFirmFailure.seo,
    component: BlogPostPropFirmFailure,
  },
  {
    slug: "cointegrated-pairs-trading",
    seo: cointegratedPairs.seo,
    component: BlogPostCointegratedPairs,
  },
  {
    slug: "prop-firm-drawdown-trap",
    seo: propFirmDrawdown.seo,
    component: BlogPostPropFirmDrawdown,
  },
  {
    slug: "orb-strategy",
    seo: orb.seo,
    component: BlogPostORB,
  },
];

const blogPostsBySlug = Object.fromEntries(
  blogPosts.map((post) => [post.slug, post]),
) as Record<string, BlogPostEntry>;

export function getBlogPost(slug: string) {
  return blogPostsBySlug[slug];
}
