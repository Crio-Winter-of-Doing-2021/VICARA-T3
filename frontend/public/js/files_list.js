async function getFileList() {
    const xhttp = new XMLHttpRequest();
    const backend_url = "http://localhost:3000/files";
    xhttp.open("GET", backend_url, true);
    xhttp.send();

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4) {
            const response_status = xhttp.status;
            if (response_status == 200) {
                const file_list = this.responseText;
                document.getElementById("files-list").innerHTML = file_list;
            } else {
                
            }
        }
    };
}