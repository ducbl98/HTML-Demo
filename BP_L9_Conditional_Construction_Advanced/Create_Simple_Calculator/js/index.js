let check = false;

function outputWrite(number) {
    if (check) {
        document.getElementById("output").value = number;
        check = false;
    } else {
        document.getElementById("output").value += number
    }
}

function outputDelete() {
    document.getElementById("output").value = "";
}

function calculate() {
    check = true;
    let output = document.getElementById("output").value;
    document.getElementById("output").value = eval(output);
}

function clearNumber() {
    if (!check) {
        let output = document.getElementById("output").value;
        document.getElementById("output").value = output.slice(0, -1);
    }

}