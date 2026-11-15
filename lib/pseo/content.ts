import type { TemplateRegionKey } from "@/lib/country-templates";
import { findCountryTemplateHint } from "@/lib/country-templates";
import { formatPseoAirportList, getPseoAirports } from "@/lib/pseo/airports";
import type { PseoDestination, PseoFaqItem } from "@/lib/pseo/types";
import type { Locale } from "@/lib/i18n/config";

export type PseoFaqCopy = {
  worksQ: string;
  worksA: string;
  installQ: string;
  installA: string;
  roamingQ: string;
  roamingA: string;
  vsSimQ: string;
  vsSimA: string;
  dataQ: string;
  dataA: string;
  localQ: string;
};

function fill(template: string, vars: Record<string, string>): string {
  return Object.entries(vars).reduce(
    (out, [key, value]) => out.replaceAll(`{${key}}`, value),
    template,
  );
}

/** Region for internal linking clusters. */
export function getPseoRegion(dest: PseoDestination): TemplateRegionKey {
  const hint = findCountryTemplateHint(dest.slug);
  return hint?.templateKey ?? "europe";
}

/**
 * Build FAQ set for a hub. Seed `faqs` / `faqDataHint` override defaults.
 */
export function getPseoFaqs(
  dest: PseoDestination,
  countryName: string,
  copy: PseoFaqCopy,
  localeCopyHint?: string,
): PseoFaqItem[] {
  if (dest.faqs?.length) return dest.faqs;

  const airports = formatPseoAirportList(dest.slug);
  const airportLabel =
    airports || countryName;
  const primaryAirport = getPseoAirports(dest.slug)[0];
  const vars = {
    country: countryName,
    carrier: dest.primaryCarrier,
    airport: primaryAirport
      ? `${primaryAirport.label} (${primaryAirport.code})`
      : countryName,
    airports: airportLabel,
  };

  const items: PseoFaqItem[] = [
    {
      question: fill(copy.worksQ, vars),
      answer: fill(copy.worksA, vars),
    },
    {
      question: fill(copy.installQ, vars),
      answer: fill(copy.installA, vars),
    },
    {
      question: fill(copy.roamingQ, vars),
      answer: fill(copy.roamingA, vars),
    },
    {
      question: fill(copy.vsSimQ, vars),
      answer: fill(copy.vsSimA, vars),
    },
    {
      question: fill(copy.dataQ, vars),
      answer: fill(copy.dataA, vars),
    },
  ];

  const hint = localeCopyHint?.trim();
  if (hint) {
    items.push({
      question: fill(copy.localQ, vars),
      answer: hint,
    });
  }

  return items;
}

export type PseoClusterLink = {
  href: string;
  /** Dictionary key under pseo.clusters.* */
  labelKey: "beforeYouFly" | "umrahPrep" | "destinations" | "deviceCheck";
};

/** Intent / help clusters that strengthen hubs without new country URLs. */
export function getPseoClusterLinks(
  dest: PseoDestination,
): PseoClusterLink[] {
  const region = getPseoRegion(dest);
  const links: PseoClusterLink[] = [
    { href: "/help/before-you-fly", labelKey: "beforeYouFly" },
    { href: "/#device-checker", labelKey: "deviceCheck" },
    { href: "/destinations", labelKey: "destinations" },
  ];
  if (
    region === "middle-east" ||
    dest.slug === "saudi-arabia" ||
    dest.slug === "egypt" ||
    dest.slug === "turkey"
  ) {
    links.splice(1, 0, {
      href: "/help/umrah-esim-before-you-fly",
      labelKey: "umrahPrep",
    });
  }
  return links;
}

export function pseoFaqCopyFromDict(pseo: {
  faqWorksQ: string;
  faqWorksA: string;
  faqInstallQ: string;
  faqInstallA: string;
  faqRoamingQ: string;
  faqRoamingA: string;
  faqVsSimQ: string;
  faqVsSimA: string;
  faqDataQ: string;
  faqDataA: string;
  faqLocalQ: string;
}): PseoFaqCopy {
  return {
    worksQ: pseo.faqWorksQ,
    worksA: pseo.faqWorksA,
    installQ: pseo.faqInstallQ,
    installA: pseo.faqInstallA,
    roamingQ: pseo.faqRoamingQ,
    roamingA: pseo.faqRoamingA,
    vsSimQ: pseo.faqVsSimQ,
    vsSimA: pseo.faqVsSimA,
    dataQ: pseo.faqDataQ,
    dataA: pseo.faqDataA,
    localQ: pseo.faqLocalQ,
  };
}

export type { Locale };
