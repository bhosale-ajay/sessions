/*
const sum = (a, b) => a + b;
// function sum(a, b) {
//     return a + b;
// }

function addTo5 (b) {
    return sum(5, b);
}

function addToA(a) {
    return function (b) {
        return sum(a, b);
    };
}
*/

const sum = (a, b) => a + b;
// This is not currying as such
const addTo5 = b => sum(5, b);
const addToA = a => b => sum(a, b)

const addTo2 = addToA(2);
const addTo4 = addToA(4);

console.log(sum(3, 4));
console.log(addTo2(4));
console.log(addTo4(6));



console.log(addTo5(10));























/*
const sum = (a, b) => a + b;
const addTo5 = b => sum(5, b);
const addToA = a => b => sum(a, b)
*/
