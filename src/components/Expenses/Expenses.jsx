import React, { useEffect, useState } from "react";
import ExpenseItem from "./ExpenseItem";
import { Box, Center, Spinner, Text } from "@chakra-ui/react";
import axios from "axios";
import Header from "./header/Header";

const backendUrl = "https://expense-tracker-backend-zb4y.onrender.com";

const Expenses = ({ triggerFetch, setTriggerFetch, setShowForm, showForm }) => {
  const token = localStorage.getItem("token");
  const [expenses, setExpenses] = useState([]);
  const [originalFilteredExpenses, setOriginalFilteredExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendUrl}/expense`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExpenses(response.data);
      setLoading(false);
    } catch (error) {
      console.error("There was a problem with the axios operation:", error);
      setError(error.code);
      setLoading(false);
    }
    setTriggerFetch(false);
  };
  useEffect(() => {
    fetchExpenses();
  }, [triggerFetch]);

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (isConfirmed) {
      try {
        const response = await axios.delete(`${backendUrl}/expense/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTriggerFetch(true);
      } catch (error) {
        console.error("There was a problem with the axios operation:", error);
        setError(error.code);
      }
    }
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [searchDate, setsearchDate] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");
  const [currentYear, setCurrentYear] = useState("");
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    const currentDate = new Date();
    const month = currentDate.toLocaleString("default", { month: "long" });
    const year = currentDate.getFullYear();
    setCurrentMonth(month);
    setCurrentYear(year);
  }, []);
  useEffect(() => {
    const temp = expenses.filter(
      (expense) =>
        expense.date.split("-")[2] == currentYear &&
        months[parseInt(expense.date.split("-")[1]) - 1] == currentMonth
    );
    const sortedExpenses = temp.sort((a, b) => {
      const dateA = parseInt(a.date.split("-")[0]);
      const dateB = parseInt(b.date.split("-")[0]);
      return dateA - dateB;
    });
    setFilteredExpenses(sortedExpenses);
    setOriginalFilteredExpenses(sortedExpenses);
  }, [currentMonth, currentYear, expenses]);
  useEffect(() => {
    setTotalExpense(
      filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0)
    );
  }, [filteredExpenses]);
  useEffect(() => {
    if (searchDate) {
      setFilteredExpenses(
        originalFilteredExpenses.filter(
          (expense) => parseInt(expense.date.split("-")[0]) == searchDate
        )
      );
    } else {
      setFilteredExpenses(originalFilteredExpenses);
    }
  }, [searchDate]);
  return (
    <Center>
      <Box
        bg="#1f1f1f"
        width={{ base: "98vw", md: "95vw", lg: "95vw" }}
        borderRadius={15}
        padding={5}
        margin={5}
      >
        <Header
          showForm={showForm}
          setShowForm={setShowForm}
          setCurrentMonth={setCurrentMonth}
          currentMonth={currentMonth}
          currentYear={currentYear}
          setCurrentYear={setCurrentYear}
          totalExpense={totalExpense}
          setSearchDate={setsearchDate}
        />

        {loading ? (
          <Spinner />
        ) : error ? (
          <>
            <Text color="red.500" margin={3} fontWeight="bold">
              {error}
            </Text>
            <Text color="red.500">
              PLEASE CHECK YOUR NETWORK CONNECTION AND TRY AGAIN
            </Text>
          </>
        ) : (
          filteredExpenses.map((expense) => (
            <ExpenseItem
              date={expense.date.split("-")[0]}
              amount={expense.amount}
              title={expense.title}
              month={months[parseInt(expense.date.split("-")[1]) - 1]}
              id={expense._id}
              handleDelete={handleDelete}
            />
          ))
        )}
      </Box>
    </Center>
  );
};

export default Expenses;
