import { useSelector } from "react-redux";
import "./info.style.css";

function Info() {
  const { currPokeIndex, size, isLoading, selectedPokemon } = useSelector(
    (state) => state.poke
  );

  const page = size === 0 ? "0 / 0" : `${currPokeIndex + 1} / ${size}`;

  const { name, evolvedPath, type } = isLoading ? {} : selectedPokemon;

  const evolveStage = isLoading ? "" : evolvedPath[name]?.evolved;

  return (
    <div className="info">
      <div className="info__page">{page}</div>
      <div className="info__colors info__colors--type">
        <div className={`${type === "grass" && "info__type"}`}>
          Grass types - <span></span>
        </div>
        <div className={`${type === "fire" && "info__type"}`}>
          Fire types - <span></span>
        </div>
        <div className={`${type === "water" && "info__type"}`}>
          Water types - <span></span>
        </div>
      </div>
      <div className="info__colors info__colors--evol">
        <div className={`${evolveStage === 0 && "info__evol"}`}>
          Evolution 1 - <span></span>
        </div>
        <div className={`${evolveStage === 1 && "info__evol"}`}>
          Evolution 2 - <span></span>
        </div>
        <div className={`${evolveStage === 2 && "info__evol"}`}>
          Evolution 3 - <span></span>
        </div>
      </div>
    </div>
  );
}

export default Info;
