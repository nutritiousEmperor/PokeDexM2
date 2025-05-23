// This is gonna be the controller for this project.

// Import classes (Must add type="module" in html):
import { API } from "../data/API.js";
import { Pokémon } from "../model/Pokémon.js";


// Search:

// Make the input show and hide when the search icon is clicked:
let searchButton = document.querySelector('.mdc-top-app-bar-search-button');
let inputField = document.querySelector('.mdc-text-field--outlined');

searchButton.addEventListener('click', () => 
    {
        let loadData = [];
        fetch('../data/search_hard_coded.json')
        .then(response => response.json())
        .then(data => loadData = data);

        if(inputField.style.display != 'none')
        {
            inputField.style.display = 'none';
        } else
        {
            inputField.style.display = 'flex';

            document.querySelector('.search-input-mdc-text-field').addEventListener('input', function(event) 
            {
                const query = event.target.value.toLowerCase();

                search(loadData, query);
            });
        }
    });

function search(data, query)
{
    const results = data.filter(item => item.name.toLowerCase().includes(query));
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
    
    if(query != '')
    {
        for (let index = 0; index < results.length && index < 5; index++) 
        {
            // And here to visible obvs
            const result = results[index];

            let card = document.createElement('a');
            card.className = 'mdc-card searchCards';
            card.textContent = results[index].name;

            
            card.addEventListener('click', () => 
            { 
               history.pushState(null, null, 'pokemon/' + result.name);
               resultsContainer.innerHTML = '';
               displayPokemonSheet(result.name);
            });

            resultsContainer.appendChild(card);
        }
    } else 
    {
        // In material design you could probably set in here the cards to hidden or something. 
        document.getElementById('results').innerHTML = '';
    }
}

function displayPokemonSheet(pokemonName)
{
    const sheet = document.querySelector('.sheet');
    inputField.style.display = 'none';
    document.querySelector('.search-input-mdc-text-field').value = '';
    sheet.classList.remove('sheet-out-of-view');
    let titleH1 = document.querySelector('.pokemon-name');
    
    titleH1.textContent = pokemonName;
    console.log(pokemonName);
}