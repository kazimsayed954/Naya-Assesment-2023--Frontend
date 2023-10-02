// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import Avatar1 from "../assets/images/avatars/avatar1.png";
import Avatar2 from "../assets/images/avatars/avatar2.png";
import Avatar3 from "../assets/images/avatars/avatar3.png";
import Avatar4 from "../assets/images/avatars/avatar4.png";
import T3 from "../assets/images/games/T3.png";
import MineSweeper from "../assets/images/games/minesweeper.png";

const gameData = [
{
    name:'TicTacToe',
    subtitle:"By Naya Game Studio",
    players:[
        Avatar1,
        Avatar2,
        Avatar3,
        Avatar4,
        Avatar1,
        Avatar1,
        Avatar1,
        Avatar1,
      ],
      image:T3,
      path:"/game/tictactoe",
      highestscore:3

},
{
    name:'MineSweeper',
    subtitle:"By Naya Game Studio",
    players:[
        Avatar1,
        Avatar2,
        Avatar3,
        Avatar4,
        Avatar1,
        Avatar1,
        Avatar1,
        Avatar1,
      ],
      image:MineSweeper,
      path:"/game/minesweeper",
      highestscore:3

}
]

export default gameData;