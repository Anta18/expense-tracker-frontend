import { Box, Center, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";

const ExpenseItem = ({ date, month, title, amount }) => {
  return (
    <Center>
      <HStack
        align="center"
        justifyContent="center"
        bg="#4b4b4b"
        width={{ base: "95vw", md: "95vw", lg: "70vw" }}
        borderRadius={15}
        paddingX={15}
        paddingY={2}
        marginY={1}
      >
        <Box
          bg="#2a2a2a"
          borderRadius={7}
          borderWidth="1px"
          paddingBottom={2}
          borderColor="#ececec"
        >
          <Text
            fontSize="xl"
            paddingX={3}
            align="center"
            fontWeight="bold"
            color="white"
          >
            {date}
          </Text>
          <Text fontSize="l" paddingX={3} align="center" color="white">
            {month}
          </Text>
        </Box>
        <Text
          padding={5}
          fontSize="l"
          width="full"
          align="center"
          color="white"
        >
          {title}
        </Text>
        <Box bg="blue.700" borderRadius={7} borderWidth="1px">
          <Text fontSize="xl" padding={3} fontWeight="bold" color="white">
            ₹{amount}
          </Text>
        </Box>
      </HStack>
    </Center>
  );
};

export default ExpenseItem;
