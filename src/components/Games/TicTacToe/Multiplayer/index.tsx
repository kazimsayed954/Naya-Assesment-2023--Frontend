//eslint-disable @typescript-eslint/ban-ts-comment 
//@ts-nocheck
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import {
  Box,
  Button,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import "./index.css";

const ENDPOINT = "http://localhost:7899";

const TicTacToe = () => {
  const [socket, setSocket] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const [piece, setPiece] = useState("");
  const [gameState, setGameState] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [end, setEnd] = useState(false);

  useEffect(() => {
    setName(JSON.parse(localStorage.getItem('user'))?.name??'');
    const newSocket = io(ENDPOINT);
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);

  const handleNewGame = () => {
    socket.emit("newGame");
  };

  const handleJoinRoom = () => {
    if (roomId && name) {
      socket.emit("newRoomJoin", { room: roomId, name });
    }
  };

  const handleClick = (index) => {
    if (!gameState[index] && !end && turn) {
      socket.emit("move", { room: roomId, piece, index });
    }
  };

  const handlePlayAgain = () => {
    socket.emit("playAgainRequest", roomId);
  };

  useEffect(() => {
    if (socket) {
      socket.on("newGameCreated", (room) => {
        setRoomId(room);
      });

      socket.on("joinConfirmed", () => {
        setStatusMessage("Joined the room!");
      });

      socket.on("errorMessage", (message) => {
        setStatusMessage(message);
      });

      socket.on("pieceAssignment", ({ piece }) => {
        setPiece(piece);
      });

      socket.on("starting", ({ gameState, turn }) => {
        setGameState([...gameState]);
        setTurn(turn);
        setStatusMessage(`${name}'s Turn`);
        setShowModal(false);
        setEnd(false);
      });

      socket.on("update", ({ gameState, turn }) => {
        setGameState([...gameState]);
        setTurn(turn);
        setStatusMessage(turn ? "Your Turn" : `${name}'s Turn`);
      });

      socket.on("winner", ({ gameState, id }) => {
        setGameState([...gameState]);
        if (socket.id === id) {
          setStatusMessage("You Win");
        } else {
          setStatusMessage(`${name} Wins`);
        }
        setShowModal(true);
        setEnd(true);
      });

      socket.on("draw", ({ gameState }) => {
        setGameState([...gameState]);
        setStatusMessage("Draw");
        setShowModal(true);
        setEnd(true);
      });

      socket.on("restart", ({ gameState, turn }) => {
        setGameState([...gameState]);
        setTurn(turn);
        setStatusMessage(turn ? "Your Turn" : `${name}'s Turn`);
        setShowModal(false);
        setEnd(false);
      });
    }
  }, [socket, name]);

  return (
    <Box textAlign="center" p={4}>
      <Text fontSize="2xl">Tic-Tac-Toe</Text>
      <Stack spacing={3} mt={4} mb={4}>
        <Input
          placeholder="Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <Input
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button colorScheme="blue" onClick={handleJoinRoom}>
          Join Room
        </Button>
        <Button colorScheme="green" onClick={handleNewGame}>
          New Game
        </Button>
      </Stack>
      <Text fontSize="lg">Status: {statusMessage}</Text>
      <Box className="board">
        {gameState.map((value, index) => (
          <Button
            key={index}
            size="xl"
            fontSize="3xl"
            className={`square ${value === "X" ? "x" : value === "O" ? "o" : ""}`}
            onClick={() => handleClick(index)}
            // isDisabled={value || !turn || end}
            isDisabled={value !== null || !turn || end}
          >
            {value}
          </Button>
        ))}
      </Box>
      {showModal && (
        <Box className="modal" mt={4}>
          <Text fontSize="xl">{statusMessage}</Text>
          <Button colorScheme="blue" onClick={handlePlayAgain} mt={2}>
            Play Again
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default TicTacToe;