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