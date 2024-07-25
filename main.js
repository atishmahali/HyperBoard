setInterval(update_time, 1*1000);
get_name_from_localStorage();
read_localStorage();

name.addEventListener('input', function(){
    if (name.textContent.length >= 25){
        get_name_from_localStorage();
    }
    localStorage.setItem("hyperboard_NAME", name.textContent);
})
document.addEventListener('DOMContentLoaded', () => {
    const redirectBtn = document.getElementById('redirect-btn');

    redirectBtn.addEventListener('click', () => {
        window.location.href = 'pomodoro/pomodoro.html';
    });
});
const shouldShowQuote = localStorage.getItem("neutrabize_SHOULDSHOWQUOTE");
const shouldShowShortcuts = localStorage.getItem(
    "neutrabize_SHOULDSHOWSHORTCUTS"
);
const activeTheme = localStorage.getItem("neutrabize_THEMEDATA");
const shouldShowBattery = localStorage.getItem("neutrabize_SHOULDSHOWBATTERY");

if (activeTheme) {
    try {
        const theme = JSON.parse(activeTheme);
        updateTheme(theme);

        themes.forEach(
            (_theme) =>
                (_theme.dataset.active = _theme.dataset.name === theme.name)
        );
    } catch {}
}

if (shouldShowQuote === "true") {
    const toggle = document.getElementById("show-quote-toggle");

    toggle.dataset.on = "true";
    quote.style.display = "block";
    quote.classList.remove("animate-away");
}
if (shouldShowShortcuts === "false") {
    const toggle = document.getElementById("show-shortcuts-toggle");
    const shortcutsBar = document.getElementById("shortcuts-bar");

    toggle.dataset.on = "false";
    shortcutsBar.dataset.show = "false";
} else shortcuts.classList.remove("animate-away");