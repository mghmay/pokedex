import {getSearchData, getFlavorText} from "./util/poke_api.js";
import {capitaliseFirstLetter, renderFlavorText} from "./util/utils.js";

const pokemonName = document.getElementById("pokemon-name");
const pokemonNumber = document.getElementById("pokemon-number");
const pokemonTypes = document.getElementById("pokemon-types");
const imageContainer = document.getElementById("image-container");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const abilitiesLabel = document.getElementById("abilities-label");
const abilities = document.getElementById("abilities");
const statsLabel = document.getElementById("stats-label");
const stats = document.getElementById("stats");
const baseExperience = document.getElementById("base_experience");
const flavorTextContent = document.getElementById("flavor-text");

async function getSearchTerm() {
	const params = new Proxy(new URLSearchParams(window.location.search), {
		get: (searchParams, prop) => searchParams.get(prop),
	});
	const value = params.search;
	return value.replace(/[\W_]+/g, " ").replace(/ /g, "-");
}

document.addEventListener("DOMContentLoaded", async function () {
	try {
		const searchTerm = await getSearchTerm();
		const searchData = await getSearchData(searchTerm);
		const flavorText = await getFlavorText(searchTerm);
		if (!searchData) {
			return;
		}
		const img = new Image();
		img.src = searchData.sprites.front_default;
		img.classList.add("pokemon-img");
		imageContainer.appendChild(img);

		pokemonName.innerHTML = capitaliseFirstLetter(
			searchData.species.name.replace("-", " ")
		);
		pokemonNumber.innerHTML = "#" + searchData.id;

		let types = [];
		searchData.types.forEach((type) => {
			types.push(capitaliseFirstLetter(type.type.name));
		});
		pokemonTypes.innerHTML = types.join("/");

		height.innerHTML = "Height: " + searchData.height + "m";
		weight.innerHTML = "Weight: " + searchData.weight + "kg";
		baseExperience.innerHTML = "Base experience: " + searchData.base_experience;
		abilitiesLabel.innerHTML = "Abilities:";
		searchData.abilities.forEach((ability) => {
			const li = document.createElement("li");
			li.appendChild(document.createTextNode(ability.ability.name));
			abilities.appendChild(li);
		});
		statsLabel.innerHTML = "Stats:";
		searchData.stats.forEach((stat) => {
			const li = document.createElement("li");
			li.appendChild(document.createTextNode(stat.stat.name));
			li.appendChild(document.createTextNode(`: ${stat.base_stat}`));
			stats.appendChild(li);
		});
		flavorTextContent.innerHTML = renderFlavorText(flavorText);
	} catch (e) {
		console.error(e);
	}
});
