const change_bg_btn = document.getElementById("change-bg-btn");
const bg_input = document.getElementById("upload-bg-btn");
change_bg_btn.addEventListener('click', function() {
    bg_input.click();
});
bg_input.addEventListener('change', function (file){
    menu.style.display = "none";
    const reader = new FileReader();
    reader.onload = function(){
update_bg(reader.result);
    };
    reader.readAsDataURL(file.target.files[0]);
});