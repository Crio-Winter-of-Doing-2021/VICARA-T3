const home = document.getElementById('main-home')
home.click()

//*********************************************************/
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
    var trashLabel = document.getElementById('a4')
    trashLabel.innerHTML = 'Move to Trash'

    let len = file_list.length;
    let content = ``;
    if (len == 0) {
        content += `<div class="jumbotron jumbotron-fluid text-center">
        <div class="container">
          <h1 class="display-4">Empty</h1>
          <p class="lead">Add some files to Favorites</p>
        </div>
      </div>`
    }

    for (let i = 0; i < len; i++) {
        let file_details = file_list[i];
        let fav_status = 'mark-as-favourite';
        let fav_class = "far";

        if (file_details.isFav === true) {
            fav_status = 'unmark-as-favourite';
            fav_class = "fas";
        }

        content += `<li class="list-group-item bg-transparent"><div oncontextmenu="getContextMenu(` + '\'' + file_details.createdAt + '\'' + ',' + '\'' + file_details.updatedAt + '\'' + ',' + '\'' + file_details.file_name + '\'' + ',' + '\'' + file_details._id + '\'' + `)">
        <div class="row g-0">
        <div class="col-sm-6 col-md-8"><h5>${file_details.file_name}</h5></div>
        <i title = "${fav_status}" id = "${file_details._id}" class="${fav_class} fa-heart col-6 col-md-4" onclick = "mark_unmark_fav(` + '\'' + file_details._id + '\'' + `)"></i>
        </div>
        </div></li>`
    }

    return content;
}




//************************************************/

function getTrashContent(file_list) {
    let len = file_list.length;
    let content = ``;

    if (len == 0) {
        content += `<div class="jumbotron jumbotron-fluid text-center">
        <div class="container">
          <h1 class="display-4">Empty</h1>
          <p class="lead">Add some files to Trash</p>
        </div>
      </div>`
    }
    for (let i = 0; i < len; i++) {
        let file_details = file_list[i];

        content += `<li class="list-group-item bg-transparent"><div oncontextmenu="getContextMenu(` + '\'' + file_details.createdAt + '\'' + ',' + '\'' + file_details.updatedAt + '\'' + ',' + '\'' + file_details.file_name + '\'' + ',' + '\'' + file_details._id + '\'' + `)">
        <div class="row g-0">
        <div class="col-sm-6 col-md-8"><h5>${file_details.file_name}</h5></div>
        </div>
        </div></li>`
    }

    return content;
}

async function getFileList() {

    const myHeaders = new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
    })
    var trashLabel = document.getElementById('a4')
    trashLabel.innerHTML = 'Move to Trash'

    await fetch('http://localhost:3000/files', {
        method: "GET",
        headers: myHeaders,
    }).then(response => response.json())
        .then(json => {
            var list = JSON.stringify(json)
            var file_list = JSON.parse(list);
            var htmlValue = document.getElementById("files-list");
            htmlValue.innerHTML = getMyStorageContent(file_list);
        })
        .catch(err => console.log(err))
}

//******************************************************/

async function getTrashFileList() {
    var trashLabel = document.getElementById('a4')
    trashLabel.innerHTML = 'Move to Drive'
    const myHeaders = new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
    })

    await fetch('http://localhost:3000/trash', {
        method: "GET",
        headers: myHeaders,
    }).then(response => response.json())
        .then(json => {
            var list = JSON.stringify(json)
            var file_list = JSON.parse(list);
            var htmlValue = document.getElementById("files-list");
            htmlValue.innerHTML = getTrashContent(file_list);
        })
        .catch(err => console.log(err))


    // document.getElementById("files-list").innerHTML = authUser;
}

//******************************************************/


async function uploadFile() {
    var file = document.getElementById('choose-file');
    var token = localStorage.getItem('authToken');

    for await (let newFile of file.files) {
        console.log(newFile)
        var allFile = new FormData();
        allFile.append('uploadFile', newFile)

        const myHeaders = new Headers({
            'Authorization': 'Bearer ' + token,
        })

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
        return file.blob()
    }).then((data) => {
        downloadFile(file_name, data)
    })
}

