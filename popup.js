document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["streak"], (result) => {
    const span = document.getElementById("streakValue");
    span.textContent = result.streak ?? "No value found";
  });
});


document.getElementById("addBtn").addEventListener("click", function () {
    const value = document.getElementById("urlInput").value.trim();

    if (!value) return alert("Please enter something");
    console.log(chrome)
    console.log(chrome.storage)
    chrome.storage.local.get(["studySites"], function (result) {
        const studySites = result.studySites || [];

        if (studySites.some((item) => item.name == value)) {
            alert("Already exists!");
        } else {
            studySites.push({ name: value, visitedToday: false });
            chrome.storage.local.set({ studySites }, function () {
                alert("Saved successfully!");
            });
            const streak = studySites.length || 0
            chrome.storage.local.set({ streak }, () => {
                const span = document.getElementById("streakValue");
                span.textContent = streak ?? "No value found";
            })
        }
    });
})