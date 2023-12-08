import { HStack, Stack, Text } from "@chakra-ui/react";
import React from "react";
import AddExpenseButton from "./AddExpenseButton";
import FilterMonth from "./FilterMonth";
import FilterYear from "./FilterYear";

const Header = ({
  setShowForm,
  showForm,
  currentMonth,
  setCurrentMonth,
  setCurrentYear,
  currentYear,
  totalExpense,
}) => {
  return (
    <Stack
      direction={{ base: "column", md: "row", lg: "row" }}
      justify="space-between"
    >
      <Text fontWeight="bold" fontSize="xl" color="red" margin={4}>
        Monthly Expense: ₹{totalExpense}
      </Text>
      <HStack>
        <FilterMonth
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
        />
        <FilterYear currentYear={currentYear} setCurrentYear={setCurrentYear} />
      </HStack>
      <AddExpenseButton showForm={showForm} setShowForm={setShowForm} />
    </Stack>
  );
};

export default Header;
