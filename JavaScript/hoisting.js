console.log(hello);                                   
var hello = 'world';                                 
//this will log 'undefined'... the variable will be hoisted but it still isnt defined

var needle = 'haystack';
test();
function test(){
	var needle = 'magnet';
	console.log(needle);
}
// This will log 'magnet' the variable is declared inside the function and is logged accoring to scope


var brendan = 'super cool';
function print(){
	brendan = 'only okay';
	console.log(brendan);
}
console.log(brendan);
//This will log 'super cool' the script console.log's the global scope of the variable brendan and since the function was never called, the variable never changes.


var food = 'chicken';
console.log(food);
eat();
function eat(){
	food = 'half-chicken';
	console.log(food);
	var food = 'gone';
}
//This will log 'chicken', then it will call eat(), eat will log 'half-chicken'.


mean();
console.log(food);
var mean = function() {
	food = "chicken";
	console.log(food);
	var food = "fish";
	console.log(food);
}
console.log(food);
//this will return an error because mean is never defined as a function. It is declared as a variable and the variable is a function.


console.log(genre);
var genre = "disco";
rewind();
function rewind() {
	genre = "rock";
	console.log(genre);
	var genre = "r&b";
	console.log(genre);
}
console.log(genre);
//This will log undefined (since the genre variable is hoisted but not declared), then 'rock', then 'r&b', then 'disco - since rewind never returned the changed genre variable and there was a value in the global scope.


dojo = "san jose";
console.log(dojo);
learn();
function learn() {
	dojo = "seattle";
	console.log(dojo);
	var dojo = "burbank";
	console.log(dojo);
}
console.log(dojo);
//This will log 'san jose', then seattle, then burbank, then san jose again.


console.log(makeDojo("Chicago", 65));
console.log(makeDojo("Berkeley", 0));
function makeDojo(name, students){
        const dojo = {};
        dojo.name = name;
        dojo.students = students;
        if(dojo.students > 50){
            dojo.hiring = true;
        }
        else if(dojo.students <= 0){
            dojo = "closed for now";
        }
        return dojo;
}
//This will run the first time and return the object {name: chicago, students: 65, hiring: true}, but the const cannot be changed one it is declared and given a value and will throw an error


