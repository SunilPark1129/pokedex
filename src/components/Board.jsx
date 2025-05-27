import Card from "./Card";
import "./board.style.css";
import { useDispatch, useSelector } from "react-redux";
import { nextPokemon, prevPokemon } from "../features/poke/pokeSlice";

function Board() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.poke);

  return (
    <div className="board">
      <button
        className="board__btn board__btn--left"
        disabled={isLoading}
        onClick={() => dispatch(prevPokemon())}
      >
        PREV
      </button>
      <Card />
      <button
        className="board__btn board__btn--right"
        disabled={isLoading}
        onClick={() => dispatch(nextPokemon())}
      >
        NEXT
      </button>
    </div>
  );
}

export default Board;
