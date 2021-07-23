export default function Home({ Link }) {
  return (
    <>
      <header>
        <h1>Pokedex</h1>
      </header>
      <main>
        <section>
          <nav>
            <Link to="/pokemon">Pokemon</Link>
          </nav>
        </section>
      </main>
    </>
  );
}
