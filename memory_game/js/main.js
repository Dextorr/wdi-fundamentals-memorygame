console.log("Up and running!");
var cards = [
	{
		rank: "queen",
		suit: "hearts",
		cardImage: "images/queen-of-hearts.png"
	},
	{
		rank: "queen",
		suit: "diamonds",
		cardImage: "images/queen-of-diamonds.png"
	},
	{
		rank: "king",
		suit: "hearts",
		cardImage: "images/king-of-hearts.png"
	},
	{
		rank: "king",
		suit: "diamonds",
		cardImage: "images/king-of-diamonds.png"
	}
];
var cardsInPlay = [];

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

var checkForMatch = function(){
	//check to see if flipped cards match
	if (cardsInPlay[0].rank===cardsInPlay[1].rank){
			document.getElementById('gameHeader').textContent = "You found a match!";
		}
		else {
			document.getElementById('gameHeader').textContent = "Sorry, try again.";
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
		checkForMatch();
	}
}

var createBoard = function(){
	for (var i=0;i<cards.length;i++){
		var cardElement = document.createElement('img');
		cardElement.setAttribute('src', 'images/back.png');
		cardElement.setAttribute('data-id', i);
		cardElement.addEventListener('click', flipCard);
		document.getElementById('game-board').appendChild(cardElement);
	}
}

createBoard();