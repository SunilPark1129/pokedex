import { useSelector } from "react-redux";
import "./info.style.css";

function Info() {
  const { currPokeIndex, size } = useSelector((state) => state.poke);
  const page = size === 0 ? "0 / 0" : `${currPokeIndex + 1} / ${size}`;

  return (
    <div className="info">
      <div className="info__page">{page}</div>
      <div className="info__colors">
        <div>
          Evolution 1 - <span></span>
        </div>
        <div>
          Evolution 2 - <span></span>
        </div>
        <div>
          Evolution 3 - <span></span>
        </div>
      </div>
    </div>
  );
}

export default Info;
