import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPokeDeck } from "./features/poke/pokeSlice";
import Info from "./components/Info";
import Board from "./components/Board";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPokeDeck());
  }, []);

  return (
    <div className="wrapper">
      <main>
        <h1>Pokemon Decks</h1>
        <div className="container">
          <Board />
        </div>
        <Info />
      </main>
    </div>
  );
}

export default App;
