import { HStack, Stack, Text } from "@chakra-ui/react";
import React from "react";
import AddExpenseButton from "./AddExpenseButton";
import FilterMonth from "./FilterMonth";
import FilterYear from "./FilterYear";
import FilterDate from "./FilterDate";

const Header = ({
  setShowForm,
  showForm,
  currentMonth,
  setCurrentMonth,
  setCurrentYear,
  currentYear,
  totalExpense,
  setSearchDate,
}) => {
  return (
    <Stack
      direction={{ base: "column", md: "row", lg: "row" }}
      justify="space-between"
    >
      <Text fontWeight="bold" fontSize="xl" color="red" margin={4}>
        Total Expense: ₹{totalExpense}
      </Text>
      <HStack>
        <FilterDate setSearchDate={setSearchDate} />
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
