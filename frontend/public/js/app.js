const upload_file_btn = document.getElementById("upload-file");
const choose_file_btn = document.getElementById("choose-file");

if (upload_file_btn) {
    upload_file_btn.addEventListener("click", () => {
        choose_file_btn.click();
        choose_file_btn.addEventListener("change", () => {
            document.getElementById("submit-btn").click();
        });
    });
}


//***********Authentication**********************/

setTimeout(() => {
    if (localStorage.authToken != null && window.location.href == 'http://localhost:8000/') {
        window.location.href = "/drive"
    }
}, 100)


const sign_in_btn = document.querySelector("#auth_sign-in-btn");
const sign_up_btn = document.querySelector("#auth_sign-up-btn");
const auth_container = document.querySelector(".auth_container");

if (sign_up_btn) {
    sign_up_btn.addEventListener("click", () => {
        auth_container.classList.add("auth_sign-up-mode");
    });
}

if (sign_in_btn) {
    sign_in_btn.addEventListener("click", () => {
        auth_container.classList.remove("auth_sign-up-mode");
    });
}

const loginForm = document.getElementById('myLoginForm');

if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        var email = document.getElementById("login_email");
        var password = document.getElementById("login_password");

        const user = {
            'email': email.value,
            'password': password.value,
        };

        await fetch('http://localhost:3000/login', {
            mode: 'cors',
            method: "POST",
            body: JSON.stringify(user),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        }).then(response => response.json())
            .then((json) => {
                localStorage.setItem('authToken', json.token)
                localStorage.setItem('authUser', JSON.stringify(json.user))
                window.location.href = "/drive";
                getFileList()
            })
            .catch(err => console.log(err))
    })
}

const signupForm = document.getElementById('mySignupForm')

if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault()

        var name = document.getElementById("signup_name")
        var email = document.getElementById("signup_email")
        var password = document.getElementById("signup_password")

        const user = {
            'name': name.value,
            'email': email.value,
            'password': password.value,
        }

        const response = await fetch('http://localhost:3000/signup', {
            mode: 'cors',
            method: "POST",
            body: JSON.stringify(user),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        }).then(response => response.json())
            .then(json => {
                localStorage.setItem('authToken', json.token)
                localStorage.setItem('authUser', JSON.stringify(json.user))
                window.location.href = "/drive";
                getFileList()
            })
            .catch(err => console.log(err))

    })
}

//*******************************/

authName = document.getElementById('authName')

if (authName) {
    authName.innerHTML = JSON.parse(localStorage.getItem('authUser')).name
}

//************************************************/

function getMyStorageContent(file_list) {
    let len = file_list.length;
    let content = ``;
    if (len == 0) {
        content += "<h1 style='color: red; padding: 20px'>No files are added in this section !!! </h1>"
    }
    for (let i = 0; i < len; i++) {
        let file_details = file_list[i];
        let fav_status = 'mark-as-favourite';
        let fav_class = "far";

        if (file_details.isFav === true) {
            fav_status = 'unmark-as-favourite';
            fav_class = "fas";
        }

        // <h6 class="card-subtitle mb-2 text-muted"><span style="color: red">Created : </span> ${beautify_time(file_details.createdAt)}</h6>
        // <h6 class="card-subtitle mb-2 text-muted"><span style="color: red">Updated : </span> ${beautify_time(file_details.updatedAt)}</h6>

        content += `<div id="${file_details._id}" oncontextmenu="getContextMenu(` + '\'' + file_details._id + '\'' + `)" class="card" style="width: 80vw; margin-top:35px; margin-left: 35px; border: 2px solid; border-radius: 20px;   box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);">
        <div class="card-body">
            <h5 class="card-title">${file_details.file_name}</h5><i title = ${fav_status} id = ${file_details._id} class="${fav_class} fa-heart" onclick = "mark_unmark_fav(` + '\'' + file_details._id + '\'' + `)"></i>
        </div>
        </div>`
    }

    return content;
}




//************************************************/

function getTrashContent(file_list) {
    let len = file_list.length;
    let content = ``;
    if (len == 0) {
        content += "<h1 style='color: red; padding: 20px'>No files are added in this section !!! </h1>"
    }
    for (let i = 0; i < len; i++) {
        let file_details = file_list[i];

        content += `<div class="card" style="padding: 10px; width: 70%; margin-top:35px; margin-left: 35px; border: 2px solid; border-radius: 20px;   box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);">
        <div class="card-body" style="margin: 20px;">
            <h5 style="padding: 5px;" class="card-title">${file_details.file_name}</h5>
            <button type="button" class="btn btn-primary"  onclick = "mark_unmark_trash('${file_details._id}')">Move to Drive</button>
            <i class="fa fa-trash" onclick = "deleteFile(` + '\'' + file_details._id + '\'' + `)"></i>
        </div>
      </div>`
    }

    return content;
}

