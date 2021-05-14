import { Select } from "@chakra-ui/react";
// NO need to import react when using functional compos 

 

const Picker = ({ countries, selectCountry }) => {

  return (
    <Select variant="filled" placeholder="country" >
      {countries.map((element) =>
        <option value={element} onChange={() => selectCountry(element)}>{element}</option>
      )}
    </Select>
  );
};
//console.log(document.getElementsByTagName('option').value); // IMPORTANT - dont use dom inside JSX

export default Picker;

// HOPE THIS HELPED