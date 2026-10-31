'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useContext, createContext, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Minus, Plus, X, Menu, ShoppingBag } from 'lucide-react';
import { products, navigation, money } from '@/data/content';
type BagItem = { slug: string; quantity: number; variant: string };
const BagContext = createContext<{
  add: (slug: string, variant: string) => void;
}>({ add: () => {} });
export const useBag = () => useContext(BagContext);
export function Dialog({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    const old = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    ref.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const list = ref.current?.querySelectorAll<HTMLElement>(
          'button,a,input,select,textarea,[tabindex="0"]',
        );
        if (!list?.length) return;
        const first = list[0],
          last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', key);
    return () => {
      document.body.style.overflow = old;
      document.removeEventListener('keydown', key);
      previous?.focus();
    };
  }, [onClose]);
  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="dialog"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        ref={ref}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="icon close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X />
        </button>
        <p className="eyebrow">JAMUN™ / SIMULATED EXPERIENCE</p>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
}
export function Shell({ children }: { children: React.ReactNode }) {
  const [menu, setMenu] = useState(false),
    [bag, setBag] = useState(false),
    [checkout, setCheckout] = useState(false),
    [items, setItems] = useState<BagItem[]>([]);
  const path = usePathname();
  const reduced = useReducedMotion();
  const count = items.reduce((s, i) => s + i.quantity, 0);
  const total = items.reduce(
    (s, i) =>
      s + (products.find((p) => p.slug === i.slug)?.price || 0) * i.quantity,
    0,
  );
  function add(slug: string, variant: string) {
    setItems((old) => {
      const found = old.find((i) => i.slug === slug && i.variant === variant);
      return found
        ? old.map((i) => (i === found ? { ...i, quantity: i.quantity + 1 } : i))
        : [...old, { slug, quantity: 1, variant }];
    });
    setBag(true);
  }
  function change(index: number, delta: number) {
    setItems((old) =>
      old
        .map((i, n) =>
          n === index ? { ...i, quantity: i.quantity + delta } : i,
        )
        .filter((i) => i.quantity > 0),
    );
  }
  return (
    <BagContext.Provider value={{ add }}>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <header
        className={path === '/' ? 'site-header home-header' : 'site-header'}
      >
        <Link href="/" aria-label="Jamun home" className="logo">
          <Image
            src="/images/brand/logo.webp"
            alt="Jamun™"
            width={150}
            height={48}
            priority
          />
        </Link>
        <nav aria-label="Main navigation">
          {navigation.map(([n, h]) => (
            <Link className={path === h ? 'active' : ''} href={h} key={h}>
              {n}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="bag-button"
            onClick={() => setBag(true)}
            aria-label={`Open bag, ${count} items`}
          >
            <ShoppingBag size={17} />
            <span>Bag ({count})</span>
          </button>
          <button
            className="icon menu-toggle"
            onClick={() => setMenu(true)}
            aria-label="Open menu"
          >
            <Menu />
          </button>
        </div>
      </header>
      <AnimatePresence mode="wait">
        <motion.main
          id="main"
          key={path}
          initial={{ opacity: reduced ? 1 : 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <footer>
        <div className="footer-top">
          <Link className="footer-word" href="/">
            Jamun<sup>™</sup>
          </Link>
          <p>
            One fruit.
            <br />
            Infinite ambition.
          </p>
          <a href="#main" className="back-top">
            Back to top ↑
          </a>
        </div>
        <div className="footer-links">
          {[...navigation, ['Careers', '/careers'], ['Press', '/press']].map(
            ([n, h]) => (
              <Link key={h} href={h}>
                {n}
                <ArrowUpRight size={12} />
              </Link>
            ),
          )}
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Jamun™. Beyond Fruit.</span>
          <p>
            A fictional parody project — not a real company.
            <br />
            All products, prices, corporate claims and CEO quotations are
            fictional. No purchases, investments or applications are accepted.
          </p>
          <span>Conceived with unreasonable ambition.</span>
        </div>
      </footer>
      {menu && (
        <Dialog title="Explore Jamun." onClose={() => setMenu(false)}>
          <nav className="mobile-links">
            {[...navigation, ['Careers', '/careers'], ['Press', '/press']].map(
              ([n, h], i) => (
                <Link href={h} key={h} onClick={() => setMenu(false)}>
                  <small>0{i + 1}</small>
                  {n}
                  <ArrowUpRight />
                </Link>
              ),
            )}
          </nav>
        </Dialog>
      )}
      {bag && (
        <Dialog title="Your selection." onClose={() => setBag(false)}>
          <p className="muted">
            An exercise in taste. All prices are fictional.
          </p>
          {items.length === 0 ? (
            <div className="empty-bag">
              <p>Your bag is full of potential.</p>
              <Link
                href="/collection"
                className="button dark"
                onClick={() => setBag(false)}
              >
                Explore the collection ↗
              </Link>
            </div>
          ) : (
            <>
              <div className="bag-items">
                {items.map((item, index) => {
                  const p = products.find((p) => p.slug === item.slug)!;
                  return (
                    <div className="bag-item" key={item.slug + item.variant}>
                      <Image
                        src={p.image}
                        width={80}
                        height={95}
                        alt={p.name}
                      />
                      <div>
                        <h3>{p.name}</h3>
                        <small>{item.variant}</small>
                        <p>{p.price ? money(p.price) : 'Upon imagination'}</p>
                        <div className="quantity">
                          <button
                            aria-label={`Remove one ${p.name}`}
                            onClick={() => change(index, -1)}
                          >
                            <Minus size={14} />
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            aria-label={`Add one ${p.name}`}
                            onClick={() => change(index, 1)}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="subtotal">
                <span>Imaginary subtotal</span>
                <strong>{money(total)}</strong>
              </div>
              <button
                className="button dark full"
                onClick={() => {
                  setBag(false);
                  setCheckout(true);
                }}
              >
                Proceed to mock checkout <ArrowUpRight size={16} />
              </button>
              <small>
                No orders. No payments. Just exceptionally good taste.
              </small>
            </>
          )}
        </Dialog>
      )}
      {checkout && (
        <Dialog
          title="Some things are priceless. This is fictional."
          onClose={() => setCheckout(false)}
        >
          <p>
            This is a parody checkout. Your {count} imaginary item
            {count === 1 ? '' : 's'} will remain an idea. No orders are placed,
            no payment is collected and no personal information is requested.
          </p>
          <button
            className="button dark"
            onClick={() => {
              setCheckout(false);
              setItems([]);
            }}
          >
            Complete the imaginary experience ↗
          </button>
        </Dialog>
      )}
    </BagContext.Provider>
  );
}
