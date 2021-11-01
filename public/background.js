/*global chrome*/
console.log('bg...')
chrome.runtime.onInstalled.addListener(() => {
  console.log('Chrome extension successfully installed!');
  return;
});


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request.messageType)
  if(request.messageType === 'addToFb') {
      chrome.tabs.create({ url: "https://www.facebook.com/marketplace/create/item" });
  }
})

// chrome.alarms.create('alarmName', {delayInMinutes: 0.1, periodInMinutes: 0.1});


// chrome.alarms.onAlarm.addListener(function( alarm ) {
//   console.log("Got an alarm!", alarm);
// });