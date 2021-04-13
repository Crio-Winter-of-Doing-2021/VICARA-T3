var sharePopup = document.getElementById('share-popup')

function shareFile(file_id) {
    sharePopup.click()
    shareFilePopup(file_id)
}

function shareFilePopup(file_id) {
    var expire_in = document.getElementById('share').value
    const obj = {
        'file_id': file_id,
        'expire_in': expire_in
    }

    console.log(obj)

    var formPopup = document.getElementById('share-form-popup')
    formPopup.addEventListener('submit', async () => {


        var copyBtn = document.getElementById('copy-popup')
        console.log(copyBtn)


        const myHeaders = new Headers({
            "Content-type": "application/json; charset=UTF-8",
            'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
        })

        await fetch('http://localhost:3000/share', {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(obj),
        }).then((response) => {
            return response.text()
        }).then((data) => {
            sharePopup.click()
            copyBtn.click()
            copyToClipboard(data)
        }).then((_) => {
            setTimeout(() => {
                window.location.href = '/drive?'
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