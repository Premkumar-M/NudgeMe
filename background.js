function getDelayUntilNext11() {
  const now = new Date();
  const next11 = new Date();

  next11.setHours(11, 0, 0, 0);

  if (now >= next11) {
    next11.setDate(next11.getDate() + 1);
  }

  return (next11.getTime() - now.getTime()) / (1000 * 60);
}


chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  if (reason !== 'install') {
    return;
  }
  console.log('Creating alarm')
  const delayInMinutes = getDelayUntilNext11();
  await chrome.alarms.create('nudge-me-alarm', {
    delayInMinutes,
    periodInMinutes: 1440,
  });
  chrome.storage.local.set({ streak: 0 }, function () {
      console.log('Streak updated')
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
    let streak = 0
    chrome.storage.local.get(["streak"], (result) => {
      streak = result.streak || 0
    })
    chrome.storage.local.get(["studySites"], function (result) {
        const studySites = result.studySites || [];

        studySites.forEach((site) => {
            console.log(site.name, ' -> ', site.visitedToday)
        })
        if (studySites?.every((site) => !site?.visitedToday)) {
          streak = streak + 1
          chrome.storage.local.set({ streak }, () => {
            console.log('Streak updated.')
          })
        }
    })
  }
});