// ********************************/

async function mark_unmark_fav(file_id) {
    let element = document.getElementById(file_id);
    let current_status;
    console.log(element)

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


function getContent(file_list) {
    var trashLabel = document.getElementById('a4')
    trashLabel.innerHTML = 'Move to Trash'

    let len = file_list.length;
    let content = ``;
    if (len == 0) {
        content += `<div class="jumbotron jumbotron-fluid text-center">
        <div class="container">
          <h1 class="display-4">Empty</h1>
          <p class="lead">Add some files to Favorites</p>
        </div>
      </div>`
    }
    for (let i = 0; i < len; i++) {
        let file_details = file_list[i][1];
        let fav_status = 'mark-as-favourite';
        let fav_class = "far";

        if (file_details.isFav === true) {
            fav_status = 'unmark-as-favourite';
            fav_class = "fas";
        }

        content += `<li class="list-group-item bg-transparent"><div oncontextmenu="getContextMenu(` + '\'' + file_details.createdAt + '\'' + ',' + '\'' + file_details.updatedAt + '\'' + ',' + '\'' + file_details.file_name + '\'' + ',' + '\'' + file_details._id + '\'' + `)">
        <div class="row g-0">
        <div class="col-sm-6 col-md-8"><h5>${file_details.file_name}</h5></div>
        <i title = ${fav_status} id = ${file_details._id} class="${fav_class} fa-heart col-6 col-md-4" onclick = "mark_unmark_fav(` + '\'' + file_details._id + '\'' + `)"></i>

        </div>
        </div></li>`
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
    });
}

// ***********************************************/ 
//************************************************/

async function getRecentFileList() {
    var trashLabel = document.getElementById('a4')
    trashLabel.innerHTML = 'Move to Trash'
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
            fileList.sort(function (a, b) {
                return new Date(b[1].updatedAt) - new Date(a[1].updatedAt)
            });
            console.log(fileList)
            var htmlValue = document.getElementById("files-list");
            var content = getContent(fileList);
            htmlValue.innerHTML = content;
        })
        .catch(err => console.log(err))
}

//*******************************/
//*******************************/

async function getFavouriteList() {
    var trashLabel = document.getElementById('a4')
    trashLabel.innerHTML = 'Move to Trash'
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
            var htmlValue = document.getElementById("files-list");
            var content = getContent(fileList);
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
        })
    })
}


//************************************************/

document.onclick = hideMenu;
document.oncontextmenu = () => { return false };

function hideMenu() {
    document.getElementById("contextMenu").style.display = "none"
}

function getContextMenu(createTime, updateTime, filename, id) {
    var e = window.event;

    if (document.getElementById("contextMenu").style.display == "block")
        hideMenu();
    else {
        var menu = document.getElementById("contextMenu")
        menu.style.left = e.pageX + "px";
        menu.style.top = e.pageY + "px";
        menu.style.display = 'block';

        var downFile = menu.childNodes[1].childNodes[0];
        downFile.onclick = () => { download(filename, id) }
        var rename = menu.childNodes[5].childNodes[0];
        rename.onclick = () => { renameFile(id) }
        var details = menu.childNodes[9].childNodes[0];
        details.onclick = () => { detailPopup(createTime, updateTime, filename) }
        var moveToTrash = menu.childNodes[13].childNodes[0]
        moveToTrash.onclick = () => { mark_unmark_trash(id) }
        var delFile = menu.childNodes[17].childNodes[0]
        delFile.onclick = () => { deleteFile(id) }
    }
}

//************************************************/

function detailPopup(createTime, updateTime, filename) {
    var detailPopupBtn = document.getElementById('detail-popup')
    detailPopupBtn.click();
    var createT = document.getElementById('create')
    createT.innerHTML = new Date(createTime).toUTCString()
    var updateT = document.getElementById('update')
    updateT.innerHTML = new Date(updateTime).toUTCString()
    var fileName = document.getElementById('detail-name')
    fileName.innerHTML = filename
}

//************************************************/
//************************************************/