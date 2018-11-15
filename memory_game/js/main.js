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

var checkForMatch = function(){
	//check to see if flipped cards match
	if (cardsInPlay[0]===cardsInPlay[1]){
			alert("You found a match!");
		}
		else {
			alert("Sorry, try again.");
		}
}

var flipCard = function(){
	//get data-id attribute from clicked card and store in cardId variable
	var cardId = this.getAttribute('data-id')
	//print flipped card to console
	console.log("User flipped " + cards[cardId].rank + " of " + cards[cardId].suit);
	console.log(cards[cardId].cardImage);
	//change card's image from card back to its face value
	this.setAttribute('src', cards[cardId].cardImage);
	//add flipped card to cardsInPlay array
	cardsInPlay.push(cards[cardId].rank);
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