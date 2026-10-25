import type { Route } from "./+types/home";
import { resolveSite } from "../data/site";
import { services, works, specs } from "../data/portfolio";
import { useScrollEffects, useActiveSection } from "../hooks/useScrollEffects";
import TopTalBadge from "../components/TopTalBadge";
import FloatingFortress from "../components/FloatingFortress";

const GITHUB_URL = "https://github.com/masayukitanaka";

export function meta({ data }: Route.MetaArgs) {
  const brand = data?.brand ?? "Beezynx";
  return [
    { title: `${brand} - Software Development & AI Solutions` },
    {
      name: "description",
      content:
        "Leading software development company specializing in AI tools, automation, and enterprise consulting solutions.",
    },
    {
      name: "keywords",
      content:
        "software development, AI tools, automation, consulting, enterprise solutions",
    },
  ];
}

export function loader() {
  // This GitHub Pages site always renders the "personal" variant.
  return resolveSite("personal");
}

const TOC = [
  { id: "overview", label: "— Overview" },
  { id: "services", label: "01 Services" },
  { id: "works", label: "02 Works" },
  { id: "partners", label: "03 Partners" },
  { id: "contact", label: "04 Contact" },
];

const TOC_IDS = TOC.map((t) => t.id);

// Work "Type" badge colors, keyed by lowercased type. Falls back to chip gray.
const TYPE_STYLES: Record<string, { bg: string; fg: string }> = {
  opensource: {
    bg: "var(--color-type-opensource-bg)",
    fg: "var(--color-type-opensource-fg)",
  },
  tool: {
    bg: "var(--color-type-tool-bg)",
    fg: "var(--color-type-tool-fg)",
  },
  service: {
    bg: "var(--color-type-service-bg)",
    fg: "var(--color-type-service-fg)",
  },
  app: {
    bg: "var(--color-type-app-bg)",
    fg: "var(--color-type-app-fg)",
  },
};

