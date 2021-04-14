/*let div = +prompt("Is divisible by ")
let isSatisfied = false
document.getElementById("number").innerHTML = "The First Fibonacci Number Divisible By " + div + " Is"
while (isSatisfied) {
    for (let i = 0; ; i++) {
        let fib = findFibonacciN(i)
        if (fib % div == 0) {
            isSatisfied = true;
            break;
        }
    }
}
document.write(fib)

function findFibonacciN(n) {
    let f1 = 1
    let f2 = 1
    let v
    if (n < 3) {
        return 1
    } else {
        for (let i = 0; i < n - 2; i++) {
            v = f1 + f2;
            f1 = f2
            f2 = v
        }
        return v
    }
}*/
let f1 = 1
let f2 = 1
for (let i = 0; ; i++) {
    let v = f1 + f2
    f1 = f2
    f2 = v
    if (v % 5 == 0) {
        document.write("The Fibonacci Number Is Divisible By 5 Is "+v)
        break;
    }

}
