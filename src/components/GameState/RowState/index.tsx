/* eslint-disable @typescript-eslint/no-explicit-any */
// Chakra imports
import {
  Flex,
  Text,
  Button,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";

export default function RowState(props: {
  date: string;
  name: string;
  action: () => void | any;
  actionName: string;
  [x: string]: any;
  gametype?: string;
  actionDelete?: any;
}) {
  const { date, name, action, actionDelete, actionName, ...rest } = props;

  const dateFormatter = (val: string) => {
    const date = new Date(val);

    // Format the date in a readable format
    const options: any = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };

    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate;
  };

  const textColor = useColorModeValue("secondaryGray.900", "white");
  return (
    <Flex justifyContent="center" alignItems="center" w="100%" {...rest}>
      <Flex direction="column" align="start" me="auto">
        <Text color={textColor} fontSize="md" me="6px" fontWeight="700">
          {dateFormatter(date)}
        </Text>
        <Text color="secondaryGray.600" fontSize="sm" fontWeight="500">
          {name}
        </Text>
      </Flex>

      <Tooltip label={"Resume Game"}>
        <Button
          variant="action"
          px="24px"
          onClick={action}
          fontSize="sm"
          fontWeight="700"
        >
          {actionName}
        </Button>
      </Tooltip>

      <Tooltip label={"Delete Game"}>
        <Button
          variant="action"
          color={"red"}
          px="24px"
          onClick={() => actionDelete(name)}
          fontSize="sm"
          fontWeight="700"
        >
          {"Delete"}
        </Button>
      </Tooltip>
    </Flex>
  );
}
