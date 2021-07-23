import { useEffect, useState } from "react";
import "./Pokemon.css";

export default function Pokemon({ Link }) {
  const [pagecount, setPagecount] = useState(0);
  const [pokemonlist, setPokemonlist] = useState([]);
  const [nextpage, setNextpage] = useState("https://pokeapi.co/api/v2/pokemon");
  useEffect(() => {
    const url = nextpage;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPokemonlist(data.results);
        setNextpage(data.next);
      });
  }, [pagecount]);
  function Renderpokemonlist() {
    const pokemons = pokemonlist.map((pokemon, index) => {
      const id = index + 1;
      return (
        <Link to={`/pokemon/${id}`} className="Pokemon__content__link">
          <section className="Pokemon__content__card">
            <h2 key={index}>{pokemon.name}</h2>
          </section>
        </Link>
      );
    });
    return pokemons;
  }
  function HandleLoadMoreClick() {
    setPagecount(pagecount + 1);
  }
  console.log(pagecount);
  return (
    <>
      <header className="Pokemon__header">
        <h1>Pokemon</h1>
      </header>
      <main className="Pokemon__content">
        <Renderpokemonlist />
        <button
          className="Pokemon__content__button"
          onClick={HandleLoadMoreClick}
        >
          Load more
        </button>
      </main>
    </>
  );
}
