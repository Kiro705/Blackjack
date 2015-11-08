//Simple Blackjack game!


var money = function(){
	$(document).ready(function(){
		$('#cash').remove();
		$('#money').prepend("<p id='cash'></p>");
		document.getElementById('cash').innerHTML = 'Money: $' + $money;
	});
};

var cards = [];
var $money = 0;
money();
var value = [11,2,3,4,5,6,7,8,9,10,10,10,10];
var altValue = [1,2,3,4,5,6,7,8,9,10,10,10,10];
var abbreviations = ['A',2,3,4,5,6,7,8,9,10,'J','Q','K'];
var score = 0;
var dscore = 0;
var dealer = [];
var hand = [];
var aces = 0;
var daces = 0;
var mycard = 0;
var dcard = 0;

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
};

var makeDeck = function(){
	var card = function(number, rank, suit){
		this.number = number;
		this.rank = rank;
		this.suit = suit;
	}
	var deck = function(){
		this.ranks = ['Ace','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Jack','Queen','King'];
		this.suits = ['heart','diamond','spade','club'];
	
    
    	for( var s = 0; s < this.suits.length; s++ ) {
    	    for( var n = 0; n < this.ranks.length; n++ ) {
        	    cards.push( new card( n+1, this.ranks[n], this.suits[s] ) );
        	}
    	}
    	shuffle(cards);
    	return cards;
	}
	deck();
};

var changeText = function(){
	$(document).ready(function(){
		var $text1 = text1;
		var $text2 = text2;
		var $text3 = text3;
		$('.text').remove();
		$('#textBox').prepend("<p class='text' id='text1'></p>");
		document.getElementById('text1').innerHTML = $text1;
		$('#textBox').append("<p class='text' id='text2'></p>");
		document.getElementById('text2').innerHTML = $text2;
		$('#textBox').append("<p class='text' id='text3'></p>");
		document.getElementById('text3').innerHTML = $text3;
	});

};

var showCard = function(){
	$(document).ready(function(){
		$('#player').append("<div class='card'>" + abbreviations[mycard.number - 1] + "<div class='img'><img src='img/" + mycard.suit + ".jpg' height='30' width='30'></div></div>")
	});
};

var showDcard = function(){
	$(document).ready(function(){
		$('#dealer').append("<div class='card'>" + abbreviations[dcard.number - 1] + "<div class='img'><img src='img/" + dcard.suit + ".jpg' height='30' width='30'></div></div>")
	});
};

var showBack = function(){
	$(document).ready(function(){
		$('#dealer').append("<div class='cardBack'><div class='back'><img src='img/back.jpg' height='95' width='65'></div></div>")
	});
};

var clearCards = function(){
	$(document).ready(function(){
		$('.card').remove();
	});
};

var clearBack = function(){
	$(document).ready(function(){
		$('.cardBack').remove();
	});
};

var letsplay = function(){
	$(document).ready(function(){
		$('#play').remove();
		$('#buttonBox').append("<button class='button' id='deal' onclick=dealme()>Deal</button>");
	});
	play();
};

var play = function(){
	text1 = 'Welcome to the Blackjack table!';
	text2 = 'Here is $100 to start, and each hand will cost $10.';
	text3 = '';
	changeText();
	$money = 100;
	money();
	aces = 0;
	daces = 0;
};

var dealme = function(){
	clearCards();
	if ($money < 10){
		$(document).ready(function(){
			$('.button').remove();
			text1 = "You don't have enough money to play!";
			text2 = "You lost.";
			text3 = '';
			changeText();
		});
	}
	else{
		$(document).ready(function(){
			$('.button').remove();
		});
		$money = $money - 10;
		money();
		dealPhase();
	}
};

