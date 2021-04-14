function isLeapYear() {
    let year = parseInt(document.getElementById("input").value)
    let isLeapYear = false;

    let isDivideBy4 = year % 4 == 0
    if (isDivideBy4) {
        let isDivideBy100 = year % 100
        if (isDivideBy100) {
            let isDivideBy400 = year % 400 == 0
            if (isDivideBy400) {
                isLeapYear = true;
            }
        }
        isLeapYear = true;
    }

    if (isLeapYear) {
        document.write(year + " is a leap year ")
    } else {
        document.write(year + " is not a leap year")
    }
}