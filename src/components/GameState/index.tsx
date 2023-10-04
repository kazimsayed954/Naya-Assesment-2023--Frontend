import {
  Button,
  Flex,
  Spinner,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import CustomCard from "../Card/index";
import React, { useEffect, useState } from "react";
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
  const { board, gameOver, score } = useSelector(
    (state: any) => state.mineSweeper
  );
  const [savedStateList, setSavedStateList] = useState([]);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const params: any = useParams();

  useEffect(() => {
    props.gametype === "minesweeper" && getAllGameState();
  }, []);

  const handleSaveGame = () => {
    if (
      params?.id &&
      savedStateList?.some((item: any) => item?._id === params?.id)
    ) {
      hanldeUpdateGameState(params?.id);
    } else {
      const body = {
        board,
        gameOver,
        score,
        gameType: props.gametype,
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

    if(savedStateList?.length >=5){
        return ;
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
      board,
      gameOver,
      score,
      gameType: props.gametype,
    };
    apiWithToken
      .put(`/api/v1/game/update/${id}`, body)
      .then((res) => {
        if (res?.status === 200) {
          getAllGameState();
        }
      })
      .catch((err:any) => {throw new err});
  };

  const handleDeleteState = (id: any) => {
    apiWithToken
      .delete(`/api/v1/game/delete/${id}?gametype=${props?.gametype}`)
      .then((res) => {
        if (res?.status === 200) {
          getAllGameState();
        }
      })
      .catch((err) => {throw new err});
  };

  return (
    <CustomCard flexDirection="column" w="100%" p="34px" {...rest}>
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
          {savedStateList?.length > 0 &&
            savedStateList?.map((item: any) => (
              <>
                <RowState
                  key={item?._id}
                  mb="43px"
                  name={item?._id}
                  date={item?.updatedAt}
                  action={() => navigate(`/game/minesweeper/${item?._id}`)}
                  actionName="Resume"
                  gametype={props.gametype}
                  actionDelete={handleDeleteState}
                />
              </>
            ))}
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
    </CustomCard>
  );
}
