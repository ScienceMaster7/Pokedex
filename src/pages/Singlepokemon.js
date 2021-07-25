import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidstar } from "@fortawesome/free-solid-svg-icons";
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
        return <li>{pokemontype.type.name}</li>;
      });
      return types;
    }
    function Pokemonabilities() {
      const abilities = pokemon.abilities.map((pokemonability) => {
        return <li>{pokemonability.ability.name}</li>;
      });
      return abilities;
    }
    let favoriteiconsolid = false;
    function handleOnClickFavouriteButton() {
      favoriteiconsolid = true;
      const nameandimage = {
        name: pokemon.name,
        img: pokemon.sprites.other["official-artwork"].front_default,
      };
      const storage = localStorage.getItem("pokemonstorage");
      if (storage !== null) {
        const storedpokemon = storage;
        const favouritepokemon = JSON.parse(storedpokemon);
        favouritepokemon.push(nameandimage);
        localStorage.setItem(
          "pokemonstorage",
          JSON.stringify(favouritepokemon)
        );
      } else {
        const favouritepokemon = [];
        favouritepokemon.push(nameandimage);
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
        <p className="pokemon__paragraph__abilities">
          <strong>Type</strong>
        </p>
        <ul>
          <Pokemontypes />
        </ul>
        <p className="pokemon__paragraph__abilities">
          <strong>Abilities</strong>
        </p>
        <ul>
          <Pokemonabilities />
        </ul>
        <button
          onClick={handleOnClickFavouriteButton}
          className="pokemon__button__favourite"
        >
          {favoriteiconsolid === false && <FontAwesomeIcon icon={faStar} />}
          {favoriteiconsolid === true && <FontAwesomeIcon icon={solidstar} />}
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
