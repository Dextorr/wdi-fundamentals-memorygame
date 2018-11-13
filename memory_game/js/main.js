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
var flipCard = function(cardId){
	//print flipped card to console
	console.log("User flipped " + cards[cardId].rank + " of " + cards[cardId].suit);
	console.log(cards[cardId].cardImage);
	//add flipped card to cardsInPlay array
	cardsInPlay.push(cards[cardId].rank);
	//check if there have been 2 cards flipped
	if (cardsInPlay.length === 2){
		checkForMatch();
	}
}

flipCard(0);
flipCard(2);