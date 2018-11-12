console.log("Up and running!");
var cards = ["queen", "queen", "king", "king"];
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
	console.log("User flipped " + cards[cardId]);
	//add flipped card to cardsInPlay array
	cardsInPlay.push(cards[cardId]);
	//check if there have been 2 cards flipped
	if (cardsInPlay.length === 2){
		checkForMatch();
	}
}

flipCard(0);
flipCard(2);
