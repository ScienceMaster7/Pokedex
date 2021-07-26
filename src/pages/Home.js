import "./Home.css";
export default function Home({ Link }) {
  return (
    <>
      <header>
        <h1>Pokedex</h1>
      </header>
      <main>
        <section>
          <nav className="Pokedex__nav">
            <Link className="Pokedex__nav__link" to="/pokemon">
              Pokemon
            </Link>
          </nav>
          <nav className="Pokedex__nav">
            <Link className="Pokedex__nav__link" to="/favourites">
              Favourites
            </Link>
          </nav>
        </section>
      </main>
    </>
  );
}
