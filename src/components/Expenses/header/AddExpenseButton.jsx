import { Button } from "@chakra-ui/react";
import React from "react";

const AddExpenseButton = ({ setShowForm, showForm }) => {
  return (
    <Button
      mt={4}
      mb={4}
      bg="#560909"
      color="white"
      onClick={() => {
        setShowForm(!showForm);
      }}
    >
      {showForm ? "Done Adding" : "Add Expense"}
    </Button>
  );
};

export default AddExpenseButton;
