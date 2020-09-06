// Immutable Class with a private constructor
export class NonZeroNumber {
    private constructor(readonly number: number) {}

    static TryCreate(v: number) : Result<NonZeroNumber> {
        if (v === 0) {
            return new ErrorResult("Number can not be zero");
        }
        // This is still too much syntax
        return new SuccessResult(new NonZeroNumber(v));
    }
}

export class ValidEmail {
    private constructor(readonly email: string) {}

    static TryCreate(v: string) : Result<ValidEmail> {
        if (v.length === 0) {
            return new ErrorResult("Invalid Email");
        }
        // This is still too much syntax
        return new SuccessResult(new ValidEmail(v));
    }
}

export class ErrorResult {
    readonly IsSuccess = false;
    constructor(readonly message: string, readonly error: any = undefined) {}
}

export class SuccessResult<T> {
    readonly IsSuccess = true;
    constructor(readonly value: T) {}
}

// This is Type Composition VS Inheritance
export type Result<T> = SuccessResult<T> | ErrorResult;
export type TrainBuilder<T> = Result<T>;
export type TrainRelayAction<T1, T2> = (i: T1) => Result<T2>;


export function buildTrain<T1, T2, T3>(
    a: TrainBuilder<T1>,
    b: TrainBuilder<T2>,
    c: TrainBuilder<T3>
): Result<[T1, T2, T3]>;
export function buildTrain<T1, T2, T3, T4>(
    a: TrainBuilder<T1>,
    b: TrainBuilder<T2>,
    c: TrainBuilder<T3>,
    d: TrainBuilder<T4>
): Result<[T1, T2, T3, T4]>;
export function buildTrain<T1, T2, T3, T4, T5>(
    a: TrainBuilder<T1>,
    b: TrainBuilder<T2>,
    c: TrainBuilder<T3>,
    d: TrainBuilder<T4>,
    e: TrainBuilder<T5>
): Result<[T1, T2, T3, T4, T5]>;
export function buildTrain<T1, T2, T3, T4, T5, T6>(
    a: TrainBuilder<T1>,
    b: TrainBuilder<T2>,
    c: TrainBuilder<T3>,
    d: TrainBuilder<T4>,
    e: TrainBuilder<T5>,
    f: TrainBuilder<T6>
): Result<[T1, T2, T3, T4, T5, T6]>;
export function buildTrain(...builders: TrainBuilder<any>[]): Result<any> {
    const train: any[] = [];
    for (const b of builders) {
        const r = b;
        if (!r.IsSuccess) {
            return r;
        }
        train.push(r.value);
    }
    return new SuccessResult(train);
}


export function relayTrain<T1, T2, T3>(
    a: TrainRelayAction<void, T1>,
    b: TrainRelayAction<T1, T2>,
    c: TrainRelayAction<T2, T3>
): Result<T3>;
export function relayTrain<T1, T2, T3, T4>(
    a: TrainRelayAction<void, T1>,
    b: TrainRelayAction<T1, T2>,
    c: TrainRelayAction<T2, T3>,
    d: TrainRelayAction<T3, T4>
): Result<T4>;
export function relayTrain<T1, T2, T3, T4, T5>(
    a: TrainRelayAction<void, T1>,
    b: TrainRelayAction<T1, T2>,
    c: TrainRelayAction<T2, T3>,
    d: TrainRelayAction<T3, T4>,
    e: TrainRelayAction<T4, T5>
): Result<T5>;
export function relayTrain<T1, T2, T3, T4, T5, T6>(
    a: TrainRelayAction<void, T1>,
    b: TrainRelayAction<T1, T2>,
    c: TrainRelayAction<T2, T3>,
    d: TrainRelayAction<T3, T4>,
    e: TrainRelayAction<T4, T5>,
    f: TrainRelayAction<T5, T6>
): Result<T6>;
export function relayTrain<T1, T2, T3, T4, T5, T6, T7>(
    a: TrainRelayAction<void, T1>,
    b: TrainRelayAction<T1, T2>,
    c: TrainRelayAction<T2, T3>,
    d: TrainRelayAction<T3, T4>,
    e: TrainRelayAction<T4, T5>,
    f: TrainRelayAction<T5, T6>,
    g: TrainRelayAction<T6, T7>
): Result<T7>;
export function relayTrain<T1, T2, T3, T4, T5, T6, T7, T8>(
    a: TrainRelayAction<void, T1>,
    b: TrainRelayAction<T1, T2>,
    c: TrainRelayAction<T2, T3>,
    d: TrainRelayAction<T3, T4>,
    e: TrainRelayAction<T4, T5>,
    f: TrainRelayAction<T5, T6>,
    g: TrainRelayAction<T6, T7>,
    h: TrainRelayAction<T7, T8>
): Result<T8>;
export function relayTrain<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
    a: TrainRelayAction<void, T1>,
    b: TrainRelayAction<T1, T2>,
    c: TrainRelayAction<T2, T3>,
    d: TrainRelayAction<T3, T4>,
    e: TrainRelayAction<T4, T5>,
    f: TrainRelayAction<T5, T6>,
    g: TrainRelayAction<T6, T7>,
    h: TrainRelayAction<T7, T8>,
    i: TrainRelayAction<T8, T9>
): Result<T9>;
export function relayTrain(
    ...actions: TrainRelayAction<any, any>[]
): Result<any> {
    let result: Result<any> | undefined = undefined;
    for (const a of actions) {
        result = a(result && result.IsSuccess ? result.value : undefined);
        if (!result.IsSuccess) {
            return result;
        }
    }
    return result !== undefined
        ? result
        : new ErrorResult("No actions provided.");
}