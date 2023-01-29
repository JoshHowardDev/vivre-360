/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';

// eslint-disable-next-line object-curly-newline
function AddFoodDropDown({ searchIndex, foodDbId, foodName, submitFood }) {
  const [servingOptions, setServingOptions] = useState([]);

  useEffect(() => {
    fetch(`/api/getServings?id=${foodDbId}`)
      .then((res) => res.json())
      .then((servingData) => {
        const newOptionsDivs = [];
        Object.keys(servingData).forEach((servingName) => {
          newOptionsDivs.push(<option value={servingName}>{servingName}</option>);
        });
        setServingOptions(newOptionsDivs);
      })
      .catch((err) => console.log('SearchBox.submitSearch ERROR: ', err));
  });

  return (
    <div className="extendedOptions" data-extendedoptionsindex={searchIndex}>
      <form className="foodDetailsForm">
        <input type="text" name="foodQuantity" id={`foodQuantity${searchIndex}`} />
        <select name="foodUnits" id={`foodUnits${searchIndex}`}>
          {servingOptions}
        </select>
        <img
          src="/assets/greenCross.png"
          alt="Add Button"
          onClick={() => {
            submitFood(foodDbId, foodName, searchIndex);
          }}
        />
      </form>
    </div>
  );
}

export default AddFoodDropDown;
