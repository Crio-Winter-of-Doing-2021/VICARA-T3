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