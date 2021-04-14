let n = +prompt("Input N")
let count = 1
while (count <= n) {
    let isDivideBy3 = count % 3 == 0
    let isDivideBy5 = count % 5 == 0
    if (isDivideBy3 && isDivideBy5) {
        document.write("FizzBuzz<br>")
    } else {
        if (!isDivideBy3 && isDivideBy5) {
            document.write("Buzz<br>")
        } else {
            if (!isDivideBy5 && isDivideBy3) {
                document.write("Fizz<br>")
            } else {
                document.write(count+"<br>")
            }
        }
    }
    count++
}