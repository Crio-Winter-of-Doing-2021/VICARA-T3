async function closeFolder() {
    var parentId = localStorage.getItem('parentId')
    var email = localStorage.getItem('email')
    if (email != parentId) {
        viewFolder(parentId)
    }
}