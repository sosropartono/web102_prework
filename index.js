/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for(let i = 0; i < games.length; i++){
        // create a new div element, which will become the game card
        const gameCard = document.createElement("div")

        // add the class game-card to the list
        gameCard.classList.add("game-card")
        
        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        gameCard.innerHTML = `<div><img class="game-img"src="${games[i].img}" width=200px height=200px /></div>`
        gameCard.innerHTML += `<p class="title-name">${games[i].name}</p>`
        gameCard.innerHTML += `<div>${games[i].description}</div>`
        gameCard.innerHTML += `<p> Backers: ${games[i].backers}</p>`

        // append the game to the games-container
        gamesContainer.appendChild(gameCard)
    }

        // Code: 11seafoamGAMES_JSON


}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const numBackers = GAMES_JSON.reduce(((p, n)=> p + n.backers),0)

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${numBackers.toLocaleString()}`
// console.log(numBackers)

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const numRaised = GAMES_JSON.reduce(((p, n) => p + n.pledged),0)

// console.log(numRaised)

// set inner HTML using template literal
raisedCard.innerHTML =`${numRaised.toLocaleString()}`;


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `${GAMES_JSON.length.toLocaleString()}`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter((p) => {
        return p.pledged < p.goal;
    })
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
    // console.log(unfundedGames.length)

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    const fundedGames = GAMES_JSON.filter((p) => {
        return p.pledged >= p.goal;
    })

    // use filter() to get a list of games that have met or exceeded their goal
    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);
    console.log(fundedGames.length)


}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);

    // add all games from the JSON data to the DOM
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
unfundedBtn.addEventListener("click", filterUnfundedOnly)
const fundedBtn = document.getElementById("funded-btn");
fundedBtn.addEventListener("click", filterFundedOnly)
const allBtn = document.getElementById("all-btn");
allBtn.addEventListener("click", showAllGames)


// add event listeners with the correct functions to each button


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGames = GAMES_JSON.reduce((p, n) => {
    if(n.pledged < n.goal){
        return p + 1
    }
    return p + 0
},0)
const fundedGames = GAMES_JSON.filter((p) => {
    return p.pledged >= p.goal;
})




// create a string that explains the number of unfunded games using the ternary operator
let unfundedStr = `A total of $${numRaised.toLocaleString()} has been 
raised for ${fundedGames.length} games. ${unfundedGames > 0 ?`Currently, ${unfundedGames} 
remain unfunded. We need your help to fund these amazing games!` : `There are currently no 
games needed to be funded. Thank you for your continued support!` }`

// create a new DOM element containing the template string and append it to the description container
const unfundedGamesMessage = document.createElement("p")
unfundedGamesMessage.innerHTML = unfundedStr
descriptionContainer.appendChild(unfundedGamesMessage)

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

const [firstGame, secondGame, ...others] = sortedGames;
// let -this portion has to be the same container type as the RHS- so name inside
// obj container == firstGame(obj container) 
let {name: firstGameName} = firstGame;
// create a new element to hold the name of the top pledge game, then append it to the correct element
let topPledgeGame = document.createElement("p")
topPledgeGame.innerHTML = `${firstGameName}`
firstGameContainer.appendChild(topPledgeGame)

let {name: secondGameName} = secondGame
// do the same for the runner up item

let runnerUp = document.createElement("p")
runnerUp.innerHTML = `${secondGameName}`
secondGameContainer.appendChild(runnerUp)