var dealPhase = function() {
	cards = [];
	makeDeck();
	hand = [];
	dealer = [];

	//Player's 1st card
	mycard = cards.shift();
	showCard();
	hand.push(mycard);

	//Dealer's 1st card
	dcard = cards.shift();
	showDcard();
	dealer.push(dcard);

	//Player's 2nd card
	mycard = cards.shift();
	showCard();
	hand.push(mycard);

	//Dealer's 2nd card (facedown)
	dcard = cards.shift();
	showBack();
	dealer.push(dcard);

	text1 = 'Your hand is '+ hand[0].rank + ' and '+ hand[1].rank +".";
	console.log('Your hand is '+ hand[0].rank + ' and '+ hand[1].rank +".");
	if (hand[0].rank === 'Ace' && hand[1].rank === 'Ace'){
		score = 12;
		text2 = 'This adds up to 12.';
		aces = 1;
	}
	else if (hand[0].rank === 'Ace' || hand[1].rank === 'Ace'){
		score = value[hand[0].number - 1] + value[hand[1].number - 1];
		text2 = 'This adds up to '+ score +'.';
		aces = 1;
	}
	else{
		score = value[hand[0].number - 1] + value[hand[1].number - 1];
		text2 = 'This adds up to '+ score +'.';
		aces = 0;
	}
	dscore = value[dealer[0].number - 1] + value[dealer[1].number - 1];
	console.log('The dealer has ' + dealer[0].rank + " and " + dealer[1].rank + " face up.");
	text3 = 'The dealer has a ' + dealer[0].rank + " face up.";
	changeText();
	hitButtons();
};

var ihit = function(){
	var draw = cards.shift();
	mycard = draw;
	showCard();
	text1 = 'You have hit!';
	text2 = 'You drew a ' + draw.rank;
	if(score>10){
		score = score + altValue[draw.number - 1];
		if (score > 21 && aces === 1){
			score = score - 10;
			aces = 0;
		} 
	}
	else {
		score = score + value[draw.number - 1];
		if (draw.rank === 'Ace'){
			aces = 1;
		}
	}
	console.log("Hit. Drew " + draw.rank + ". Score is " + score + ".");
	text3 = "Your new score is " + score + ".";
	changeText();
	if (score > 20){
		resolveButton();
	}
	else{
		hitButtons();
	}
};

var westay = function(){
	text1 = "You have stayed.";
	text2 = "Your final score is " + score + ".";
	text3 = '';
	changeText();
	resolveButton();
};

var hitButtons = function(){
	$(document).ready(function(){
		$('.button').remove();
		$('#buttonBox').prepend("<button class='button' id='hit' onclick=ihit()>Hit</button>");
		$('#buttonBox').append("<button class='button' id='stay' onclick=westay()>Stay</button>");
	});
};

var resolveButton = function(){
	$(document).ready(function(){
			$('.button').remove();
			$('#buttonBox').prepend("<button class='button' id='resolve' onclick=resolvePhase()>Resolve</button>");
		});
};

var newDeal = function(){
	$(document).ready(function(){
		$('.button').remove();
		$('#buttonBox').append("<button class='button' id='deal' onclick=dealme()>Deal</button>");
		$('#buttonBox').append("<button style='width:200px' class='button' id='walk' onclick=walk()>Take Winnings</button>");
	});
};

var walk = function(){
	clearCards();
	$(document).ready(function(){
		$('.button').remove();
	});
	text1 = 'You walked away from the table with $' + $money + '.';
	text3 = '';
	if ($money > 100){
		text2 = 'Congratulations!';
	}
	else if ($money > 40){
		text2 = 'Could have gone worse...';
	}
	else {
		text2 = "Better to quit before it's all gone.";
	}
	changeText();
};

var resolvePhase = function(){
	clearBack();
	showDcard();
	text1 = 'The dealer has ' + dealer[0].rank + ' and ' + dealer[1].rank + '.';
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
			dcard = dnew;
			showDcard();
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
			dscore = 'busted';
			dhitting = false;
		}
		else {
			dhitting = false;
		}
	}
	var resolve = true;
	while (resolve === true){
		if (score > 21){
			//Busted
			console.log('You lost the hand. #####');
			text2 = 'They drew to ' + dscore + '.';
			text3 = 'You lost the hand.';
			resolve = false;
		}
		else if (score < dscore){
			//Dealer wins

			console.log('You lost the hand. #####');
			text2 = 'They drew to ' + dscore + '.';
			text3 = 'You lost the hand.';
			resolve = false;
		}
		else if (score == dscore){
			//Dealer ties
			console.log('You tied the dealer. #####')
			text2 = 'They drew to ' + dscore + '.';
			text3 = 'You tied the dealer.';
			resolve = false;
			$money = $money + 10;
			money();
		}
		else{
			//You win
			console.log('You won the hand! #####');
			text2 = 'They drew to ' + dscore + '.';
			text3 = 'You won the hand!';
			$money = $money + 20;
			resolve = false;
			money();
		}
	}
	changeText();
	newDeal();
};
