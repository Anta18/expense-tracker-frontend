import React from "react";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

const FilterYear = ({ currentYear, setCurrentYear }) => {
  const years = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028];
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {currentYear}
      </MenuButton>
      <MenuList>
        {years.map((year) => (
          <MenuItem onClick={() => setCurrentYear(year)} key={year}>
            {year}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default FilterYear;
