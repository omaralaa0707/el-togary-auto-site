"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactElement,
  type ReactNode,
} from "react";
import { useLocale } from "@/i18n/locale-provider";
import { useTogary } from "@/content/schema-ext";
import {
  FINANCE,
  FINANCE_PHONES,
  FINANCE_TERMS,
  PROFILE,
  SHOWROOM,
  WAVERUNNER,
  type FinanceCar,
  type ShowroomCar,
} from "@/content/media";
import { Badge } from "@/components/webgl/badge";

/* ---------------------------------------------------------------- motion -- */

function useOnScreen<T extends HTMLElement>(rootMargin = "-6% 0px -6% 0px") {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reveal = () => node.setAttribute("data-seen", "");
    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          reveal();
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [rootMargin]);
  return ref;
}

const delayVar = (d: number) => ({ "--settle-delay": `${d}ms` }) as CSSProperties;

/** This site's arrival: settle. A block turns in from a slight angle and
 * comes to rest flat, the way the coin itself settles when it stops. */
function Settle({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const ref = useOnScreen<HTMLElement>();
  // A polymorphic tag's prop union is too wide for TS to resolve on its own.
  const C = Tag as unknown as (p: Record<string, unknown>) => ReactElement;
  return (
    <C ref={ref} data-settle="" className={className} style={delayVar(delay)}>
      {children}
    </C>
  );
}

function Rule({ className, delay = 0 }: { className?: string; delay?: number }) {
  const ref = useOnScreen<HTMLDivElement>();
  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-settle-rule=""
      className={`h-px w-full origin-[left_center] bg-cream/15 rtl:origin-[right_center] ${className ?? ""}`}
      style={delayVar(delay)}
    />
  );
}

