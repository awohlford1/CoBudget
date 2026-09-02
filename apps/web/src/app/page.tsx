import { ThemeToggle } from "../theme/ThemeToggle";

export default function Home() {
  return (
    <main className="site-shell">
      <section className="intro" aria-labelledby="page-title">
        <p className="eyebrow">MoneyPact</p>
        <h1 id="page-title">Make a plan. Keep your commitments.</h1>
        <p className="mission">
          Our mission is to make responsible money management a shared
          experience.
        </p>
        <div className="status" role="status">
          <span aria-hidden="true" />
          Web foundation ready
        </div>
        <ThemeToggle />
      </section>
    </main>
  );
}
