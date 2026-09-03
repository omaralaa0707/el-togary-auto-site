/**
 * El Togary Auto publish in two registers that barely touch. Nine of their
 * last twelve posts are English spec sheets for exotics and near-exotics —
 * a Ferrari Roma, a Porsche 718 Cayman, a Jaguar F-Type, options lists
 * running to a dozen lines — closed with a single phone number. The other
 * two are Arabic instalment posts for two Skoda models, closed with
 * fourteen. Both kinds share one line at the very foot of the finance
 * posts: the showroom's own number, given as the general address even
 * there.
 *
 * The showroom is a unit inside City Stars Mall, Nasr City — the only
 * dealership in this series that trades from inside a shopping centre
 * rather than a forecourt or a standalone building.
 */

export type ShowroomId =
  | "c180"
  | "ftype"
  | "cayman"
  | "roma"
  | "evoque"
  | "408"
  | "cayenne"
  | "xc90";

export type ShowroomCar = {
  id: ShowroomId;
  marque: string;
  model: string;
  year: string;
  condition: "Brand new" | "Pre-owned";
  /** Their own colour or trim line, verbatim. */
  billing?: string;
  /** Figures they published, verbatim, in their order. Empty = marketing
   *  copy only, no specification given. */
  figures: { label: string; value: string }[];
  /** Equipment/options, verbatim, capped to what they actually listed. */
  options: string[];
  frames: string[];
  postUrl: string;
};

const post = (code: string) => `https://www.instagram.com/p/${code}/`;
const f = (s: string, n = 3) => Array.from({ length: n }, (_, i) => `/media/${s}-${i + 1}.jpg`);

/** Newest first, as posted. */
export const SHOWROOM: ShowroomCar[] = [
  {
    id: "c180",
    marque: "Mercedes-Benz",
    model: "C180",
    year: "2023",
    condition: "Brand new",
    billing: "Fully loaded",
    figures: [],
    options: [
      "Apple CarPlay & Android Auto",
      "Active Parking Assist",
      "Active Distance Assist DISTRONIC",
      "Active Lane Keeping Assist",
      "Automatic panoramic sliding sunroof",
      "Head-up display",
      "360° camera",
      "THERMOTRONIC climate control",
      "LED high-performance headlamps",
      "AMG styling — front spoiler, side skirts",
      "Premium sound system",
      "Heated front seats",
    ],
    frames: f("c180"),
    postUrl: post("Cy8eBYVtMPJ"),
  },
  {
    id: "ftype",
    marque: "Jaguar",
    model: "F-Type",
    year: "2020",
    condition: "Pre-owned",
    figures: [
      { label: "exterior", value: "White" },
      { label: "interior", value: "Red" },
      { label: "engine", value: "2.0 V4 Supercharger" },
      { label: "power", value: "296 hp" },
      { label: "torque", value: "300" },
      { label: "acceleration", value: "0–100 km/h in 5.7 sec" },
      { label: "topSpeed", value: "260 km/h" },
    ],
    options: [],
    frames: f("ftype"),
    postUrl: post("Cy3YxcjNUkn"),
  },
  {
    id: "cayman",
    marque: "Porsche",
    model: "718 Cayman",
    year: "2024",
    condition: "Brand new",
    billing: "Agate Grey Metallic × Bordeaux Red",
    figures: [],
    options: [
      "20-inch 911 Turbo wheels",
      "Wheel centres with full-colour Porsche Crest",
      "Anti-theft wheel bolts",
      "Sports seats, two-way electric",
      "Porsche Doppelkupplung (PDK)",
      "Sport Chrono Package with mode switch",
      "Sport tailpipes, silver",
      "Porsche Exclusive Manufaktur",
      "Power steering plus",
      "64-litre fuel tank",
      "LED headlights with Porsche Dynamic Light System",
      "Auto-dimming interior & exterior mirrors",
    ],
    frames: f("cayman"),
    postUrl: post("Cy03RGxIsyx"),
  },
  {
    id: "roma",
    marque: "Ferrari",
    model: "Roma",
    year: "2023",
    condition: "Brand new",
    billing: "Blu Tour de France × Rosso Ferrari",
    figures: [
      { label: "engine", value: "Twin-turbocharged, intercooled, DOHC 32-valve V8" },
      { label: "construction", value: "Aluminum block & heads, direct fuel injection" },
      { label: "transmission", value: "8-speed dual-clutch automatic" },
    ],
    options: [],
    frames: f("roma"),
    postUrl: post("CybI94VNBbv"),
  },
  {
    id: "evoque",
    marque: "Range Rover",
    model: "Evoque R-Dynamic HSE P300E",
    year: "2023",
    condition: "Brand new",
    billing: "Santorini Black",
    figures: [],
    options: [
      "Sliding panoramic roof",
      "Perforated leather seats, Deep Garnet/Ebony",
      "14-way heated electric driver memory seats",
      "Extended leather upgrade",
      "Ebony Morzine headlining",
      "Gradated linear dark aluminium trim",
      "Perforated full leather steering wheel",
      "Analogue dials with central TFT display",
      "Meridian sound system",
    ],
    frames: f("evoque"),
    postUrl: post("CxWApU7tH-a"),
  },
  {
    id: "408",
    marque: "Peugeot",
    model: "408 GT-Line",
    year: "2023",
    condition: "Brand new",
    billing: "Exclusive · Local warranty",
    figures: [],
    options: [],
    frames: f("408"),
    postUrl: post("CxYYLRJtv0e"),
  },
  {
    id: "cayenne",
    marque: "Porsche",
    model: "Cayenne",
    year: "",
    condition: "Brand new",
    figures: [],
    options: [],
    frames: f("cayenne"),
    postUrl: post("Cwx4EIhNw7Z"),
  },
  {
    id: "xc90",
    marque: "Volvo",
    model: "XC90",
    year: "",
    condition: "Brand new",
    figures: [],
    options: [],
    frames: f("xc90"),
    postUrl: post("CwkGvLUo9mC"),
  },
];

