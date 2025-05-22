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
        if(!inputField.classList.contains('hidden'))
        {
            inputField.classList.add('hidden');
            inputField.style.display = 'none';
            console.log("added hidden");
        } else
        {
            inputField.classList.remove('hidden');
            inputField.style.display = 'flex';
            console.log("removed hidden");
        }
    });