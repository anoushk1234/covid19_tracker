// import { Select } from "@chakra-ui/react";
// NO need to import react when using functional compos 



const Picker = ({ countries, addCountry }) => {

  return (
    <select id="country-select" variant="filled" placeholder="country" onChange={addCountry}>
      <option defaultValue>Country</option>
      {countries.map((element) =>
        <option key={element} >{element}</option>
      )}
    </select>
  );
};
//console.log(document.getElementsByTagName('option').value); // IMPORTANT - dont use dom inside JSX

export default Picker;

// HOPE THIS HELPED