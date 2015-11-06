//Simple Blackjack game!
//The chance of any card being drawn is always 1 in 13, even if there have been other cards drawn.
var cards = [];
var money = function(){
	$(document).ready(function(){
		$('#cash').remove();
		$('#money').prepend("<p id='cash'></p>");
		document.getElementById('cash').innerHTML = 'Money: $' + $money;
	});
}

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

var makeDeck = function(){
	var card = function(number, rank, suit){
		this.number = number;
		this.rank = rank;
		this.suit = suit;
	}
	var deck = function(){
		this.ranks = ['Ace','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Jack','Queen','King'];
		this.suits = ['Hearts','Diamonds','Spades','Clubs'];
	
    
    	for( var s = 0; s < this.suits.length; s++ ) {
    	    for( var n = 0; n < this.ranks.length; n++ ) {
        	    cards.push( new card( n+1, this.ranks[n], this.suits[s] ) );
        	}
    	}
    	shuffle(cards);
    	return cards;
	}
	deck();
	console.log('the top 4 cards are...');
	console.log(cards[0]);
	console.log(cards[1]);
	console.log(cards[2]);
	console.log(cards[3]);
	console.log(cards[4]);
	console.log(cards[5]);
}

var $money = 100;
money();
var play = function(){
console.log('Welcome to the Blackjack table!');
console.log('Here is $100 to start, and each hand will cost $10.');
$money = 100;

var playing = true;
var value = [11,2,3,4,5,6,7,8,9,10,10,10,10];
var altValue = [1,2,3,4,5,6,7,8,9,10,10,10,10];
var hand = [0,0];
var aces = 0;
var daces = 0;
while(playing === true){
	makeDeck();
	var hit = 0;
	var dealerPlay = false;
	var resolve = false;
	console.log ("You have $" + $money + ".");
	var hand = [cards.shift(),cards.shift()];
	var dealer = [cards.shift(),cards.shift()];
	var score = 0
	console.log('Your hand is '+ hand[0].rank + ' and '+ hand[1].rank +".");
	if (hand[0].rank === 'Ace' && hand[1].rank === 'Ace'){
		score = 12;
		console.log('This adds up to 12.');
		aces = 1;
	}
	else if (hand[0].rank === 'Ace' || hand[1].rank === 'Ace'){
		score = value[hand[0].number - 1] + value[hand[1].number - 1];
		console.log('This adds up to '+ score +'.');
		aces = 1;
	}
	else{
		score = value[hand[0].number - 1] + value[hand[1].number - 1];
		console.log('This adds up to '+ score +'.');
		aces = 0;
	}
	var dscore = value[dealer[0].number - 1] + value[dealer[1].number - 1];
	console.log('The dealer has a ' + dealer[0].rank + " face up.");
	var deal = true;
	var stay = false;
	var hitting = false;

	while(deal === true){
		if(score > 21){
			console.log ("You busted!");
			deal = false;
			hitting = false;
			dealerPlay = false;
			resolve = true;
		}
		else if (score === 21){
			console.log('You have Blackjack!');
			deal = false;
			hitting = false;
			dealerPlay = true;
			resolve = true;
		}
		else if (stay === true){
			console.log("You have stayed.")
			console.log("Your final score is "+ score + ".")
			deal = false;
			hitting = false;
			dealerPlay = true;
		}
		else{
			hit = 0;
			var hitting = true;
		}
		while (hitting === true){
			hit = window.prompt('Would you like to hit or stay? Type quit to exit game.');
			if(hit === "hit") {
				var draw = cards.shift();
				console.log('You hit!');
				console.log("You drew a " + draw.rank);
				if(score>10){
					score = score + altValue[draw.number - 1];
					if (score > 21 && aces === 1){
						score = score - 10;
						aces = 0;
					} 
					hitting = false;
				}
				else {
					score = score + value[draw.number - 1];
					if (draw.rank === 'Ace'){
						aces = 1;
					}
					hitting = false;
				}
				console.log("Your new score is " + score + ".");
			}
			else if (hit === "stay"){
				stay = true;
				hitting = false;
				dealerPlay = true;
			}
			else if (hit === "quit" || hit === "exit" || hit === null){
				console.log("Thanks for playing!");
				console.log("You walked away with $"+ $money +".");
				hitting = false;
				dealerPlay = false;
				resolve = false;
				playing = false;
				deal = false;
			}
			else{
				console.log("I'm sorry, I didn't hear you.");
			}
		}		
	}
	while (dealerPlay === true){
		console.log ('The dealer has ' + dealer[0].rank + ' and ' + dealer[1].rank + '.');
		if (dealer[0].rank === 'Ace' && dealer[1].rank === 'Ace'){
			dscore = 12;
			daces = 1;
		}
		else if (dealer[0].rank === 0 || dealer[1].rank === 0){
			daces = 1;
		}
		var dhitting = true;
		while (dhitting === true){
			while (dscore < 17){
				var dnew = cards.shift();
				console.log ('The dealer drew ' + dnew.rank + '.');
				if(dscore>10){
					dscore = dscore + altValue[dnew.number - 1];
					if (dscore > 21 && daces === 1){
						dscore = dscore - 10;
						daces = 0;
					} 
				}
				else {
					dscore = dscore + value[dnew.number - 1];
					if (dnew.rank === 'Ace'){
						daces = 1;
					}
				}
			}
			if (dscore > 21) {
				dscore = 'busted!';
				dhitting = false;
			}
			else {
				dhitting = false;
			}
		}
		dealerPlay = false;
		resolve = true;

	}
	while (resolve === true){
		if (score > 21){
			//Busted
			console.log('You lost the hand.');
			$money = $money - 10;
			resolve = false;
			money();
		}
		else if (score < dscore){
			//Dealer wins
			console.log('The dealer drew to ' + dscore + '.');
			console.log('You lost the hand.');
			$money = $money - 10;
			resolve = false;
			money();
		}
		else if (score == dscore){
			//Dealer ties
			console.log('The dealer drew to ' + dscore + '.');
			console.log('You tied the dealer.')
			resolve = false;
			money();
		}
		else{
			//You win
			console.log('The dealer drew to ' + dscore + '.');
			console.log('You won the hand!');
			$money = $money + 10;
			resolve = false;
			money();
		}
	}
	if ($money <= 0){
		//Out of money
		console.log('You are out of money!');
		playing = false;
	}
}

};

