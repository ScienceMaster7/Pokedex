import "./Favourites.css";
export default function Favourites() {
  const pokemons = localStorage.getItem("pokemonstorage");
  const pokemonsarray = JSON.parse(pokemons);

  function Renderfavourites() {
    const renderedpokemon = pokemonsarray.map((nameandpicture) => {
      return (
        <section className="favourite__card">
          <h2 className="favourite__card__name">{nameandpicture.name}</h2>
          <img
            className="favourite__card__image"
            src={nameandpicture.img}
            alt=""
          />
        </section>
      );
    });
    return renderedpokemon;
  }
  return (
    <>
      <header className="favourite__header">
        <h1>My Favourites !</h1>
      </header>
      <main className="favourite__content">
        <Renderfavourites />
      </main>
    </>
  );
}
