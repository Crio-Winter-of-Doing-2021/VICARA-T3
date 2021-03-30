function getMyStorageContent(file_list) {
  var trashLabel = document.getElementById('a4')
  trashLabel.innerHTML = 'Move to Trash'

  console.log(file_list)

  let len = file_list.length;
  let content = ``;

  //   for (let i = 0; i < len; i++) {
  //     let file_details = file_list[i];
  //     let fav_status = 'mark-as-favourite';
  //     let fav_class = "far";

  //     if (file_details.isFav === true) {
  //       fav_status = 'unmark-as-favourite';
  //       fav_class = "fas";
  //     }

  //     content += `<tr oncontextmenu="getContextMenu(` + '\'' + file_details.createdAt + '\'' + ',' + '\'' + file_details.updatedAt + '\'' + ',' + '\'' + file_details.file_name + '\'' + ',' + '\'' + file_details._id + '\'' + `)">
  //         <td>${i + 1}</td>
  //         <td>${file_details.file_name}</td>
  //         <td><i title = "${fav_status}" id = "${file_details._id}" class="${fav_class} fa-heart" onclick = "mark_unmark_fav(` + '\'' + file_details._id + '\'' + `)"></i></td>

  // </tr>`
  //   }

  return content;
}