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
