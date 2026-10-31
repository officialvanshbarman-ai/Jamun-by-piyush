'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import { products, money } from '@/data/content';
import { Dialog, useBag } from '@/components/layout/Shell';
export function Reveal({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7 }}
    >
      {children}
    </motion.div>
  );
}
function Photo({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={'photo ' + className}>
      <Image src={src} alt={alt} fill sizes="(max-width: 700px) 100vw, 65vw" />
    </div>
  );
}
function Intro({
  index,
  title,
  description,
}: {
  index: string;
  title: string;
  description: string;
}) {
  return (
    <section className="page-intro">
      <p className="eyebrow">JAMUN™ / {index}</p>
      <h1>{title}</h1>
      <div className="intro-bottom">
        <span className="tiny">BEYOND FRUIT. SINCE OUR IMAGINATION.</span>
        <p>{description}</p>
      </div>
    </section>
  );
}
export function ProductGrid({ featured = false }: { featured?: boolean }) {
  return (
    <div className="product-grid">
      {(featured ? products.slice(0, 3) : products).map((p) => (
        <Reveal key={p.slug} className="product">
          <Link href={'/collection/' + p.slug} className="product-image">
            <Image
              src={p.image}
              fill
              sizes="(max-width:700px) 85vw, 33vw"
              alt={`${p.name} fictional luxury presentation`}
            />
            <span className="product-index">EDITION {p.edition}</span>
            <span className="product-explore">
              <ArrowUpRight size={20} />
            </span>
          </Link>
          <div className="product-title">
            <h3>
              <Link href={'/collection/' + p.slug}>{p.name}</Link>
            </h3>
            <span>{p.price ? money(p.price) : 'Upon imagination'}</span>
          </div>
          <p>{p.note}</p>
        </Reveal>
      ))}
    </div>
  );
}
export function Timeline() {
  const [active, setActive] = useState(0);
  const chapters = [
    [
      'The discovery',
      'One fruit. An entirely disproportionate idea.',
      'In our fictional orchard, a simple jamun becomes the starting point for a very serious vision.',
    ],
    [
      'The obsession',
      'A better box. A bigger ambition.',
      'The fruit was already exceptional. Naturally, the next step was to commission excessive packaging.',
    ],
    [
      'The empire',
      'From a fruit bowl to a boardroom.',
      'Purple Affairs becomes a department. Seed Strategy becomes a meeting. Nobody questions the stationery.',
    ],
    [
      'The future',
      'The next chapter is unnecessarily bright.',
      'One fruit. Infinite possibilities. Most of them involve a presentation deck.',
    ],
  ];
  return (
    <div className="timeline">
      <div
        className="timeline-tabs"
        role="tablist"
        aria-label="Fictional story chapters"
      >
        {chapters.map((c, i) => (
          <button
            role="tab"
            id={'chapter-' + i}
            aria-controls="chapter-panel"
            aria-selected={active === i}
            tabIndex={active === i ? 0 : -1}
            onKeyDown={(event) => {
              const keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End'];
              if (!keys.includes(event.key)) return;
              event.preventDefault();
              const next =
                event.key === 'Home'
                  ? 0
                  : event.key === 'End'
                    ? 3
                    : (i + (event.key === 'ArrowRight' ? 1 : 3)) % 4;
              setActive(next);
              document.getElementById('chapter-' + next)?.focus();
            }}
            key={c[0]}
            onClick={() => setActive(i)}
          >
            <small>0{i + 1}</small>
            {c[0]}
          </button>
        ))}
      </div>
      <div
        id="chapter-panel"
        role="tabpanel"
        aria-labelledby={'chapter-' + active}
        className="timeline-panel"
      >
        <span className="chapter-number">0{active + 1}</span>
        <div>
          <h3>{chapters[active][1]}</h3>
          <p>{chapters[active][2]}</p>
          <small>AN ENTIRELY FICTIONAL TIMELINE</small>
        </div>
      </div>
    </div>
  );
}
export function Home() {
  const [metric, setMetric] = useState<string | null>(null);
  return (
    <>
      <section className="hero">
        <Image
          className="hero-image"
          src="/images/editorial/hero.webp"
          alt="Water droplets on sculptural dark jamun berries"
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-shade" />
        <div className="hero-topline">
          <span>NATURE’S FINEST. VISION’S FINEST HOUR.</span>
          <span>EST. IN IMAGINATION / INDIA</span>
        </div>
        <div className="hero-copy">
          <p className="eyebrow">ONE FRUIT. INFINITE AMBITION.</p>
          <h1>
            BEYOND
            <br />
            <span>FRUIT.</span>
          </h1>
          <p className="hero-description">
            The world’s most unnecessarily
            <br />
            premium jamun experience.
          </p>
          <div className="hero-buttons">
            <Link className="button white" href="/collection">
              Explore the Collection <ArrowUpRight size={17} />
            </Link>
            <Link className="text-link" href="/our-story">
              Discover Our Vision <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
        <div className="hero-bottom">
          <span>ENGINEERED BY NATURE. OVERPRICED BY VISION.</span>
          <a href="#vision">
            SCROLL TO DISCOVER <span>↓</span>
          </a>
          <span>01 — 05</span>
        </div>
        <span className="hero-side">THE JAMUN STANDARD™</span>
      </section>
      <section className="manifesto section" id="vision">
        <p className="eyebrow">01 / A DIFFERENT KIND OF FRUIT COMPANY</p>
        <Reveal>
          <h2>
            It started with one jamun.
            <br />
            It became <em>an empire.</em>
          </h2>
        </Reveal>
        <div className="manifesto-bottom">
          <span className="round-seal">
            J<span>BEYOND FRUIT</span>
          </span>
          <div>
            <p>
              Some see a seasonal fruit.
              <br />
              We see an entirely new category of ambition.
            </p>
            <p className="muted">
              Rooted in nature. Elevated by an unreasonable attention to detail.
              Welcome to Jamun, where the ordinary is given an extraordinary
              price tag.
            </p>
            <Link href="/our-story" className="under-link">
              The story behind the seed <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
        <div className="stats">
          {[
            ['1', 'Visionary founder'],
            ['0', 'Compromises'],
            ['∞', 'Purple ambition'],
            ['100%', 'Unnecessary luxury'],
          ].map(([v, l]) => (
            <button
              key={l}
              onClick={() => setMetric(l)}
              aria-label={'Explore fictional metric: ' + l}
            >
              <strong>{v}</strong>
              <span>{l}</span>
            </button>
          ))}
        </div>
        {metric && (
          <Dialog title={metric + '.'} onClose={() => setMetric(null)}>
            <p>
              One fruit, no financial significance. This fictional brand metric
              measures our entirely imaginary commitment to{' '}
              {metric.toLowerCase()}. Tap into the collection to see where all
              that ambition went.
            </p>
            <button className="button dark" onClick={() => setMetric(null)}>
              Perfectly unreasonable ↗
            </button>
          </Dialog>
        )}
        <p className="fiction-caption">
          FICTIONAL BRAND METRICS. REAL COMMITMENT TO THE JOKE.
        </p>
      </section>
      <section className="collection-section section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">02 / THE COLLECTION</p>
            <h2>
              Exceptional by nature.
              <br />
              <em>Excessive by design.</em>
            </h2>
          </div>
          <Link href="/collection" className="under-link">
            View the collection <ArrowUpRight size={16} />
          </Link>
        </div>
        <ProductGrid featured />
        <p className="fiction-caption">
          ALL PRODUCTS AND PRICES ARE FICTIONAL. TASTE IS SUBJECTIVE. THE SATIRE
          IS INTENTIONAL.
        </p>
      </section>
      <section className="founder-band">
        <Photo
          src="/images/piyush/office.webp"
          alt="Piyush Roy in the supplied fictional CEO portrait"
        />
        <div className="founder-overlay">
          <p className="eyebrow">03 / THE VISIONARY</p>
          <h2>
            The Man.
            <br />
            The Myth.
            <br />
            <em>The Jamun.</em>
          </h2>
          <p>
            Piyush Roy
            <br />
            <span>Founder & CEO · Fictional corporate persona</span>
          </p>
          <Link href="/leadership" className="button white">
            Meet the visionary <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
      <section className="section labs-teaser">
        <p className="eyebrow">04 / JAMUN LABS</p>
        <Reveal>
          <h2>
            The future
            <br />
            has a <em>seed.</em>
          </h2>
        </Reveal>
        <div className="labs-description">
          <p>
            Nature spent millennia perfecting the jamun.
            <br />
            We gave it a research department.
          </p>
          <Link href="/innovation" className="under-link">
            Inside Jamun Labs <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="orbit-art" aria-hidden="true">
          <i />
          <i />
          <i />
          <span>J</span>
          <small>SEED DYNAMICS™ / CONCEPT 001</small>
        </div>
      </section>
      <section className="closing">
        <p className="eyebrow">EXCELLENCE HAS A SEED.</p>
        <h2>The future is purple.</h2>
        <Link href="/collection" className="button dark">
          Discover your Jamun <ArrowUpRight size={16} />
        </Link>
      </section>
    </>
  );
}
export function Story() {
  return (
    <>
      <Intro
        index="OUR STORY / FICTIONAL ORIGIN"
        title="A small fruit. An unreasonable vision."
        description="When the world was chasing artificial intelligence, one visionary chased a jamun."
      />
      <Photo
        className="wide-photo orchard"
        src="/images/piyush/orchard.webp"
        alt="Piyush examining jamun in an orchard, from supplied imagery"
      />
      <section className="section story-layout">
        <p className="eyebrow">THE ORIGIN / A FICTIONAL STORY</p>
        <div>
          <h2>
            The world deserved
            <br />
            dramatically more
            <br />
            <em>expensive fruit.</em>
          </h2>
          <p>
            That was the belief. The business plan came later. In this imagined
            corporate universe, an everyday Indian fruit becomes the subject of
            boardroom discussions, architectural commissions and exceptionally
            restrained typography.
          </p>
          <p>
            Jamun celebrates the glorious distance between what something is and
            how seriously a company can talk about it. The fruit is real. The
            empire is a joke.
          </p>
        </div>
      </section>
      <section className="section">
        <p className="eyebrow">FOUR CHAPTERS. ONE SEED.</p>
        <Timeline />
      </section>
      <section className="quote-section">
        <p className="eyebrow">THE FOUNDING PHILOSOPHY / FICTIONAL QUOTE</p>
        <blockquote>
          “We do not follow the market.
          <br />
          We follow <em>the season.</em>”
        </blockquote>
        <p>PIYUSH ROY / FICTIONAL CEO PERSONA</p>
      </section>
    </>
  );
}
export function Collection() {
  return (
    <>
      <Intro
        index="THE COLLECTION / FICTIONAL PRODUCTS"
        title="Good things come in excessive packaging."
        description="Five expressions of a singular obsession. Each entirely fictional. Each unnecessarily considered."
      />
      <section className="section collection-page">
        <div className="collection-note">
          <span>ALL EDITIONS / 05</span>
          <span>FICTIONAL PRICES · NO REAL ORDERS</span>
        </div>
        <ProductGrid />
      </section>
      <section className="closing">
        <p className="eyebrow">THE JAMUN PROMISE</p>
        <h2>
          Nature included.
          <br />
          Restraint sold separately.
        </h2>
      </section>
    </>
  );
}
export function ProductDetail({ slug }: { slug: string }) {
  const p = products.find((p) => p.slug === slug)!;
  const [variant, setVariant] = useState('Classic black');
  const { add } = useBag();
  return (
    <>
      <section className="product-detail">
        <Photo src={p.image} alt={p.name + ' conceptual luxury packaging'} />
        <div className="product-info">
          <Link className="eyebrow" href="/collection">
            ← THE COLLECTION / EDITION {p.edition}
          </Link>
          <h1>{p.name}</h1>
          <p className="product-tagline">{p.note}</p>
          <p>{p.detail}</p>
          <div className="price">
            {p.price ? money(p.price) : 'Price Upon Imagination'}
            <small>{p.unit}</small>
          </div>
          <label htmlFor="presentation">Presentation</label>
          <select
            id="presentation"
            value={variant}
            onChange={(e) => setVariant(e.target.value)}
          >
            <option>Classic black</option>
            <option>Silver sleeve</option>
          </select>
          <button
            className="button dark full"
            onClick={() => add(p.slug, variant)}
          >
            Add to imaginary bag <Plus size={16} />
          </button>
          <p className="fiction-caption">
            FICTIONAL PRODUCT AND PRICE. NO PURCHASES OR PAYMENTS.
          </p>
          <details>
            <summary>The details</summary>
            <p>
              Imagined for lovers of fruit and excessive ceremony. Presentation
              options are simulated. Fruit is seasonal; this website is satire.
            </p>
          </details>
          <details>
            <summary>Delivery & care</summary>
            <p>
              No real delivery is offered. Please enjoy the concept at room
              temperature.
            </p>
          </details>
        </div>
      </section>
      <section className="section">
        <div className="section-heading">
          <h2>
            Another level of <em>unnecessary.</em>
          </h2>
          <Link className="under-link" href="/collection">
            All editions ↗
          </Link>
        </div>
        <ProductGrid featured />
      </section>
    </>
  );
}
export function Leadership() {
  return (
    <>
      <Intro
        index="LEADERSHIP / FICTIONAL CEO PERSONA"
        title="Leadership is a fruitful responsibility."
        description="The man behind the purple revolution. Piyush Roy, in a fictional corporate role created for this parody."
      />
      <section className="leadership-spread">
        <Photo
          src="/images/piyush/headshot.webp"
          alt="Piyush Roy, cropped from the supplied founder photograph"
        />
        <div>
          <p className="eyebrow">01 / THE FOUNDER</p>
          <h2>Piyush Roy.</h2>
          <p className="role">
            Founder, Chairman &<br />
            Chief Executive Officer
          </p>
          <span className="annotation">Fictional corporate persona</span>
          <p>
            In the imagined world of Jamun, Piyush leads a company with one
            product and an inexhaustible appetite for making it sound important.
          </p>
          <p>
            This is a character within a parody, not a biography. No claims are
            made about his actual education, personal history, wealth or
            achievements.
          </p>
          <div
            className="decorative-signature"
            aria-label="Decorative typeset name"
          >
            Piyush Roy
          </div>
          <small>DECORATIVE TYPESETTING</small>
        </div>
      </section>
      <section className="quote-section">
        <p className="eyebrow">A FICTIONAL CEO QUOTATION</p>
        <blockquote>
          “They told me to think outside the box.
          <br />
          So I put six jamuns
          <br />
          inside <em>a better box.</em>”
        </blockquote>
        <p>PIYUSH ROY / FICTIONAL CEO PERSONA</p>
      </section>
      <section className="section two-editorial">
        <Photo
          src="/images/piyush/orchard.webp"
          alt="Supplied image of Piyush examining jamun in an orchard"
        />
        <div>
          <p className="eyebrow">FROM ORCHARD TO INNOVATION</p>
          <h2>
            Close to the fruit.
            <br />
            <em>Far from ordinary.</em>
          </h2>
          <p>
            The fictional philosophy is simple: take the fruit seriously, and
            the corporate language even more seriously.
          </p>
          <Link href="/innovation" className="under-link">
            Explore the imagined research ↗
          </Link>
        </div>
      </section>
    </>
  );
}
const projects = [
  [
    'Purple Intelligence™',
    'A conceptual operating philosophy for identifying the purplest possibilities. No artificial intelligence required.',
  ],
  [
    'Seed Dynamics™',
    'An entirely fictional investigation into the boardroom potential of one small seed.',
  ],
  [
    'JamunOS™',
    'The imaginary operating system for your fruit bowl. Current version: seasonal.',
  ],
  [
    'Project Infinite Ripeness',
    'An ambitious thought experiment. The fruit remains subject to nature.',
  ],
];
export function Innovation() {
  const [selected, setSelected] = useState(0);
  return (
    <>
      <Intro
        index="JAMUN LABS / FICTIONAL RESEARCH"
        title="Science. Nature. Unreasonable ambition."
        description="Welcome to our imagined research division. No scientific evidence or health benefits are claimed. Just ideas with excellent names."
      />
      <section className="innovation-banner">
        <Photo
          src="/images/piyush/lab.webp"
          alt="Supplied fictional image of Piyush examining fruit in a laboratory"
        />
        <span>JAMUN LABS / CONCEPTUAL RESEARCH ONLY</span>
      </section>
      <section className="section">
        <div className="section-heading">
          <h2>
            Nature, with a<br />
            <em>research budget.</em>
          </h2>
          <p>
            Four imaginary programs.
            <br />
            One very real sense of theatre.
          </p>
        </div>
        <div className="project-tabs">
          {projects.map(([n, d], i) => (
            <div key={n}>
              <button
                aria-expanded={selected === i}
                onClick={() => setSelected(i)}
              >
                <span>0{i + 1}</span>
                <h3>{n}</h3>
                {selected === i ? <Minus /> : <Plus />}
              </button>
              {selected === i && (
                <div className="project-content">
                  <div className="seed-diagram" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                    <span>●</span>
                  </div>
                  <p>
                    {d}
                    <small>FICTIONAL PROJECT / NOT A SCIENTIFIC CLAIM</small>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      <section className="section">
        <p className="eyebrow">THE INNOVATION ROADMAP / FICTIONAL</p>
        <Timeline />
      </section>
    </>
  );
}
export function Investors() {
  const [period, setPeriod] = useState('This season');
  return (
    <>
      <Intro
        index="INVESTOR RELATIONS / FICTIONAL PARODY"
        title="A trillion-dollar vision. A single fruit."
        description="An entirely fictional investor presentation. No securities, fundraising, financial advice or investment opportunities are offered."
      />
      <section className="section investor-section">
        <div className="collection-note">
          <span>THE IMAGINARY PERFORMANCE REPORT</span>
          <select
            aria-label="Fictional reporting period"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option>This season</option>
            <option>Next season</option>
          </select>
        </div>
        <p className="annotation">
          All figures below are fictional jokes, with no financial meaning.
        </p>
        <div className="investor-kpis">
          {[
            ['Purple Ambition Index', period === 'This season' ? '∞' : '∞ + 1'],
            [
              'Fruit-to-Vision Ratio',
              period === 'This season' ? '1:1,000' : '1:2,000',
            ],
            [
              'Seed Confidence Score',
              period === 'This season' ? '110%' : '120%',
            ],
          ].map(([l, v]) => (
            <div key={l}>
              <p>{l}</p>
              <strong>{v}</strong>
              <small>FICTIONAL / NON-FINANCIAL</small>
            </div>
          ))}
        </div>
        <div className="chart">
          <div className="chart-label">
            UNREASONABLE AMBITION <span>Illustration only · fictional</span>
          </div>
          <svg
            viewBox="0 0 1000 260"
            role="img"
            aria-label="Illustrative fictional ambition curve rising across four imagined seasons"
          >
            <path
              d="M0 230H1000 M0 160H1000 M0 90H1000 M0 20H1000"
              stroke="#ddd"
              fill="none"
            />
            <path
              d={
                period === 'This season'
                  ? 'M0 230 Q250 225 480 180 T1000 20'
                  : 'M0 230 Q300 230 480 120 T1000 5'
              }
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
            />
          </svg>
          <div className="chart-axis">
            <span>ONE FRUIT</span>
            <span>BETTER BOX</span>
            <span>BOARDROOM</span>
            <span>BEYOND</span>
          </div>
        </div>
        <p>
          Our fictional outlook: continued investment in adjectives, disciplined
          expansion of packaging, and an unwavering commitment to taking this
          joke seriously.
        </p>
      </section>
    </>
  );
}
const jobs = [
  [
    'Chief Jamun Officer',
    'Executive / Imaginary headquarters',
    'Set the direction of the fruit. Attend meetings that could have been a fruit bowl.',
  ],
  [
    'Vice President of Purple Affairs',
    'Brand / Fictional global role',
    'Oversee all matters purple. Distinguish aubergine from ambition.',
  ],
  [
    'Senior Seed Analyst',
    'Research / Conceptual laboratory',
    'Look deeply into the seed. Produce a report with at least one diagram.',
  ],
  [
    'Global Ripeness Strategist',
    'Strategy / Seasonally remote',
    'Know when the time is right. Schedule a meeting to confirm.',
  ],
  [
    'Executive Fruit Polisher',
    'Craft / Imaginary atelier',
    'Bring a meticulous eye and a soft cloth. Respect the bloom.',
  ],
];
export function Careers() {
  const [active, setActive] = useState<number | null>(0),
    [apply, setApply] = useState<string | null>(null);
  return (
    <>
      <Intro
        index="CAREERS / FICTIONAL ROLES"
        title="Make your next move fruitful."
        description="Join the world’s most selective fictional fruit company. No vacancies are real. No applications or personal details are collected."
      />
      <section className="section jobs">
        {jobs.map(([n, meta, d], i) => (
          <div key={n} className="job">
            <button
              className="job-heading"
              onClick={() => setActive(active === i ? null : i)}
              aria-expanded={active === i}
            >
              <span>0{i + 1}</span>
              <h2>{n}</h2>
              {active === i ? <Minus /> : <Plus />}
            </button>
            {active === i && (
              <div className="job-body">
                <p className="eyebrow">{meta}</p>
                <p>{d}</p>
                <button className="under-link" onClick={() => setApply(n)}>
                  Imagine applying <ArrowUpRight size={16} />
                </button>
              </div>
            )}
          </div>
        ))}
      </section>
      {apply && (
        <Dialog
          title="Exceptional taste. Promising potential."
          onClose={() => setApply(null)}
        >
          <p>
            Congratulations. You are now under consideration by the world’s most
            selective fictional fruit company.
          </p>
          <p>
            Your imagined role: {apply}. This is a joke, not a job application.
            Nothing has been submitted or collected.
          </p>
          <button className="button dark" onClick={() => setApply(null)}>
            Return to the orchard ↗
          </button>
        </Dialog>
      )}
    </>
  );
}
export function Contact() {
  const [message, setMessage] = useState(false);
  return (
    <>
      <Intro
        index="CONTACT / DEMO EXPERIENCE"
        title="Great conversations start with a seed."
        description="Our headquarters exist somewhere between an orchard and an ambitious presentation. This contact experience is entirely fictional."
      />
      <Photo
        className="wide-photo"
        src="/images/editorial/headquarters.webp"
        alt="AI-generated concept of fictional Jamun headquarters"
      />
      <section className="section contact-layout">
        <div>
          <p className="eyebrow">THE IMAGINARY HEADQUARTERS</p>
          <h2>
            A place for
            <br />
            <em>bigger ideas.</em>
          </h2>
          <p>
            No real address, phone number or company inbox exists for this
            fictional brand.
          </p>
        </div>
        <div>
          <p className="eyebrow">START A FICTIONAL CONVERSATION</p>
          <h3>What brings you to Jamun?</h3>
          <select aria-label="Demo inquiry topic">
            <option>An unreasonable collaboration</option>
            <option>A packaging-related epiphany</option>
            <option>A general appreciation of fruit</option>
            <option>Something beyond fruit</option>
          </select>
          <button className="button dark full" onClick={() => setMessage(true)}>
            Open a demo conversation <ArrowUpRight size={16} />
          </button>
          <p className="muted">
            No message is sent. No personal data is collected.
          </p>
        </div>
      </section>
      {message && (
        <Dialog
          title="Your ambition has been acknowledged."
          onClose={() => setMessage(false)}
        >
          <p>
            Our imaginary team has metaphorically received your interest. This
            demo sends no messages and collects no information. Thank you for
            taking the fruit seriously.
          </p>
          <button className="button dark" onClick={() => setMessage(false)}>
            Perfectly understood ↗
          </button>
        </Dialog>
      )}
    </>
  );
}
export function Press() {
  const [article, setArticle] = useState<number | null>(null);
  const headlines = [
    'The fruit that called a board meeting.',
    'Six jamuns. One extraordinary box.',
    'The season’s most ambitious idea.',
  ];
  return (
    <>
      <Intro
        index="THE PRESS ROOM / FICTIONAL EDITORIAL"
        title="A little fruit. A lot to talk about."
        description="Original mock publications created for this parody. No real outlets, journalists or third-party endorsements are represented."
      />
      <section className="section press-grid">
        {headlines.map((h, i) => (
          <article key={h}>
            <button
              className={'magazine magazine-' + i}
              onClick={() => setArticle(i)}
              aria-label={'Read fictional editorial: ' + h}
            >
              <Image
                src={
                  i === 0
                    ? '/images/piyush/headshot.webp'
                    : i === 1
                      ? '/images/products/signature.webp'
                      : '/images/editorial/hero.webp'
                }
                fill
                alt="Original imagery used in a fictional Jamun magazine cover"
                sizes="(max-width:700px) 100vw, 33vw"
              />
              <span className="mag-top">
                THE JAMUN JOURNAL <small>FICTIONAL ISSUE 0{i + 1}</small>
              </span>
              <span className="mag-title">{h}</span>
              <span className="mag-foot">AN ORIGINAL PARODY PUBLICATION ↗</span>
            </button>
            <p className="eyebrow">FICTIONAL EDITORIAL / ISSUE 0{i + 1}</p>
            <h3>{h}</h3>
          </article>
        ))}
      </section>
      {article !== null && (
        <Dialog title={headlines[article]} onClose={() => setArticle(null)}>
          <p className="eyebrow">THE JAMUN JOURNAL / ORIGINAL FICTION</p>
          <p>
            {
              [
                'In the fictional boardroom of Jamun, the agenda is simple: one fruit, infinite ambition. Our imaginary founder’s greatest innovation may be treating a seasonal snack as an entire industry.',
                'What makes a box extraordinary? In the world of Jamun, apparently several meetings, a matte finish and an unreasonable price. The contents remain delightfully fruit-shaped.',
                'Every season brings new possibilities. Our imaginary strategy is to greet them with clean typography, excessive confidence and absolutely no real investment offering.',
              ][article]
            }
          </p>
          <p className="muted">
            Written for this parody. No external publication or endorsement.
          </p>
        </Dialog>
      )}
    </>
  );
}
