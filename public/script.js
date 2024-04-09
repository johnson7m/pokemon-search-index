const searchContainer = document.getElementById('search-container');
const imgContainer = document.getElementById('image-container');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');
const typesContainer = document.getElementById('types');
const pokemonWeight = document.getElementById('weight');
const pokemonHeight = document.getElementById('height');
const health = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefese = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const pokemonName = document.getElementById('pokemon-name');
const pokemonImage = document.getElementById('pokemon-image');
const pokemonId = document.getElementById('pokemon-id');


let pokemonList = [];
let pokemonData = [];



fetch('https://pokeapi-proxy.freecodecamp.rocks/api/pokemon')
  .then(res => res.json())
  .then((data) => {
    pokemonList = data.results
    //console.log(pokemonList);
  })
  .catch((err) => {
    searchContainer.innerHTML = `<h2>Something went wrong, please try again later</h2>`
  });


document.addEventListener('click', function(event) {
  if (event.target && event.target.id === 'search-button') {
    //console.log(searchInput.value);
    pokemonData = [];
    const searchStr = searchInput.value.toLowerCase();
    let name = '';
    let id = 0;
    if (searchStr === '') {
      return alert('please enter a pokemon name')
    }
    else for (let i = 0; i < pokemonList.length; i++) {
      if (searchStr === pokemonList[i].name || Math.floor(parseInt(searchStr)) === pokemonList[i].id) {
        name = pokemonList[i].name;
        id = pokemonList[i].id;
        //console.log(name);
        //console.log(id);
        fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${name || id}`)
          .then(res => res.json())
          .then((data) => {
            pokemonData = data;
            //  console.log(pokemonData);
            displayPokemon(pokemonData)
          })
      }
    } if (name !== searchStr && id !== Math.floor(parseInt(searchStr))) {
      alert('Pokemon not found');
    }
  }
})

const displayPokemon = (data) => {
  const { weight, height, sprites, types, stats, name, id } = data;
  let type1 = types[0].type.name;
  let type2 = types[1] ? types[1].type.name : '';
  let typeHTML = `<p id='type'>${type1.toUpperCase()}</p>`
  if (types[1]) {
    typeHTML = `<p class='pokemon-types'id='type'>${type1.toUpperCase()}</p><p class='pokemon-types'id='type2'>${type2.toUpperCase()}</p>`
  }
  imgContainer.innerHTML = `<img id='sprite' src='${sprites.front_default}' alt="${name} sprite"  width='150px' height='150px'>`
  pokemonName.innerHTML = `Name: ${name.toUpperCase()}`;
  pokemonId.innerHTML = `Id: ${id}`;
  pokemonWeight.innerHTML = `Weight: ${weight}`;
  pokemonHeight.innerHTML = `Height: ${height}`;
  typesContainer.innerHTML = typeHTML;
  health.innerHTML = `Health: ${stats[0].base_stat}`;
  attack.innerHTML = `Attack: ${stats[1].base_stat}`;
  defense.innerHTML = `Defense: ${stats[2].base_stat}`;
  specialAttack.innerHTML = `Sp.Attack: ${stats[3].base_stat}`;
  specialDefese.innerHTML = `Sp.Defense: ${stats[4].base_stat}`;
  speed.innerHTML = `Speed: ${stats[5].base_stat}`;
}

