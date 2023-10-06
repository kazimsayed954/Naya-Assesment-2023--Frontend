import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Box, Button, Input, Stack, Text, Flex, Center } from "@chakra-ui/react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import {
  // Import your action creators here
  setRoomId,
  setName,
  setPiece,
  setGameState,
  setTurn,
  setStatusMessage,
  setShowModal,
  setEnd,
} from "../../../../../slice/tictactoeSlice";
import CustomCard from "../../../Card";

const ENDPOINT = import.meta.env.VITE_REACT_APP_API_KEY;

const MuliplayerT3 = () => {
  const dispatch = useDispatch();
  const {
    roomId,
    name,
    piece,
    gameState,
    turn,
    statusMessage,
    showModal,
    end,
  } = useSelector((state: any) => state?.tictactoe);
  const [socket, setSocket] = useState<any>(null);
  const [isJoinRoomClicked, setIsJoinRoomClicked] = useState<boolean>(false);

  useEffect(() => {
    const userObj: any = localStorage.getItem("user");
    const userName: any = JSON.parse(userObj)?.name ?? "";
    dispatch(setName(userName));
    const newSocket = io(ENDPOINT);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleNewGame = () => {
    socket.emit("newGame");
  };

  const handleJoinRoom = () => {
    if (roomId && name) {
      setIsJoinRoomClicked(true);
      socket.emit("newRoomJoin", { room: roomId, name });
    }
  };

  const handleClick = (index: number) => {
    if (!gameState[index] && !end && turn) {
      socket.emit("move", { room: roomId, piece, index });
    }
  };

  const handlePlayAgain = () => {
    socket.emit("playAgainRequest", roomId);
  };

  const handleExitRoom = () => {
    if (socket && roomId) {
      socket.emit("exitRoom", roomId);

      // Reset the room-related state values
      dispatch(setRoomId(""));
      dispatch(setStatusMessage("")); // Clear the status message
      dispatch(setGameState(Array(9).fill(null)));
      setIsJoinRoomClicked(false); // Reset the join room button state
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("newGameCreated", (room: string | number) => {
        setRoomId(room);
        dispatch(setRoomId(room)); // Dispatch to update roomId
      });

      socket.on("joinConfirmed", () => {
        dispatch(setStatusMessage("Joined the room")); // Dispatch to update statusMessage
      });

      socket.on("errorMessage", (message: string) => {
        dispatch(setStatusMessage(message)); // Dispatch to update statusMessage
      });

      socket.on("pieceAssignment", ({ piece }: any) => {
        dispatch(setPiece(piece)); // Dispatch to update piece
      });

      socket.on("starting", ({ gameState, turn }: any) => {
        dispatch(setGameState([...gameState])); // Dispatch to update gameState
        dispatch(setTurn(turn)); // Dispatch to update turn
        dispatch(setStatusMessage(`${name}'s Turn`)); // Dispatch to update statusMessage
        dispatch(setShowModal(false)); // Dispatch to update showModal
        dispatch(setEnd(false)); // Dispatch to update end
      });

      socket.on("update", ({ gameState, turn }: any) => {
        dispatch(setGameState([...gameState])); // Dispatch to update gameState
        dispatch(setTurn(turn)); // Dispatch to update turn
        dispatch(
          setStatusMessage(turn ? "Your Turn" : `${name}'s Turn`)
        ); // Dispatch to update statusMessage
      });

      socket.on("winner", ({ gameState, id }: any) => {
        dispatch(setGameState([...gameState])); // Dispatch to update gameState
        if (socket.id === id) {
          dispatch(setStatusMessage("You Win")); // Dispatch to update statusMessage
        } else {
          dispatch(setStatusMessage(`Opponent Wins`)); // Dispatch to update statusMessage
        }
        dispatch(setShowModal(true)); // Dispatch to update showModal
        dispatch(setEnd(true)); // Dispatch to update end
      });

      socket.on("draw", ({ gameState }: any) => {
        dispatch(setGameState([...gameState])); // Dispatch to update gameState
        dispatch(setStatusMessage("Draw")); // Dispatch to update statusMessage
        dispatch(setShowModal(true)); // Dispatch to update showModal
        dispatch(setEnd(true)); // Dispatch to update end
      });

      socket.on("restart", ({ gameState, turn }: any) => {
        dispatch(setGameState([...gameState])); // Dispatch to update gameState
        dispatch(setTurn(turn)); // Dispatch to update turn
        dispatch(
          setStatusMessage(turn ? "Your Turn" : `${name}'s Turn`)
        ); // Dispatch to update statusMessage
        dispatch(setShowModal(false)); // Dispatch to update showModal
        dispatch(setEnd(false)); // Dispatch to update end
      });
    }
  }, [socket, name, dispatch]);

  const cellStyle = {
    width: "80px",
    height: "80px",
    fontSize: "3xl",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.2s ease-in-out",
  };

  return (
    <Center>
      <CustomCard flexDirection="column" w="100%" p="34px">
        <Text fontSize="2xl" fontWeight={"black"} mb={4} textAlign={'center'}>
          Tic-Tac-Toe
        </Text>

        <Stack spacing={3} align="center" mb={4}>
          <Flex
            alignItems="center"
            justifyContent="center"
            flexDirection={{ base: "column", md: "row" }}
            gap={4}
          >
            <Input
              placeholder="Room ID"
              value={roomId}
              onChange={(e) => dispatch(setRoomId(e.target.value))}
              width={{ base: "100%", md: "240px" }}
            />
            <Input
              placeholder="Your Name"
              value={name}
              onChange={(e) => dispatch(setName(e.target.value))}
              width={{ base: "100%", md: "240px" }}
            />
          </Flex>
          <Flex
            alignItems="center"
            justifyContent="center"
            flexDirection={{ base: "column", md: "row" }}
            gap={4}
          >
            <Button
              colorScheme="green"
              onClick={handleNewGame}
              width={{ base: "100%", md: "240px" }}
              isDisabled={isJoinRoomClicked}
            >
              Create Room
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleJoinRoom}
              width={{ base: "100%", md: "240px" }}
              isDisabled={isJoinRoomClicked}
            >
              Join Room
            </Button>
            {roomId && socket && statusMessage && (
              <Button
                colorScheme="red"
                onClick={handleExitRoom}
                width={{ base: "100%", md: "240px" }}
                isDisabled={!showModal}
              >
                Exit Room
              </Button>
            )}
          </Flex>
        </Stack>

        {statusMessage && (
          <Text fontSize="lg" mb={4} textAlign={'center'}>
            Status: {statusMessage}
          </Text>
        )}

        <Flex justifyContent="center" alignItems="center">
          <Box className="board">
            {gameState?.map((value: any, index: number) => (
              <Button
                key={index ** 3 + 2}
                size="xl"
                fontSize="3xl"
                style={cellStyle}
                className={`square ${
                  value === "X" ? "x" : value === "O" ? "o" : ""
                }`}
                onClick={() => handleClick(index)}
                isDisabled={value !== null || !turn || end}
              >
                {value}
              </Button>
            ))}
          </Box>
        </Flex>

        {showModal && (
          <Box className="modal" mt={4}>
            <Text fontSize="xl" textAlign={'center'}>{statusMessage}</Text>
            <Flex justifyContent={'center'} alignItems={'center'}>
            <Button colorScheme="blue" onClick={handlePlayAgain} mt={2}>
              Play Again
            </Button>
            </Flex>
          </Box>
        )}
      </CustomCard>
    </Center>
  );
};

export default MuliplayerT3;
