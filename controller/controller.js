// This is gonna be the controller for this project.

// Import classes (Must add type="module" in html):
import { API } from "../data/API.js";
import { Pokémon } from "../model/Pokémon.js";



// Go home:



// Search:

// Make the input show and hide when the search icon is clicked:
const searchButton = document.querySelector('.mdc-top-app-bar-search-button');
let inputField = document.querySelector('.mdc-text-field--outlined');
const resultsContainer = document.getElementById('results');
const searchTxtField = document.querySelector('.search-input-mdc-text-field');

const favoriteSheet = document.querySelector('.sheet-favorites');
const typeSheet = document.querySelector('.sheet-types');
const pokemonSheet = document.querySelector('.sheet');
const nextButtonSection = document.querySelector('.next-mdc-tab-bottom-btn-section');
const backButtonSection = document.querySelector('.back-mdc-tab-bottom-btn-section');
const profileImg = document.querySelector('.pokemonMainImg');
let currentPokemonId = null;
const favoriteButtonSection = document.querySelector('.favorite-mdc-tab-bottom-btn-section');
const searchResults = document.getElementById('results');
const typeResultsContainer = document.getElementById('typeResultsContainer');
let currentPage = 0;
const nextButton = document.querySelector('.next-mdc-tab-bottom-btn');
const backButton = document.querySelector('.back-mdc-tab-bottom-btn');
const typeFooter = document.querySelector('.type-footer');
const backButtonType = document.querySelector('.back-mdc-tab-type-btn');
const nextButtonType = document.querySelector('.next-mdc-tab-type-btn');
const hamburgerBtn = document.querySelector('.hamburger-menu-btn');
const hamburgerMenuSheet = document.querySelector('.sheet-hamburger-menu');
const favoritesBtn = document.querySelectorAll('.favorites-button');
const favoritesBtnBottom = document.querySelector('.favorite-mdc-tab-bottom-btn');
const typeBtn = document.querySelectorAll('.types-button');
const homeButton = document.querySelectorAll('.mdc-top-app-bar__title');
let titleH1 = document.querySelector('.pokemon-name');
const pokemonHeight = document.querySelector('.pokemon-height');
const pokemonWeight = document.querySelector('.pokemon-weight');
const pokemonTypes = document.querySelector('.pokemon-types');
const pokemonExperience = document.querySelector('.pokemon-experience');
let pokemonID;

searchButton.addEventListener('click', () => 
    {
        let loadData = [];
        fetch('../data/search_hard_coded.json')
        .then(response => response.json())
        .then(data => loadData = data);

        if(inputField.style.display != 'none')
        {
            inputField.style.display = 'none';
            resultsContainer.style.display = 'none';
        } else
        {
            inputField.style.display = 'flex';

            searchTxtField.addEventListener('input', function(event) 
            {
                const query = event.target.value.toLowerCase();

                search(loadData, query);
            });
        }
    });

function search(data, query)
{
    const results = data.filter(item => item.name.toLowerCase().includes(query));
    resultsContainer.innerHTML = '';
    resultsContainer.style.display = 'flex';
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
        searchResults.innerHTML = '';
    }
}

async function defineData(pokemonName)
{
    const data = await API.query(`${API.baseUrl}/pokemon/${pokemonName}`);
    const pokemon = new Pokémon(pokemonName, data.id);
    
    // Define all the data here:
    pokemon.setPokemonHeight(data.height);
    pokemon.setPokemonWeight(data.weight);
    pokemon.setPokemonExperience(data.base_experience);
    pokemon.setPokemonType(data.types);
    console.log(data.types)
    return pokemon;
}

async function defineDataById(pokemonId) {
    const query = `${API.baseUrl}/pokemon/${pokemonId}`;
    try {
        const data = await API.query(query);
        if (!data) throw new Error("No data returned");
        Pokémon._pokemonName = data.name;
        Pokémon._pokemonID = data.id;
        return Pokémon._pokemonName, Pokémon._pokemonID;
    } catch (err) {
        console.error(`Pokemon with ID ${pokemonId} not found.`, err);
        return null;
    }
}


