chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, { type: "rscrp:fetchPage" });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case "rscrp:pageFetched:default": {
      chrome.tabs.create({
        url: "https://scrapbox.io/jigsaw/new",
      });
      break;
    }
    case "rscrp:pageFetched:withName": {
      chrome.tabs.create({
        url: `https://scrapbox.io/${message.name}/new`,
      });
      break;
    }
  }
});
