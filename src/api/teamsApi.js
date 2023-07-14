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

export async function getTeamDetails() {
  try {
    const response = await fetch(
      "http://ergast.com/api/f1/2013/constructors/red_bull/constructorStandings.json"
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

export async function getTeamResultsPerYear() {
  try {
    const response = await fetch(
      "https://ergast.com/api/f1/2013/constructors/red_bull/results.json"
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
