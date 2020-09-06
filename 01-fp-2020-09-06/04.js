// Range is Generator Function
function* range(n) {
    for (let i = 1; i <= n; i++) {
        console.log(`Returning ${i}`);
        // control returns back to caller function
        yield i;
    }
}

for(const i of range(10)) {
    console.log(`Inside for loop ${i}`);
}

// This is an infinite loop
// Its upto the consumer to break the loop
function* iterate(generator, base) {
    let current = base;
    yield current;
    while (true) {
        current = generator(current);
        yield current;
    }
}

let x = 0;

for (const i of iterate(n => n + 3, 10)) {
    console.log(`Current : ${i}`);
    x = x + 1;
    if (x === 11) {
        break;
    }
}