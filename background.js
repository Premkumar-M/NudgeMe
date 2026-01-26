chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  if (reason !== 'install') {
    return;
  }
  console.log('Creating alarm')

  await chrome.alarms.create('nudge-me-alarm', {
    delayInMinutes: 0.1,
    periodInMinutes: 0.1
  });
  console.log('Alarm created')
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Run only when page is fully loaded
  if (changeInfo.status === "complete" && tab.url) {
    console.log("Page URL:", tab.url);

    chrome.storage.local.get(["studySites"], function (result) {
        const studySites = (result.studySites || [])
        ?.map((item) => {
          if (tab.url?.includes(item.name)) return { ...item, visitedToday: true }
          return item
        });
        chrome.storage.local.set({ studySites }, function () {
            console.log('Store updated')
        });
        
    });
  }
});


chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "nudge-me-alarm") {
    console.log("Alarm triggered every minute");
    chrome.storage.local.get(["studySites"], function (result) {
        const studySites = result.studySites || [];

        studySites.forEach((site) => {
            console.log(site.name, ' -> ', site.visitedToday)
        })
    })
  }
});
