let number = +prompt("Input The Number Of Fibonacci Number  ")
let sum =0
document.getElementById("number").innerHTML = "The Sum Of The First " + number + " Fibonacci Number"
for (let i = 0; i <number ; i++) {
    let fib = findFibonacciN(i+1)
    sum +=fib
}
document.write(sum)
/*function findFibonacciN(n) {
    if(n==1||n==2) {
        return 1;
    }else return findFibonacciN(n-1)+findFibonacciN(n-2)
}*/
function findFibonacciN(n) {
    let f1 = 1
    let f2 = 1
    let v
    if (n < 3) {
        return 1
    } else {
        for (let i = 0; i < n-2; i++) {
            v = f1 + f2;
            f1 = f2
            f2 = v
        }
        return v
    }
}