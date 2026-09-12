import type { Metadata } from "next";
import { Domine, Figtree, Jomhuria, Tajawal } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/i18n/locale-provider";
import { ar } from "@/content/ar";
import { en } from "@/content/en";

// A sturdy book serif for a dealer whose own material reads like two
// certificates — a spec sheet and a finance offer — paired with a clean
// neutral grotesk for the numbers and options underneath.
const domine = Domine({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-domine",
});
const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-figtree",
});
const jomhuria = Jomhuria({
  subsets: ["arabic"],
  weight: ["400"],
  variable: "--font-jomhuria",
});
const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  title: "El Togary Auto — the badge | City Stars Mall, Nasr City",
  description:
    "One phone line for the Ferrari, fourteen for the Skoda: a dealership page built as a coin with two faces, English showroom on one side and Arabic finance desk on the other.",
  metadataBase: new URL("https://el-togary-auto-site.vercel.app"),
  icons: { icon: "/mark.svg" },
  openGraph: {
    title: "El Togary Auto — the badge",
    description: "A dealership page modelled on two registers sharing one Instagram account.",
    locale: "ar_EG",
    type: "website",
  },
  other: { "theme-color": "#121110" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // translate="no": the page ships hand-written Arabic and English, and
    // Chrome's auto-translate rewrites `lang`, which would also break every
    // [dir="rtl"] correction if the CSS were keyed off language instead.
    <html
      lang="ar"
      dir="rtl"
      translate="no"
      className={`notranslate ${domine.variable} ${figtree.variable} ${jomhuria.variable} ${tajawal.variable}`}
    >
      <body className="bg-ground text-cream antialiased">
        {/* Content settles in under an intersection observer, so without
            scripting every block would stay invisible. */}
        <noscript>
          <style>{`[data-settle],[data-settle-rule]{opacity:1!important;transform:none!important;animation:none!important}`}</style>
        </noscript>
        <LocaleProvider dictionaries={{ ar, en }} defaultLocale="ar">
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
