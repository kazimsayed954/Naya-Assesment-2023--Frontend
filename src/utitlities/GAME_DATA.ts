// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import Avatar1 from "../assets/images/avatars/avatar1.png";
import Avatar2 from "../assets/images/avatars/avatar2.png";
import Avatar3 from "../assets/images/avatars/avatar3.png";
import Avatar4 from "../assets/images/avatars/avatar4.png";
import T3 from "../assets/images/games/T3.png";
import MineSweeper from "../assets/images/games/minesweeper.png";
import T3VsComputer from "../assets/images/games/T3vscomputer.png";


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


const gameData = [
{
    name:'TicTacToe (Multiplayer)',
    subtitle:"By Naya Game Studio",
    players:shuffleArray([
        Avatar1,
        Avatar2,
        Avatar3,
        Avatar4,
        Avatar1,
        Avatar2,
        Avatar3,
        Avatar4,
      ]),
      image:T3,
      path:"/game/tictactoe/multiplayer",
      highestscore:3

},
{
  name:'TicTacToe (Vs Computer)',
  subtitle:"By Naya Game Studio",
  players:shuffleArray([
      Avatar1,
      Avatar2,
      Avatar3,
      Avatar4,
      Avatar1,
      Avatar2,
      Avatar3,
      Avatar4,
    ]),
    image:T3VsComputer,
    path:"/game/tictactoe/computer",
    highestscore:'NA'

},
{
    name:'MineSweeper (Single Player)',
    subtitle:"By Naya Game Studio",
    players:shuffleArray([
        Avatar1,
        Avatar2,
        Avatar3,
        Avatar4,
        Avatar1,
        Avatar2,
        Avatar3,
        Avatar4,
      ]),
      image:MineSweeper,
      path:"/game/minesweeper",
      highestscore:3

}
]

export default gameData;