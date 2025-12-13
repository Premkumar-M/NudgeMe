document.getElementById("addBtn").addEventListener("click", function () {
    const value = document.getElementById("urlInput").value.trim();

    if (!value) return alert("Please enter something");
    console.log(chrome)
    console.log(chrome.storage)
    chrome.storage.local.get(["studySites"], function (result) {
        const studySites = result.studySites || [];

        if (studySites.includes(value)) {
            alert("Already exists!");
        } else {
            studySites.push(value);
            chrome.storage.local.set({ studySites }, function () {
                alert("Saved successfully!");
            });
        }
    });
})