const el = document.createElement("script");
el.src = chrome.runtime.getURL("inject.js");
document.head.appendChild(el);

const el1 = document.createElement("link");
el1.href = chrome.runtime.getURL("style.css");
el1.rel = "stylesheet";
document.head.appendChild(el1);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "rscrp:fetchPage") {
    const ev = new CustomEvent("rscrp:fetchPage");
    window.dispatchEvent(ev);
  }
});

window.addEventListener("message", (ev) => {
  if (ev.data.type === "rscrp:pageFetched:default") {
    chrome.runtime.sendMessage(chrome.runtime.id, {
      type: "rscrp:pageFetched:default",
    });
  }
  if (ev.data.type === "rscrp:pageFetched:withName") {
    chrome.runtime.sendMessage(chrome.runtime.id, {
      type: "rscrp:pageFetched:withName",
      name: ev.data.name,
    });
  }
});
