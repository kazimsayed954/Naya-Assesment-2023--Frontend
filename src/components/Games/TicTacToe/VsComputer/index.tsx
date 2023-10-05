import { useEffect } from "react";
import { Box, Button, Text, Center, Flex } from "@chakra-ui/react";
import CustomCard from "../../../Card";
import { useDispatch, useSelector } from "react-redux";
import {
  setBoard,
  setPlayerTurn,
  setWinner,
} from "../../../../../slice/tictactoeVsComputerSlice";
import { apiWithToken } from "../../../../utitlities/API";
import { useParams } from "react-router-dom";

const TicTacToeVsComputer = () => {
  const initialBoard = Array(9).fill(null);
  const { playerTurn, winner, board } = useSelector(
    (state: any) => state.tictactoeVsComputer
  );
  const dispatch = useDispatch();
  const params: any = useParams();

  useEffect(() => {
    if (params?.id) {
      getGameStateById(params?.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.id]);

  useEffect(() => {
    if (!playerTurn && !winner) {
      // Computer's turn
      setTimeout(() => {
        const bestMove: number | any = findBestMove(board);
        if (bestMove !== -1) {
          const newBoard = [...board];
          newBoard[bestMove] = "O";
          dispatch(setBoard(newBoard));
          dispatch(setPlayerTurn(true)); // Player's turn
        }
      }, 1000); // Add a slight delay for a more natural feel
    }
  }, [playerTurn, board, winner]);

  useEffect(() => {
    // Check for a winner after each move
    const currentWinner = checkWinner(board);
    if (currentWinner) {
      dispatch(setWinner(currentWinner));
    }
  }, [board]);

  const checkWinner = (squares: any) => {
    const lines = [
      [0, 1, 2], // Top row
      [3, 4, 5], // Middle row
      [6, 7, 8], // Bottom row
      [0, 3, 6], // Left column
      [1, 4, 7], // Middle column
      [2, 5, 8], // Right column
      [0, 4, 8], // Diagonal from top-left to bottom-right
      [2, 4, 6], // Diagonal from top-right to bottom-left
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    if (!squares.includes(null)) {
      return "Draw";
    }

    return null;
  };

  const findBestMove = (squares: any) => {
    if (checkWinner(squares)) return;
    // Check if the computer can win in the next move
    for (let i = 0; i < 9; i++) {
      if (squares[i] === null) {
        const newBoard = [...squares];
        newBoard[i] = "O";
        if (checkWinner(newBoard) === "O") {
          return i;
        }
        newBoard[i] = null; // Reset the move
      }
    }

    // Check if the player can win in the next move and block it
    for (let i = 0; i < 9; i++) {
      if (squares[i] === null) {
        const newBoard = [...squares];
        newBoard[i] = "X";
        if (checkWinner(newBoard) === "X") {
          return i;
        }
        newBoard[i] = null; // Reset the move
      }
    }

    // Try to take the center square if available
    if (squares[4] === null) {
      return 4;
    }

    // Try to take a corner square if available
    const corners = [0, 2, 6, 8];
    for (let i = 0; i < corners.length; i++) {
      if (squares[corners[i]] === null) {
        return corners[i];
      }
    }

    // Take any available side square
    const sides = [1, 3, 5, 7];
    for (let i = 0; i < sides.length; i++) {
      if (squares[sides[i]] === null) {
        return sides[i];
      }
    }

    return -1; // No good move found
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return; // If the square is already taken or there's a winner, do nothing
    const newBoard = [...board];
    newBoard[index] = "X";
    dispatch(setBoard(newBoard));
    dispatch(setPlayerTurn(false)); // Computer's turn
  };

  const resetGame = () => {
    dispatch(setBoard(initialBoard));
    dispatch(setPlayerTurn(true));
    dispatch(setWinner(null));
  };
  const cellStyle = {
    width: "80px",
    height: "80px",
    fontSize: "3xl",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.2s ease-in-out",
  };

  const renderSquare = (index: number) => (
    <Button
      className="square"
      size="xl"
      fontSize="3xl"
      onClick={() => handleClick(index)}
      style={{
        color:
          board[index] === "X"
            ? "red"
            : board[index] === "O"
            ? "blue"
            : "inherit",
        ...cellStyle,
      }}
      isDisabled={board[index] !== null || winner || !playerTurn}
    >
      {board[index]}
    </Button>
  );

  const getStatusMessage = () => {
    if (winner) {
      return winner === "Draw" ? "It's a draw!" : `${winner} wins!`;
    } else {
      return `${playerTurn ? "Your" : "Computer's"} turn`;
    }
  };

  const getGameStateById = (id: any) => {
    apiWithToken
      .get(`/api/v1/game/getbyid/${id}?gametype=tictactoe`)
      .then((res) => {
        if (res?.status === 200) {
          dispatch(setBoard(res?.data?.board));
          dispatch(setPlayerTurn(res?.data?.playerTurn));
          dispatch(setWinner(res?.data?.winner));
        }
      })
      .catch((err: any) => {
        throw new err();
      });
  };

  return (
    <Box textAlign="center" p={4}>
      <Text fontSize="2xl" fontWeight="bold">
        Tic-Tac-Toe vs Computer
      </Text>

      <Box mt={4}>
        <CustomCard flexDirection="column" w="100%" p="34px">
          <Text fontSize="xl">{getStatusMessage()}</Text>
          <Flex justifyContent="center" alignItems="center">
            <Box className="board">
              {" "}
              {board.map((_square: any, index: number) => (
                <Center key={index ** (2 ** 3 + 1)}>
                  {renderSquare(index)}
                </Center>
              ))}
            </Box>
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            {(winner || !board?.includes(null)) && (
              <Button
                colorScheme="blue"
                onClick={resetGame}
                mt={4}
              >
                Restart Game
              </Button>
            )}
          </Flex>
        </CustomCard>
      </Box>
    </Box>
  );
};

export default TicTacToeVsComputer;
