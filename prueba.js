let arr = [1, 2, 3, 4, 5];

const test = arr.filter((ele) => ele !== 3);
arr = test;
console.log(test, arr);
