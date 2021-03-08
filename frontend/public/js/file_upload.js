const upload_file_btn = document.getElementById("upload-file");
const choose_file_btn = document.getElementById("choose-file");

upload_file_btn.addEventListener("click", ()=>{
    choose_file_btn.click();
    choose_file_btn.addEventListener("change", ()=>{
        document.getElementById("submit-btn").click();
    });
});