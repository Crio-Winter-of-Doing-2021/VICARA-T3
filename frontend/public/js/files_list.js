async function getContent(file_list) {
    let download_link = 'http://localhost:3000/download/:file_id'
    console.log("inside getContent")
    let len = file_list.length;
    let content = ``;
    for (let i = 0; i < len; i++) {
        let file_details = file_list[i];
        content += `<div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
          <p class="card-text">${file_details['file_name']}</p>
          <a href=${download_link} class="card-link">Download file</a>
          <a href="#" class="card-link">Make Favourite</a>
        </div>
      </div>`
    }

    return content;
}
