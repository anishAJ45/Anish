const pi = 3.14139;
let radius = 5;

// Arrow function to calculate area
const area = () => pi * radius * radius;

// Regular function to calculate area
function calculateArea() {
    return pi * radius * radius;
}

console.log(pi); // Prints value of pi
console.log(radius); // Prints value of radius
console.log(calculateArea()); // Prints area using function

// Promise example
const fetchBooks = new Promise((resolve, reject) => {
    const booksAvailable = true;
    if (booksAvailable) {
        setTimeout(() => resolve("Books fetched successfully"), 1000);
    } else {
        reject("Failed to fetch books");
    }
});

fetchBooks
    .then(response => console.log(response))
    .catch(response => console.log(response));