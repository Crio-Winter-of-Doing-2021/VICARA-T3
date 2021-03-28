
document.onclick = hideMenu;
document.oncontextmenu = () => { return false };

function hideMenu() {
    if (document.getElementById("contextMenu"))
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
        var rename = menu.childNodes[3].childNodes[0];
        rename.onclick = () => { renameFile(id) }
        var details = menu.childNodes[5].childNodes[0];
        details.onclick = () => { detailPopup(createTime, updateTime, filename) }
        var moveToTrash = menu.childNodes[7].childNodes[0]
        moveToTrash.onclick = () => { mark_unmark_trash(id) }
        var delFile = menu.childNodes[9].childNodes[0]
        delFile.onclick = () => { deleteFile(id) }
    }
}