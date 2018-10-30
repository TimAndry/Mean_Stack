function Ninja(name){
    this.name = name;
    this.health = 100;
    this.speed = 3;
    this.strength = 3;

    this.sayName = function(){
        console.log("Hello my name is", this.name);
    }

    this.showStats = function(){
        console.log("Name:", this.name, ", Health:", this.health, ", Strength:", this.strength, ", Speed: ", this.speed);
    }

    this.drinkSake = function(){
        this.health += 10;
    }

    this.punch = function(Ninja){
        console.log(this.name + ' punched 5 health out of ' + Ninja.name);
        this.health -= 5;
    }

    this.kick = function(Ninja){
        console.log(this.name + ' kicked ' + this.strength * 15 + ' health out of ' + Ninja.name + ' ...Ouch!')
    }
}

class Sensei extends Ninja {
    constructor(name, wisdom){
        super();
        this.name = name;
        this.wisdom = 10;
        this.health = 200;
        this.strength = 10;
        this.speed = 10;
    }

    speakWisdom(){
        const drink = this.drinkSake();
        console.log('Is you drunk!?');
    }
}




const lightNinja = new Ninja('Tim');
const darkNinja = new Ninja('Evil Tim');
const lightSensei = new Sensei('Super Tim');
lightSensei.speakWisdom();
lightSensei.showStats();
lightNinja.punch(darkNinja);
lightNinja.kick(darkNinja);




