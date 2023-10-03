/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
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
import CustomCard from "../../../Card";
import { apiWithToken } from "../../../../utitlities/API";
import { useNavigate, useParams } from "react-router-dom";
const MineSweeper = () => {
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const dispatch = useDispatch();
  const params: any = useParams();
  const navigate = useNavigate();
  const { board, gameOver, score } = useSelector(
    (state: any) => state.mineSweeper
  );

const min = 19;
const max = 50;
const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  console.log(board, gameOver, score);

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
    navigate('/game/minesweeper')
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
      .catch((err) => {});
  };

  useEffect(() => {
    if (!params?.id) {
      dispatch(setBoard(createBoard(10, 10, randomNumber)));
    }
  }, [dispatch]);

  useEffect(()=>{
    if(params?.id){
      getGameStateById(params?.id);
    }
  },[params?.id])

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
                  key={colIndex}
                  className={`cell ${cell.isOpen ? "open" : ""}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  p="2"
                  textAlign="center"
                  border="1px solid gray"
                  cursor="pointer"
                  bgColor={cell.isOpen ? "gray.200" : "gray.100"}
                  width={"50px"}
                  height={"50px"}
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
