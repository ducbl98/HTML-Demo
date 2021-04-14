let number = +prompt("Input The Number Of Prime Number ")
let count = 0
let N = 2
document.getElementById("number").innerHTML = "The First " + number + " Prime Number"
while (count < number) {
    if (isPrimeNumber(N)) {
        document.getElementById("result").innerHTML += N + " "
        count++;
    }
    N++
}

function isPrimeNumber(num) {
    let check = true
    for (let i = 2; i <= num / 2; i++) {
        if (num % i == 0) {
            check = false;
            break;
        }
    }
    return check
}