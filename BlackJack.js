//Simple Blackjack game!
//The chance of any card being drawn is always 1 in 13, even if there have been other cards drawn.
var money = function(){
	$(document).ready(function(){
		$('#cash').remove();
		$('#money').prepend("<p id='cash'></p>");
		document.getElementById('cash').innerHTML = 'Money: $' + $money;
	});
}
var $money = 100;
money();
var play = function(){
console.log('Welcome to the Blackjack table!');
console.log('Here is $100 to start, and each hand will cost $10.');
$money = 100;

var playing = true;
var deck = ['Ace','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Jack','Queen','King'];
var value = [11,2,3,4,5,6,7,8,9,10,10,10,10];
var altValue = [1,2,3,4,5,6,7,8,9,10,10,10,10];
var hand = [0,0];
var aces = 0;
var daces = 0;
while(playing === true){
	var counter = 0;
	var dcounter = 0;
	var hit = 0;
	var dealerPlay = false;
	var resolve = false;
	console.log ("You have $" + $money + ".");
	var hand = [Math.floor((Math.random() * 13)),Math.floor((Math.random() * 13))];
	var draw = [Math.floor((Math.random() * 13)), Math.floor((Math.random() * 13)), Math.floor((Math.random() * 13)), Math.floor((Math.random() * 13))];
	var dealer = [Math.floor((Math.random() * 13)),Math.floor((Math.random() * 13))];
	var dnew = [Math.floor((Math.random() * 13)),Math.floor((Math.random() * 13)),Math.floor((Math.random() * 13)),Math.floor((Math.random() * 13))];
	var score = 0
	console.log('Your hand is '+ deck[hand[0]] + ' and '+ deck[hand[1]] +".");
	if (hand[0] === 0 && hand[1] === 0){
		score = 12;
		console.log('This adds up to 12.');
		aces = 1;
	}
	else if (hand[0] === 0 || hand[1] === 0){
		score = value[hand[0]] + value[hand[1]];
		console.log('This adds up to '+ score +'.');
		aces = 1;
	}
	else{
		score = value[hand[0]] + value[hand[1]];
		console.log('This adds up to '+ score +'.');
		aces = 0;
	}
	var dscore = value[dealer[0]] + value[dealer[1]];
	console.log('The dealer has a ' + deck[dealer[0]] + " face up.");
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
			var hit = 0;
			var hitting = true;
		}
		while (hitting === true){
			var hit = window.prompt('Would you like to hit or stay? Type quit to exit game.');
			if(hit === "hit") {
				console.log('You hit!');
				console.log("You drew a " + deck[draw[counter]]);
				if(score>10){
					score = score + altValue[draw[counter]];
					counter++;
					if (score > 21 && aces === 1){
						score = score - 10;
						aces = 0;
					} 
					hitting = false;
				}
				else {
					score = score + value[draw[counter]];
					if (deck[draw[counter]] === 'Ace'){
						aces = 1;
					}
					counter++;
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
		console.log ('The dealer has ' + deck[dealer[0]] + ' and ' + deck[dealer[1]]+ '.');
		dcounter = 0;
		if (dealer[0] === 0 && dealer[1] === 0){
			dscore = 12;
			daces = 1;
		}
		else if (dealer[0] === 0 || dealer[1] === 0){
			daces = 1;
		}
		var dhitting = true;
		while (dhitting === true){
			while (dscore < 17){
				console.log ('The dealer drew ' +deck[dnew[dcounter]]+ '.');
				if(dscore>10){
					dscore = dscore + altValue[dnew[dcounter]];
					if (dscore > 21 && daces === 1){
						dscore = dscore - 10;
						daces = 0;
					} 
					dcounter++;
				}
				else {
					dscore = dscore + value[dnew[dcounter]];
					if (deck[dnew[dcounter]] === 'Ace'){
						daces = 1;
					}
					dcounter++;
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

