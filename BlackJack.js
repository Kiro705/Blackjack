//Simple Blackjack game!
//The chance of any card being drawn is always 1 in 13, even if there have been other cards drawn.
var play = function(){
console.log('Welcome to the Blackjack table!');
console.log('Here is $100 to start, and each hand will cost $10.');
var money = 100;

var playing = true;
var deck = ['Ace','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Jack','Queen','King'];
var value = [11,2,3,4,5,6,7,8,9,10,10,10,10];
var altValue = [1,2,3,4,5,6,7,8,9,10,10,10,10];
var hand = [0,0];
var score = 0;
var k = -1;
while(playing === true){
	k = -1;
	var j = 0;
	var h = 0;
	var dealerPlay = false;
	var resolve = false;
	console.log ("You have $" + money + ".");
	var hand = [Math.floor((Math.random() * 13)),Math.floor((Math.random() * 13))];
	var draw = [Math.floor((Math.random() * 13)), Math.floor((Math.random() * 13)), Math.floor((Math.random() * 13)), Math.floor((Math.random() * 13))];
	var score = value[hand[0]] + value[hand[1]];
	console.log('Your hand is '+ deck[hand[0]] + ' and '+ deck[hand[1]] +".");
	if (hand[0] === 0 && hand[1] === 0){
		console.log('This adds up to 12.');
	}
	else{
		console.log('This adds up to '+ score +'.');
	}
	var dealer = [Math.floor((Math.random() * 13)),Math.floor((Math.random() * 13))];
	var dscore = value[dealer[0]] + value[dealer[1]];
	console.log('The dealer has a ' + deck[dealer[0]] + " face up.");
	console.log(score + altValue[draw[1 - 1]]);
	var deal = true;
	var stay = false;
	var hitting = false;

	while(deal === true){
		if (hand[0] === 0 && hand[1] === 0 && j == 0){
			score = altValue[hand[0]] + value[hand[1]];
			j = 1;
			var hit = 0;
			var hitting = true;
		}
		else if(score > 21){
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
				k++;
				score = score + value[draw[k]];
				console.log('You hit!');
				console.log("You drew a " + deck[draw[k]]);
				console.log(k);
				if (score > 21){
					score = altValue[hand[0]] + altValue[hand[1]] + altValue[draw[0]];
					if (k => 1){
						score = altValue[hand[0]] + altValue[hand[1]] + altValue[draw[0]] + altValue[draw[1]];
						if (k => 2){
							score = altValue[hand[0]] + altValue[hand[1]] + altValue[draw[0]] + altValue[draw[1]] + altValue[draw[2]];
							if (k => 3){
								score = altValue[hand[0]] + altValue[hand[1]] + altValue[draw[0]] + altValue[draw[1]] + altValue[draw[2]] + altValue[draw[3]];
							}
						}
					}
				}
				console.log("Your new score is " + score + ".");
				hitting = false;
			}
			else if (hit === "stay"){
				stay = true;
				hitting = false;
				dealerPlay = true;
			}
			else if (hit === "quit" || hit === "exit" || hit === null){
				console.log("Thanks for playing!");
				console.log("You walked away with $"+money+".");
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
		var dnew = [Math.floor((Math.random() * 13)),Math.floor((Math.random() * 13)),Math.floor((Math.random() * 13)),Math.floor((Math.random() * 13))];
		var i = 0;
		if (dealer[0] === 0 && dealer[1] === 0 && h === 0){
			dscore = 12;
			var h = 1;
		}
		while(dscore < 17){
			dscore = dscore + value[dnew[i]];
			if (dscore > 21){
				dscore = altValue[dealer[0]] + altValue[dealer[1]] + altValue[dnew[0]];
				if (i > 0){
					dscore = altValue[dealer[0]] + altValue[dealer[1]] + altValue[dnew[0]] + altValue[dnew[1]];
					if (i > 1){
						dscore = altValue[dealer[0]] + altValue[dealer[1]] + altValue[dnew[0]] + altValue[dnew[1]] + altValue[dnew[2]];
						if (i > 2){
							dscore = altValue[dealer[0]] + altValue[dealer[1]] + altValue[dnew[0]] + altValue[dnew[1]] + altValue[dnew[2]] + altValue[dnew[3]];
						}
					}
				}
				if(dscore > 21){
					dscore = 'busted!';
				}
			}
			console.log('The dealer drew ' + deck[dnew[i]] + '.');
			console.log (i);
			i++;
		}
		dealerPlay = false;
		resolve = true;
	}
	while (resolve === true){
		if (score > 21){
			console.log('You lost the hand.');
			money = money - 10;
			resolve = false;
		}
		else if (score < dscore){
			console.log('The dealer drew to ' + dscore + '.');
			console.log('You lost the hand.');
			money = money - 10;
			resolve = false;
		}
		else{
			console.log('The dealer drew to ' + dscore + '.');
			console.log('You won the hand!');
			money = money + 10;
			resolve = false;
		}
	}
	if (money <= 0){
		console.log('You are out of money!');
		playing = false;
	}
}

};

