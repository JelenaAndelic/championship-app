import { useState } from "react";

const useTableFilter = (initialData) => {
  const [filterTable, setFilterTable] = useState("");

  const handleFilterChange = (event) => {
    setFilterTable(event.target.value);
  };

  const applyFilter = (data) => {
    return filterTable.length >= 4
      ? data.filter(
          (element) =>
            element.Driver.givenName
              .toLowerCase()
              .includes(filterTable.toLowerCase()) ||
            element.Driver.familyName
              .toLowerCase()
              .includes(filterTable.toLowerCase())
        )
      : data;
  };
  return [filterTable, handleFilterChange, applyFilter];
};

export default useTableFilter;
