(function(){

type ArrayOfNumbers = number[];
type AFunction_TakesANumber_ReturnBoolean = (i: number) => boolean;
type AFunction_TakesAnArray_ReturnsAndArray = (items: ArrayOfNumbers) => ArrayOfNumbers;


const where = 
    (predicate : AFunction_TakesANumber_ReturnBoolean) 
    : AFunction_TakesAnArray_ReturnsAndArray => {
    return (numbers: ArrayOfNumbers ) : ArrayOfNumbers => {
        const result : ArrayOfNumbers = [];
        for(const number of numbers) {
            if (predicate(number)) {
                result.push(number);
            }
        }
        return result;
    }
}

const takeOdd = where(x => x % 2 === 1);

takeOdd([1, 2, 3, 4]);

}());