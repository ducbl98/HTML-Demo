function addition(){
    let op1 = parseInt(document.getElementById("oprerand1").value)
    let op2 = parseInt(document.getElementById("oprerand2").value)
    let plus = op1 + op2;
    document.getElementById("result").innerHTML = document.getElementById("plus").value+":"+plus
}function subtraction(){
    let op1 = parseInt(document.getElementById("oprerand1").value)
    let op2 = parseInt(document.getElementById("oprerand2").value)
    let sub = op1 - op2;
    document.getElementById("result").innerHTML = document.getElementById("minus").value+":"+sub
}function multiplication(){
    let op1 = parseInt(document.getElementById("oprerand1").value)
    let op2 = parseInt(document.getElementById("oprerand2").value)
    let mul = op1 * op2;
    document.getElementById("result").innerHTML = document.getElementById("multiply").value+":"+mul
}function division(){
    let op1 = parseInt(document.getElementById("oprerand1").value)
    let op2 = parseInt(document.getElementById("oprerand2").value)
    let div = op1 / op2;
    document.getElementById("result").innerHTML = document.getElementById("divide").value+":"+div
}