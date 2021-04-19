
document.onclick = hideMenu;
document.oncontextmenu = () => { return false };

function hideMenu() {
    if (document.getElementById("contextFileMenu"))
        document.getElementById("contextFileMenu").style.display = "none"

    if (document.getElementById("contextFolderMenu"))
        document.getElementById("contextFolderMenu").style.display = "none"
}

function getFileContextMenu(createTime, updateTime, filename, id) {
    var e = window.event;

    if (document.getElementById("contextFileMenu").style.display == "block")
        hideMenu();
    else {
        var menu = document.getElementById("contextFileMenu")
        menu.style.left = e.pageX + "px";
        menu.style.top = e.pageY + "px";
        menu.style.display = 'block';

        var downFile = menu.childNodes[1].childNodes[0];
        downFile.onclick = () => { download(filename, id) }
        var rename = menu.childNodes[3].childNodes[0];
        rename.onclick = () => { renameFile(id) }
        var details = menu.childNodes[5].childNodes[0];
        details.onclick = () => { detailPopup(createTime, updateTime, filename) }
        var moveToTrash = menu.childNodes[7].childNodes[0]
        moveToTrash.onclick = () => { mark_unmark_trash_file(id) }
        var delFile = menu.childNodes[9].childNodes[0]
        delFile.onclick = () => { deleteFile(id) }
    }
}

function getFolderContextMenu(createTime, updateTime, foldername, id) {
    var e = window.event;

    if (document.getElementById("contextFolderMenu").style.display == "block")
        hideMenu();
    else {
        var menu = document.getElementById("contextFolderMenu")
        menu.style.left = e.pageX + "px";
        menu.style.top = e.pageY + "px";
        menu.style.display = 'block';

        var openFile = menu.childNodes[1].childNodes[0];
        openFile.onclick = () => { viewFolder(id) }
        var rename = menu.childNodes[3].childNodes[0];
        rename.onclick = () => { renameFolder(id) }
        var details = menu.childNodes[5].childNodes[0];
        details.onclick = () => { detailPopup(createTime, updateTime, foldername) }
        // var moveToTrash = menu.childNodes[7].childNodes[0]
        // moveToTrash.onclick = () => { mark_unmark_trash(id) }
        var delFile = menu.childNodes[9].childNodes[0]
        delFile.onclick = () => { deleteFolder(id) }
    }
}