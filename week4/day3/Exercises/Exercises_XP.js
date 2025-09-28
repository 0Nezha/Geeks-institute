// Exercise 1 : Location
//1:
const person = {
    name: 'John Doe',
    age: 25,
    location: {
        country: 'Canada',
        city: 'Vancouver',
        coordinates: [49.2827, -123.1207]
    }
}

const {name, location: {country, city, coordinates: [lat, lng]}} = person;

console.log(`I am ${name} from ${city}, ${country}. Latitude(${lat}), Longitude(${lng})`);
//output: I am John Doe from Vancouver, Canada. Latitude(49.2827), Longitude(-123.1207)


// Exercise 2: Display Student Info
function displayStudentInfo(objUser){
    const {first,last}=objUser;
    console.log(`Your full name is ${first} ${last}`)
}

displayStudentInfo({first: 'Elie', last:'Schoppik'});


//Exercise 3: User & id
const users = { user1: 18273, user2: 92833, user3: 90315 }
//1:
const usersArray1 = Object.entries(users);
console.log(usersArray1);
//2:
const usersArray2 = usersArray1.map(([user, id]) => [user, id * 2]);
console.log(usersArray2);


//Exercise 4 : Person class
class Person {
  constructor(name) {
    this.name = name;
  }
}

const member = new Person('John');
console.log(typeof member); // object " instance of the class Person"


//Exercise 5 : Dog class
class Dog {
  constructor(name) {
    this.name = name;
  }
};
//1: constructor 2 will successfully extend the Dog class 
  //2
class Labrador extends Dog {
  constructor(name, size) {
    super(name);
    this.size = size;
  }
};
 

// Exercise 6 : Challenges
// I:
//1:
//[2] === [2]   false
//{} === {}   false , les deux sont faux parce que javascript ne compare pas les objets par valeur mais par référence et bien sûr chacun a une référence différente de l'autre.

//2:
const object1 = { number: 5 }; 
const object2 = object1; 
const object3 = object2; 
const object4 = { number: 5};

object1.number = 4;
console.log(object2.number)//4
console.log(object3.number)//4
console.log(object4.number)//5
//En JavaScript les objets sont passés par référence. Donc Modifier un objet (object1) via une référence affecte toutes les autres références (object2, object3) qui pointent vers le même objet.
//Les objets créés séparément (object4) ne sont jamais affectés.

//II:
//1:
class Animal {
    constructor(name,type,color){
        this.name=name,
        this.type=type,
        this.color=color;
    }
}
//2:
class Mammal  extends Animal{
    constructor(name,type,color){
        super(name,type,color)
    }
     sound (sound) {
        console.log(`${sound} I'm a ${this.type},named ${this.name}, and I'm ${this.color}`);
    }
}
//3:
const farmerCow = new Mammal("Lily", "cow", "brown and white");
farmerCow.sound("Moooo");

const cat = new Mammal ("Caty", "cat", "White");
cat.sound("miaw");
