import React, { useState } from "react";
import ExpenseForm from "./NewExpense/ExpenseForm";
import Expenses from "./Expenses/Expenses";

const Home = () => {
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      {showForm && (
        <ExpenseForm
          onClick={() => {
            setTriggerFetch(true);
          }}
        />
      )}
      <Expenses
        triggerFetch={triggerFetch}
        setTriggerFetch={setTriggerFetch}
        showForm={showForm}
        setShowForm={setShowForm}
      />
    </>
  );
};

export default Home;
