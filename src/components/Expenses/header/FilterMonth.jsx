import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import React from "react";

const FilterMonth = ({ currentMonth, setCurrentMonth }) => {
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

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {currentMonth}
      </MenuButton>
      <MenuList>
        {months.map((month) => (
          <MenuItem onClick={() => setCurrentMonth(month)} key={month}>
            {month}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default FilterMonth;
