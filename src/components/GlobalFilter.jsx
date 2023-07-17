import React, { useState } from "react";

const GlobalFilter = (props) => {
  const [filterTable, setFilterTable] = useState("");

  const handleFilterChange = (event) => {
    setFilterTable(event.target.value);
  };

  const filteredDrivers =
    filterTable.length >= 4
      ? props.data.filter(
          (driver) =>
            driver.Driver.givenName
              .toLowerCase()
              .includes(filterTable.toLowerCase()) ||
            driver.Driver.familyName
              .toLowerCase()
              .includes(filterTable.toLowerCase())
        )
      : props.data;

  return (
    <div>
      <label htmlFor="filter">Search:</label>
      <input
        type="text"
        id="filter"
        value={filterTable}
        onChange={handleFilterChange}
      />
    </div>
  );
};

export default GlobalFilter;
