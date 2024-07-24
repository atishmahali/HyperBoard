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