async function getFileList() {

    const myHeaders = new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
    })

    await fetch('http://localhost:3000/files', {
        method: "GET",
        headers: myHeaders,
    }).then(response => response.json())
        .then(json => {
            var list = JSON.stringify(json)
            localStorage.setItem('file_list', list);
        }).then(() => {
            var file_list = JSON.parse(localStorage.file_list);
            var htmlValue = document.getElementById("files-list");
            htmlValue.innerHTML = getMyStorageContent(file_list);
        })
        .catch(err => console.log(err))


    // document.getElementById("files-list").innerHTML = authUser;
}

//******************************************************/

async function getTrashFileList() {

    const myHeaders = new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
    })

    await fetch('http://localhost:3000/trash', {
        method: "GET",
        headers: myHeaders,
    }).then(response => response.json())
        .then(json => {
            var list = JSON.stringify(json)
            localStorage.setItem('trash_file_list', list);
        }).then(() => {
            var file_list = JSON.parse(localStorage.trash_file_list);
            var htmlValue = document.getElementById("files-list");
            htmlValue.innerHTML = getTrashContent(file_list);
        })
        .catch(err => console.log(err))


    // document.getElementById("files-list").innerHTML = authUser;
}

//******************************************************/


async function uploadFile() {
    var file = document.getElementById('choose-file');

    const myHeaders = new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
    })

    for await (let newFile of file.files) {
        console.log(newFile)
        var allFile = new FormData();
        allFile.append('uploadFile', newFile)


        fetch('http://localhost:3000/upload', {
            method: 'POST',
            headers: myHeaders,
            body: allFile,
        })
    }
}

//******************************************************/

//************************************************/

function downloadFile(filename, file) {
    const blob = new Blob([file], { type: 'text/plain' });
    var myFile = new File([blob], filename)

    var element = document.createElement('a');
    element.setAttribute('download', filename);
    element.setAttribute('href', window.URL.createObjectURL(myFile));

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

async function download(file_name, file_id) {
    const myHeaders = new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
    })

    await fetch('http://localhost:3000/download/' + file_id, {
        method: 'GET',
        headers: myHeaders,
    }).then((file) => {
        return file.text()
    }).then((data) => {
        downloadFile(file_name, data)
    })
}

// ********************************/

async function mark_unmark_fav(file_id) {
    let element = document.getElementById(file_id);
    // console.log(element)
    let current_status;

    if (element.classList.contains("far")) {
        element.classList.remove("far");
        element.classList.add("fas");
        current_status = "false";
    } else if (element.classList.contains("fas")) {
        element.classList.remove("fas");
        element.classList.add("far");
        current_status = "true";
    }

    const myHeaders = new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
    })

    await fetch('http://localhost:3000/fav/' + file_id + '&' + current_status, {
        method: 'PATCH',
        headers: myHeaders,
    });
}

// *******************************/ 
function beautify_time(time) {
    return '<span style="color: black"> Date - </span>' + time.substring(0, 8) + time.substring(11, 13) + ' ... <span style="color: black"> Time - </span>' + time.substring(14, 19);
}

function getContent(file_list) {
    let download_link = 'http://localhost:3000/download/'
    let len = file_list.length;
    let content = ``;
    if (len == 0) {
        content += "<h1 style='color: red; padding: 20px'>No files are added in this section !!! </h1>"
    }
    for (let i = 0; i < len; i++) {
        let file_details = file_list[i][1];
        let fav_status = 'mark-as-favourite';
        let fav_class = "far";

        if (file_details.isFav === true) {
            fav_status = 'unmark-as-favourite';
            fav_class = "fas";
        }

        download_link += file_details._id;
        content += `
        <div class="card" style="padding: 10px; width: 70%; margin-top:35px; margin-left: 35px; border: 2px solid; border-radius: 20px;   box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);">
            <div class="card-body" style="margin: 20px;">
                <h5 style="padding: 5px;" class="card-title">${file_details.file_name}</h5>
                <h6 class="card-subtitle mb-2 text-muted"><span style="color: red">Created : </span> ${beautify_time(file_details.createdAt)}</h6>
                <h6 class="card-subtitle mb-2 text-muted"><span style="color: red">Updated : </span> ${beautify_time(file_details.updatedAt)}</h6>
                <p class="card-text"></p>
                <button type="button" onclick="download(` + '\'' + download_link + '\'' + `)" class="btn btn-primary"><i class="fa fa-download"></i></button>
                <button type="button"  onclick = "mark_unmark_trash(` + '\'' + file_details._id + '\'' + `)" class="btn btn-primary">Move to Trash</button>
                <i title = ${fav_status} id = ${file_details._id} class="${fav_class} fa-heart" onclick = "mark_unmark_fav(` + '\'' + file_details._id + '\'' + `)"></i>
                <i class="fa fa-trash" onclick = "deleteFile(` + '\'' + file_details._id + '\'' + `)"></i>
            </div>
        </div>`
    }

    return content;
}

