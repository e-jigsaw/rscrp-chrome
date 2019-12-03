chrome.browserAction.onClicked.addListener(tab => {
  chrome.tabs.sendMessage(tab.id, {type: 'rscrp:fetchPage'})
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case 'rscrp:pageFetched': {
      chrome.tabs.create({
        url: 'https://scrapbox.io/rac10/new'
      })
      break
    }
  }
})
