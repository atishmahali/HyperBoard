const menu = document.getElementById("menu");


document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    menu.style.display = "flex";
    menu.style.top = `${event.clientY}px`;
    menu.style.left = `${event.clientX}px`;
});

document.addEventListener("click", function(event) {
    if (!menu.contains(event.target)) {
        menu.style.display = "none";
    }
});
