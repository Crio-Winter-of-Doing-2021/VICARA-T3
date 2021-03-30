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
}

function getTrashContent(file_list) {
    let len = file_list.length;
    let content = ``;

    for (let i = 0; i < len; i++) {
        let file_details = file_list[i];

        let fav_status = 'mark-as-favourite';
        let fav_class = "far";

        if (file_details.isFav === true) {
            fav_status = 'unmark-as-favourite';
            fav_class = "fas";
        }

        content += `<tr oncontextmenu="getContextMenu(` + '\'' + file_details.createdAt + '\'' + ',' + '\'' + file_details.updatedAt + '\'' + ',' + '\'' + file_details.file_name + '\'' + ',' + '\'' + file_details._id + '\'' + `)">

    <td>${i + 1}</td>
    <td>${file_details.file_name}</td>
        <td><i title = ${fav_status} id = ${file_details._id} class="${fav_class} fa-heart col-6 col-md-4" onclick = "mark_unmark_fav(` + '\'' + file_details._id + '\'' + `)"></i></td>
        </tr>`
    }

    return content;
}