function SectionHead({
  eyebrow,
  heading,
  intro,
  accent = "steel",
}: {
  eyebrow: string;
  heading: string;
  intro?: string;
  accent?: "steel" | "copper";
}) {
  return (
    <div>
      <Settle className={`label ${accent === "copper" ? "text-copper" : "text-steel"}`}>
        {eyebrow}
      </Settle>
      <Settle as="h2" className="text-display font-display mt-3 max-w-[24ch] text-cream" delay={60}>
        {heading}
      </Settle>
      <Rule className="mt-6" delay={110} />
      {intro ? (
        <Settle className="text-lead mt-6 max-w-[68ch] leading-[1.8] text-cream-2" delay={160}>
          {intro}
        </Settle>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------- nav -- */

export function Nav() {
  const c = useTogary();
  const { locale, toggleLocale } = useLocale();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-cream/10 bg-ground/92 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[86rem] items-center gap-5 px-5 sm:px-8">
        <a href="#top" className="flex shrink-0 items-center gap-2.5" aria-label={c.brand.name}>
          <img src="/mark.svg" alt="" className="h-7 w-7" />
          <span className="font-display text-[1rem] font-semibold text-cream">{c.brand.name}</span>
        </a>

        <nav className="ms-auto hidden items-center gap-7 md:flex">
          {c.nav.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="py-2 text-[0.86rem] text-cream-2 transition-colors hover:text-cream"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={PROFILE.mainPhoneHref}
          className="latin tnum ms-auto shrink-0 text-[0.84rem] font-semibold text-steel transition-opacity hover:opacity-75 md:ms-0"
        >
          {PROFILE.mainPhone}
        </a>

        <button
          onClick={toggleLocale}
          className="shrink-0 border border-cream/20 px-3 py-1.5 text-[0.7rem] text-cream-2 transition-colors hover:border-steel hover:text-cream"
          aria-label={c.a11y.toggleLanguage}
        >
          {locale === "ar" ? "EN" : "ع"}
        </button>
      </div>
    </header>
  );
}

/* ----------------------------------------------------------------- hero -- */

function Hero({
  showFinance,
  setShowFinance,
}: {
  showFinance: boolean;
  setShowFinance: (v: boolean) => void;
}) {
  const c = useTogary();

  return (
    <section id="top" className="relative pt-16">
      <div className="mx-auto max-w-[86rem] px-5 pt-10 sm:px-8 lg:pt-14">
        <Settle className={`label ${showFinance ? "text-copper" : "text-steel"}`}>
          {c.hero.eyebrow}
        </Settle>
        <Settle as="h1" className="text-hero font-display mt-4 max-w-[21ch] text-cream" delay={70}>
          {c.hero.headline}
        </Settle>

        <div className="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1fr] lg:gap-14">
          <Settle delay={30}>
            <Badge
              showroomSrc={SHOWROOM[0].frames[0]}
              financeSrc={FINANCE[0].frames[0]}
              showFinance={showFinance}
              alt={c.hero.badgeAlt}
              className="aspect-square w-full max-w-[26rem] mx-auto lg:mx-0"
            />
            <div className="mt-5 flex items-center justify-center gap-2 lg:justify-start">
              <button
                onClick={() => setShowFinance(false)}
                aria-pressed={!showFinance}
                className={`px-4 py-2 text-[0.82rem] border transition-colors ${
                  !showFinance
                    ? "border-steel text-steel"
                    : "border-cream/20 text-cream-2 hover:border-cream/40"
                }`}
              >
                {c.hero.showroomTab}
              </button>
              <button
                onClick={() => setShowFinance(true)}
                aria-pressed={showFinance}
                className={`px-4 py-2 text-[0.82rem] border transition-colors ${
                  showFinance
                    ? "border-copper text-copper"
                    : "border-cream/20 text-cream-2 hover:border-cream/40"
                }`}
              >
                {c.hero.financeTab}
              </button>
            </div>
          </Settle>

          <div>
            <Settle className="text-lead max-w-[52ch] leading-[1.85] text-cream-2" delay={140}>
              {c.hero.sub}
            </Settle>

            <Settle className="mt-9 flex flex-wrap items-center gap-3" delay={220}>
              <a
                href={PROFILE.mainPhoneHref}
                className="bg-steel px-6 py-3 text-[0.9rem] font-medium text-ground transition-opacity hover:opacity-85"
              >
                {c.hero.primaryCta}
              </a>
              <a
                href="#finance"
                className="border border-cream/25 px-6 py-3 text-[0.9rem] text-cream transition-colors hover:border-copper hover:text-copper"
              >
                {c.hero.secondaryCta}
              </a>
            </Settle>

            <Settle className="mt-12 grid grid-cols-2 gap-px border-t border-cream/15" delay={300}>
              {[
                { k: c.hero.followersLabel, v: PROFILE.followers },
                { k: c.hero.postsLabel, v: PROFILE.posts },
              ].map((s) => (
                <div key={s.k} className="pt-6">
                  <div className="tnum font-display text-[1.7rem] leading-none text-cream">
                    <span className="latin">{s.v}</span>
                  </div>
                  <div className="label mt-2 text-cream-2">{s.k}</div>
                </div>
              ))}
            </Settle>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- showroom -- */

function ShowroomCard({ car, index }: { car: ShowroomCar; index: number }) {
  const c = useTogary();

  return (
    <Settle as="article" className="border-t border-cream/15 pt-8" delay={Math.min(index, 4) * 60}>
      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
        <div className="aspect-[4/3] w-full overflow-hidden bg-ground-2">
          <img
            src={car.frames[0]}
            alt={`${car.marque} ${car.model}`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        <div>
          <div className="flex items-baseline justify-between gap-4">
            <span className="tnum text-[0.76rem] text-cream-3">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="label text-steel">{car.condition}</span>
          </div>

          <h3 className="latin font-display mt-2 text-[1.35rem] leading-tight text-cream">
            {car.marque} {car.model}
            {car.year ? <span className="text-cream-3"> · {car.year}</span> : null}
          </h3>
          {car.billing ? <p className="fine mt-1 text-cream-2">{car.billing}</p> : null}

          {car.figures.length > 0 ? (
            <>
              <div className="label mt-5 text-cream-3">{c.showroom.specsLabel}</div>
              <dl className="mt-3 border-t border-cream/10">
                {car.figures.map((fig) => (
                  <div
                    key={fig.label}
                    className="flex items-baseline justify-between gap-6 border-b border-cream/10 py-2.5"
                  >
                    <dt className="fine text-cream-3">
                      {c.showroom.specLabels[fig.label as keyof typeof c.showroom.specLabels] ?? fig.label}
                    </dt>
                    <dd className="latin tnum text-[0.92rem] text-cream">{fig.value}</dd>
                  </div>
                ))}
              </dl>
            </>
          ) : null}

          {car.options.length > 0 ? (
            <div className="mt-5">
              <div className="label text-cream-3">{c.showroom.optionsLabel}</div>
              <div className="mt-3 flex flex-wrap gap-x-1.5 gap-y-1.5">
                {car.options.map((o) => (
                  <span key={o} className="fine border border-cream/15 px-2 py-1 text-cream-2">
                    {o}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          <a
            href={car.postUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="fine mt-5 inline-block text-cream underline decoration-cream/40 underline-offset-4 transition-colors hover:text-steel"
          >
            {c.showroom.viewPost}
          </a>
        </div>
      </div>
    </Settle>
  );
}

function Showroom() {
  const c = useTogary();

  return (
    <section id="showroom" className="mx-auto max-w-[86rem] px-5 py-24 sm:px-8 sm:py-28">
      <SectionHead eyebrow={c.showroom.eyebrow} heading={c.showroom.heading} intro={c.showroom.intro} />

      <div className="mt-14 space-y-16">
        {SHOWROOM.map((car, i) => (
          <ShowroomCard key={car.id} car={car} index={i} />
        ))}
      </div>

      <Settle as="article" className="mt-16 border-t border-cream/15 pt-8" delay={80}>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
          <div className="aspect-[4/3] w-full overflow-hidden bg-ground-2">
            <img
              src={WAVERUNNER.frames[0]}
              alt={`${WAVERUNNER.marque} ${WAVERUNNER.model}`}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <span className="label text-steel">{c.showroom.waverunnerNote}</span>
            <h3 className="latin font-display mt-2 text-[1.35rem] leading-tight text-cream">
              {WAVERUNNER.marque} {WAVERUNNER.model}
            </h3>
            <p className="fine mt-1 text-cream-2">{WAVERUNNER.billing}</p>
            <p className="fine mt-2 text-cream-3">
              <span className="latin">{WAVERUNNER.year}</span>
            </p>
            <a
              href={WAVERUNNER.postUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="fine mt-4 inline-block text-cream underline decoration-cream/40 underline-offset-4 transition-colors hover:text-steel"
            >
              {c.showroom.viewPost}
            </a>
          </div>
        </div>
      </Settle>
    </section>
  );
}

/* --------------------------------------------------------------- finance -- */

function money(n: number) {
  return n.toLocaleString("en-US");
}

function FinanceCard({ car, index }: { car: FinanceCar; index: number }) {
  const c = useTogary();

  return (
    <Settle as="article" className="bg-ground p-6" delay={index * 90}>
      <div className="aspect-[4/3] w-full overflow-hidden bg-ground-2">
        <img
          src={car.frames[0]}
          alt={`${car.marque} ${car.model}`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <h3 className="latin font-display mt-4 text-[1.2rem] text-cream">
        {car.marque} {car.model} <span className="text-cream-3">· {car.years}</span>
      </h3>

      <div className="mt-4 border-t border-cream/10 pt-4">
        <div className="label text-copper">{c.finance.depositFrom}</div>
        <div className="tnum mt-1 text-[1.3rem] text-cream">
          <span className="latin">{money(car.depositFrom)}</span>
        </div>
      </div>

      <div className="mt-4 border-t border-cream/10 pt-4">
        <div className="label text-cream-3">{c.finance.trimsLabel}</div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {car.trims.map((t) => (
            <span key={t} className="fine latin border border-cream/15 px-2 py-1 text-cream-2">
              {t}
            </span>
          ))}
        </div>
      </div>

      <a
        href={car.postUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="fine mt-4 inline-block text-cream underline decoration-cream/40 underline-offset-4 transition-colors hover:text-copper"
      >
        {c.finance.viewPost}
      </a>
    </Settle>
  );
}

function Finance() {
  const c = useTogary();

  return (
    <section id="finance" className="border-y border-cream/10 bg-ground-2 py-24 sm:py-28">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
        <SectionHead
          eyebrow={c.finance.eyebrow}
          heading={c.finance.heading}
          intro={c.finance.intro}
          accent="copper"
        />

        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          {FINANCE.map((car, i) => (
            <FinanceCard key={car.id} car={car} index={i} />
          ))}
        </div>

        <Settle className="mt-14" delay={120}>
          <div className="label text-cream-3">{c.finance.termsLabel}</div>
          <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-4">
            {FINANCE_TERMS.map((t) => (
              <li key={t} className="fine border-t border-cream/15 pt-3 text-cream-2">
                {t}
              </li>
            ))}
          </ul>
        </Settle>

        <Settle className="mt-14" delay={180}>
          <div className="label text-copper">{c.finance.linesLabel}</div>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
            {FINANCE_PHONES.map((p) => (
              <a
                key={p}
                href={`tel:+2${p}`}
                className="latin tnum border border-cream/15 px-3 py-2.5 text-center text-[0.84rem] text-cream-2 transition-colors hover:border-copper hover:text-cream"
              >
                {p}
              </a>
            ))}
          </div>
          <p className="fine mt-4 max-w-[62ch] text-cream-3">{c.finance.linesNote}</p>
        </Settle>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ mall -- */

function Mall() {
  const c = useTogary();

  return (
    <section id="mall" className="mx-auto max-w-[86rem] px-5 py-24 sm:px-8 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <Settle className="label text-steel">{c.mall.eyebrow}</Settle>
          <Settle as="h2" className="text-display font-display mt-3 max-w-[18ch] text-cream" delay={60}>
            {c.mall.heading}
          </Settle>
          <Rule className="mt-6" delay={110} />
          {c.mall.body.map((p, i) => (
            <Settle
              key={p.slice(0, 24)}
              className="text-lead mt-6 max-w-[52ch] leading-[1.85] text-cream-2"
              delay={160 + i * 90}
            >
              {p}
            </Settle>
          ))}
          <Settle className="mt-8 border-s-2 border-cream/30 ps-4" delay={340}>
            <div className="label text-cream-3">{c.mall.taxLabel}</div>
            <div className="tnum mt-1 text-[1rem] text-cream">
              <span className="latin">{PROFILE.taxId}</span>
            </div>
          </Settle>
        </div>

        <Settle delay={100} className="overflow-hidden bg-ground-2">
          <img
            src="/media/roma-2.jpg"
            alt={c.mall.heading}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </Settle>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- contact -- */

function Contact() {
  const c = useTogary();

  return (
    <section id="contact" className="border-t border-cream/10 bg-ground-2 py-24 sm:py-28">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
        <Settle as="h2" className="text-display font-display max-w-[16ch] text-cream">
          {c.contact.heading}
        </Settle>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <Settle delay={60}>
            <div className="label text-steel">{c.contact.addressLabel}</div>
            <p className="mt-3 text-[0.94rem] leading-relaxed text-cream-2">{c.contact.address}</p>
            <a
              href={c.contact.mapsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="fine mt-3 inline-block text-cream underline decoration-cream/40 underline-offset-4"
            >
              Google Maps
            </a>
          </Settle>

          <Settle delay={130}>
            <div className="label text-steel">{c.contact.phoneLabel}</div>
            <a
              href={PROFILE.mainPhoneHref}
              className="latin tnum mt-3 block text-[1.05rem] text-cream transition-opacity hover:opacity-75"
            >
              {PROFILE.mainPhone}
            </a>
            <div className="label mt-5 text-copper">{c.contact.financeLabel}</div>
            <a
              href="#finance"
              className="fine mt-2 inline-block text-cream-2 underline decoration-cream/30 underline-offset-4 transition-colors hover:text-cream"
            >
              {c.finance.linesLabel}
            </a>
          </Settle>

          <Settle delay={200}>
            <div className="label text-steel">{c.brand.name}</div>
            <div className="mt-3 flex flex-col gap-2 text-[0.9rem]">
              <a
                href={c.contact.instagramUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-cream-2 underline decoration-cream/30 underline-offset-4 transition-colors hover:text-cream"
              >
                Instagram
              </a>
              <a
                href={c.contact.facebookUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-cream-2 underline decoration-cream/30 underline-offset-4 transition-colors hover:text-cream"
              >
                Facebook
              </a>
            </div>
          </Settle>

          <Settle delay={270}>
            <a
              href={PROFILE.mainPhoneHref}
              className="inline-block bg-steel px-6 py-3 text-[0.9rem] font-medium text-ground transition-opacity hover:opacity-85"
            >
              {c.contact.cta}
            </a>
          </Settle>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- export -- */

export function Sections() {
  const [showFinance, setShowFinance] = useState(false);

  return (
    <main>
      <Hero showFinance={showFinance} setShowFinance={setShowFinance} />
      <Showroom />
      <Finance />
      <Mall />
      <Contact />
    </main>
  );
}

export function Footer() {
  const c = useTogary();

  return (
    <footer className="border-t border-cream/10 bg-ground py-10">
      <div className="mx-auto flex max-w-[86rem] flex-col gap-5 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2.5">
          <img src="/mark.svg" alt="" className="h-6 w-6" />
          <span className="font-display text-[0.92rem] font-semibold text-cream">{c.brand.name}</span>
        </div>
        <p className="fine text-cream-2">{c.footer.rights}</p>
      </div>
    </footer>
  );
}
