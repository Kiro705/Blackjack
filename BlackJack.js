//Simple Blackjack game!
//The chance of any card being drawn is always 1 in 13, even if there have been other cards drawn.
//Ace will always count as 11.
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
while(money > 0){
	var ace = 1;
	console.log ("You have $" + money + ".");
	var hand = [Math.floor((Math.random() * 13)),Math.floor((Math.random() * 13))];
	var score = value[hand[0]] + value[hand[1]];
	console.log('Your hand is '+ deck[hand[0]] + ' and '+ deck[hand[1]] +".");
	console.log('This adds up to '+ score +'.');
	var dealer = [Math.floor((Math.random() * 13)),Math.floor((Math.random() * 13))];
	var dscore = value[dealer[0]] + value[dealer[1]];
	console.log('The dealer has a ' + deck[dealer[0]] + " face up.")

var deal = true;
var stay = false;
var hitting = false;

while(deal === true){
	if(score > 21){
		console.log ("You busted!");
		deal = false;
		hitting = false;
	}
	else if (score === 21){
		console.log('You have Blackjack!');
		deal = false;
		hitting = false;
	}
	else if (stay === true){
		console.log("You have stayed.")
		console.log("Your final score is "+ score + ".")
		deal = false;
		hitting = false;
	}
	else{
		var hit = 0;
		var hitting = true;
	}
	while (hitting === true){
		var hit = window.prompt('Would you like to hit or stay? Type quit to exit game.');
		if(hit === "hit") {
			var draw = Math.floor((Math.random() * 13));
			score = score + value[draw];
			console.log('You hit!');
			console.log("You drew a " + deck[draw]);
			console.log("Your new score is " + score + ".");
			hitting = false;
		}
		else if (hit === "stay"){
			stay = true;
			hitting = false;
		}
		else if (hit === "quit"){
			console.log("Thanks for playing!");
			money = 0;
			hitting = false;
			deal = false;
			score = 0;
			dscore = 21;
			break;
			//Trying to end the program here.
		}
		else{
			console.log("I'm sorry, I didn't hear you.");
		}
	}		
}
console.log ('The dealer has ' + deck[dealer[0]] + ' and ' + deck[dealer[1]]+ '.');

var dnew = [Math.floor((Math.random() * 13)),Math.floor((Math.random() * 13)),Math.floor((Math.random() * 13))];
var i = 0;
while(dscore < 17){
	dscore = dscore + value[dnew[i]];
	if(dscore > 21){
		dscore = 'busted!';
	}
	console.log('The dealer drew ' + deck[dnew[i]] + '.');
	i++;
}
if (score > 21){
	console.log('You lost the hand.');
	money = money - 10;
	}
else if (score < dscore){
	console.log('The dealer drew to ' + dscore + '.');
	console.log('You lost the hand.');
	money = money - 10;
}
else{
	console.log('The dealer drew to ' + dscore + '.');
	console.log('You won the hand!');
	money = money + 10;
}
}
if (money <= 0){
	console.log('You are out of money!');
}

};

