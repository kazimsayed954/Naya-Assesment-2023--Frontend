import { ArrowRightIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Flex,
  Text,
  useColorModeValue,
  Tooltip,
  IconButton,
} from "@chakra-ui/react";

export default function RowState(props: {
  date: string;
  name: string;
  action: () => void | any;
  [x: string]: any;
  gametype?: string;
  actionDelete?: any;
}) {
  const { date, name, action, actionDelete, ...rest } = props;

  const dateFormatter = (val: string) => {
    const date = new Date(val);

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
        <IconButton
          aria-label="resume"
          px="24px"
          onClick={action}
          fontSize="sm"
          fontWeight="700"
        >
          <ArrowRightIcon />
        </IconButton>
      </Tooltip>
      <Tooltip label={"Delete Game"}>
        <IconButton
          aria-label="delete"
          color={"red"}
          px="24px"
          onClick={() => actionDelete(name)}
          fontSize="sm"
          fontWeight="700"
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Flex>
  );
}
