function where (predicate) {
    return (numbers) => {
        const result = [];
        for(const number of numbers) {
            if (predicate(number)) {
                result.push(number);
            }
        }
        return result;
    }
}

const takeOnlyEven = where(x => x % 2 === 0);
const isOdd = x => x % 2 === 1;
const takeOnlyOdd = where(isOdd);

console.log(takeOnlyEven([1, 2, 3, 4]));
console.log(takeOnlyOdd([1, 2, 3, 4]));

