import React from "react";

const BudgetNumber = ({ value, onChange }) => {
  return (
    <input
      type="number"
      name="budgeting"
      className=""
      placeholder="Set Budget Amount"
      value={value}
      onChange={e => onChange(e.currentTarget.value)}
    />
  );
};

export default BudgetNumber;
