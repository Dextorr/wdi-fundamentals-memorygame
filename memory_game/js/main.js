console.log("Up and running!");
//array of card objects
var cards = [
	{
		rank: "queen",
		suit: "hearts",
		cardImage: "images/queen_of_hearts.png"
	},
	{
		rank: "queen",
		suit: "diamonds",
		cardImage: "images/queen_of_diamonds.png"
	},
	{
		rank: "king",
		suit: "hearts",
		cardImage: "images/king_of_hearts.png"
	},
	{
		rank: "king",
		suit: "diamonds",
		cardImage: "images/king_of_diamonds.png"
	},
	{
		rank: "jack",
		suit: "diamonds",
		cardImage: "images/jack_of_diamonds.png"
	},
	{
		rank: "jack",
		suit: "hearts",
		cardImage: "images/jack_of_hearts.png"
	},
	{
		rank: "10",
		suit: "diamonds",
		cardImage: "images/10_of_diamonds.png"
	},
	{
		rank: "10",
		suit: "hearts",
		cardImage: "images/10_of_hearts.png"
	}
];
//empty array to store flipped cards
var cardsInPlay = [];

//variable to hold player's score
var score = 0;

//NodeList of cards
var cardElements = document.getElementsByTagName('img');

var updateScore = function(){
	document.getElementById('score').textContent = score;
}

var shuffle = function(deck){
	//Keep count of cards left to shuffle
	var indexCount = deck.length-1;
	//Copy of deck to splice
	var deckTemp = deck;
	//Empty array to store shuffled cards
	var shuffledDeck = [];
	while (indexCount>=0){
		//Select random index of deck array...
		var random = Math.floor(Math.random()*(indexCount));
		//...and add to the shuffled deck array
		shuffledDeck.push(deckTemp[random]);
		//Remove selected card from deck to be shuffled
		deckTemp.splice(random, 1);
		//Decrease number of cards left to shuffle
		indexCount-=1;
	}
	return shuffledDeck;
}

//Shuffle deck before it's displayed on the game board
cards = shuffle(cards);

var tryAgain = function(){
	//change message text to indicate start of next turn
	document.getElementById('gameHeader').innerHTML = "Click another two cards to flip."
	//get selected cards
	var selected = document.getElementsByClassName('selected');
	//for each selected card...
	for (var i=0;i<2;i++){
		//reset card image to card back and remove class 'selected'
		selected[0].setAttribute('src', 'images/back.png');
		selected[0].classList.remove('selected');
	}
	//reapply event listeners for next turn
	for (var i=0;i<cardElements.length;i++){
		cardElements[i].addEventListener('click', flipCard)
	}
	//empty cardsInPlay array
	cardsInPlay = [];
}

var checkForMatch = function(){
	//remove event listeners from cards to prevent further clicks before match check
	for (var i=0;i<cardElements.length;i++){
		cardElements[i].removeEventListener('click', flipCard);
	}	
	//check to see if flipped cards match
	if (cardsInPlay[0].rank===cardsInPlay[1].rank){
			//change game header message
			document.getElementById('gameHeader').textContent = "You found a match!";
			//update the score
			score += 50;
			updateScore();
			//empty cardsInPlay array
			cardsInPlay = [];
			//for each card image...
			for (var i=0;i<cardElements.length;i++){
				//if the card has the 'selected' class...
				if (cardElements[i].classList.contains('selected')){
					//...remove it...
					cardElements[i].classList.remove('selected');
					//...and mark it as scored
					cardElements[i].classList.add('scored');
				}
				//if the card has not already been scored...
				else if (!cardElements[i].classList.contains('scored')){
					cardElements[i].addEventListener('click', flipCard);
				}		
			}
			//check if the game is over
			if (document.getElementsByClassName('scored').length === cards.length){
				//and display the game end message as an alert 
				alert("Congratulations! You scored " + score + " points!\n" + "Click 'OK' to play again.");
				resetBoard();
			}
		}
		else {
			//update the score
			score -= 10;
			updateScore();
			//show button to try again
			document.getElementById('gameHeader').innerHTML = "Sorry, click <a id='tryAgainButton'>here</a> to try again.";
			document.getElementById('tryAgainButton').addEventListener('click', tryAgain);
		}
}

var flipCard = function(){
	//get data-id attribute from clicked card and store in cardId variable
	var cardId = this.getAttribute('data-id')
	//print flipped card to console
	console.log("User flipped " + cards[cardId].rank + " of " + cards[cardId].suit);
	console.log(cards[cardId].cardImage);
	//change card's image from card back to its face value...
	this.setAttribute('src', cards[cardId].cardImage);
	//...and set its class to "selected"
	this.className = 'selected';
	//add flipped card to cardsInPlay array
	cardsInPlay.push(cards[cardId]);
	//check if there have been 2 cards flipped
	if (cardsInPlay.length === 2){
		//if 2 cards have been flipped, check for a match
		checkForMatch();
	}
}

var createBoard = function(){
	for (var i=0;i<cards.length;i++){
		//create card img element
		var cardElement = document.createElement('img');
		//set initial image to the back.png file
		cardElement.setAttribute('src', 'images/back.png');
		//set the card's data-id to its index in the cards array
		cardElement.setAttribute('data-id', i);
		//add the event listener to flip the card to the card element
		cardElement.addEventListener('click', flipCard);
		//add the card element to the game board
		document.getElementById('game-board').appendChild(cardElement);
	}
}

var resetBoard = function(){
	//reshuffle the deck
	cards = shuffle(cards);
	//clear the board
	for (var i=0;i<cards.length;i++){
		document.getElementById('game-board').removeChild(cardElements[0]);
	}
	//reset the score
	score = 0;
	updateScore();
	//recreate the board
	createBoard();
}

createBoard();
//add the reset event listener to the reset button
document.getElementById('reset-button').addEventListener('click', resetBoard);