const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

async function getSearchData(searchTerm) {
	try {
		const response = await fetch(BASE_URL + searchTerm);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
}

export { getSearchData };
