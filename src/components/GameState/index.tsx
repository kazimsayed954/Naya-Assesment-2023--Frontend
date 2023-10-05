import {
  Button,
  Flex,
  Spinner,
  Text,
  Tooltip,
  useColorModeValue,
  useToast,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Alert,
  AlertIcon,
  AlertDescription,
} from "@chakra-ui/react";
import CustomCard from "../Card/index";
import { useEffect, useState, useRef } from "react";
import RowState from "./RowState";
import { apiWithToken } from "../../utitlities/API";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function GameStateColumn(props: {
  [x: string]: any;
  gametype: any;
}) {
  const { ...rest } = props;
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const brandColor = useColorModeValue("brand.500", "white");
  const cancelRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    board: mineSweeperBoard,
    gameOver: mineSweeperGameOver,
    score: mineSweeperScore,
  } = useSelector((state: any) => state.mineSweeper);

  const {
    playerTurn: ticTacToePlayerTurn,
    winner: ticTacToeWinner,
    board: ticTacToeBoard,
  } = useSelector((state: any) => state.tictactoeVsComputer);

  const [savedStateList, setSavedStateList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [deleteId, setDeletId] = useState<string>();
  const navigate = useNavigate();
  const toast = useToast();
  const params: any = useParams();
  useEffect(() => {
    props.gametype && getAllGameState();
  }, []);

  const handleGameOverWinnerCondition = () => {
    if (props.gametype === "minesweeper" && mineSweeperGameOver) {
      return true;
    }
    if (props.gametype === "tictactoe" && ticTacToeWinner) {
      return true;
    } else {
      return false;
    }
  };

  const handleSaveGame = () => {
    if (savedStateList?.length >= 5) {
      toast.closeAll();
      toast({
        title: " You can only Save 5 states per game.",
        description: "You can delete a previous game and then try to save.",
        status: "info",
        duration: 4000,
        isClosable: true,
      });
      return;
    }
    if (handleGameOverWinnerCondition()) {
      toast.closeAll();
      toast({
        title: mineSweeperBoard
          ? "The Game has been ended"
          : "The Game has been over",
        description: "You can't save a ended game",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }
    if (
      params?.id &&
      savedStateList?.some((item: any) => item?._id === params?.id)
    ) {
      hanldeUpdateGameState(params?.id);
    } else {
      const body = {
        board:
          props.gametype === "minesweeper" ? mineSweeperBoard : ticTacToeBoard,
        gameOver: mineSweeperGameOver,
        score: mineSweeperScore,
        gameType: props.gametype,
        playerTurn: ticTacToePlayerTurn,
        winner: ticTacToeWinner,
      };
      apiWithToken
        .post(`/api/v1/game/save`, body)
        .then((res) => {
          if (res?.status === 201) {
            getAllGameState();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getAllGameState = () => {
    if (savedStateList?.length >= 5) {
      return;
    }
    setLoader(true);
    apiWithToken
      .get(`/api/v1/game/getall?gametype=${props.gametype}`)
      .then((res) => setSavedStateList(res?.data ?? []))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoader(false));
  };

  const hanldeUpdateGameState = (id: any) => {
    const body = {
      board:
        props.gametype === "minesweeper" ? mineSweeperBoard : ticTacToeBoard,
      gameOver: mineSweeperGameOver,
      score: mineSweeperScore,
      gameType: props.gametype,
      playerTurn: ticTacToePlayerTurn,
      winner: ticTacToeWinner,
    };
    apiWithToken
      .put(`/api/v1/game/update/${id}`, body)
      .then((res) => {
        if (res?.status === 200) {
          getAllGameState();
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const handleDeleteState = (id: any) => {
    setLoader(true);
    apiWithToken
      .delete(`/api/v1/game/delete/${id}?gametype=${props?.gametype}`)
      .then((res) => {
        if (res?.status === 200) {
          getAllGameState();
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoader(false);
        onClose();
      });
  };

  const navigateUrl =
    props.gametype === "minesweeper"
      ? "/game/minesweeper"
      : props.gametype === "tictactoe"
      ? "/game/tictactoe/computer"
      : "/home";

  return (
    <CustomCard flexDirection="column" w="100%" p="34px" {...rest}>
      {props?.gametype ? (
        <div>
          <Flex align="center" mb="30px">
            <Text
              color={textColor}
              fontSize="xl"
              fontWeight="700"
              lineHeight="100%"
            >
              Game State
            </Text>

            <Tooltip label={"Save Game"}>
              <Button
                px="24px"
                ms="auto"
                variant="solid"
                isLoading={loader}
                onClick={() => handleSaveGame()}
              >
                <Text
                  fontSize="md"
                  color={brandColor}
                  fontWeight="700"
                  cursor="pointer"
                  my={{ sm: "1.5rem", lg: "0px" }}
                >
                  Save Game
                </Text>
              </Button>
            </Tooltip>
          </Flex>
          {loader ? (
            <Flex alignItems={"center"} justifyContent={"center"}>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                alignItems={"center"}
                justifyContent={"center"}
              />
            </Flex>
          ) : (
            <>
              {savedStateList?.length > 0 ?
                savedStateList?.map((item: any) => (
                  <>
                    <RowState
                      key={item?._id}
                      mb="43px"
                      name={item?._id}
                      date={item?.updatedAt}
                      action={() => navigate(navigateUrl + "/" + item?._id)}
                      gametype={props.gametype}
                      actionDelete={() => {
                        onOpen();
                        setDeletId(item?._id);
                      }}
                    />
                  </>
                ))
                :<Text textAlign={'center'}>No Saved Game Found</Text>
              }
            </>
          )}
          <Text
            color={"red"}
            textAlign={"center"}
            fontSize={"sm"}
            mt={loader ? "8px" : "0px"}
          >
            Note : You can only Save 5 states per game
          </Text>
        </div>
      ) : (
        <>
          <Alert status="info" borderRadius={"20px"}>
            <AlertIcon />
            <AlertDescription>
              Saving Game State feature is not available for this mode !!
            </AlertDescription>
          </Alert>
        </>
      )}

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Game State
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => handleDeleteState(deleteId)}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </CustomCard>
  );
}
