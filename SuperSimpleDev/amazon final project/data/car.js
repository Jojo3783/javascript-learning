class Car {//create a class car()
  //keep property public 
  #brand;//give car class two properties brand and model
  #model;
  speed = 0;//add speed property and need to init as 0
  isTurnOpen;//boolean
  constructor (carDetails) {//create a constructor
    this.#brand = carDetails.brand;//set these two proprties
    this.#model = carDetails.model;
  };
  displayInfo() {//add method displayInfo that console.log `${brand} ${model}` 
    console.log(`${this.#brand} ${this.#model}, speed: ${this.speed} km/h`);
  };
  go () {
    if(this.speed + 5 > 200) {
      console.log('speed limits is 0 to 200')
      return;
    }
    if(this.isTurnOpen) {//if trunk is open go should not work
      console.log('close the trunk to go');
      return;
    }
    this.speed += 5;
  };
  break () {
    if(this.speed - 5 < 0) {
      console.log('speed limits is 0 to 200');
      return ;
    }
    this.speed -= 5;
  };
  openTrunk() {//openTrunk should not work if the car is moving
    if(this.speed > 0) {
      console.log('cann,t open trunk while car is moving')
      return;
    }
    this.isTurnOpen = true;
  };
  closeTrunk() {
    this.isTurnOpen = false;
  };
}
class RaceCar extends Car {
  acceleration = 0;
  constructor(RaceCarDetails) {
    super(RaceCarDetails);
    this.acceleration = RaceCarDetails.acceleration;
  }
  go() {
    if(this.speed + this.acceleration > 300) {
      return;
    }
    this.acceleration += 5;
    this.speed += this.acceleration;
  };
  openTrunk() {
    return;
  }
  closeTrunk() {
    return;
  }
};
const car1 = new Car({brand : 'Toyota', model : 'Corolla'});//use class generate car object
const car2 = new Car({brand : 'Tesla', model : 'Model 3'});
const raceCar1 = new RaceCar({brand : 'Mclaren', model : 'F1', acceleration : 20});
/*
console.log(car1);//console.log car object
console.log(car2);
console.log(raceCar1);
car1.displayInfo();
car2.displayInfo();
raceCar1.displayInfo();
car1.openTrunk();
car2.openTrunk();
raceCar1.openTrunk();
car1.closeTrunk();
car2.closeTrunk();
raceCar1.closeTrunk();
raceCar1.go();
raceCar1.go();
raceCar1.go();
car1.go();
car1.go();
car1.go();
car1.go();
car2.break();
car2.go();
car2.go();
car1.displayInfo();
car2.displayInfo();
raceCar1.displayInfo();
car1.openTrunk();
car2.openTrunk();
*/
