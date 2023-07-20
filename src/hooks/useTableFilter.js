import { useState } from "react";

const useTableFilter = (initialData) => {
  const [filterTable, setFilterTable] = useState("");

  const handleFilterChange = (event) => {
    setFilterTable(event.target.value);
  };

  const applyFilter = (data) => {
    return filterTable.length >= 4
      ? data.filter((element) => {
          const driverMatch =
            element.Driver &&
            element.Driver.givenName &&
            element.Driver.familyName &&
            (element.Driver.givenName.toLowerCase().includes(filterTable) ||
              element.Driver.familyName
                .toLowerCase()
                .includes(filterTable.toLowerCase()));

          const raceNameMatch =
            element.raceName &&
            element.raceName.toLowerCase().includes(filterTable.toLowerCase());

          const teamNameMatch =
            element.Constructor &&
            element.Constructor.name &&
            element.Constructor.name
              .toLowerCase()
              .includes(filterTable.toLowerCase());

          return driverMatch || raceNameMatch || teamNameMatch;
        })
      : data;
  };

  return [filterTable, handleFilterChange, applyFilter];
};

export default useTableFilter;
