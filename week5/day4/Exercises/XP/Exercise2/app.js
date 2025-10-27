import {person} from './data.js';

const CalculAverageAge = () => {
    const totalAge = person.reduce((sum, person) => sum + person.age, 0);
    return totalAge / person.length;
}

console.log(`Average Age: ${CalculAverageAge()}`);