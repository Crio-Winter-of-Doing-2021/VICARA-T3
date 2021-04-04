var sharePopup = document.getElementById('share-popup')

function shareFile(file_id) {
    sharePopup.click()
    shareFilePopup(file_id)
}

function shareFilePopup(file_id) {

    var formPopup = document.getElementById('share-form-popup')
    formPopup.addEventListener('submit', async () => {
        var expireTime = document.getElementById('share').value
        console.log(expireTime)

        var copyBtn = document.getElementById('copy-popup')
        console.log(copyBtn)

        var expire_in = parseFloat(expireTime)
        const myHeaders = new Headers({
            'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
        })

        await fetch('http://localhost:3000/share/' + file_id + '&' + expire_in, {
            method: 'GET',
            headers: myHeaders,
        }).then((response) => {
            return response.text()
        }).then((data) => {
            sharePopup.click()
            copyBtn.click()
            copyToClipboard(data)
        }).then((_) => {
            setTimeout(() => {
                window.location.href = '/drive'
            }, 500)
        }).catch(err => console.log(err))
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