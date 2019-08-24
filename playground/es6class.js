// class Person {
//     constructor(name, id) {
//         console.log(name, id)
//         console.log("----------------------------")
//     }
// }

// let me = new Person("Emmanuel", 24);

class Hospital {
    constructor(name, age) {  // the constructor() is a method one has access to automatically without calling it
        this.name = name;   // here this refers to the instance below
        this.age = age;
    }
    
    getHospitalDetails() {    // method
        return `${this.name} is ${this.age} year(s) old`
    }
}

let island = new Hospital("St Nicolas Hospital", 54);    // instance of Hospital
console.log(island);
console.log("this.name:", island.name);
console.log("this.age:", island.age)
let details = island.getHospitalDetails();
console.log(details);