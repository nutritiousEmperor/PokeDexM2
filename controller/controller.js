// This is gonna be the controller for this project.

// Import classes (Must add type="module" in html):
import { API } from "../data/API.js";
import { Pokémon } from "../model/Pokémon.js";


// Go home:
let homeButton = document.querySelector('.mdc-top-app-bar__title');


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

async function defineData(pokemonName)
{
    const data = await API.query(`${API.baseUrl}/pokemon/${pokemonName}`);
    const pokemon = new Pokémon(pokemonName, data.id);

    return pokemon;
}

async function displayPokemonSheet(pokemonName)
{
    
    const sheet = document.querySelector('.sheet');
    inputField.style.display = 'none';
    document.querySelector('.search-input-mdc-text-field').value = '';
    sheet.classList.remove('sheet-out-of-view');

    // Add event listener to go back to the home screen:
    homeButton.addEventListener('click', () => {
        sheet.classList.add('sheet-out-of-view');
        history.pushState(null, null, '/view/');
    });

    // Define data about pokemon:
    let titleH1 = document.querySelector('.pokemon-name');
    
    
    const pokemon = await defineData(pokemonName);

    let mainImg = pokemon._imgUrl;
    let backImg = pokemon._backImgUrl;

    switchImages(mainImg, backImg);

    document.querySelector('.pokemonMainImg').alt = pokemon._name;
    titleH1.textContent = pokemonName;

    
    
    
    
    console.log(mainImg)

    console.log(pokemonName);
}

function switchImages(mainImg, backImg)
 {
    const profileImg = document.querySelector('.pokemonMainImg');
    const button = document.querySelector('.switchImagesBtn');

    profileImg.src = mainImg;

    button.addEventListener('click', () => {
        if (button.textContent === 'Show Back') {
            button.textContent = 'Show Front';
            profileImg.src = backImg;
        } else {
            button.textContent = 'Show Back';
            profileImg.src = mainImg; 
        }
    });
}


async function displayFavoritesSheet()
{
    const sheet = document.querySelector('.sheet-favorites');
    inputField.style.display = 'none';
    document.querySelector('.search-input-mdc-text-field').value = '';
    sheet.classList.remove('sheet-out-of-view-favorites');

    // Add event listener to go back to the home screen:
    homeButton.addEventListener('click', () => {
        sheet.classList.add('sheet-out-of-view-favorites');
        history.pushState(null, null, '/view/');
    });
}

const favoritesBtn = document.querySelector('.favorites-button');
const favoritesBtnBottom = document.querySelector('.favorite-mdc-tab-bottom-btn');
favoritesBtn.addEventListener('click', () => {
    displayFavoritesSheet();
});
favoritesBtnBottom.addEventListener('click', () => {
    displayFavoritesSheet();
});

const pokemon = {};

async function showFirstSetOfCardsOnHomeScreen()
{

    const arrayList = await API.query(`${API.baseUrl}/pokemon?limit=20`);
    console.log(arrayList.results);

    const masonryList = document.querySelector('.my-masonry-image-list');

    for (let index = 0; index < 20; index++) 
    {
        let pokemonName = arrayList.results[index].name;
        let pokemonID = arrayList.results[index].url.split("/").filter(Boolean).pop(); 

        // Create Pokémon Instances:
        pokemon[pokemonName] = new Pokémon(pokemonName, pokemonID);


        const listItem = document.createElement('li');
        listItem.className = 'mdc-image-list__item';
        
        const img = document.createElement('img');
        img.className = 'mdc-image-list__image mdc-card';
        img.src = pokemon[pokemonName]._imgUrl;
        img.title = pokemon[pokemonName]._pokemonName;
        
        img.addEventListener('click', () => {
            history.pushState(null, null, 'pokemon/' + pokemonName);
            displayPokemonSheet(pokemonName);
        });
        
        listItem.appendChild(img);
        masonryList.appendChild(listItem);
        
            
    }
}

showFirstSetOfCardsOnHomeScreen();

const nextButton = document.querySelector('.next-mdc-tab-bottom-btn');
const backButton = document.querySelector('.back-mdc-tab-bottom-btn');