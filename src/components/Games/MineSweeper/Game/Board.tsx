import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Center,
  Text,
  Grid,
  GridItem,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import {
  setBoard,
  setScore,
  setGameOver,
} from "../../../../../slice/minesweeperSlice";
import "../Game/index.css";
import { apiWithToken } from "../../../../utitlities/API";
import { useNavigate, useParams } from "react-router-dom";
const MineSweeper = () => {
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const localStorage: any = window?.localStorage;

  const dispatch = useDispatch();
  const params: any = useParams();
  const navigate = useNavigate();
  const { board, gameOver, score } = useSelector(
    (state: any) => state.mineSweeper
  );
  const [highestScore, setHighestScore] = useState(0);

  const min = 19;
  const max = 50;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  const getHighestScore = () => {
    const userId = JSON.parse(localStorage.getItem("user"))?.userId;
    const gameType = "minesweeper"; // Replace with your game type
    const highestScoreKey = `${userId}_${gameType}_highest_score`;
    const storedScore = localStorage.getItem(highestScoreKey);
    return storedScore ? parseInt(storedScore) : 0;
  };

  // Function to update the highest score for the current user and game type in localStorage
  const updateHighestScore = (newScore: number) => {
    const userId = JSON.parse(localStorage.getItem("user"))?.userId; // Replace with your user ID retrieval logic
    const gameType = "minesweeper"; // Replace with your game type
    const highestScoreKey = `${userId}_${gameType}_highest_score`;
    const currentHighestScore = getHighestScore();
    if (newScore > currentHighestScore) {
      localStorage.setItem(highestScoreKey, newScore.toString());
      setHighestScore(newScore);
    }
  };

  const createBoard = (rows: number, cols: number, minesCount: number) => {
    const newBoard = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({ isOpen: false, isMine: false }))
    );

    // Place mines randomly on the board
    let minesPlaced = 0;
    while (minesPlaced < minesCount) {
      const randomRow = Math.floor(Math.random() * rows);
      const randomCol = Math.floor(Math.random() * cols);

      if (!newBoard[randomRow][randomCol].isMine) {
        newBoard[randomRow][randomCol].isMine = true;
        minesPlaced++;
      }
    }

    return newBoard;
  };

  const handleCellClick = (row: number, col: number) => {
    if (board[row][col]?.isOpen || gameOver) return;

    if (board[row][col]?.isMine === false) {
      dispatch(setScore(score + 1));
    }

    if (board[row][col]?.isMine) {
      dispatch(setGameOver(true));
      updateHighestScore(score);
    }

    const updatedBoard = board.map((boardRow: any, rowIndex: any) =>
      boardRow.map((cell: any, colIndex: any) => {
        if (rowIndex === row && colIndex === col) {
          return { ...cell, isOpen: true };
        }
        return cell;
      })
    );

    dispatch(setBoard(updatedBoard));
  };

  const handleRestartGame = () => {
    dispatch(setBoard(createBoard(10, 10, randomNumber)));
    dispatch(setScore(0));
    dispatch(setGameOver(false));
    navigate("/game/minesweeper");
  };

  const getGameStateById = (id: any) => {
    apiWithToken
      .get(`/api/v1/game/getbyid/${id}?gametype=minesweeper`)
      .then((res) => {
        if (res?.status === 200) {
          dispatch(setBoard(res?.data?.board));
          dispatch(setGameOver(res?.data?.gameOver));
          dispatch(setScore(res?.data?.score));
        }
      })
      .catch((err: any) => {
        throw new err();
      });
  };

  useEffect(() => {
    if (!params?.id) {
      dispatch(setBoard(createBoard(10, 10, randomNumber)));
    }
    // Retrieve the highest score when the component mounts
    const userHighestScore = getHighestScore();
    setHighestScore(userHighestScore);
  }, [dispatch]);

  useEffect(() => {
    if (params?.id) {
      getGameStateById(params?.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.id]);

  return (
    <>
      <Center>
        <Box className="minesweeper">
          <Text
            color={textColor}
            fontSize="xl"
            fontWeight="700"
            lineHeight="100%"
            textAlign={"center"}
            mb={"20px"}
          >
            MineSweeper
          </Text>
          <Grid templateColumns={`repeat(10, 1fr)`} gap={1} alignItems="center">
            {board?.map((row: any, rowIndex: number) =>
              row.map((cell: any, colIndex: number) => (
                <GridItem
                  key={colIndex * (2 + 43)}
                  className={`cell ${cell.isOpen ? "open" : ""}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  p="2"
                  textAlign="center"
                  border="1px solid gray"
                  cursor="pointer"
                  bgColor={cell.isOpen ? "gray.200" : "gray.100"}
                  width={"50px"}
                  height={"50px"}
                  borderRadius={"5px"}
                >
                  {cell.isOpen ? (cell.isMine ? "💣" : "1") : ""}
                </GridItem>
              ))
            )}
          </Grid>
          {gameOver && (
            <>
              <Flex
                direction={"column"}
                alignItems="center"
                justifyContent="center"
                mb={"20px"}
              >
                <Text className="game-over" mt="2" textAlign={"center"}>
                  Game Over! Score: {score}
                </Text>
                <Text mt="2" textAlign={"center"} color={"green"}>
                  Highest Score: {highestScore}
                </Text>
                <Button
                  variant={"outline"}
                  mt="2"
                  onClick={handleRestartGame}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  Restart Game
                </Button>
              </Flex>
            </>
          )}
        </Box>
      </Center>
    </>
  );
};

export default MineSweeper;
