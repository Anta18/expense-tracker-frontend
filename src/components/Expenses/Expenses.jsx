import React, { useEffect, useState } from "react";
import ExpenseItem from "./ExpenseItem";
import { Box, Center, Text } from "@chakra-ui/react";
import axios from "axios";
import Header from "./header/Header";

const backendUrl = "https://expense-tracker-backend-zb4y.onrender.com";

const Expenses = ({ triggerFetch, setTriggerFetch, setShowForm, showForm }) => {
  const token = localStorage.getItem("token");
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`${backendUrl}/expense`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExpenses(response.data);
    } catch (error) {
      console.error("There was a problem with the axios operation:", error);
    }
    setTriggerFetch(false);
  };
  useEffect(() => {
    fetchExpenses();
  }, [triggerFetch]);

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
    setFilteredExpenses(
      expenses.filter(
        (expense) =>
          expense.date.split("-")[2] == currentYear &&
          months[parseInt(expense.date.split("-")[1]) - 1] == currentMonth
      )
    );
  }, [currentMonth, currentYear, expenses]);
  useEffect(() => {
    setTotalExpense(
      filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0)
    );
  }, [filteredExpenses]);
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
        />

        {filteredExpenses.map((expense) => (
          <ExpenseItem
            date={expense.date.split("-")[0]}
            amount={expense.amount}
            title={expense.title}
            month={months[parseInt(expense.date.split("-")[1]) - 1]}
          />
        ))}
      </Box>
    </Center>
  );
};

export default Expenses;
