// 2721. Execute Asynchronous Functions in Parallel
// Given an array of asynchronous functions functions, return a new promise promise. Each function in the array accepts no arguments and returns a promise. All the promises should be executed in parallel.

// promise resolves:

// When all the promises returned from functions were resolved successfully in parallel. The resolved value of promise should be an array of all the resolved values of promises in the same order as they were in the functions. The promise should resolve when all the asynchronous functions in the array have completed execution in parallel.
// promise rejects:

// When any of the promises returned from functions were rejected. promise should also reject with the reason of the first rejection.
// Please solve it without using the built-in Promise.all function.

// Example 1:

// Input: functions = [
//   () => new Promise(resolve => setTimeout(() => resolve(5), 200))
// ]
// Output: {"t": 200, "resolved": [5]}
// Explanation:
// promiseAll(functions).then(console.log); // [5]

// The single function was resolved at 200ms with a value of 5.
// Example 2:

// Input: functions = [
//     () => new Promise(resolve => setTimeout(() => resolve(1), 200)),
//     () => new Promise((resolve, reject) => setTimeout(() => reject("Error"), 100))
// ]
// Output: {"t": 100, "rejected": "Error"}
// Explanation: Since one of the promises rejected, the returned promise also rejected with the same error at the same time.
// Example 3:

// Input: functions = [
//     () => new Promise(resolve => setTimeout(() => resolve(4), 50)),
//     () => new Promise(resolve => setTimeout(() => resolve(10), 150)),
//     () => new Promise(resolve => setTimeout(() => resolve(16), 100))
// ]
// Output: {"t": 150, "resolved": [4, 10, 16]}
// Explanation: All the promises resolved with a value. The returned promise resolved when the last promise resolved.

// Constraints:

// functions is an array of functions that returns promises
// 1 <= functions.length <= 10

// SOLUTION with promise.all
var promiseAll = function (functions) {
  const promiseArray = functions.map((fn) => fn());
  return Promise.all(promiseArray);
};

const promise = promiseAll([() => new Promise((res) => res(42))]);
promise.then(console.log);

// SOLUTION withou promise.all
// If you're like me, you might be stuck on some code that looks reasonably similar to some of the submitted solutions, but isn't working. I hope some of the insight here helps you out.

// Intuition
// The goal is to take an array of asynchronous functions and to either (A) return an array of all their resolved values in order, or (B) reject on the first promise's rejection.

// Intuitively, your first thought might be: loop through the array of functions, invoke the functions one by one, put their resulting values into the array, and then resolve the array. If you're like me, maybe something like this:

var promiseAllIncorrect = async function (functions) {
  return new Promise((resolve, reject) => {
    let results = [];
    functions.forEach((fn) => {
      fn()
        .then((val) => results.push(val))
        .catch((reason) => reject(reason));
    });
    resolve(results);
  });
};

// This is on the right track, but there are some details that will cause issues.

// For one, remember the results have to be in order. It's important to understand that the code above doesn't know when .then will be called for a given promise. As is, the code will simply push the values into the array in the order of the promises' completion. In the scope of this exercise, where the asynchronous functions are simulated with setTimeout, that just means the shortest timeout will be the first value into the array.

// Second, we don't know when all of the promises will be fulfilled. For the given test cases, this code will just return an empty array. This happens because we are resolving the results array without waiting for all of the individual promises to complete.

// So to fix this code, we need to (1) insert the fulfilled values so that the resulting array is in the correct order, (2) track the promises as they're fulfilled, and (3) only resolve the resulting array once all fulfilled values have been inserted.

// Solution (theory)
// To insert the values in the correct order, we can simply insert the values at the correct array index instead of pushing into the array. It's important that this happens in the .then clause - this way we know that it's not an unfulfilled promise being stored in the array.

// What can we do to track the promises as they're fulfilled? We know that it must happen in the .then clause, since it's guaranteed to run after the respective promise has fulfilled. A simple solution is to just have a running count, and increment it once each time a promise fulfills. We can compare that count to the length of the original functions array to check the overall progress.

// How, then, can we fix the code so that the array is only resolved when it's "ready"? We know that we can compare the count to the length of functions to check our progress, so we can once again rely on the .then clause. Every time a promise is fulfilled and its resulting value is inserted, we can check if it was the last promise that needed to be fulfilled. If yes, we break out of the loop by resolving the results array. It's important that this check happens for every promise, since any of them could theoretically be the last to fulfill.

// My solution is thus:

/**
 * @param {Array<Function>} functions
 * @return {Promise<any>}
 */
var promiseAllV2 = async function (functions) {
  return new Promise((resolve, reject) => {
    // We know the resulting array will be the same length as functions
    const results = new Array(functions.length);
    let count = 0;
    functions.forEach((fn, i) => {
      fn()
        .then((val) => {
          results[i] = val;
          count++;
          if (count === functions.length) resolve(results);
        })
        .catch((reason) => reject(reason));
    });
  });
};

const promiseV2 = promiseAllV2([
  () => new Promise((resolve) => setTimeout(() => resolve(4), 50)),
  () => new Promise((resolve) => setTimeout(() => resolve(10), 150)),
  () => new Promise((resolve) => setTimeout(() => resolve(16), 100)),
]);
promiseV2.then(console.log); // [42]

// Sources of error
// If your resulting array has the correct values, but the time elapsed is incorrect, then the code is probably being held up by await. Remember that the function will wait for the promise to resolve with the await keyword. A correct solution will run all the promises asynchronously, but will only resolve the resulting array after all promises have been resolved
