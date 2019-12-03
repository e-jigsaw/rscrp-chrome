window.addEventListener('rscrp:fetchPage', () => {
  navigator.clipboard.writeText(`${window.scrapbox.Page.lines.map(line => line.text).join('\n')}
from [/${window.scrapbox.Project.name}/${window.scrapbox.Page.title}]`)
  window.postMessage({type: 'rscrp:pageFetched'}, '*')
}, false)
