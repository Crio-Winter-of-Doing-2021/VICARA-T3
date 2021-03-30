async function uploadFile() {
    var file = document.getElementById('choose-file');
    var token = localStorage.getItem('authToken');

    for await (let newFile of file.files) {
        console.log(newFile)
        var allFile = new FormData();
        var parentId = localStorage.getItem('currentId')
        var parentName = localStorage.getItem('currentName')
        allFile.append('uploadFile', newFile)
        allFile.append('parentId', parentId)
        allFile.append('parentName', parentName)

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