const findNumbersFrom1ToNDividedBy3And5 = compose(
    range,
    where(x => x % 3 === 0 && x % 5 === 0),
    toList
);

// 100 will be passed to fist function range
console.log(findNumbersFrom1ToNDividedBy3And5(100));

const findFirstNDividedBy3And5V2 = (n) => compose(
    iterate(n => n + (3 * 5), 3 * 5),
    // Take controls infinite stream passed by iterate
    take(n),
    toList
)();

// iterate does not require any parameter
// The argument is supplied to take by other means
console.log(findFirstNDividedBy3And5V2(20));

const firstFiveDuplicates = compose(
    where(seenBefore()),
    take(5),
    toList
)

console.log(firstFiveDuplicates([1, 2, 3, 2, 4, 4, 6, 3, 8, 9, 1, 12, 8, 6, 7]));

const firstNSeries = compose(
    // [0, 1] ==> [1, 1]
    // [1, 1] ==> [1, 2]
    // [1, 2] ==> [2, 3]
    iterate(([a, b]) => [b, a + b], [0, 1]),
    select(([a, b]) => a),
    take(30),
    toList
);

console.log(firstNSeries());

function compose(...functions) {
    return x => functions.reduce((a, f) => f(a), x);
}

function* range(n) {
    for (let i = 1; i <= n; i++) {
        yield i;
    }
}

function where (predicate) {
    return function*(numbers){
        for(const number of numbers) {
            if (predicate(number)) {
                yield number;
            }
        }
    }
}

function take(n) {
    let fetched = 0;
    return function*(source) {
        for (const item of source) {
            yield item;
            if (++fetched === n) {
                break;
            }
        }
    };
}

function toList(arg) {
    return Array.from(arg);
}

function select(convertor) {
    return function*(source) {
        for (const item of source) {
            yield convertor(item);
        }
    };
}

// Returns a function
function seenBefore() {
    // This function maintains a set
    // purist may not like it
    let seen = new Set();


    return number => {
        if(seen.has(number)) {
            return true;
        }
        seen.add(number);
        return false;
    };
}

function iterate(generator, base) {
    return function*() {
        let current = base;
        yield current;
        while (true) {
            current = generator(current);
            yield current;
        }
    }
}