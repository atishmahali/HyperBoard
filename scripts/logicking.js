

function update_time() {
    const time = new Date();
    const [pm, h] = get_hours(time.getHours());
    const m = suuii(time.getMinutes());
    hours.textContent = h;
    mkhi.classList.toggle("vis-hid");
    minutes.textContent = m;
    meridiem.textContent = pm ? "PM" : "AM";
}

function get_hours(hrs) {
    const isPM = hrs >= 12;
    if (hrs > 12) {
        hrs %= 12;
    } else if (hrs === 0) {
        hrs = 12; // Handle midnight case
    }
    return [isPM, suuii(hrs)];
}

function suuii(thing) {
    return thing < 10 ? `0${thing}` : thing;
}

function update_greeting_msg() {
    const hour = new Date().getHours();
    if (hour <= 6) {
        greeting_msg.textContent = "Rise and shine with HyperBoard!";
    } else if (hour >= 12 && hour < 14) {
        greeting_msg.textContent = "Stay updated this afternoon with HyperBoard.";
    } else if (hour >= 14 && hour < 19) {
        greeting_msg.textContent = "Good afternoon! Check out what's new on HyperBoard.";
    } else if (hour >= 19 && hour <= 24) {
        greeting_msg.textContent = "Evening updates are live on HyperBoard.";
    } else {
        greeting_msg.textContent = "Welcome to HyperBoard! Your go-to source for the latest updates and information.";
    }
}
date.textContent = new Date().toLocaleString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',

});




setInterval(update_time, 1000);
update_time();

update_greeting_msg();
setInterval(update_greeting_msg, 3600000);