/** The one post in the record that isn't a car at all. */
export const WAVERUNNER = {
  marque: "Yamaha",
  model: "Wave Runner GP1800R SVHO",
  year: "2022 model · 2023 stock",
  billing: "Cyan · 30 engine hours · with Tiger Marine trailer",
  frames: f("waverunner"),
  postUrl: post("CxDs4L6NVPj"),
};

export type FinanceId = "superb" | "kodiaq";

export type FinanceCar = {
  id: FinanceId;
  marque: string;
  model: string;
  years: string;
  depositFrom: number;
  trims: string[];
  frames: string[];
  postUrl: string;
};

export const FINANCE: FinanceCar[] = [
  {
    id: "superb",
    marque: "Skoda",
    model: "Superb",
    years: "2023",
    depositFrom: 400_000,
    trims: ["Dynamic", "Ambition", "Sport"],
    frames: f("superb"),
    postUrl: post("CxDqmZOtLv5"),
  },
  {
    id: "kodiaq",
    marque: "Skoda",
    model: "Kodiaq",
    years: "2022 & 2023",
    depositFrom: 500_000,
    trims: ["Dynamic 2022", "Ambition 2023", "Style 2023", "Sport 2023"],
    frames: f("kodiaq"),
    postUrl: post("CxDpC_Stgc3"),
  },
];

/** Their own terms, identical on both finance posts. */
export const FINANCE_TERMS = [
  "All instalment systems",
  "Free administrative fees",
  "No mandatory insurance",
  "Free first-year licence",
];

/** The fourteen numbers on the finance desk — deduplicated across both
 *  Skoda posts, in first-seen order. */
export const FINANCE_PHONES = [
  "01001651118",
  "01004047226",
  "01022595315",
  "01016926286",
  "01001346777",
  "01050848555",
  "01030445841",
  "01146007710",
  "01006626078",
  "01050848000",
  "01028701766",
  "01019341443",
  "01008699938",
  "01027535048",
];

export const PROFILE = {
  instagram: "https://www.instagram.com/eltogaryauto/",
  facebook: "https://www.facebook.com/ElTogaryAuto/",
  maps: "https://www.google.com/maps/search/?api=1&query=El+Togary+Auto+Cairo",
  /** The single line every showroom post closes on — and the line the
   *  finance posts still give as the general address. */
  mainPhone: "01030061000",
  mainPhoneHref: "tel:+201030061000",
  address: "Inside City Stars Mall, Nasr City, Cairo",
  addressAr: "داخل مول سيتي ستارز، مدينة نصر، القاهرة",
  /** Printed at the foot of both finance posts. */
  taxId: "567-749-533",
  followers: "10K",
  posts: "97",
} as const;
