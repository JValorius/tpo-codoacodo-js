function abrirMenu() {
    var x = document.getElementById("nav-index");
    if (x.className === "nav") {
        x.className += " responsive";
    } else {
        x.className = "nav";
    }
}