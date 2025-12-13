chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  if (reason !== 'install') {
    return;
  }
  console.log('Creating alarm')

  // Create an alarm so we have something to look at in the demo
  await chrome.alarms.create('nudge-me-alarm', {
    delayInMinutes: 0.1,
    periodInMinutes: 0.1
  });
  console.log('Alarm created')
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "nudge-me-alarm") {
    console.log("Alarm triggered every minute");
  }
});
