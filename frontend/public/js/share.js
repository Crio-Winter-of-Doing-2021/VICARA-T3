async function shareFile(file_id) {
    var sharePopup = document.getElementById('share-popup')
    sharePopup.click()

    var formPopup = document.getElementById('share-form-popup')
    formPopup.addEventListener('submit', async () => {
        var expireTime = document.getElementById('share').value
        console.log(expireTime)

        var expire_in = parseFloat(expireTime)
        const myHeaders = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
        })

        await fetch('http://localhost:3000/share/' + file_id + '&' + expire_in, {
            method: 'GET',
            headers: myHeaders,
        }).then((response) => {
            return response.text()
        }).then((data) => {
            copyToClipboard(data)
            window.location.href = '/drive'
        })
    })
}

function copyToClipboard(text) {
    if (navigator.clipboard) { // default: modern asynchronous API
        return navigator.clipboard.writeText(text);
    } else if (window.clipboardData && window.clipboardData.setData) {     // for IE11
        window.clipboardData.setData('Text', text);
        return Promise.resolve();
    } else {
        // workaround: create dummy input
        const input = h('input', { type: 'text' });
        input.value = text;
        document.body.append(input);
        input.focus();
        input.select();
        document.execCommand('copy');
        input.remove();
        return Promise.resolve();
    }
}