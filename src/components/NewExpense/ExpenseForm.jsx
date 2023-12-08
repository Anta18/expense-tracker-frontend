import React, { useState, useEffect } from "react";
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
  useEffect(() => {
    const getCurrentDate = () => {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
      const yyyy = today.getFullYear();

      setDate(`${dd}-${mm}-${yyyy}`);
    };

    getCurrentDate();
  }, []);

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
    } catch (error) {
      console.error("There was a problem with the axios operation:", error);
    }
    onClick();
  };
  return (
    <Center>
      <Box
        marginTop={2}
        bg="#a892ee"
        borderRadius={15}
        borderWidth="1px"
        padding={2}
        width={{ base: "98vw", md: "95vw", lg: "70vw" }}
        alignItems="center"
        justifyContent="center"
      >
        <HStack justifyContent={"center"} alignItems="center" marginBottom={5}>
          <Text fontWeight="bold" color="#B41111" fontSize="2xl">
            Add Expense
          </Text>
        </HStack>
        <Stack
          justifyContent={"center"}
          alignItems="center"
          marginBottom={5}
          direction={{ base: "column", md: "row", lg: "row" }}
        >
          <Text
            fontWeight="bold"
            color="black"
            fontSize="xl"
            paddingBottom={{ base: 2, md: 5, lg: 5 }}
          >
            Title:
          </Text>
          <Input
            mb={{ base: 2, md: 5, lg: 5 }}
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
        </Stack>
        <Stack
          justifyContent={"center"}
          alignItems="center"
          direction={{ base: "column", md: "row", lg: "row" }}
        >
          <Text
            fontWeight="bold"
            color="black"
            fontSize="xl"
            paddingBottom={{ base: 2, md: 5, lg: 5 }}
          >
            Amount(Rs.):
          </Text>
          <Input
            mb={{ base: 2, md: 5, lg: 5 }}
            borderRadius={10}
            width={{ base: "40%", md: "15%", lg: "15%" }}
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
          <Text
            fontWeight="bold"
            color="black"
            fontSize="xl"
            paddingBottom={{ base: 2, md: 5, lg: 5 }}
          >
            Date:
          </Text>
          <Input
            mb={{ base: 2, md: 5, lg: 5 }}
            borderRadius={10}
            width={{ base: "40%", md: "15%", lg: "15%" }}
            bgColor={"white"}
            color="black"
            type="date"
            value={date}
            onChange={(e) => {
              const inputDate = e.target.value;

              const dateObject = new Date(inputDate);

              if (!isNaN(dateObject.getTime())) {
                const day = dateObject.getDate().toString().padStart(2, "0");
                const month = (dateObject.getMonth() + 1)
                  .toString()
                  .padStart(2, "0"); // Months are zero-based
                const year = dateObject.getFullYear().toString();
                console.log("date ", `${day}-${month}-${year}`);
                setDate(`${day}-${month}-${year}`);
              } else {
                console.error("Invalid date input");
              }
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
