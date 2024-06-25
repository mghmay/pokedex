const BASE_URL = "https://pokeapi.co/api/v2";

async function getSearchData(searchTerm) {
	try {
		const response = await fetch(BASE_URL + "/pokemon/" + searchTerm);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
}

async function getFlavorText(searchTerm) {
	try {
		const response = await fetch(BASE_URL + "/pokemon-species/" + searchTerm);
		const data = await response.json();
		const flavor_text = data.flavor_text_entries[0].flavor_text;
		return flavor_text;
	} catch (error) {
		console.log(error);
	}
}

export {getSearchData, getFlavorText};
