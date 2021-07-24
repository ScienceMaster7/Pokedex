import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
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
    let history = useHistory();
    function goback() {
      return history.push("/pokemon");
    }
    function loadprevious() {
      return history.push(`/pokemon/${id - 1}`);
    }
    function loadnext() {
      return history.push(`/pokemon/${Number(id) + 1}`);
    }
    if (isloading || pokemon === null) {
      return "Loading...";
    }
    function Pokemontypes() {
      const types = pokemon.types.map((pokemontype) => {
        return ` ${pokemontype.type.name}`;
      });
      return types;
    }
    function handleOnClickFavouriteButton() {
      const storage = localStorage.getItem("pokemonstorage");
      if (storage !== null) {
        console.log("pushed to array");
        const storedpokemon = storage;
        const favouritepokemon = JSON.parse(storedpokemon);
        favouritepokemon.push(id);
        localStorage.setItem(
          "pokemonstorage",
          JSON.stringify(favouritepokemon)
        );
      } else {
        console.log("new array created");
        const favouritepokemon = [];
        favouritepokemon.push(id);
        localStorage.setItem(
          "pokemonstorage",
          JSON.stringify(favouritepokemon)
        );
      }
    }

    return (
      <section className="pokemon__container">
        <h1 className="pokemon__header">{pokemon.name}</h1>
        <img
          className="pokemon__img--big"
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt=""
        />
        <p>
          <strong>Type:</strong> <Pokemontypes />
        </p>
        <button
          onClick={handleOnClickFavouriteButton}
          className="pokemon__button__favourite"
        >
          <FontAwesomeIcon icon={faStar} />
        </button>
        <div className="pokemon__button__container">
          {id > 1 && (
            <button
              className="pokemon__button__singlebutton"
              onClick={loadprevious}
            >
              Load previous
            </button>
          )}
          <button className="pokemon__button__singlebutton" onClick={goback}>
            Go back
          </button>
          {id < 898 && (
            <button
              className="pokemon__button__singlebutton"
              onClick={loadnext}
            >
              Load next
            </button>
          )}
        </div>
      </section>
    );
  }

  return <Renderpokemon />;
}
