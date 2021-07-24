export default function Favourites() {
  const pokemon = localStorage.getItem("pokemonstorage");
  console.log(pokemon);
  return <h1>My Favourites !</h1>;
}
