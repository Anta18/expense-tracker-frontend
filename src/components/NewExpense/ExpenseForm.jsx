import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  HStack,
  Input,
  Text,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";

const backendUrl = "https://expense-tracker-backend-zb4y.onrender.com";

const ExpenseForm = ({ onClick }) => {
  const token = localStorage.getItem("token");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const HandleClick = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/expense`,
        {
          title,
          amount,
          date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setAmount("");
      setDate("");
    } catch (error) {
      console.error("There was a problem with the axios operation:", error);
    }
    onClick();
  };
  return (
    <Center>
      <Box
        bg="#a892ee"
        borderRadius={15}
        borderWidth="1px"
        padding={2}
        width="95%"
        alignItems="center"
        justifyContent="center"
      >
        <HStack justifyContent={"center"} alignItems="center" marginBottom={5}>
          <Text fontWeight="bold" color="#B41111" fontSize="2xl">
            Add Expense
          </Text>
        </HStack>
        <HStack justifyContent={"center"} alignItems="center" marginBottom={5}>
          <Text fontWeight="bold" color="black" fontSize="xl" paddingBottom={5}>
            Title:
          </Text>
          <Input
            mb={5}
            borderRadius={10}
            width="50%"
            bgColor={"white"}
            color="black"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </HStack>
        <Stack
          justifyContent={"center"}
          alignItems="center"
          direction={{ base: "column", md: "row", lg: "row" }}
        >
          <Text fontWeight="bold" color="black" fontSize="xl" paddingBottom={5}>
            Amount(Rs.):
          </Text>
          <Input
            mb={5}
            borderRadius={10}
            width="15%"
            bgColor={"white"}
            color="black"
            type="number"
            value={amount}
            placeholder="Amount(Rs.)"
            marginRight={3}
            onChange={(e) => {
              setAmount(parseInt(e.target.value));
            }}
          />
          <Text fontWeight="bold" color="black" fontSize="xl" paddingBottom={5}>
            Date:
          </Text>
          <Input
            mb={5}
            borderRadius={10}
            width="15%"
            bgColor={"white"}
            color="black"
            type="date"
            value={date}
            onChange={(e) => {
              const dates = e.target.value.split("-");
              setDate(dates[2] + "-" + dates[1] + "-" + dates[0]);
            }}
          />
        </Stack>
        <HStack justifyContent="center">
          <Button
            mt={8}
            mb={4}
            onClick={HandleClick}
            loadingText="Adding..."
            bg="#560909"
            color="white"
          >
            Add Expense
          </Button>
        </HStack>
      </Box>
    </Center>
  );
};

export default ExpenseForm;
