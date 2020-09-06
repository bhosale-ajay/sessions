import { ErrorResult, SuccessResult, Result, NonZeroNumber, buildTrain, ValidEmail, relayTrain } from "./types";

function div1(a: number, b : number) : number {
    if (b === 0) {
        throw "Can not divide by zero.";
    }
    return a / b;
}

function div2(a : number, b : number) : Result<number> {
    if (b === 0) {
        return new ErrorResult("Can not divide by zero.");
    }
    return new SuccessResult(a / b);
}

console.log("\nDiv by 2 ---> ");
console.log(div2(4, 2));

console.log("\nDiv by 0 ---> ");
console.log(div2(4, 0));

// Passing valid argument is now problem of caller
function div3(a: number, b : NonZeroNumber) : number {
    return a / b.number;
}

console.log("\nDiv using NonZeroNumber ---> ");
const userInput = NonZeroNumber.TryCreate(4);
if (userInput.IsSuccess) {
    console.log(div3(16, userInput.value));
} else {
    console.log(`Invalid user input, Error : ${userInput.error}`);
}

const saveMessage = (m: string) => console.log(m);
function doSomethingV1(a: number, b: number, c: string) : Result<number> {
    // validate input a
    const userInputA = NonZeroNumber.TryCreate(a);
    if (!userInputA.IsSuccess) {
        return new ErrorResult(`Invalid user input A, Error : ${userInputA.error}`);
    }
    // validate input b
    const userInputB = NonZeroNumber.TryCreate(b);
    if (!userInputB.IsSuccess) {
        return new ErrorResult(`Invalid user input B, Error : ${userInputB.error}`);
    }
    // validate input c
    const userEmail = ValidEmail.TryCreate(c);
    if(!userEmail.IsSuccess) {
        return userEmail;
    }
    // some business logic
    const result = userInputA.value.number + userInputB.value.number;
    if(result % 2 === 0) {
        return new ErrorResult("Not allowed, sum of A and B can not be even.");
    }
    // Return the result
    return new SuccessResult(result);
}

function doSomeThingV2(a: number, b: number, c: string) : Result<number> {
    const validation = buildTrain(
        NonZeroNumber.TryCreate(a),
        NonZeroNumber.TryCreate(b),
        ValidEmail.TryCreate(c),
    );
    if(!validation.IsSuccess) {
        return validation;
    }
    const [va, vb, vc] = validation.value;
    const result = va.number + vb.number;
    if(result % 2 === 0) {
        return new ErrorResult("Not allowed, sum of A and B can not be even.");
    }
    // Save to DB
    const ops = saveResult([result, vc]);
    if(!ops.IsSuccess) {
        return ops;
    }
    return new SuccessResult(result);
}

function validateInputs(a: number, b: number, c: string) {
    return buildTrain(
        NonZeroNumber.TryCreate(a),
        NonZeroNumber.TryCreate(b),
        ValidEmail.TryCreate(c),
    );
}

function calculateResult([a, b, e] : [NonZeroNumber, NonZeroNumber, ValidEmail]) : Result<[number, ValidEmail]> {
    const result = a.number + b.number;
    if(result % 2 === 0) {
        return new ErrorResult("Invalid Input, sum of A and B can not be even.");
    }
    return new SuccessResult([result, e]);
}

function saveResult([r, e] : [number, ValidEmail]) {
    try {
        saveMessage(`Result for ${e.email} is ${r}`);
    } catch (ex) {
        return new ErrorResult("Failed to save db");
    }
    return new SuccessResult(1);
}

function doSomeThingV3(a: number, b: number, c: string) : Result<number> {
    return relayTrain(
        () => validateInputs(a, b, c),
        calculateResult,
        saveResult
    );
}
