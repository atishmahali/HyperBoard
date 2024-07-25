const hours = document.getElementById("hours");
const mkhi = document.getElementById('mkhi');
const minutes = document.getElementById("minutes");
const meridiem = document.getElementById("meridiem");
const greeting_msg = document.getElementById("greeting-msg");
const date =  document.getElementById("date");
const name = document.getElementById("name");
const quote = document.getElementById("quote");



function get_name_from_localStorage(){
    name.textContent = localStorage.getItem("hyperboard_NAME") ?? name.textContent;
}
function read_localStorage(){
    get_name_from_localStorage();
    get_bg_from_localStorage();
}
function update_bg(img){
    document.getElementById('badan').style.setProperty('background',`center / cover no-repeat url(${img})`

    );
    localStorage.setItem("hyperboard_bgimg", img);
}

function get_bg_from_localStorage(){
    const img = localStorage.getItem("hyperboard_bgimg");
    if(img) update_bg(img);
}
