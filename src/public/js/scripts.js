function showContent() {
    element = document.getElementById("pagos");
    check = document.getElementById("role");
    if (check.checked) {
        element.style.display='block';
    }
    else {
        element.style.display='none';
    }
}