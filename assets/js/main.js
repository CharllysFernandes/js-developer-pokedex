const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            <div id="pokeDetails_${pokemon.number}" style="display: none;" class="pokeDetails">
                <span>
                Height: ${pokemon.height} cm
                </span>    
                <span>
                Weight: ${pokemon.weight} kg
                </span>
                <span>
                Ability: ${pokemon.ability}
                </span>
                
            </div>
            <div class="align-self-center">
            <button id="loadMoreDetails" type="button" class="loadDetails" onclick=loadPokeDetails(${pokemon.number})>
                Load details...
            </button>
        </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

function loadPokeDetails(number) {
    console.log(number)
    var pokeDetails = document.getElementById(`pokeDetails_${number}`);
    if (pokeDetails.style.display === "none") {
      pokeDetails.style.display = "grid";
    } else {
      pokeDetails.style.display = "none";
    }
}

function myFunction() {
  }