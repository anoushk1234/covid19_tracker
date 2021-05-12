import { Select } from "@chakra-ui/react";
import { useState } from 'react';

const Picker = (props) => {
  
//const names=[...props.countries]
console.log(props.countries)
  return (
    <Select variant="filled" placeholder="options">
      {props.countries.forEach((element) => {
        console.log(element)
        return <option value={element}>{element}</option>;
      })}
    </Select>
  );
};
export default Picker;
