import { Select } from "@chakra-ui/react";
//import { useState, React } from 'react';
// import React from "react"

const Picker = (props,selectCountry) => {

  return (
    <Select variant="filled" placeholder="country" >
      {props.countries.map((element) => {
        
        return <option value={element} onChange={selectCountry(element)}>{element}</option>;
      })}
    </Select>
  );
};
//console.log(document.getElementsByTagName('option').value);

export default Picker;
