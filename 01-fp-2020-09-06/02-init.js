function showOdd(numbers) {
    for(const number of numbers) {
        if(number % 2 === 1) {
            console.log(number);
        }
    }
}

function showEven(numbers) {
    for(const number of numbers) {
        if(number % 2 === 0) {
            console.log(number);
        }
    }
}
console.log("Show odd numbers");
showOdd([1, 2, 3, 4]);
console.log("Show even numbers");
showEven([1, 2, 3, 4]);

