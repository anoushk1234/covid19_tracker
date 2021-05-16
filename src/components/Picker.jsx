import { Select } from "@chakra-ui/react";
// NO need to import react when using functional compos 

import { FormControl } from "@chakra-ui/form-control";
import { useEffect } from 'react';



const Picker = ({ countries, addCountry }) => {
//console.log("pre"+countries,addCountry)
// let temp=[];
// temp=[...countries]
// useEffect(()=>{
//    temp=[...countries]
// })
// console.log(temp)
  return (
    <FormControl>
    <Select variant="filled" onChange={addCountry}>
      <option defaultValue>Country</option>
      {
      countries.map((element,i) =>
        <option key={i} value={element}>{element}</option>
      )
      //console.log("post"+countries,addCountry,Event)
      }
    </Select>
    </FormControl>
  );
};
//console.log(document.getElementsByTagName('option').value); // IMPORTANT - dont use dom inside JSX

export default Picker;

// HOPE THIS HELPED