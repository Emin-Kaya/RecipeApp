import React, {useEffect, useState} from 'react';
import './App.css'
import Recipe from './Recipe.js';


const App = () => {


  const appID = 'f4357f9f';
  const key = 'ed861c86058daa97ec935a937d65565a';


  const [search, setSearch] = useState("");
  const [recipes, setRecipes]= useState([]);
  const [query, setQuery] = useState('chicken');


  const request = `https://api.edamam.com/${query}?q=pie&app_id=${appID}&app_key=${key}`;

  useEffect(() => {
    fetchRecipes();
  }, [query])

  const fetchRecipes = async () =>{
    fetch(request) .then(response => response.json()) .then(data => setRecipes(data.hits));
  }

  const updateSearch = e =>{
      setSearch(e.target.value);
  };

  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
        <form onSubmit={getSearch} className="search-form">
          <input className="search-bar"type="text" value={search} onChange={updateSearch}/>
          <button className="search-button" type="submit">SUCHE</button>
        </form>
        <div className="recipes">
          {recipes.map(recipe =>(
              <Recipe 
                key={recipe.recipe.label}
                title={recipe.recipe.label} 
                calories={recipe.recipe.calories}
                image={recipe.recipe.image}
                ingredients={recipe.recipe.ingredients}
              />
          ))}
        </div>
    </div>
  );
};

export default App;
