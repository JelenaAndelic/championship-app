// Fetching Races data

export async function getWinnersPerYear() {
  try {
    const response = await fetch(
      "https://ergast.com/api/f1/2013/results/1.json"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getRaceDetail(id) {
  try {
    const response = await fetch(`https://ergast.com/api/f1/2013/${id}.json`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getQualifyingResults(id) {
  try {
    const response = await fetch(
      `http://ergast.com/api/f1/2013/${id}/qualifying.json`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getRaceResults(id) {
  try {
    const response = await fetch(
      `http://ergast.com/api/f1/2013/${id}/results.json`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
