import { useSelector } from "react-redux";
import Loading from "./Loading";
import "./card.style.css";

function Card() {
  const { selectedPokemon, isLoading } = useSelector((state) => state.poke);

  if (isLoading) return <Loading></Loading>;

  const { name, sprite, evolvedPath, type } = selectedPokemon;

  let style = "";
  if (evolvedPath[name]?.evolved === 0) {
    style = "card--first";
  } else if (evolvedPath[name]?.evolved === 1) {
    style = "card--second";
  } else if (evolvedPath[name]?.evolved === 2) {
    style = "card--third";
  }

  if (type === "grass") {
    style += " card--grass";
  } else if (type === "fire") {
    style += " card--fire";
  } else if (type === "water") {
    style += " card--water";
  }

  return (
    <div className={`card ${style}`}>
      <div className="card__img">
        <img src={sprite} alt={name} />
      </div>
      <p className="card__desc">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </p>
    </div>
  );
}

export default Card;
