const arr = [ 'fatfish', 'medium' ]
arr.push(...[ 'JavaScript', 'NodeJs' ])
console.log(arr) // ['fatfish', 'medium', 'JavaScript', 'NodeJs']

//Copy new array >
// A more convenient way
const arr = [ 'fatfish', 'medium', 'JavaScript', 'NodeJs' ]
const copyArr2 = [ ...arr ]

//Remove dupliate values on array >
const arr = [ 'fatfish', 'fatfish', 'medium', 'medium' ]
const uniqueArray = [ ...new Set(arr) ]

//Connect multiple arrays >
const arr1 = [ 'fatfish', 'medium' ]
const arr2 = [ 'JavaScript', 'NodeJs' ]
const arr = [ ...arr1, ...arr2 ] 

//Destructuring objects
const obj = { name: 'fatfish', age: 100, luckyNumber: 6 }
const { name, ...other } = obj
console.log(name) // fatfish
console.log(other) // { age: 100, luckyNumber: 6
