document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["studySites"], (result) => {
    const items = result.studySites || [];
    const list = document.getElementById("urlList");

    list.innerHTML = ""; // clear old items
    console.log('Inside fetch')
    console.log(items)
    items?.forEach((item, index) => {
      console.log('item ', item)
      const li = document.createElement("li");
      const urlItemBox = document.createElement("div")
      const input = document.createElement("input")
      const checkBox = document.createElement("input")
      const button = document.createElement('button')
      button.innerText = "Delete"
      checkBox.type = 'checkbox'
      checkBox.classList.add('urlEach')
      checkBox.id = 'urlCheck'
      checkBox.name = 'urlCheck'
      input.name = 'url'
      input.type = "text"
      input.id = 'urlEach'
      input.classList.add('urlInput')
      input.value = item?.name;
      urlItemBox.classList.add('urlItemBox')
      urlItemBox.appendChild(checkBox)
      urlItemBox.appendChild(input)
    //   urlItemBox.appendChild(button)
      li.appendChild(urlItemBox)
    //   li.textContent = item?.name;
      list.appendChild(li);
    });
  });
});

function handleDelete() {
    const indexes = []
    const cbs = document.querySelectorAll('#urlCheck')
    cbs?.forEach((cb, index) => {
        if (cb.checked) indexes.push(index)
    })
    if (!indexes.length) {
      alert("No URL is selected")
      return
    }
    const li = document.querySelectorAll('li')
    li.forEach((_list, index) => {
        if (indexes.includes(index)) li[index].remove()
    })
    chrome.storage.local.get(["studySites"], function (result) {
        const studySites = (result.studySites || [])?.filter((_item, ind) => !indexes.includes(ind));
        chrome.storage.local.set({ studySites }, function () {
            alert("Deleted successfully!");
        });
    });
}   

function handleSave() {
    console.log('Saving...')
    const urls = document.querySelectorAll('#urlEach')
    const urlList = []
    urls?.forEach((item) => {
      console.log(item.value)
      urlList.push(item.value)
    })
    chrome.storage.local.get(["studySites"], function (result) {
        const studySitesSet = {}
        const studySites = (result.studySites || [])?.forEach((item) => {
          if (item?.name && !studySitesSet[item.name]) {
            studySitesSet[item.name] = { visited: item.visitedToday }
          }
        });
        const updatedSites = []
        urlList.forEach((url) => {
          if (studySitesSet[url]) {
            updatedSites.push({ name: url, visitedToday: studySitesSet[url].visited })
          } else {
            updatedSites.push({ name: url, visitedToday: false })
          }
        })
        chrome.storage.local.set({ studySites: updatedSites }, function () {
            alert("Saved successfully!");
        });
    })
}

document.getElementById('deleteBtn').addEventListener('click', () => {
    handleDelete()
})

document.getElementById('saveBtn').addEventListener('click', () => {
    handleSave()
})