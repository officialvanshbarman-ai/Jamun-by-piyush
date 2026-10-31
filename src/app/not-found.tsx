import Link from 'next/link';
export default function NotFound() {
  return (
    <section className="page-intro">
      <p className="eyebrow">404 / LOST IN THE ORCHARD</p>
      <h1>
        This fruit
        <br />
        doesn’t exist.
      </h1>
      <Link className="button" href="/">
        Return home ↗
      </Link>
    </section>
  );
}
