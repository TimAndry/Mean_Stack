function Ninja(name){
    this.name = name;
    this.health = 100;
    const speed = 3;
    const strength = 3;

    this.sayName = function(){
        console.log("Hello my name is", this.name);
    }

    this.showStats = function(){
        console.log("Name: ", this.name, "Health: ", this.health, "Strength: ", strength, "Speed: ", speed);
    }

    this.drinkSake = function(){
        this.health += 10;
    }
}

const ninjaWarrior = new Ninja('Tim');
ninjaWarrior.sayName();
ninjaWarrior.showStats();
ninjaWarrior.drinkSake();
ninjaWarrior.showStats();























// function Ninja(name){
//     this.name = name;
//     this.health = 100;
//     const strength = 3;
//     const speed = 3;
//     this.sayName = function(){
//         console.log("My name is ", this.name);
//     }
//     this.showStats = function(){
//         console.log("Name: ", this.name, "Health: ", this.health, "Strength: ", strength, "Speed: ", speed);
//     }
//     this.drinkSake = function(){
//         this.health += 10;
//     }
// }
// const ninjaTim = new Ninja("Tim");
// ninjaTim.sayName();
// ninjaTim.showStats();
// ninjaTim.drinkSake();
// ninjaTim.showStats();

// function Ninja(name){
//     this.name = name;
//     this.health = 100;
//     const strength = 3;
//     const speed = 3;

//     this.sayName = function(){
//         console.log("My name is ", this.name);
//     }
// }

// this.showStats = function(){
//     console.log("Name:", this.name, ", Health: ", this.health, ", Strength")
// }

// this.drinkSake = function(){
//     this.health += 10;
// }

// this.punch = function(ninja){
//     ninja.health -= 5;
// }

// const ninjaKevin = new Ninja("Kevin");
// ninjaKevin.sayName();
// ninjaKevin.showStats();
// ninjaKevin.drinkSake();
// ninjaKevin.showStats();


// ////////////////////////////////////////////////////////////////////////////////


