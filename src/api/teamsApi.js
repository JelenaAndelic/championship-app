// Fetching Teams data

export async function getTeamsPerYear() {
  try {
    const response = await fetch(
      "http://ergast.com/api/f1/2013/constructorStandings.json"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getTeamDetails(id) {
  try {
    const response = await fetch(
      `http://ergast.com/api/f1/2013/constructors/${id}/constructorStandings.json`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getTeamResultsPerYear(id) {
  try {
    const response = await fetch(
      `https://ergast.com/api/f1/2013/constructors/${id}/results.json`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
