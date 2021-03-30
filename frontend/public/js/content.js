function getFileContent(file_list) {
  var trashLabel = document.getElementById('a4')
  trashLabel.innerHTML = 'Move to Trash'

  let len = file_list.length;
  let content = ``;
  for (let i = 0; i < len; i++) {
    let file_details = file_list[i];
    let fav_status = 'mark-as-favourite';
    let fav_class = "far";

    if (file_details.isFav === true) {
      fav_status = 'unmark-as-favourite';
      fav_class = "fas";
    }

    content += `<tr oncontextmenu="getFileContextMenu(` + '\'' + file_details.createdAt + '\'' + ',' + '\'' + file_details.updatedAt + '\'' + ',' + '\'' + file_details.file_name + '\'' + ',' + '\'' + file_details._id + '\'' + `)">

    <td>${i + 1}</td>
    <td>${file_details.file_name}</td>
    <td><i title = ${fav_status} id = ${file_details._id} class="${fav_class} fa-heart" onclick = "mark_unmark_fav(` + '\'' + file_details._id + '\'' + `)"></i></td>

    </tr>`
  }

  return content;
}


function getFolderContent(folder_list) {
  var trashLabel = document.getElementById('a4')
  trashLabel.innerHTML = 'Move to Trash'

  let len = folder_list.length;
  let content = ``;
  for (let i = 0; i < len; i++) {
    let folder_details = folder_list[i];
    let fav_status = 'mark-as-favourite';
    let fav_class = "far";

    if (folder_details.isFav === true) {
      fav_status = 'unmark-as-favourite';
      fav_class = "fas";
    }

    content += `<tr oncontextmenu="getFolderContextMenu(` + '\'' + folder_details.createdAt + '\'' + ',' + '\'' + folder_details.updatedAt + '\'' + ',' + '\'' + folder_details.folder_name + '\'' + ',' + '\'' + folder_details._id + '\'' + `)">

    <td>${i + 1}</td>
    <td>${folder_details.folder_name}</td>
    <td><i title = ${fav_status} id = ${folder_details._id} class="${fav_class} fa-heart" onclick = "mark_unmark_fav(` + '\'' + folder_details._id + '\'' + `)"></i></td>

    </tr>`
  }

  return content;
}