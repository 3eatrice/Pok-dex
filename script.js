let allPokemons = [];
let number;
let start = 0;
let limit = 20;

async function loadPokemon(){
    dNone();
  for (let i = start; i < limit; i++) {
    let url = `https://pokeapi.co/api/v2/pokemon/${i+1}`;
    let response = await fetch(url); //url download
    allPokemons.push(await response.json()); //text in JSON

    let currentPokemon = allPokemons[i];
    renderPokedex(currentPokemon,i);
  }
  start += 20;
  limit += 20;
}

function renderPokedex(currentPokemon,i) {
    let nameUpperCase = currentPokemon['name'].charAt(0).toUpperCase() + currentPokemon['name'].slice(1);
    let id = 'pokemonSmall'+i;
    let id1 = 'pokemon'+i;
    let types = currentPokemon['types'];
    let mainType = types[0]['type']['name'];
    numberCorrection(currentPokemon);
    document.getElementById('allPokemons').innerHTML+= showPokedex(i, id1, id, nameUpperCase, number, currentPokemon);
    showType(types, id);
    changeColorPokedex(mainType, id1);
}

function dNone () {
    document.getElementById('buttonLoadMore').classList.remove('d-none');
    document.getElementById('buttonScrollUp').classList.remove('d-none');
}

function showType(types, id){
  for (let x = 0; x < types.length; x++) {
    let type = types[x]['type']['name'];
    document.getElementById(id).innerHTML += `<span class="pokemonType">${type}</span>`;
  }
}

function showPokedex(i, id1, id, nameUpperCase, number, currentPokemon) {
    return `
    <div id="${id1}" class="pokemon" onclick="openPokemon(${i})">
    <div>
    <h2>${nameUpperCase}</h2>
    <div id='${id}' class="under"></div>
    </div>
    <div class="right">
    <span>${number}</span>
    <img src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}">
    </div>
    </div>
    `;
}

function changeColorPokedex (mainType, id1) {
  let pokemon= document.getElementById(id1);
  changeColor(mainType, pokemon);
}


function changeColor(mainType, pokemon){
  if (mainType == 'water') pokemon.style.backgroundColor='#6390f0';
  else if (mainType == 'grass') pokemon.style.backgroundColor='#7ac74c';
  else if (mainType == 'fire') pokemon.style.backgroundColor='#FA6555';
  else if (mainType == 'bug') pokemon.style.backgroundColor='#A6B91A';
  else if (mainType == 'poison') pokemon.style.backgroundColor='#A33EA1';
  else if (mainType == 'electric') pokemon.style.backgroundColor='#F7D02C';
  else if (mainType == 'fairy') pokemon.style.backgroundColor='#D685AD';
  else if (mainType == 'normal') pokemon.style.backgroundColor='#A8A77A';
  else if (mainType == 'ground') pokemon.style.backgroundColor='#E2BF65';
  else if (mainType == 'fighting') pokemon.style.backgroundColor='#C22E28';
  else if (mainType == 'psychic') pokemon.style.backgroundColor='#F95587';
  else if (mainType == 'rock') pokemon.style.backgroundColor='#B6A136';
  else if (mainType == 'ghost') pokemon.style.backgroundColor='#735797';
  else if (mainType == 'ice') pokemon.style.backgroundColor='#96D9D6';
  else if (mainType == 'dragon') pokemon.style.backgroundColor='#6F35FC';
  else if (mainType == 'dark') pokemon.style.backgroundColor='#705746';
  else if (mainType == 'steel') pokemon.style.backgroundColor='#B7B7CE';
}


// Pokemon Informations Open
function openPokemon(i) {
    document.getElementById('pokedex-bg').classList.remove('d-none');
    document.getElementById('body').style.overflow='hidden';
    renderPokemonInfo(i);
}

function renderPokemonInfo(i){ 
  let currentPokemon = allPokemons[i];
    numberCorrection(currentPokemon);
    let nameUpperCase = currentPokemon['name'].charAt(0).toUpperCase() + allPokemons[i]['name'].slice(1);
    let types = currentPokemon['types'];
    let mainType = types[0]['type']['name'];
    showIcons();
    document.getElementById('pokemonName').innerHTML = nameUpperCase;
    document.getElementById('pokemonImage').src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    document.getElementById('pokemonNumber').innerHTML = number;
    showTypesOpened(types);
    changeColorOpened(mainType);
    showInfos(i);
}

function changeColorOpened(mainType){
  let pokemon = document.getElementById('pokedex');
  changeColor(mainType, pokemon);
}

function numberCorrection(currentPokemon){
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

  function showAbout(i){
    document.getElementById('BaseExperience').innerHTML = allPokemons[i]['base_experience'];
    document.getElementById('Height').innerHTML = allPokemons[i]['height'];
    document.getElementById('Weight').innerHTML = allPokemons[i]['weight'];
    document.getElementById('Abilities').innerHTML = '';
    showAbilities(i);
  }

  function showAbilities(i) {
    let abilities = allPokemons[i]['abilities'];
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

  function showStats(i){
    let stats = allPokemons[i]['stats'];
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

function showInfos(i){
    showAbout(i);
    showStats(i);
}


function closePokemon () {
    document.getElementById('pokedex-bg').classList.add('d-none');
    document.getElementById('body').style.overflow='visible';
  }

function doNotClosePokemon (event) {
    event.stopPropagation();
}

function backToPokedex () {
  dNone();
  for (let i = 0; i < allPokemons.length; i++) {
    document.getElementById('pokemon'+i).classList.remove('d-none');
    resetValue() 
  }
}