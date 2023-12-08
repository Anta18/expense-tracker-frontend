import React, { useRef } from "react";
import { Input } from "@chakra-ui/react";

const FilterDate = ({ setSearchDate }) => {
  const ref = useRef(null);
  return (
    <Input
      ref={ref}
      borderRadius={20}
      placeholder="Date"
      variant="filled"
      color="#AB9696"
      onChange={() => {
        setSearchDate(ref.current.value.trim());
      }}
    />
  );
};

export default FilterDate;
