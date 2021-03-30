async function addFolder() {
    const popup = document.getElementById('folder-popup')
    popup.click()

    var formPopup = document.getElementById('form-folder-popup')
    formPopup.addEventListener('submit', async () => {
        var folderName = document.getElementById('folder-name').value
        var parentId = localStorage.getItem('currentId')
        var parentName = localStorage.getItem('currentName')

        const obj = {
            'name': folderName,
            'parentId': parentId,
            'parentName': parentName,
        }

        const myHeaders = new Headers({
            "Content-type": "application/json; charset=UTF-8",
            'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
        })

        await fetch('http://localhost:3000/folder', {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(obj),
        })
    })
}