async function displayPokemonSheet(pokemonName)
{
    document.body.classList.add('no-scroll');
    history.pushState(null, null, '/view/');
    history.pushState(null, null, 'pokemon/' + pokemonName);
    
    inputField.style.display = 'none';
    searchTxtField.value = '';
    
    // Remove sheet out of view class to bring the pokemon sheet in view:
    pokemonSheet.classList.remove('sheet-out-of-view');
    
    // Add sheet out of view class to hide the favorite sheet:
    favoriteSheet.classList.add('sheet-out-of-view-favorites');

    // Add event listener to go back to the home screen:
        homeButton.forEach(button => {
            button.addEventListener('click', () => {
                history.pushState(null, null, '/view/');
                document.body.classList.remove('no-scroll');
                pokemonSheet.classList.add('sheet-out-of-view');
            });
            /*
            nextButtonSection.removeEventListener('click', () => {
                nextPokemon(pokemonId);
            });

            backButtonSection.removeEventListener('click', () => {
                previousPokemon(pokemonId);
            });

            favoriteButtonSection.removeEventListener('click', () => {
                addFavoritePokémon(pokemonName, pokemonId);
            });*/
        });

    // Define data about pokemon:
    
    
    const pokemon = await defineData(pokemonName);
    currentPokemonId = pokemon._pokemonID;
    

    let mainImg = pokemon._imgUrl;
    let pokemonId = pokemon._pokemonID;

    //switchImages(mainImg, backImg);
    profileImg.src = mainImg;
    profileImg.alt = pokemon._name;
    titleH1.textContent = pokemonName + ' #' + pokemonId;
    pokemonHeight.textContent = 'Height: ' + pokemon.getPokemonHeight();
    pokemonWeight.textContent = 'Weight: ' + pokemon.getPokemonWeight();
    pokemonTypes.textContent = 'Types: ' + pokemon.getPokemonType().map(type => type.type.name).join(', ');



    pokemonExperience.textContent = 'Experience: ' + pokemon.getPokemonExperience();
    

   
    if(currentPokemonId == 1)
    {
        backButtonSection.classList.add('disabled-prev-button');
    } else {
        backButtonSection.classList.remove('disabled-prev-button');
    }
    
    console.log(mainImg)

    console.log(pokemonName);
}

nextButtonSection.addEventListener('click', () => {
    nextPokemon(currentPokemonId);
});

backButtonSection.addEventListener('click', () => {
    previousPokemon(currentPokemonId);
});

favoriteButtonSection.addEventListener('click', () => {
    const segments = window.location.pathname.split('/').filter(Boolean);
    const pokemonName = segments[segments.length - 1];

    addFavoritePokémon(pokemonName, currentPokemonId);       
});


function addFavoritePokémon(pokemonName, pokemonId)
{
    if(!favoritesPokemonArray.some(pokemon => pokemon.id === pokemonId))
    {
        favoritesPokemonArray.push({name: pokemonName, id: pokemonId});
    }
}

/*
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
}*/


async function displayFavoritesSheet()
{
    inputField.style.display = 'none';
    searchTxtField.value = '';
    history.pushState('null', 'null', 'favorites/');
    document.body.classList.add('no-scroll');

    // Remove sheet out of view class to bring the favorite sheet in view:
    favoriteSheet.classList.remove('sheet-out-of-view-favorites');
    
    // Add sheet out of view class to hide the pokemon sheet:
    pokemonSheet.classList.add('sheet-out-of-view');

    // Display all the favorites pokemons:
    console.log(favoritesPokemonArray);

    const masonryList = document.querySelector('.my-masonry-favorites-image-list');
    masonryList.innerHTML = '';

    /*favoritesPokemonArray.forEach(({name, id}) => {
        // create new instance and define img:
        const mainImg = new Pokémon(name, id)._imgUrl;

        //displayPokemonInFavoritesSheet(name, id, mainImg);
        
        
    });*/

    showCards(favoritesPokemonArray, 'my-masonry-favorites-image-list')
    

    // Add event listener to go back to the home screen:
    homeButton.forEach(button => {
        button.addEventListener('click', () => {
            favoriteSheet.classList.add('sheet-out-of-view-favorites');
            document.body.classList.remove('no-scroll');
            history.pushState(null, null, '/view/');
        });
    });
}

