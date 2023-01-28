let currentPokemon;
let allPokemons = [];
let number;
let start = 0;
let limit = 20;

async function loadPokemon(){
    let url = 'https://pokeapi.co/api/v2/pokemon/psyduck';
    let response = await fetch(url); //url download
    currentPokemon = await response.json(); //text in JSON

    console.log('loaded pokemon', currentPokemon);

    renderPokemonInfo()

}

// Pokemon Informations

function renderPokemonInfo(){ 
    numberCorrection()
    let nameUpperCase = currentPokemon['name'].charAt(0).toUpperCase() + currentPokemon['name'].slice(1);
    let types = currentPokemon['types'];
    document.getElementById('pokemonName').innerHTML = nameUpperCase;
    document.getElementById('pokemonImage').src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    document.getElementById('pokemonNumber').innerHTML = number;
    showInfos();
    showTypesOpened(types);
    showIcons();
}

function numberCorrection(){
    number = currentPokemon['id'];
    if (number < 10) {
      number = '#00'+currentPokemon['id'];
    } else if (number < 100) {
      number = '#0'+currentPokemon['id'];
    } else if (number < 1000) {
      number = '#'+currentPokemon['id'];
    };
  }


// Open About 

function openAbout() {
    document.getElementById('about').classList.remove('d-none');
    document.getElementById('baseStats').classList.add('d-none');
    document.getElementById('buttonAbout').classList.add('buttonSelected');
    document.getElementById('buttonStats').classList.remove('buttonSelected');
  }

  function showAbout(){
    document.getElementById('BaseExperience').innerHTML = currentPokemon['base_experience'];
    document.getElementById('Height').innerHTML = currentPokemon['height'];
    document.getElementById('Weight').innerHTML = currentPokemon['weight'];
    document.getElementById('Abilities').innerHTML = '';
    showAbilities();
  }

  function showAbilities() {
    let abilities = currentPokemon['abilities'];
    for (let i = 0; i < abilities.length; i++) {
      const ability = abilities[i]['ability']['name'];
      if (i == abilities.length - 1) {
        document.getElementById('Abilities').innerHTML += ability;
      } else {
        document.getElementById('Abilities').innerHTML += ability + ', ';
      }
    }
  }

// Open Base Stats

  function openStats(){
    document.getElementById('about').classList.add('d-none');
    document.getElementById('baseStats').classList.remove('d-none');
    document.getElementById('buttonAbout').classList.remove('buttonSelected');
    document.getElementById('buttonStats').classList.add('buttonSelected');
  }

  function showStats(){
    let stats = currentPokemon['stats'];
    document.getElementById('stats').innerHTML = '';
    for (let i = 0; i < stats.length; i++) {
      let stat = stats[i]['stat']['name'];
      let statUpperCase = stat.charAt(0).toUpperCase() + stat.slice(1);
      let value = stats[i]['base_stat'];
      document.getElementById('stats').innerHTML += showStatsHTML (statUpperCase, value, i);
      changeBarColor (statUpperCase, i);
    }
  }

  function showStatsHTML (statUpperCase, value, i) {
    return `
    <tr>
      <td class="tableHeadings">${statUpperCase}</td>
      <td>${value}</td>
      <td>
        <div class="progressBar">
            <div id="progressBarFilled${i}" class="progressBarFilled" style="width: calc(${value}*0.6078px);">
            </div>
        </div>
      </td>
    </tr>
  `;
  }

function changeBarColor (statUpperCase, i) {
    if (statUpperCase == 'Attack' || statUpperCase == 'Special-attack' || statUpperCase == 'Speed') {
      document.getElementById('progressBarFilled' + i).style.backgroundColor = 'rgb(122,199,76)'; 
    }
}


function showIcons () {
    document.getElementById('icons').innerHTML= `
    <img src="src/img/arrow.png" onclick="closePokemon()">`
}

function showTypesOpened(types) {
    document.getElementById('pokemonTypes').innerHTML = '';
  for (let i = 0; i < types.length; i++) {
    let type = types[i]['type']['name'];
    document.getElementById('pokemonTypes').innerHTML += `<div class="pokemonTypeOpened">${type}</div>`;
  }
}

function showInfos(){
    showAbout();
    showStats();
}


function closePokemon () {
    document.getElementById('pokedex-bg').classList.add('d-none');
    document.getElementById('body').style.overflow='visible';
  }

function doNotClosePokemon (event) {
    event.stopPropagation();
}
















