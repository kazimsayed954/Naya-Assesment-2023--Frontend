/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Center, Text, Grid, GridItem } from "@chakra-ui/react";
import {
  setBoard,
  setScore,
  setGameOver,
} from "../../../../../slice/minesweeperSlice";
import "../Game/index.css"
const MineSweeper = () => {
  const dispatch = useDispatch();
  const { board, gameOver, score } = useSelector(
    (state: any) => state.mineSweeper
  );

  console.log(board,gameOver,score);

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
  
    const updatedBoard = board.map((boardRow:any, rowIndex:any) =>
      boardRow.map((cell:any, colIndex:any) => {
        if (rowIndex === row && colIndex === col) {
          return { ...cell, isOpen: true };
        }
        return cell;
      })
    );
  
    dispatch(setBoard(updatedBoard));
  };
  

  const handleRestartGame = () => {
    dispatch(setBoard(createBoard(10, 10, 50)));
    dispatch(setScore(0));
    dispatch(setGameOver(false));
  };

  useEffect(() => {
    dispatch(setBoard(createBoard(10, 10, 50)));
  }, [dispatch]);

  return (
    <Center mt="10%">
      <Box className="minesweeper">
        <Grid templateColumns={`repeat(10, 1fr)`} gap={1} alignItems="center">
          {board?.map((row:any, rowIndex:number) =>
            row.map((cell:any, colIndex:number) => (
              <GridItem
            
                key={colIndex}
                className={`cell ${cell.isOpen ? "open" : ""}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                p="2"
                textAlign="center"
                border="1px solid gray"
                cursor="pointer"
                bgColor={cell.isOpen ? "gray.200" : "gray.100"}
              >
                {cell.isOpen ? (cell.isMine ? "💣" : "1") : ""}

              </GridItem>
            ))
          )}
        </Grid>
        {gameOver && (
          <>
            <Text className="game-over" mt="2">
              Game Over! Score: {score}
            </Text>
            <Button
              className="restart-button"
              mt="2"
              onClick={handleRestartGame}
            >
              Restart Game
            </Button>
          </>
        )}
      </Box>
    </Center>
  );
};

export default MineSweeper;
