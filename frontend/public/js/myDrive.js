function getMyStorageContent(file_list) {
  var trashLabel = document.getElementById('a4')
  trashLabel.innerHTML = 'Move to Trash'

  let len = file_list.length;
  let content = ``;
  if (len == 0) {
    content += `<div class="jumbotron jumbotron-fluid text-center">
        <div class="container">
          <h1 class="display-4">Empty</h1>
          <p class="lead">Add some files to Favorites</p>
        </div>
      </div>`
  }

  for (let i = 0; i < len; i++) {
    let file_details = file_list[i];
    let fav_status = 'mark-as-favourite';
    let fav_class = "far";

    if (file_details.isFav === true) {
      fav_status = 'unmark-as-favourite';
      fav_class = "fas";
    }

    content += `<tr oncontextmenu="getContextMenu(` + '\'' + file_details.createdAt + '\'' + ',' + '\'' + file_details.updatedAt + '\'' + ',' + '\'' + file_details.file_name + '\'' + ',' + '\'' + file_details._id + '\'' + `)">
        <td>${i + 1}</td>
        <td>${file_details.file_name}</td>
        <td>Root</td>
        <td><i title = "${fav_status}" id = "${file_details._id}" class="${fav_class} fa-heart" onclick = "mark_unmark_fav(` + '\'' + file_details._id + '\'' + `)"></i></td>

</tr>`
  }

  return content;
}