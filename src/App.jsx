import Intro from "./components/Intro.jsx";
import Description from "./components/Description.jsx";
import Game from "./components/Game.jsx";


function App() {

  return (
      <div className="bg-sky-800 min-h-screen text-stone-300">
        <Description />
        <Intro />
        <Game />
      </div>
  )
}

export default App