//************************************************/

// ********************************/

async function mark_unmark_trash(file_id) {

    const myHeaders = new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
    })

    await fetch('http://localhost:3000/trash/' + file_id, {
        method: 'PATCH',
        headers: myHeaders,
    }).then((_) => {
        window.location.href = "/drive";
        getFileList();
    });
}

// *******************************/ 
//************************************************/

async function getRecentFileList() {

    const myHeaders = new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
    })

    await fetch('http://localhost:3000/files', {
        method: "GET",
        headers: myHeaders,
    }).then(response => response.json())
        .then(json => {
            var list = JSON.parse(JSON.stringify(json))
            var fileList = Object.keys(list).map((key) => [Number(key), list[key]]);
            fileList.sort((a, b) => (a.updatedAt > b.updatedAt ? 1 : -1))
            console.log(fileList)
            localStorage.setItem('recent_file_list', JSON.stringify(fileList));
        })
        .then(() => {
            var recent_file_list = JSON.parse(localStorage.recent_file_list);
            var htmlValue = document.getElementById("files-list");
            var content = getContent(recent_file_list);
            htmlValue.innerHTML = content;
        })
        .catch(err => console.log(err))
}

//*******************************/
//*******************************/

async function getFavouriteList() {
    const myHeaders = new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
    })

    await fetch('http://localhost:3000/files/fav', {
        method: "GET",
        headers: myHeaders,
    }).then(response => response.json())
        .then(json => {
            var list = JSON.parse(JSON.stringify(json))
            var fileList = Object.keys(list).map((key) => [Number(key), list[key]]);
            fileList.sort((a, b) => (a.updatedAt > b.updatedAt ? 1 : -1))
            console.log(fileList)
            localStorage.setItem('recent_file_list', JSON.stringify(fileList));
        })
        .then(() => {
            var recent_file_list = JSON.parse(localStorage.recent_file_list);
            var htmlValue = document.getElementById("files-list");
            var content = getContent(recent_file_list);
            htmlValue.innerHTML = content;
        })
        .catch(err => console.log(err))
}

//*******************************/

async function deleteFile(file_id) {

    const myHeaders = new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
    })

    await fetch('http://localhost:3000/files/' + file_id, {
        method: 'DELETE',
        headers: myHeaders,
    })
}

//************************************************/

async function logoutUser() {

    const myHeaders = new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
    })

    localStorage.clear()

    await fetch('http://localhost:3000/logout', {
        method: 'POST',
        headers: myHeaders,
    })


}

//************************************************/

async function logoutAllUser() {

    const myHeaders = new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
    })

    localStorage.clear()

    await fetch('http://localhost:3000/logoutAll', {
        method: 'POST',
        headers: myHeaders,
    })
}

//************************************************/

async function deleteUser() {
    const myHeaders = new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
    })

    localStorage.clear()

    await fetch('http://localhost:3000/me', {
        method: 'DELETE',
        headers: myHeaders,
    })
}
//************************************************/

async function renameFile(file_id) {
    console.log(file_id)
    var renamePopup = document.getElementById('rename-popup')
    renamePopup.click()
    var formPopup = document.getElementById('form-popup')
    formPopup.addEventListener('submit', async () => {
        var newName = document.getElementById('rename').value
        console.log(newName)

        const obj = {
            'newName': newName
        }

        const myHeaders = new Headers({
            "Content-type": "application/json; charset=UTF-8",
            'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
        })

        await fetch('http://localhost:3000/rename/' + file_id, {
            method: 'PATCH',
            headers: myHeaders,
            body: JSON.stringify(obj),
        }).then((_) => {
            window.location.href = "/drive";
            getFileList()
        })
    })
}


//************************************************/

document.onclick = hideMenu;
document.oncontextmenu = () => { return false };

function hideMenu() {
    document.getElementById("contextMenu").style.display = "none"
}

function getContextMenu(id) {
    var e = window.event;

    if (document.getElementById("contextMenu").style.display == "block")
        hideMenu();
    else {
        var menu = document.getElementById("contextMenu")
        menu.style.left = e.pageX + "px";
        menu.style.top = e.pageY + "px";
        menu.style.display = 'block';

        var rename = menu.childNodes[1].childNodes[0];
        rename.onclick = () => { renameFile(id) }
        var details = menu.childNodes[5].childNodes[0];
        details.onclick = () => { console.log('details') }
        var moveToTrash = menu.childNodes[9].childNodes[0]
        moveToTrash.onclick = () => { mark_unmark_trash(id) }
        var delFile = menu.childNodes[13].childNodes[0]
        delFile.onclick = () => { deleteFile(id) }
    }
}