function displayPokemonInFavoritesSheet(pokemonName, pokemonId, mainImg)
{
    const masonryList = document.querySelector('.my-masonry-favorites-image-list');
    const listItem = document.createElement('li');
    listItem.className = 'mdc-image-list__item';
    
    console.log(mainImg)
    const img = document.createElement('img');
    img.className = 'mdc-image-list__image mdc-card';
    img.src = mainImg;
    img.title = pokemonName;
    
    img.addEventListener('click', () => {
        history.pushState(null, null, 'pokemon/' + pokemonName);
        displayPokemonSheet(pokemonName);
    });
    
    listItem.appendChild(img);
    masonryList.appendChild(listItem);
}


favoritesBtn.forEach(button => 
{
    button.addEventListener('click', () => {
    if(!hamburgerMenuSheet.classList.contains('sheet-out-of-view-hamburger'))
    {
        hamburgerMenuSheet.classList.add('sheet-out-of-view-hamburger');
    }
    displayFavoritesSheet();
    });
});
favoritesBtnBottom.addEventListener('click', () => {
    displayFavoritesSheet();
});
typeBtn.forEach(button => {
    button.addEventListener('click', () => {
    if(!hamburgerMenuSheet.classList.contains('sheet-out-of-view-hamburger'))
    {
        hamburgerMenuSheet.classList.add('sheet-out-of-view-hamburger');
    }    
    displayTypesSheet();
    });
});

function displayTypesSheet()
{
    document.body.classList.add('no-scroll');
    history.pushState(null, null, '/view/');
    history.pushState(null, null, 'types/');

    // Remove out of view class to display the types sheet:
    typeSheet.classList.remove('sheet-out-of-view-types');

    // Add event listener to go back to the home screen:
    homeButton.forEach(button => {
        button.addEventListener('click', () => {
            typeSheet.classList.add('sheet-out-of-view-types');
            history.pushState(null, null, '/view/');
            typeResultsContainer.innerHTML = '';
            document.body.classList.remove('no-scroll');
        });
    });

    const pokemonTypes = ['Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'];

    pokemonTypes.forEach((type) => {
        let card = document.createElement('a');
        card.className = 'mdc-card typeCards';
        card.textContent = type;

        
        card.addEventListener('click', async () => 
        { 
            let indexA = 0;
            let indexB = 20;
            history.pushState(null, null, '/' + type);
            typeResultsContainer.innerHTML = '';
            
            typeFooter.classList.remove('hidden');

            const arrayList = await API.query(`${API.baseUrl}/type/${type}`);
            showCards(arrayList.pokemon.map(p => p.pokemon), `my-masonry-image-list-for-type`);

            

            backButtonType.addEventListener('click', () => {
                if(indexA > 0)
                {
                indexA -= 20;
                indexB -= 20;
                showCards(arrayList.pokemon.map(p => p.pokemon).slice(indexA, indexB), `my-masonry-image-list-for-type`);
                }
            });


            nextButtonType.addEventListener('click', () => {
                indexA += 20;
                indexB += 20;
                showCards(arrayList.pokemon.map(p => p.pokemon).slice(indexA, indexB), `my-masonry-image-list-for-type`);
            });
        });

        typeResultsContainer.appendChild(card);
    });
}



