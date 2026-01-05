document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["studySites"], (result) => {
    const items = result.studySites || [];
    const list = document.getElementById("urlList");

    list.innerHTML = ""; // clear old items
    console.log('Inside fetch')
    console.log(items)
    items?.forEach((item) => {
      console.log('item ', item)
      const li = document.createElement("li");
      const urlItemBox = document.createElement("div")
      const input = document.createElement("input")
      const checkBox = document.createElement("input")
      const button = document.createElement('button')
      button.innerText = "Delete"
      checkBox.type = 'checkbox'
      checkBox.onclick = handleCheck
      checkBox.classList.add('urlEach')
      checkBox.name = 'urlCheck'
      input.name = 'url'
      input.type = "text"
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

function handleCheck(urlItem) {
  console.log('checked ', urlItem?.name)
}   