import React, { useState, useEffect } from 'react';
import './App.css';
import Pokemon from './components/Pokemon';

function App() {
  const [allpokemons, setAllpokemons] = useState([]);
  const [loadmore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=5');

  const getAllpokemons = () => {
    fetch(loadmore)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoadMore(data.next);

        const evepokemon = data.results

        function createPokemonObject(results) {
          results.forEach( async (pokemon) => {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
            console.log(results)
            const data = await res.json()
            console.log(data)
            

            setAllpokemons(currentlist => [... currentlist, data]);

            
          })
          

        }

        createPokemonObject(evepokemon)
       
      })
      .catch((error) => {
        console.log(error);
      });

      
  };

 


  useEffect(() => {
    getAllpokemons();
  }, []);

  return (
    <div className='app-container'>
      <h1>Pokemons</h1>
      {allpokemons.map((pokemon , index) => 
        <Pokemon
        id = {pokemon.id}
        name = {pokemon.name}
        image = {pokemon.sprites.other.dream_world.front_default}
        type = {pokemon.types[0].type.name}
        key = {index}

        />)}
      
      <div className='pokemon-container'>
        <div className='all-container'>
          <button className='load-more' onClick={() => getAllpokemons() }> Load more</button>
        </div>
      </div>
    </div>
  );
}

export default App;
