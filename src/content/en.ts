import type { TogaryContent } from "./schema-ext";
import { PROFILE } from "./media";

export const en: TogaryContent = {
  locale: "en",
  dir: "ltr",

  brand: {
    name: "El Togary Auto",
    shortName: "ET",
    tagline: "City Stars Mall, Nasr City",
  },

  nav: [
    { label: "Showroom", href: "#showroom" },
    { label: "Finance desk", href: "#finance" },
    { label: "The mall", href: "#mall" },
  ],

  hero: {
    eyebrow: "Nasr City · Cairo",
    headline: "One phone line for the Ferrari, fourteen for the Skoda",
    sub: "El Togary Auto run two accounts inside one Instagram. Nine of their last twelve posts are English spec sheets for exotics, closed on a single number. The other two are Arabic instalment offers for two Skoda models, closed on fourteen. Flip the badge to move between them — there is no third state, because their own feed doesn't have one either.",
    primaryCta: "Call the showroom",
    secondaryCta: "See both sides",
    badgeAlt: "A coin modelled on El Togary's own circular badge, one face for the English showroom and one for the Arabic finance desk.",
    showroomTab: "Showroom",
    financeTab: "Finance desk",
    followersLabel: "Followers",
    postsLabel: "Posts",
  },

  about: {
    heading: "El Togary Auto",
    body: [
      "A showroom trading from inside City Stars Mall, Nasr City — the only dealership sourced for this series that sits in a shopping centre rather than a forecourt or a standalone building.",
    ],
  },

  services: { heading: "Showroom", items: [] },
  gallery: { heading: "Showroom", items: [] },

  showroom: {
    eyebrow: "The showroom",
    heading: "Eight cars, one line: 01030061000",
    intro: "Every one of these is published in English, several with genuine spec sheets — engine, power, torque, options running past a dozen lines. Three carry marketing copy only, and none of them carry a price.",
    specsLabel: "Published figures",
    optionsLabel: "Options",
    viewPost: "See the post",
    waverunnerNote: "The one post in the record that isn't a car at all.",
    specLabels: {
      exterior: "Exterior",
      interior: "Interior",
      engine: "Engine",
      power: "Power",
      torque: "Torque",
      acceleration: "0–100 km/h",
      topSpeed: "Top speed",
      construction: "Construction",
      transmission: "Transmission",
    },
  },

  finance: {
    eyebrow: "The finance desk",
    heading: "Two Skodas, and a call centre's worth of numbers",
    intro: "Both finance posts are Arabic, both name a deposit before a car, and both close on the same fourteen numbers — a different register entirely from the showroom eight lines above.",
    depositFrom: "Deposit from",
    trimsLabel: "Available in",
    termsLabel: "Their terms",
    linesLabel: "Fourteen lines",
    linesNote: "The showroom's own number closes both finance posts too, given as the general address even here.",
    viewPost: "See the post",
  },

  mall: {
    eyebrow: "The mall",
    heading: "A showroom inside a shopping centre",
    body: [
      "El Togary trade from a unit inside City Stars Mall in Nasr City — a Ferrari and a Porsche parked where the next storefront over might be selling shoes. No other dealership sourced for this series operates from inside a mall rather than a forecourt or a standalone building.",
      "Both finance posts close with the same registered tax number, printed in full: 567-749-533.",
    ],
    taxLabel: "Tax registration",
  },

  contact: {
    heading: "Visit",
    addressLabel: "Address",
    address: PROFILE.address,
    phoneLabel: "Showroom",
    phones: [PROFILE.mainPhone],
    financeLabel: "Finance desk",
    mapsUrl: PROFILE.maps,
    instagramUrl: PROFILE.instagram,
    facebookUrl: PROFILE.facebook,
    cta: "Call the showroom",
  },

  footer: {
    rights: "© El Togary Auto. All rights reserved.",
  },

  a11y: {
    toggleLanguage: "التبديل إلى العربية",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
};
