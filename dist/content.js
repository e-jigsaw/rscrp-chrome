const el = document.createElement('script')
el.src = chrome.extension.getURL('inject.js')
document.head.appendChild(el)

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'rscrp:fetchPage') {
    const ev = new CustomEvent('rscrp:fetchPage')
    window.dispatchEvent(ev)
  }
})

window.addEventListener('message', ev => {
  if (ev.data.type === 'rscrp:pageFetched') {
    chrome.runtime.sendMessage(chrome.runtime.id, {
      type: 'rscrp:pageFetched'
    })
  }
})