function showCards(arrayList, masonryListElement)
{
    const masonryList = document.querySelector(`.${masonryListElement}`);
    let pokemon = {};
    masonryList.innerHTML = '';

   
    for (let index = 0; index < Math.min(arrayList.length, 20); index++) 
    {
        let pokemonName = arrayList[index].name;
        console.log(pokemonName)

        if(arrayList[0].id) 
        {
            pokemonID = arrayList[index].id;
        } else {
            pokemonID = arrayList[index].url.split("/").filter(Boolean).pop(); 
        }
 

        // Create Pokémon Instances:
        pokemon[pokemonName] = new Pokémon(pokemonName, pokemonID);


        const listItem = document.createElement('li');
        listItem.className = 'mdc-image-list__item';

        const figure = document.createElement('div');
        figure.className = 'image-with-caption';
        
        const img = document.createElement('img');
        img.className = 'mdc-image-list__image mdc-card';
        img.src = pokemon[pokemonName]._imgUrl;
        img.title = pokemon[pokemonName]._pokemonName;

        const pokemonCaption = document.createElement('figcaption');
        pokemonCaption.className = 'mdc-image-list__pokemonName';
        pokemonCaption.textContent = pokemon[pokemonName]._pokemonName + " #" + pokemon[pokemonName]._pokemonID;
        figure.appendChild(img);
        figure.appendChild(pokemonCaption);
        
        img.addEventListener('click', () => {
            history.pushState(null, null, 'pokemon/' + pokemonName);
            displayPokemonSheet(pokemonName);
        });
        
        listItem.appendChild(figure);
        masonryList.appendChild(listItem);        
    }
}

async function showFirstSetOfCardsOnHomeScreen()
{

    const arrayList = await API.query(`${API.baseUrl}/pokemon?limit=20`);

    showCards(arrayList.results, `my-masonry-image-list`);
}

showFirstSetOfCardsOnHomeScreen();

async function showNextSetOfCardsOnHomeScreen(currentPage)
{
    const arrayList = await API.query(`${API.baseUrl}/pokemon?limit=20&offset=${currentPage}`);
    showCards(arrayList.results, `my-masonry-image-list`);
}

async function showPreviousSetOfCardsOnHomeScreen(currentPage)
{
    const arrayList = await API.query(`${API.baseUrl}/pokemon?limit=20&offset=${currentPage}`);
    showCards(arrayList.results, `my-masonry-image-list`);
}



nextButton.addEventListener('click', () => {
    currentPage += 20;
    showNextSetOfCardsOnHomeScreen(currentPage);
});

backButton.addEventListener('click', () => {
    if(currentPage >= 20)
    {
        currentPage -= 20;
        showPreviousSetOfCardsOnHomeScreen(currentPage);
    }
});



//const favoritesPokemonArray = [];
const favoritesPokemonArray = [ { "name": "bulbasaur", "id": 1 }, { "name": "ivysaur", "id": 2 }, { "name": "venusaur", "id": 3 }, { "name": "charmander", "id": 4 }, { "name": "charmeleon", "id": 5 }, { "name": "charmeleon", "id": 6 }, { "name": "pikachu", "id": 7 }, { "name": "pikachu", "id": 25 }, { "name": "jynx", "id": 10082 }, { "name": "jynx", "id": 124 }, { "name": "nidoran-f", "id": 29 }, { "name": "arbok", "id": 14 }, { "name": "arbok", "id": 24 } ]
//const favoritesPokemonArrayId = [];


async function nextPokemon(pokemonId)
{
    let newPokemonId = pokemonId + 1;
    let pokemon = await defineDataById(newPokemonId);
    console.log(Pokémon._pokemonName, Pokémon._pokemonID);

    displayPokemonSheet(Pokémon._pokemonName);
}

async function previousPokemon(pokemonId)
{
    if(pokemonId != 1)
    {
        let newPokemonId = pokemonId - 1;
        let pokemon = await defineDataById(newPokemonId);
        console.log(Pokémon._pokemonName, Pokémon._pokemonID);

        displayPokemonSheet(Pokémon._pokemonName);
    }
}

hamburgerBtn.addEventListener('click', () => {
    if(hamburgerMenuSheet.classList.contains('sheet-out-of-view-hamburger'))
    {
        hamburgerMenuSheet.classList.remove('sheet-out-of-view-hamburger');
        homeButton.forEach(button => {
            button.addEventListener('click', () => {
                hamburgerMenuSheet.classList.add('sheet-out-of-view-hamburger');
            });
        });
    } else
    {
        hamburgerMenuSheet.classList.add('sheet-out-of-view-hamburger');
    }
})