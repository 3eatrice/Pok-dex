function searchPokemon() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    showSearchedPokemon(search);
  }
  
  
  function showSearchedPokemon(search) {
    for (let i = 0; i < allPokemons.length; i++) {
      let currentPokemon = allPokemons[i]['name'];
      document.getElementById('pokemon'+i).classList.add('d-none');
      if (currentPokemon.toLowerCase().includes(search)) {
        document.getElementById('pokemon'+i).classList.remove('d-none');
      };
    }
  }
  

  function resetValue() {
    document.getElementById('search').value = '';
  }

  