function typeStyle(type: string) {
  return (
    TYPE_STYLES[type.toLowerCase()] ?? {
      bg: "var(--color-chip)",
      fg: "var(--color-ink)",
    }
  );
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { brand, mark, domain } = loaderData;

  useScrollEffects();
  useActiveSection(TOC_IDS);

  return (
    <div className="font-sans text-ink">
      {/* Navigation */}
      <nav className="sticky top-0 z-20 h-[60px] flex items-center justify-between px-5 md:px-10 border-b border-line bg-bg/90 backdrop-blur-[10px]">
        <a href="#overview" className="flex items-center gap-2.5">
          <span className="font-mono font-medium text-xs px-[7px] py-1 bg-ink text-white rounded-[3px]">
            {mark}
          </span>
          <span className="font-semibold text-base">{brand}</span>
        </a>
        <div className="flex gap-4 md:gap-7 items-center text-sm text-text-muted">
          <a href="#services" className="hidden sm:inline">
            Services
          </a>
          <a href="#works" className="hidden sm:inline">
            Works
          </a>
          <a href="#partners" className="hidden md:inline">
            Partners
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener"
            className="hidden md:inline"
          >
            GitHub ↗
          </a>
          <a
            href="#contact"
            className="px-3.5 py-2 border border-border-btn rounded-md text-ink"
          >
            Contact
          </a>
        </div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] gap-0 lg:gap-16 px-5 md:px-10">
        {/* Sidebar TOC */}
        <aside className="hidden lg:flex sticky top-[60px] self-start pt-[72px] flex-col gap-3 font-mono text-[13px] text-text-sub">
          {TOC.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              data-toc={item.id}
              style={{
                color:
                  item.id === "overview"
                    ? "var(--color-ink)"
                    : "var(--color-text-sub)",
              }}
            >
              {item.label}
            </a>
          ))}
        </aside>

        {/* Main content */}
        <main className="max-w-[900px] pb-10 w-full">
          {/* Hero / Overview */}
          <header
            id="overview"
            data-speed="0.12"
            className="scroll-mt-[60px] pt-[72px] pb-16 flex flex-col gap-[22px] border-b border-line"
          >
            <div className="relative lg:min-h-[420px] flex flex-col-reverse lg:block gap-10">
              <div className="relative z-10 flex flex-col gap-[22px] max-w-[360px]">
                <span className="font-mono text-[13px] text-accent">
                  Software Development & AI
                </span>
                <h1 className="m-0 font-medium text-[34px] md:text-5xl leading-[1.15] tracking-[-0.02em]">
                  Next-Gen software solutions.
                </h1>
                <p className="m-0 text-base leading-[1.9] text-text-muted max-w-[640px]">
                  We craft intelligent software, AI-powered tools, and
                  automation solutions that transform businesses and drive
                  innovation.
                </p>
              </div>

              {/* Floating ASCII sky-fortress key visual */}
              <FloatingFortress />
            </div>

            {/* Spec strip */}
            <dl className="mt-2 mb-0 grid grid-cols-2 md:grid-cols-4 gap-px bg-line border border-line rounded-lg overflow-hidden">
              {specs.map((cell) => (
                <div key={cell.dt} className="px-4 py-3.5 bg-bg">
                  <dt className="font-mono text-[11px] text-text-sub">
                    {cell.dt}
                  </dt>
                  <dd className="mt-1.5 ml-0 text-sm">{cell.dd}</dd>
                </div>
              ))}
            </dl>
          </header>

          {/* 01 Services */}
          <section id="services" className="scroll-mt-[60px] pt-12 pb-10">
            <h2 className="m-0 mb-2 font-medium text-2xl">01 Services</h2>
            <p className="m-0 mb-6 text-[15px] text-text-muted">
              Comprehensive solutions for modern businesses.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {services.map((s) => (
                <article
                  key={s.no}
                  data-reveal="1"
                  className="flex flex-col gap-3 p-5 border border-line-soft rounded-lg"
                >
                  <span className="font-mono text-xs text-text-sub">
                    {s.no}
                  </span>
                  <h3 className="m-0 font-medium text-[19px]">{s.title}</h3>
                  <p className="m-0 text-sm leading-[1.7] text-text-body">
                    {s.summary}
                  </p>
                  <div className="mt-auto flex gap-1.5 flex-wrap pt-1">
                    {s.tags.map((t) => (
                      <code
                        key={t}
                        className="font-mono text-xs px-1.5 py-0.5 bg-chip rounded-[3px]"
                      >
                        {t}
                      </code>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* 02 Works */}
          <section id="works" className="scroll-mt-[60px] pt-14 pb-6">
            <h2 className="m-0 mb-2 font-medium text-2xl">02 Works</h2>
            <p className="m-0 mb-4 text-[15px] text-text-muted">
              Selected projects and platforms we've delivered.
            </p>
            {works.map((w) => (
              <article
                key={w.no}
                data-reveal="1"
                className="grid grid-cols-1 md:grid-cols-[320px_minmax(0,1fr)] gap-8 py-8 border-b border-line-soft"
              >
                <a
                  href={w.url}
                  target={w.url.startsWith("http") ? "_blank" : undefined}
                  rel={w.url.startsWith("http") ? "noopener" : undefined}
                  className="block relative h-[200px] overflow-hidden rounded-md border border-border-thumb"
                >
                  <div
                    data-pspeed="0.1"
                    className="absolute left-0 right-0 top-[-30px] h-[260px] flex items-center justify-center"
                    style={
                      w.image
                        ? {
                            backgroundImage: `url(${w.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }
                        : {
                            background:
                              "repeating-linear-gradient(135deg,#e9ebee 0 8px,#e2e5e7 8px 16px)",
                          }
                    }
                  >
                    {!w.image && (
                      <span className="font-mono text-[11px] text-text-muted">
                        [ {w.shot} ]
                      </span>
                    )}
                  </div>
                </a>
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between font-mono text-xs text-text-sub">
                    <span>{w.no}</span>
                    <span>{w.year}</span>
                  </div>
                  <h3 className="m-0 font-medium text-[21px]">{w.title}</h3>
                  <p className="m-0 text-sm leading-[1.85] text-text-body">
                    {w.summary}
                  </p>
                  <div className="grid grid-cols-[72px_minmax(0,1fr)] gap-y-1.5 text-[13px]">
                    <span className="font-mono text-xs text-text-label">
                      Type
                    </span>
                    <span>
                      <span
                        className="inline-block font-mono text-xs font-medium px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: typeStyle(w.type).bg,
                          color: typeStyle(w.type).fg,
                        }}
                      >
                        {w.type}
                      </span>
                    </span>
                    <span className="font-mono text-xs text-text-label">
                      Role
                    </span>
                    <span>{w.role}</span>
                    <span className="font-mono text-xs text-text-label">
                      Stack
                    </span>
                    <div className="flex gap-1.5 flex-wrap">
                      {w.tags.map((t) => (
                        <code
                          key={t}
                          className="font-mono text-xs px-1.5 py-0.5 bg-chip rounded-[3px]"
                        >
                          {t}
                        </code>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-5 text-sm font-medium text-link">
                    <a
                      href={w.url}
                      target={w.url.startsWith("http") ? "_blank" : undefined}
                      rel={w.url.startsWith("http") ? "noopener" : undefined}
                    >
                      Live site ↗
                    </a>
                    {w.lp && w.lp !== "#" && (
                      <a
                        href={w.lp}
                        target={w.lp.startsWith("http") ? "_blank" : undefined}
                        rel={w.lp.startsWith("http") ? "noopener" : undefined}
                      >
                        Details ↗
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </section>

          {/* 03 Partners */}
          <section id="partners" className="scroll-mt-[60px] py-12">
            <h2 className="m-0 mb-2 font-medium text-2xl">03 Partners</h2>
            <p className="m-0 mb-6 text-[15px] text-text-muted">
              Trusted by industry leaders.
            </p>
            <div className="flex justify-start">
              <TopTalBadge />
            </div>
          </section>

          {/* 04 Contact */}
          <section
            id="contact"
            className="scroll-mt-[60px] py-12 flex flex-col gap-4 border-t border-line"
          >
            <h2 className="m-0 font-medium text-2xl">04 Contact</h2>
            <p className="m-0 text-[15px] text-text-muted">
              Ready to get started? Let's discuss your project and see how we
              can help transform your business.
            </p>
            <div className="flex gap-3 flex-wrap">
              <a
                href="mailto:admin@beezynx.dev"
                className="px-[18px] py-3 bg-ink text-white rounded-md text-sm"
              >
                Schedule a Consultation ↗
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener"
                className="px-[18px] py-3 border border-border-btn rounded-md text-sm"
              >
                GitHub ↗
              </a>
            </div>
            <span className="mt-10 font-mono text-xs text-text-sub">
              © 2026 {brand} — {domain}
            </span>
          </section>
        </main>
      </div>
    </div>
  );
}
