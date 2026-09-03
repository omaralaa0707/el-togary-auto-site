import type { SiteContent } from "@/i18n/schema";
import { useContent } from "@/i18n/locale-provider";

/**
 * El Togary run two businesses under one badge: an English exotics
 * showroom on a single phone line, and an Arabic Skoda finance desk on
 * fourteen. The shared schema has no vocabulary for either side, or for a
 * showroom that trades from inside a shopping mall rather than a forecourt.
 */
export type TogaryContent = SiteContent & {
  hero: SiteContent["hero"] & {
    badgeAlt: string;
    showroomTab: string;
    financeTab: string;
    followersLabel: string;
    postsLabel: string;
  };
  showroom: {
    eyebrow: string;
    heading: string;
    intro: string;
    specsLabel: string;
    optionsLabel: string;
    viewPost: string;
    waverunnerNote: string;
    specLabels: Record<
      | "exterior"
      | "interior"
      | "engine"
      | "power"
      | "torque"
      | "acceleration"
      | "topSpeed"
      | "construction"
      | "transmission",
      string
    >;
  };
  finance: {
    eyebrow: string;
    heading: string;
    intro: string;
    depositFrom: string;
    trimsLabel: string;
    termsLabel: string;
    linesLabel: string;
    linesNote: string;
    viewPost: string;
  };
  mall: {
    eyebrow: string;
    heading: string;
    body: string[];
    taxLabel: string;
  };
  contact: SiteContent["contact"] & {
    financeLabel: string;
  };
};

export function useTogary() {
  return useContent() as TogaryContent;
}
