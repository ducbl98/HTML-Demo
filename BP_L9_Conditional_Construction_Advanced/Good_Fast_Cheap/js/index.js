function setSelected(id) {
    let goodStatus = document.getElementById("good").checked
    let fastStatus = document.getElementById("fast").checked
    let cheapStatus = document.getElementById("cheap").checked
    if (id === 'good') {
        if (fastStatus && cheapStatus) {
            fastStatus = false;
        }
    }
    if (id === 'fast') {
        if (goodStatus && cheapStatus) {
            cheapStatus = false;
        }
    }
    if (id === 'cheap') {
        if (goodStatus && fastStatus) {
            goodStatus = false;
        }
    }
    document.getElementById("cheap").checked = cheapStatus;
    document.getElementById("fast").checked = fastStatus;
    document.getElementById("good").checked = goodStatus;
}