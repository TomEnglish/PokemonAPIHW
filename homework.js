

// Fetch Pokemon data 
async function fetchPokemonData(pokemonName) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const pokemonData = await response.json();
    return pokemonData;
}
//const types = data.types.map(typeInfo => typeInfo.type.name); -- how to extract types similar to abilites
// display Pokemon data
function displayPokemonData(pokemonData) {
    const pokemonInfoElement = document.getElementById('pokemon-info');
    
    pokemonInfoElement.innerHTML = `
        <h2>${pokemonData.name}</h2>
        <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">

        <h3>Types:</h3>
        <ul>
            ${pokemonData.types.map(type => `<li>${type.type.name}</li>`).join('')}
        </ul>
        <h3>Abilities:</h3>
        <ul>
            ${pokemonData.abilities.map(ability => `<li>${ability.ability.name}</li>`).join('')}
        </ul>
        <h3>Base Experience:</h3>
        <p>${pokemonData.base_experience}</p>
    `;
    console.log(pokemonData);
};

// Function to handle the button click event        
async function callPokeFetch(){
    // Get the input value from the text box
    const pname = document.getElementById('pokemon-name');
    
    
    try {
        if (pname.value) { 
            const pokemonData = await fetchPokemonData(pname.value.toLowerCase());
            displayPokemonData(pokemonData);
        } else {
            document.getElementById('pokemon-info').innerHTML = 
            `<p>Error:Please refrech page and put pokemon name in the input box.</p>`;
        };

    } catch (error) {
        console.error("Error fetching Pokemon data:", error);
        document.getElementById('pokemon-info').innerHTML = 
            `<p>Error: Could not find Pokemon "${pname.value}". Please check the spelling.</p>`;
    }
};
    

document.getElementById('fetch-pokemon').addEventListener('click', callPokeFetch);
