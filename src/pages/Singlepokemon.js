import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import "./Singlepokemon.css";

export default function Singlepokemon() {
  const [pokemon, setPokemon] = useState(null);
  const [isloading, setIsloading] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    setIsloading(true);
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPokemon(data);
        setIsloading(false);
      });
  }, [id]);

  function Renderpokemon() {
    if (isloading || pokemon === null) {
      return "Loading...";
    }

    return (
      <section>
        <h1>{pokemon.name}</h1>
        <img
          className="pokemon__img--big"
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt=""
        />
      </section>
    );
  }

  return <Renderpokemon />;
}
